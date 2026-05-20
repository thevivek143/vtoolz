#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT_DIR = path.join(ROOT, "data", "tools");
const MANIFEST_PATH = path.join(ROOT, "data", "tools-manifest.json");
const SINGLE_JSON_PATH = path.join(ROOT, "data", "tools.json");
const DEFAULT_CHUNK_SIZE = 500;

const CATEGORY_MAP = new Map([
  ["chat", "chat"],
  ["writing", "chat"],
  ["writing & chat", "chat"],
  ["image", "image"],
  ["image gen", "image"],
  ["image generation", "image"],
  ["video", "video"],
  ["video & motion", "video"],
  ["voice", "voice"],
  ["audio", "voice"],
  ["voice & audio", "voice"],
  ["code", "code"],
  ["coding", "code"],
  ["developer", "code"],
  ["productivity", "productivity"],
]);

const SUBCAT_BY_CATEGORY = {
  chat: "ai-assistant",
  image: "text-to-image",
  video: "text-to-video",
  voice: "text-to-speech",
  code: "code-gen",
  productivity: "ai-search",
};

function usage() {
  console.log(`
Usage:
  node ai-hub/scripts/import-tools.mjs <input.json|input.csv> [--chunk-size 500]

Input columns/fields:
  name, url, desc, category, subcat, price, tags, tagline, longDesc,
  pros, cons, features, bestFor, logo, isTrending, isLatest

Output:
  ai-hub/data/tools/chunk-000.json ...
  ai-hub/data/tools-manifest.json

Notes:
  Use only datasets you own, created yourself, or are licensed to republish.
`);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const input = args.find(arg => !arg.startsWith("--"));
  const chunkArgIndex = args.indexOf("--chunk-size");
  const chunkSize = chunkArgIndex === -1 ? DEFAULT_CHUNK_SIZE : Number(args[chunkArgIndex + 1]);
  return { input, chunkSize: Number.isFinite(chunkSize) && chunkSize > 0 ? chunkSize : DEFAULT_CHUNK_SIZE };
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitList(value) {
  if (Array.isArray(value)) return value.map(String).map(v => v.trim()).filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(/[|,;]/)
    .map(v => v.trim())
    .filter(Boolean);
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  return ["1", "true", "yes", "y"].includes(String(value || "").trim().toLowerCase());
}

function normalizePrice(value) {
  const raw = String(value || "Freemium").trim().toLowerCase();
  if (raw.includes("trial")) return "Free Trial";
  if (raw === "free") return "Free";
  if (raw === "paid" || raw.includes("premium")) return "Paid";
  return "Freemium";
}

function inferPrice(item) {
  const text = [item.price, item.pricing, item.description, item.desc, item.summary].filter(Boolean).join(" ").toLowerCase();
  if (text.includes("free trial")) return "Free Trial";
  if (/\bfree\b/.test(text)) return "Free";
  if (/\bpaid\b|\bpremium\b|\bsubscription\b/.test(text)) return "Paid";
  return "Freemium";
}

function normalizeCategory(value) {
  const raw = String(value || "").trim().toLowerCase();
  return CATEGORY_MAP.get(raw) || "productivity";
}

function inferCategory(item) {
  const text = [
    item.category,
    item.subcat,
    item.subcategory,
    item.tags,
    item.name,
    item.title,
    item.handle,
    item.description,
    item.desc,
    item.summary,
  ].filter(Boolean).join(" ").toLowerCase();

  if (/\b(image|photo|avatar|art|design|logo|poster|background|picture|text-to-image)\b/.test(text)) return "image";
  if (/\b(video|animation|youtube|shorts|reel|movie|text-to-video|lip sync)\b/.test(text)) return "video";
  if (/\b(audio|voice|speech|music|song|podcast|transcription|text-to-speech|tts)\b/.test(text)) return "voice";
  if (/\b(code|coding|developer|api|programming|github|website builder|app builder|debug)\b/.test(text)) return "code";
  if (/\b(write|writer|writing|copy|blog|article|essay|chatbot|chat|prompt|grammar|paraphrase)\b/.test(text)) return "chat";
  return "productivity";
}

function inferSubcat(category, item) {
  const text = [
    item.subcat,
    item.subcategory,
    item.tags,
    item.description,
    item.desc,
    item.summary,
  ].filter(Boolean).join(" ").toLowerCase();

  if (category === "chat") {
    if (/\bseo|copy|marketing|ad\b/.test(text)) return "seo-copy";
    if (/\bgrammar|paraphrase|rewrite|summar/i.test(text)) return "paraphraser";
  }
  if (category === "image") {
    if (/\bphoto|edit|enhance|background|remove|upscale\b/.test(text)) return "photo-editor";
    if (/\bdesign|logo|poster|mockup|brand\b/.test(text)) return "graphic-design";
  }
  if (category === "video") {
    if (/\bavatar|presenter|talking head\b/.test(text)) return "avatar-builder";
    if (/\banimat|motion\b/.test(text)) return "ai-animator";
  }
  if (category === "voice") {
    if (/\bmusic|song\b/.test(text)) return "music-gen";
    if (/\bclone|cloning\b/.test(text)) return "voice-cloning";
    if (/\bedit|podcast|transcription|transcribe\b/.test(text)) return "audio-editor";
  }
  if (category === "code") {
    if (/\bide|copilot|autocomplete\b/.test(text)) return "ide-companion";
    if (/\bui|frontend|website|landing page\b/.test(text)) return "ui-builder";
    if (/\bsearch|stackoverflow|docs\b/.test(text)) return "dev-search";
  }
  return SUBCAT_BY_CATEGORY[category];
}

function prettifyHandle(value) {
  return String(value || "")
    .trim()
    .replace(/^@/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some(v => v.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some(v => v.trim())) rows.push(row);

  const headers = rows.shift()?.map(h => h.trim()) || [];
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

async function loadInput(inputPath) {
  const text = await fs.readFile(inputPath, "utf8");
  if (inputPath.toLowerCase().endsWith(".csv")) return parseCsv(text);
  const parsed = JSON.parse(text);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.tools)) return parsed.tools;
  throw new Error("JSON input must be an array or an object with a tools array");
}

function normalizeTool(item, index) {
  const name = String(item.name || item.title || prettifyHandle(item.handle) || "").trim();
  const url = String(item.url || item.website || item.link || "").trim();
  if (!name || !url) return null;

  const category = normalizeCategory(item.category || inferCategory(item));
  const subcat = String(item.subcat || item.subcategory || inferSubcat(category, item)).trim();
  const tags = splitList(item.tags).slice(0, 8);
  const id = slugify(item.handle || item.id || `ai-${name}-${new URL(url).hostname || index}`);

  return {
    id: id.startsWith("ai-") ? id : `ai-${id}`,
    name,
    url,
    desc: String(item.desc || item.description || item.summary || "AI tool listed in the Vibox AI Hub.").trim(),
    category,
    subcat,
    price: normalizePrice(item.price || item.pricing || inferPrice(item)),
    icon: String(item.icon || "fas fa-brain").trim(),
    tags: tags.length ? tags : ["AI Tool"],
    tagline: String(item.tagline || item.slogan || "").trim(),
    longDesc: String(item.longDesc || item.long_description || item.description || item.desc || "").trim(),
    pros: splitList(item.pros),
    cons: splitList(item.cons),
    features: splitList(item.features),
    bestFor: String(item.bestFor || item.best_for || "").trim(),
    logo: String(item.logo || "").trim(),
    isTrending: normalizeBoolean(item.isTrending || item.trending),
    isLatest: normalizeBoolean(item.isLatest || item.latest),
  };
}

function dedupeTools(tools) {
  const seen = new Set();
  const output = [];

  for (const tool of tools) {
    const key = tool.url.toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(tool);
  }

  return output;
}

async function cleanOutDir(outDir) {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });
}

async function writeChunks(tools, chunkSize) {
  await cleanOutDir(DEFAULT_OUT_DIR);

  const chunks = [];
  for (let i = 0; i < tools.length; i += chunkSize) {
    const chunk = tools.slice(i, i + chunkSize);
    const file = `tools/chunk-${String(chunks.length).padStart(3, "0")}.json`;
    await fs.writeFile(path.join(ROOT, "data", file), JSON.stringify(chunk, null, 2) + "\n");
    chunks.push({ file, count: chunk.length });
  }

  const manifest = {
    version: new Date().toISOString(),
    total: tools.length,
    chunkSize,
    chunks,
  };

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  if (tools.length <= chunkSize) {
    await fs.writeFile(SINGLE_JSON_PATH, JSON.stringify(tools, null, 2) + "\n");
  }

  return manifest;
}

async function main() {
  const { input, chunkSize } = parseArgs(process.argv);
  if (!input) {
    usage();
    process.exit(1);
  }

  const inputPath = path.resolve(input);
  const rawTools = await loadInput(inputPath);
  const normalized = rawTools.map(normalizeTool).filter(Boolean);
  const tools = dedupeTools(normalized);
  const manifest = await writeChunks(tools, chunkSize);

  console.log(`Imported ${tools.length} tools into ${manifest.chunks.length} chunk(s).`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
