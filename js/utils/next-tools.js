const TOOL_DEFS = {
    "citation-generator": {
        kind: "citation",
        fields: [
            { id: "style", label: "Style", type: "select", options: ["APA", "MLA", "Chicago"], value: "APA" },
            { id: "author", label: "Author", type: "text", placeholder: "Jane Doe" },
            { id: "title", label: "Title", type: "text", placeholder: "Article title" },
            { id: "year", label: "Year", type: "number", placeholder: "2026" },
            { id: "url", label: "URL", type: "text", placeholder: "https://example.com" }
        ]
    },
    "formula-sheet-maker": {
        kind: "formulaSheet",
        fields: [
            { id: "subject", label: "Subject", type: "text", placeholder: "Algebra" },
            { id: "lines", label: "Formulas (one per line)", type: "textarea", placeholder: "Area Circle = pi r^2\nQuadratic = (-b +- sqrt(b^2-4ac)) / 2a" }
        ]
    },
    "plagiarism-checker": {
        kind: "plagiarism",
        fields: [
            { id: "source", label: "Reference Text", type: "textarea", placeholder: "Paste source text" },
            { id: "target", label: "Your Text", type: "textarea", placeholder: "Paste text to check" }
        ]
    },
    "graph-plotter": {
        kind: "quadratic",
        fields: [
            { id: "a", label: "a", type: "number", value: "1" },
            { id: "b", label: "b", type: "number", value: "0" },
            { id: "c", label: "c", type: "number", value: "0" },
            { id: "xStart", label: "x start", type: "number", value: "-5" },
            { id: "xEnd", label: "x end", type: "number", value: "5" },
            { id: "step", label: "step", type: "number", value: "1" }
        ]
    },
    "ats-resume-checker": {
        kind: "ats",
        fields: [
            { id: "job", label: "Job Description", type: "textarea", placeholder: "Paste JD" },
            { id: "resume", label: "Resume Text", type: "textarea", placeholder: "Paste resume text" }
        ]
    },
    "cover-letter-formatter": {
        kind: "coverLetter",
        fields: [
            { id: "name", label: "Your Name", type: "text", placeholder: "Alex Kumar" },
            { id: "role", label: "Target Role", type: "text", placeholder: "Frontend Developer" },
            { id: "company", label: "Company", type: "text", placeholder: "Acme Ltd" },
            { id: "skills", label: "Top Skills (comma separated)", type: "text", placeholder: "React, Accessibility, Performance" },
            { id: "why", label: "Why this role", type: "textarea", placeholder: "Short motivation" }
        ]
    },
    "salary-breakup-calculator": {
        kind: "salaryBreakup",
        fields: [
            { id: "ctc", label: "Annual CTC", type: "number", value: "1200000" },
            { id: "basicPct", label: "Basic %", type: "number", value: "40" },
            { id: "hraPct", label: "HRA % of Basic", type: "number", value: "50" },
            { id: "pfPct", label: "PF % of Basic", type: "number", value: "12" }
        ]
    },
    "interview-prep-cards": {
        kind: "interviewCards",
        fields: [
            { id: "role", label: "Role", type: "text", placeholder: "Data Analyst" },
            { id: "skills", label: "Skills (comma separated)", type: "text", placeholder: "SQL, Excel, Python" }
        ]
    },
    "thumbnail-caption-maker": {
        kind: "thumbnail",
        fields: [
            { id: "topic", label: "Video Topic", type: "text", placeholder: "Python in 10 minutes" },
            { id: "tone", label: "Tone", type: "select", options: ["Bold", "Curious", "Professional", "Playful"], value: "Bold" }
        ]
    },
    "subtitle-formatter": {
        kind: "subtitle",
        fields: [
            { id: "text", label: "Transcript (one line per subtitle)", type: "textarea", placeholder: "Hello world\nWelcome back" },
            { id: "seconds", label: "Seconds per line", type: "number", value: "3" }
        ]
    },
    "script-timer": {
        kind: "readTime",
        fields: [
            { id: "script", label: "Script", type: "textarea", placeholder: "Paste your script" },
            { id: "wpm", label: "Words per minute", type: "number", value: "145" }
        ]
    },
    "hashtag-title-generator": {
        kind: "hashtags",
        fields: [
            { id: "topic", label: "Topic", type: "text", placeholder: "Productivity for students" },
            { id: "platform", label: "Platform", type: "select", options: ["YouTube", "Instagram", "LinkedIn", "X"], value: "YouTube" }
        ]
    },
    "audio-cleanup-notes": {
        kind: "cleanup",
        fields: [
            { id: "text", label: "Transcript", type: "textarea", placeholder: "Paste transcript to remove filler words" }
        ]
    },
    "invoice-generator": {
        kind: "invoice",
        fields: [
            { id: "business", label: "Business Name", type: "text", placeholder: "Vibox Studio" },
            { id: "client", label: "Client", type: "text", placeholder: "Client Name" },
            { id: "items", label: "Items (item,qty,rate per line)", type: "textarea", placeholder: "Design,2,1500\nSEO Setup,1,2500" },
            { id: "tax", label: "Tax %", type: "number", value: "18" }
        ]
    },
    "gst-vat-calculator": {
        kind: "gst",
        fields: [
            { id: "amount", label: "Amount", type: "number", value: "1000" },
            { id: "rate", label: "Tax %", type: "number", value: "18" },
            { id: "inclusive", label: "Price Type", type: "select", options: ["Exclusive", "Inclusive"], value: "Exclusive" }
        ]
    },
    "quotation-maker": {
        kind: "quote",
        fields: [
            { id: "client", label: "Client", type: "text", placeholder: "Client Name" },
            { id: "scope", label: "Scope", type: "textarea", placeholder: "Project deliverables" },
            { id: "amount", label: "Quoted Amount", type: "number", value: "50000" },
            { id: "days", label: "Timeline (days)", type: "number", value: "14" }
        ]
    },
    "margin-calculator": {
        kind: "margin",
        fields: [
            { id: "cost", label: "Cost Price", type: "number", value: "100" },
            { id: "sell", label: "Selling Price", type: "number", value: "150" }
        ]
    },
    "receipt-parser": {
        kind: "receipt",
        fields: [
            { id: "text", label: "Receipt Text", type: "textarea", placeholder: "Paste OCR text from receipt" }
        ]
    },
    "form-format-validator": {
        kind: "validator",
        fields: [
            { id: "pan", label: "PAN", type: "text", placeholder: "ABCDE1234F" },
            { id: "aadhaar", label: "Aadhaar", type: "text", placeholder: "123412341234" },
            { id: "passport", label: "Passport", type: "text", placeholder: "A1234567" },
            { id: "email", label: "Email", type: "text", placeholder: "name@example.com" },
            { id: "phone", label: "Phone", type: "text", placeholder: "9876543210" }
        ]
    },
    "eligibility-calculator": {
        kind: "eligibility",
        fields: [
            { id: "age", label: "Your Age", type: "number", value: "24" },
            { id: "minAge", label: "Min Age", type: "number", value: "18" },
            { id: "maxAge", label: "Max Age", type: "number", value: "30" },
            { id: "income", label: "Annual Income", type: "number", value: "450000" },
            { id: "minIncome", label: "Min Income", type: "number", value: "300000" }
        ]
    },
    "macros-calculator": {
        kind: "macros",
        fields: [
            { id: "weight", label: "Weight (kg)", type: "number", value: "70" },
            { id: "goal", label: "Goal", type: "select", options: ["Maintain", "Fat Loss", "Muscle Gain"], value: "Maintain" }
        ]
    },
    "calorie-planner": {
        kind: "calorie",
        fields: [
            { id: "age", label: "Age", type: "number", value: "28" },
            { id: "sex", label: "Sex", type: "select", options: ["Male", "Female"], value: "Male" },
            { id: "height", label: "Height (cm)", type: "number", value: "172" },
            { id: "weight", label: "Weight (kg)", type: "number", value: "70" },
            { id: "activity", label: "Activity", type: "select", options: ["Sedentary", "Light", "Moderate", "Active"], value: "Moderate" }
        ]
    },
    "interval-timer-planner": {
        kind: "interval",
        fields: [
            { id: "work", label: "Work (sec)", type: "number", value: "40" },
            { id: "rest", label: "Rest (sec)", type: "number", value: "20" },
            { id: "rounds", label: "Rounds", type: "number", value: "8" }
        ]
    },
    "habit-tracker": {
        kind: "habit",
        fields: [
            { id: "habits", label: "Habits (comma separated)", type: "text", placeholder: "Read,Exercise,Meditate" },
            { id: "days", label: "Days", type: "number", value: "30" }
        ]
    },
    "meal-planner": {
        kind: "meal",
        fields: [
            { id: "calories", label: "Daily Calories", type: "number", value: "2200" },
            { id: "meals", label: "Meals per day", type: "number", value: "4" },
            { id: "pref", label: "Preference", type: "select", options: ["Balanced", "High Protein", "Vegetarian"], value: "Balanced" }
        ]
    },
    "sip-calculator": {
        kind: "sip",
        fields: [
            { id: "monthly", label: "Monthly Investment", type: "number", value: "5000" },
            { id: "rate", label: "Annual Return %", type: "number", value: "12" },
            { id: "years", label: "Years", type: "number", value: "10" }
        ]
    },
    "emi-calculator": {
        kind: "emi",
        fields: [
            { id: "principal", label: "Loan Amount", type: "number", value: "500000" },
            { id: "rate", label: "Annual Interest %", type: "number", value: "10" },
            { id: "months", label: "Tenure (months)", type: "number", value: "60" }
        ]
    },
    "fd-calculator": {
        kind: "fd",
        fields: [
            { id: "principal", label: "Deposit Amount", type: "number", value: "100000" },
            { id: "rate", label: "Annual Interest %", type: "number", value: "7" },
            { id: "years", label: "Years", type: "number", value: "3" },
            { id: "freq", label: "Compounds/Year", type: "number", value: "4" }
        ]
    },
    "tax-estimator": {
        kind: "tax",
        fields: [
            { id: "income", label: "Gross Income", type: "number", value: "1200000" },
            { id: "deductions", label: "Deductions", type: "number", value: "150000" }
        ]
    },
    "budgeting-sheet": {
        kind: "budget",
        fields: [
            { id: "income", label: "Monthly Income", type: "number", value: "80000" },
            { id: "expenses", label: "Expenses (name,amount per line)", type: "textarea", placeholder: "Rent,20000\nFood,8000\nTransport,3000" }
        ]
    },
    "debt-payoff-planner": {
        kind: "debt",
        fields: [
            { id: "debts", label: "Debts (name,balance,rate,minPay per line)", type: "textarea", placeholder: "Card A,60000,36,3000\nLoan B,200000,12,4500" },
            { id: "extra", label: "Extra monthly payment", type: "number", value: "2000" }
        ]
    },
    "itinerary-builder": {
        kind: "itinerary",
        fields: [
            { id: "destination", label: "Destination", type: "text", placeholder: "Goa" },
            { id: "days", label: "Days", type: "number", value: "4" },
            { id: "highlights", label: "Highlights (comma separated)", type: "text", placeholder: "Beach,Fort,Food Tour,Shopping" }
        ]
    },
    "packing-list-builder": {
        kind: "packing",
        fields: [
            { id: "type", label: "Trip Type", type: "select", options: ["Leisure", "Business", "Trek"], value: "Leisure" },
            { id: "days", label: "Days", type: "number", value: "5" },
            { id: "weather", label: "Weather", type: "select", options: ["Hot", "Mild", "Cold", "Rainy"], value: "Mild" }
        ]
    },
    "timezone-planner": {
        kind: "timezone",
        fields: [
            { id: "base", label: "Base Date/Time", type: "datetime-local" },
            { id: "baseOffset", label: "Base UTC Offset", type: "number", value: "5.5" },
            { id: "targets", label: "Target UTC offsets (comma separated)", type: "text", placeholder: "0,-5,1,9" }
        ]
    },
    "visa-doc-checker": {
        kind: "visa",
        fields: [
            { id: "country", label: "Country", type: "text", placeholder: "Schengen" },
            { id: "purpose", label: "Purpose", type: "select", options: ["Tourism", "Business", "Study"], value: "Tourism" }
        ]
    },
    "api-tester-lite": {
        kind: "api",
        fields: [
            { id: "url", label: "Endpoint URL", type: "text", placeholder: "https://api.example.com/data" },
            { id: "method", label: "Method", type: "select", options: ["GET", "POST"], value: "GET" },
            { id: "body", label: "JSON Body (for POST)", type: "textarea", placeholder: "{\"hello\":\"world\"}" }
        ]
    },
    "jwt-decoder": {
        kind: "jwt",
        fields: [
            { id: "token", label: "JWT", type: "textarea", placeholder: "eyJ..." }
        ]
    },
    "code-formatter-lite": {
        kind: "formatter",
        fields: [
            { id: "lang", label: "Language", type: "select", options: ["json", "javascript", "html", "css"], value: "json" },
            { id: "code", label: "Code", type: "textarea", placeholder: "Paste code" }
        ]
    },
    "mock-data-generator": {
        kind: "mock",
        fields: [
            { id: "type", label: "Dataset", type: "select", options: ["users", "products", "orders"], value: "users" },
            { id: "count", label: "Count", type: "number", value: "10" }
        ]
    },
    "quiz-creator": {
        kind: "quiz",
        fields: [
            { id: "topic", label: "Topic", type: "text", placeholder: "World History" },
            { id: "count", label: "Number of questions", type: "number", value: "5" }
        ]
    },
    "worksheet-generator": {
        kind: "worksheet",
        fields: [
            { id: "topic", label: "Topic", type: "select", options: ["Addition", "Subtraction", "Multiplication", "Division"], value: "Addition" },
            { id: "count", label: "Questions", type: "number", value: "10" }
        ]
    },
    "flashcard-maker": {
        kind: "flashcards",
        fields: [
            { id: "topic", label: "Topic", type: "text", placeholder: "Biology" },
            { id: "terms", label: "Terms (comma separated)", type: "text", placeholder: "Cell,Enzyme,Photosynthesis" }
        ]
    },
    "puzzle-generator": {
        kind: "puzzle",
        fields: [
            { id: "words", label: "Words (comma separated)", type: "text", placeholder: "code,logic,array,stack" }
        ]
    },
    "aim-trainer": {
        kind: "aim",
        fields: []
    },
    "sensitivity-converter": {
        kind: "sensitivity",
        fields: [
            { id: "fromDpi", label: "From DPI", type: "number", value: "800" },
            { id: "fromSens", label: "From Sensitivity", type: "number", value: "1.2" },
            { id: "toDpi", label: "To DPI", type: "number", value: "1600" }
        ]
    },
    "tournament-bracket-builder": {
        kind: "bracket",
        fields: [
            { id: "players", label: "Participants (one per line)", type: "textarea", placeholder: "Team A\nTeam B\nTeam C\nTeam D" }
        ]
    },
    "hindi-writing-assistant": {
        kind: "hindi",
        fields: [
            { id: "text", label: "Roman Text", type: "textarea", placeholder: "namaste duniya" }
        ]
    },
    "transliteration-tool": {
        kind: "translit",
        fields: [
            { id: "dir", label: "Direction", type: "select", options: ["en-hi", "hi-en"], value: "en-hi" },
            { id: "text", label: "Text", type: "textarea", placeholder: "mera bharat" }
        ]
    },
    "speech-to-text-notes": {
        kind: "speech",
        fields: []
    },
    "image-to-text-ocr": {
        kind: "imageOcr",
        fields: [
            { id: "image", label: "Image File", type: "file", accept: "image/*" },
            { id: "lang", label: "OCR Language", type: "select", options: ["eng", "eng+hin"], value: "eng" }
        ]
    },
    "pdf-ocr-extractor": {
        kind: "pdfOcr",
        fields: [
            { id: "pdf", label: "PDF File", type: "file", accept: "application/pdf,.pdf" },
            { id: "maxPages", label: "Pages to process", type: "number", value: "3", min: "1", max: "10" },
            { id: "lang", label: "OCR Language", type: "select", options: ["eng", "eng+hin"], value: "eng" }
        ]
    },
    "audio-to-text-transcriber": {
        kind: "speech",
        fields: []
    },
    "video-to-mp3-converter": {
        kind: "videoMp3",
        fields: [
            { id: "video", label: "Video File", type: "file", accept: "video/*" },
            { id: "bitrate", label: "MP3 Bitrate (kbps)", type: "number", value: "128", min: "64", max: "320", step: "32" }
        ]
    },
    "grammar-checker": {
        kind: "grammar",
        fields: [
            { id: "text", label: "Text", type: "textarea", placeholder: "Paste text to check grammar and punctuation" }
        ]
    },
    "ai-text-detector": {
        kind: "aiDetector",
        fields: [
            { id: "text", label: "Text", type: "textarea", placeholder: "Paste writing sample" }
        ]
    },
    "expense-tracker": {
        kind: "expenseTracker",
        fields: [
            { id: "income", label: "Monthly Income", type: "number", value: "80000" },
            { id: "entries", label: "Expenses (date,category,amount,note per line)", type: "textarea", placeholder: "2026-04-01,Food,420,Lunch\n2026-04-02,Transport,180,Metro" }
        ]
    },
    "time-difference-calculator": {
        kind: "timeDiff",
        fields: [
            { id: "start", label: "Start Date/Time", type: "datetime-local" },
            { id: "startOffset", label: "Start UTC Offset", type: "number", value: "5.5", step: "0.5" },
            { id: "end", label: "End Date/Time", type: "datetime-local" },
            { id: "endOffset", label: "End UTC Offset", type: "number", value: "0", step: "0.5" }
        ]
    },
    "trip-cost-calculator": {
        kind: "tripCost",
        fields: [
            { id: "distance", label: "Distance (km)", type: "number", value: "450" },
            { id: "mileage", label: "Vehicle Mileage (km/l)", type: "number", value: "16" },
            { id: "fuelPrice", label: "Fuel Price per Liter", type: "number", value: "105" },
            { id: "tolls", label: "Tolls", type: "number", value: "900" },
            { id: "parking", label: "Parking", type: "number", value: "300" },
            { id: "days", label: "Trip Days", type: "number", value: "4", min: "1" },
            { id: "travelers", label: "Travelers", type: "number", value: "2", min: "1" },
            { id: "stayPerNight", label: "Stay per Night", type: "number", value: "2500" },
            { id: "foodPerPerson", label: "Food per Person per Day", type: "number", value: "700" },
            { id: "activities", label: "Activities Total", type: "number", value: "2000" },
            { id: "misc", label: "Miscellaneous", type: "number", value: "800" }
        ]
    },
    "fuel-cost-calculator": {
        kind: "fuelCost",
        fields: [
            { id: "distance", label: "Distance (km)", type: "number", value: "120" },
            { id: "mileage", label: "Mileage (km/l)", type: "number", value: "18" },
            { id: "fuelPrice", label: "Fuel Price per Liter", type: "number", value: "104" },
            { id: "passengers", label: "Passengers", type: "number", value: "1", min: "1" }
        ]
    }
};

function el(tag, attrs = {}, html = "") {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (html) node.innerHTML = html;
    return node;
}

function esc(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function words(text) {
    return (String(text || "").toLowerCase().match(/[a-z0-9]{3,}/g) || []);
}

function toNum(v, fallback = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}

function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

function parseLines(text) {
    return String(text || "")
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(Boolean);
}

function parseCsvList(text) {
    return String(text || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
}

const scriptLoadCache = new Map();

function loadScriptOnce(src, checkReady) {
    if (typeof checkReady === "function" && checkReady()) {
        return Promise.resolve();
    }
    if (scriptLoadCache.has(src)) {
        return scriptLoadCache.get(src);
    }
    const pending = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
            return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
    });
    scriptLoadCache.set(src, pending);
    return pending;
}

function getFieldValue(container, field) {
    const node = container.querySelector(`[name=\"${field.id}\"]`);
    if (!node) return "";
    if (field.type === "file") {
        return node.files && node.files[0] ? node.files[0] : null;
    }
    return node.value;
}

function renderForm(toolId, def) {
    const app = document.getElementById("tool-app");
    const output = document.getElementById("tool-output");
    const fieldsWrap = el("div", { class: "next-fields" });

    def.fields.forEach(field => {
        const group = el("div", { class: "next-field" });
        const label = el("label", { for: field.id }, esc(field.label));
        let input;
        if (field.type === "textarea") {
            input = el("textarea", { id: field.id, name: field.id, rows: "6", placeholder: field.placeholder || "" });
            input.value = field.value || "";
        } else if (field.type === "select") {
            input = el("select", { id: field.id, name: field.id });
            (field.options || []).forEach(opt => {
                const option = el("option", { value: opt }, esc(opt));
                if (opt === field.value) option.selected = true;
                input.appendChild(option);
            });
        } else {
            const attrs = {
                id: field.id,
                name: field.id,
                type: field.type || "text",
                placeholder: field.placeholder || ""
            };
            if (field.accept) attrs.accept = field.accept;
            if (field.min !== undefined) attrs.min = String(field.min);
            if (field.max !== undefined) attrs.max = String(field.max);
            if (field.step !== undefined) attrs.step = String(field.step);
            if ((field.type || "text") !== "file" && field.value !== undefined) {
                attrs.value = field.value;
            }
            input = el("input", attrs);
        }
        group.appendChild(label);
        group.appendChild(input);
        fieldsWrap.appendChild(group);
    });

    const actions = el("div", { class: "next-actions" });
    const runBtn = el("button", { type: "button", class: "btn btn-primary" }, "Run Tool");
    const copyBtn = el("button", { type: "button", class: "btn btn-secondary" }, "Copy Output");
    actions.appendChild(runBtn);
    actions.appendChild(copyBtn);

    copyBtn.addEventListener("click", async () => {
        const text = output.innerText || "";
        if (!text.trim()) return;
        try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = "Copied";
            setTimeout(() => {
                copyBtn.textContent = "Copy Output";
            }, 1200);
        } catch {
            copyBtn.textContent = "Copy failed";
            setTimeout(() => {
                copyBtn.textContent = "Copy Output";
            }, 1200);
        }
    });

    runBtn.addEventListener("click", async () => {
        const values = {};
        def.fields.forEach(f => {
            values[f.id] = getFieldValue(fieldsWrap, f);
        });
        const result = await executeTool(toolId, def.kind, values, output);
        if (typeof result === "string") {
            output.innerHTML = `<pre>${esc(result)}</pre>`;
        }
    });

    app.innerHTML = "";
    app.appendChild(fieldsWrap);
    app.appendChild(actions);
}

function compareKeywordSets(a, b) {
    const sa = new Set(words(a));
    const sb = new Set(words(b));
    const common = [...sa].filter(w => sb.has(w));
    const onlyB = [...sb].filter(w => !sa.has(w));
    const score = sb.size ? (common.length / sb.size) * 100 : 0;
    return { common, missing: onlyB.slice(0, 40), score };
}

function translitEnToHi(text) {
    const map = {
        "namaste": "नमस्ते", "mera": "मेरा", "bharat": "भारत", "duniya": "दुनिया", "aap": "आप",
        "kaise": "कैसे", "ho": "हो", "kya": "क्या", "hai": "है", "main": "मैं", "hum": "हम"
    };
    return String(text || "").split(/(\s+)/).map(tok => {
        const key = tok.toLowerCase();
        return map[key] || tok;
    }).join("");
}

function translitHiToEn(text) {
    const map = {
        "नमस्ते": "namaste", "मेरा": "mera", "भारत": "bharat", "दुनिया": "duniya", "आप": "aap",
        "कैसे": "kaise", "हो": "ho", "क्या": "kya", "है": "hai", "मैं": "main", "हम": "hum"
    };
    let out = String(text || "");
    Object.entries(map).forEach(([hi, en]) => {
        out = out.split(hi).join(en);
    });
    return out;
}

function floatToInt16(samples) {
    const out = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
        const s = clamp(samples[i], -1, 1);
        out[i] = s < 0 ? Math.round(s * 32768) : Math.round(s * 32767);
    }
    return out;
}

async function executeTool(toolId, kind, v, output) {
    switch (kind) {
        case "citation": {
            const style = v.style || "APA";
            const author = v.author || "Unknown";
            const title = v.title || "Untitled";
            const year = v.year || "n.d.";
            const url = v.url || "";
            if (style === "APA") return `${author} (${year}). ${title}. ${url}`;
            if (style === "MLA") return `${author}. \"${title}.\" ${year}, ${url}.`;
            return `${author}. ${title}. (${year}). ${url}`;
        }
        case "formulaSheet": {
            const subject = v.subject || "General";
            const lines = parseLines(v.lines);
            const body = lines.map((ln, i) => `${i + 1}. ${ln}`).join("\n");
            return `${subject} Formula Sheet\n\n${body || "Add formulas to generate your sheet."}`;
        }
        case "plagiarism": {
            const a = v.source || "";
            const b = v.target || "";
            const sa = new Set(words(a));
            const sb = new Set(words(b));
            const inter = [...sa].filter(x => sb.has(x));
            const union = new Set([...sa, ...sb]);
            const jaccard = union.size ? (inter.length / union.size) * 100 : 0;
            const overlap = sb.size ? (inter.length / sb.size) * 100 : 0;
            return `Similarity Summary\nJaccard Similarity: ${jaccard.toFixed(2)}%\nTarget Overlap: ${overlap.toFixed(2)}%\nMatched Keywords: ${inter.slice(0, 60).join(", ") || "None"}`;
        }
        case "quadratic": {
            const a = toNum(v.a, 1);
            const b = toNum(v.b, 0);
            const c = toNum(v.c, 0);
            const xs = toNum(v.xStart, -5);
            const xe = toNum(v.xEnd, 5);
            const step = Math.max(0.01, toNum(v.step, 1));
            const rows = [];
            for (let x = xs; x <= xe + 1e-9; x += step) {
                const y = a * x * x + b * x + c;
                rows.push(`${x.toFixed(2)}\t${y.toFixed(4)}`);
                if (rows.length > 500) break;
            }
            return `y = ${a}x^2 + ${b}x + ${c}\n\nX\tY\n${rows.join("\n")}`;
        }
        case "ats": {
            const { common, missing, score } = compareKeywordSets(v.resume, v.job);
            return `ATS Match Score: ${score.toFixed(1)}%\n\nMatched Keywords:\n- ${common.slice(0, 30).join("\n- ")}\n\nMissing Priority Keywords:\n- ${missing.slice(0, 20).join("\n- ")}`;
        }
        case "coverLetter": {
            const skills = parseCsvList(v.skills).join(", ");
            return `Dear Hiring Manager,\n\nI am ${v.name || "[Your Name]"}, and I am excited to apply for the ${v.role || "[Role]"} position at ${v.company || "[Company]"}.\n\nMy relevant strengths include ${skills || "[skills]"}. ${v.why || "I am motivated to contribute and grow with your team."}\n\nThank you for your time and consideration.\n\nSincerely,\n${v.name || "[Your Name]"}`;
        }
        case "salaryBreakup": {
            const ctc = toNum(v.ctc, 0);
            const basic = ctc * toNum(v.basicPct, 40) / 100;
            const hra = basic * toNum(v.hraPct, 50) / 100;
            const pf = basic * toNum(v.pfPct, 12) / 100;
            const special = ctc - (basic + hra + pf);
            return `Annual CTC: ${ctc.toFixed(2)}\nBasic: ${basic.toFixed(2)}\nHRA: ${hra.toFixed(2)}\nPF: ${pf.toFixed(2)}\nSpecial Allowance: ${special.toFixed(2)}\n\nMonthly In-hand Estimate: ${(ctc / 12 - pf / 12).toFixed(2)}`;
        }
        case "interviewCards": {
            const skills = parseCsvList(v.skills);
            const lines = skills.map((s, i) => `${i + 1}. Q: Explain a project where you used ${s}.\n   A: Situation, Action, Result.`);
            return `Interview Prep Cards for ${v.role || "your role"}\n\n${lines.join("\n\n")}`;
        }
        case "thumbnail": {
            const topic = v.topic || "Your Topic";
            const tone = v.tone || "Bold";
            const titles = [
                `${topic}: The Fast Track`,
                `Stop Doing This in ${topic}`,
                `${topic} in 5 Minutes`,
                `My ${topic} Workflow (2026)`
            ];
            return `Thumbnail Planner (${tone})\n\nTitle Ideas:\n- ${titles.join("\n- ")}\n\nDesign Checklist:\n- Use 1280x720 canvas\n- 3-5 words max on image\n- High contrast foreground\n- One focal subject\n- Add brand corner mark`;
        }
        case "subtitle": {
            const lines = parseLines(v.text);
            const dur = Math.max(1, Math.round(toNum(v.seconds, 3)));
            let t = 0;
            const srt = lines.map((line, i) => {
                const start = toSrtTime(t);
                const end = toSrtTime(t + dur);
                t += dur;
                return `${i + 1}\n${start} --> ${end}\n${line}`;
            });
            return srt.join("\n\n");
        }
        case "readTime": {
            const count = words(v.script).length;
            const wpm = Math.max(60, toNum(v.wpm, 145));
            const mins = count / wpm;
            const totalSec = Math.round(mins * 60);
            return `Word Count: ${count}\nEstimated Time: ${Math.floor(totalSec / 60)}m ${totalSec % 60}s\n(${wpm} WPM)`;
        }
        case "hashtags": {
            const topic = (v.topic || "topic").toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
            const root = topic.split(/\s+/).slice(0, 4);
            const hash = root.map(x => `#${x}`).join(" ");
            return `Title Ideas (${v.platform || "Platform"})\n- ${v.topic} explained simply\n- ${v.topic}: practical guide\n- ${v.topic} mistakes to avoid\n- ${v.topic} checklist for beginners\n\nHashtags\n${hash} #learn #guide #vibox`;
        }
        case "cleanup": {
            const cleaned = String(v.text || "")
                .replace(/\b(um+|uh+|like|you know|actually|basically)\b/gi, "")
                .replace(/\s{2,}/g, " ")
                .replace(/\n\s+/g, "\n")
                .trim();
            return `Cleaned Transcript\n\n${cleaned}`;
        }
        case "invoice": {
            const rows = parseLines(v.items).map(line => {
                const [item, qty, rate] = line.split(",").map(s => s.trim());
                const q = toNum(qty, 0);
                const r = toNum(rate, 0);
                return { item, q, r, total: q * r };
            });
            const subtotal = rows.reduce((s, r) => s + r.total, 0);
            const tax = subtotal * toNum(v.tax, 0) / 100;
            const total = subtotal + tax;
            const lines = rows.map(r => `${r.item}\t${r.q}\t${r.r.toFixed(2)}\t${r.total.toFixed(2)}`).join("\n");
            return `INVOICE\nBusiness: ${v.business || ""}\nClient: ${v.client || ""}\n\nItem\tQty\tRate\tTotal\n${lines}\n\nSubtotal: ${subtotal.toFixed(2)}\nTax: ${tax.toFixed(2)}\nGrand Total: ${total.toFixed(2)}`;
        }
        case "gst": {
            const amount = toNum(v.amount, 0);
            const rate = toNum(v.rate, 18);
            if ((v.inclusive || "Exclusive") === "Inclusive") {
                const base = amount / (1 + rate / 100);
                const tax = amount - base;
                return `Inclusive Price: ${amount.toFixed(2)}\nBase: ${base.toFixed(2)}\nTax: ${tax.toFixed(2)}`;
            }
            const tax = amount * rate / 100;
            return `Base: ${amount.toFixed(2)}\nTax: ${tax.toFixed(2)}\nTotal: ${(amount + tax).toFixed(2)}`;
        }
        case "quote": {
            return `QUOTATION\nClient: ${v.client || ""}\nScope: ${v.scope || ""}\nAmount: ${toNum(v.amount, 0).toFixed(2)}\nTimeline: ${toNum(v.days, 0)} days`;
        }
        case "margin": {
            const cost = toNum(v.cost, 0);
            const sell = toNum(v.sell, 0);
            const profit = sell - cost;
            const margin = sell ? (profit / sell) * 100 : 0;
            const markup = cost ? (profit / cost) * 100 : 0;
            return `Profit: ${profit.toFixed(2)}\nMargin: ${margin.toFixed(2)}%\nMarkup: ${markup.toFixed(2)}%`;
        }
        case "receipt": {
            const txt = String(v.text || "");
            const date = (txt.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/) || ["Not found"])[0];
            const total = (txt.match(/(?:total|amount|grand total)\s*[:\-]?\s*([\d,.]+)/i) || [null, "Not found"])[1];
            const lines = parseLines(txt).slice(0, 20);
            return `Receipt Parse Summary\nDate: ${date}\nTotal: ${total}\n\nTop Lines:\n${lines.join("\n")}`;
        }
        case "validator": {
            const tests = [
                ["PAN", /^[A-Z]{5}[0-9]{4}[A-Z]$/, (v.pan || "").toUpperCase()],
                ["Aadhaar", /^\d{12}$/, (v.aadhaar || "")],
                ["Passport", /^[A-Z][0-9]{7}$/, (v.passport || "").toUpperCase()],
                ["Email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, (v.email || "")],
                ["Phone", /^[6-9]\d{9}$/, (v.phone || "")]
            ];
            return tests.map(([name, rx, value]) => `${name}: ${rx.test(String(value)) ? "Valid" : "Invalid"}`).join("\n");
        }
        case "eligibility": {
            const age = toNum(v.age, 0);
            const minAge = toNum(v.minAge, 0);
            const maxAge = toNum(v.maxAge, 999);
            const income = toNum(v.income, 0);
            const minIncome = toNum(v.minIncome, 0);
            const ok = age >= minAge && age <= maxAge && income >= minIncome;
            return `Eligibility: ${ok ? "ELIGIBLE" : "NOT ELIGIBLE"}\nAge in range: ${age >= minAge && age <= maxAge}\nIncome criteria met: ${income >= minIncome}`;
        }
        case "macros": {
            const wt = toNum(v.weight, 70);
            const goal = v.goal || "Maintain";
            let cal = wt * 30;
            if (goal === "Fat Loss") cal -= 300;
            if (goal === "Muscle Gain") cal += 250;
            const p = wt * (goal === "Muscle Gain" ? 2.0 : 1.6);
            const f = wt * 0.8;
            const c = Math.max(0, (cal - (p * 4 + f * 9)) / 4);
            return `Daily Targets\nCalories: ${Math.round(cal)} kcal\nProtein: ${Math.round(p)} g\nFat: ${Math.round(f)} g\nCarbs: ${Math.round(c)} g`;
        }
        case "calorie": {
            const age = toNum(v.age, 28);
            const h = toNum(v.height, 170);
            const w = toNum(v.weight, 70);
            const male = (v.sex || "Male") === "Male";
            const bmr = male ? 10 * w + 6.25 * h - 5 * age + 5 : 10 * w + 6.25 * h - 5 * age - 161;
            const multMap = { Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725 };
            const tdee = bmr * (multMap[v.activity] || 1.55);
            return `BMR: ${Math.round(bmr)} kcal\nMaintenance (TDEE): ${Math.round(tdee)} kcal\nFat Loss: ${Math.round(tdee - 350)} kcal\nMuscle Gain: ${Math.round(tdee + 250)} kcal`;
        }
        case "interval": {
            const work = Math.max(1, Math.round(toNum(v.work, 40)));
            const rest = Math.max(1, Math.round(toNum(v.rest, 20)));
            const rounds = Math.max(1, Math.round(toNum(v.rounds, 8)));
            const rows = [];
            let sec = 0;
            for (let i = 1; i <= rounds; i++) {
                rows.push(`Round ${i}: WORK ${work}s (${toClock(sec)} -> ${toClock(sec + work)})`);
                sec += work;
                if (i < rounds) {
                    rows.push(`Round ${i}: REST ${rest}s (${toClock(sec)} -> ${toClock(sec + rest)})`);
                    sec += rest;
                }
            }
            rows.push(`Total Duration: ${toClock(sec)}`);
            return rows.join("\n");
        }
        case "habit": {
            const habits = parseCsvList(v.habits);
            const days = Math.max(1, Math.min(60, Math.round(toNum(v.days, 30))));
            const header = ["Habit", ...Array.from({ length: days }, (_, i) => `${i + 1}`)].join("\t");
            const body = habits.map(h => [h, ...Array.from({ length: days }, () => "-")].join("\t")).join("\n");
            return `${header}\n${body}`;
        }
        case "meal": {
            const calories = Math.max(500, Math.round(toNum(v.calories, 2200)));
            const meals = Math.max(1, Math.round(toNum(v.meals, 4)));
            const per = Math.round(calories / meals);
            return `Meal Plan (${v.pref})\nDaily Calories: ${calories}\nMeals: ${meals}\nApprox per meal: ${per} kcal\n\nTip: distribute protein evenly across meals.`;
        }
        case "sip": {
            const monthly = toNum(v.monthly, 0);
            const years = toNum(v.years, 0);
            const r = toNum(v.rate, 12) / 1200;
            const n = years * 12;
            const fv = monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
            return `Total Invested: ${(monthly * n).toFixed(2)}\nEstimated Value: ${fv.toFixed(2)}\nEstimated Gain: ${(fv - monthly * n).toFixed(2)}`;
        }
        case "emi": {
            const p = toNum(v.principal, 0);
            const r = toNum(v.rate, 10) / 1200;
            const n = Math.max(1, Math.round(toNum(v.months, 1)));
            const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            const total = emi * n;
            return `EMI: ${emi.toFixed(2)}\nTotal Payment: ${total.toFixed(2)}\nInterest: ${(total - p).toFixed(2)}`;
        }
        case "fd": {
            const p = toNum(v.principal, 0);
            const r = toNum(v.rate, 7) / 100;
            const t = toNum(v.years, 0);
            const n = Math.max(1, Math.round(toNum(v.freq, 4)));
            const a = p * Math.pow(1 + r / n, n * t);
            return `Maturity Value: ${a.toFixed(2)}\nInterest Earned: ${(a - p).toFixed(2)}`;
        }
        case "tax": {
            let taxable = Math.max(0, toNum(v.income, 0) - toNum(v.deductions, 0));
            const slabs = [
                [300000, 0], [700000, 0.05], [1000000, 0.1], [1200000, 0.15], [1500000, 0.2], [Infinity, 0.3]
            ];
            let prev = 0;
            let tax = 0;
            for (const [limit, rate] of slabs) {
                if (taxable <= prev) break;
                const chunk = Math.min(taxable, limit) - prev;
                tax += chunk * rate;
                prev = limit;
            }
            return `Taxable Income: ${taxable.toFixed(2)}\nEstimated Tax: ${tax.toFixed(2)}\nEffective Rate: ${(taxable ? (tax / taxable) * 100 : 0).toFixed(2)}%`;
        }
        case "budget": {
            const income = toNum(v.income, 0);
            const rows = parseLines(v.expenses).map(l => {
                const [name, amt] = l.split(",").map(s => s.trim());
                return { name, amt: toNum(amt, 0) };
            });
            const totalExp = rows.reduce((s, r) => s + r.amt, 0);
            const balance = income - totalExp;
            const list = rows.map(r => `- ${r.name}: ${r.amt.toFixed(2)}`).join("\n");
            return `Income: ${income.toFixed(2)}\nExpenses:\n${list}\nTotal Expenses: ${totalExp.toFixed(2)}\nBalance: ${balance.toFixed(2)}`;
        }
        case "debt": {
            const debts = parseLines(v.debts).map(line => {
                const [name, bal, rate, min] = line.split(",").map(s => s.trim());
                return { name, bal: toNum(bal, 0), rate: toNum(rate, 0), min: toNum(min, 0) };
            }).sort((a, b) => b.rate - a.rate);
            const extra = toNum(v.extra, 0);
            const lines = debts.map((d, i) => `${i + 1}. ${d.name} (${d.rate}%): Balance ${d.bal.toFixed(2)}, Min ${d.min.toFixed(2)}`);
            return `Debt Avalanche Order\n${lines.join("\n")}\n\nExtra Payment Focus: ${debts[0] ? debts[0].name : "N/A"}\nExtra Monthly: ${extra.toFixed(2)}`;
        }
        case "itinerary": {
            const days = Math.max(1, Math.round(toNum(v.days, 3)));
            const spots = parseCsvList(v.highlights);
            const out = [];
            for (let i = 0; i < days; i++) {
                const chunk = spots.filter((_, idx) => idx % days === i);
                out.push(`Day ${i + 1} (${v.destination || "Trip"}): ${chunk.join(", ") || "Free exploration"}`);
            }
            return out.join("\n");
        }
        case "packing": {
            const base = ["ID/Passport", "Phone Charger", "Toiletries", "Medicines", "Wallet", "Tickets"];
            const weatherMap = {
                Hot: ["Sunscreen", "Cap", "Light clothes"],
                Mild: ["Light jacket"],
                Cold: ["Warm jacket", "Gloves", "Thermals"],
                Rainy: ["Umbrella", "Raincoat", "Waterproof shoes"]
            };
            const typeMap = {
                Leisure: ["Camera", "Sunglasses"],
                Business: ["Laptop", "Formal wear", "Business cards"],
                Trek: ["Hiking shoes", "Water bottle", "First aid kit"]
            };
            const items = [...base, ...(weatherMap[v.weather] || []), ...(typeMap[v.type] || [])];
            return `Packing List (${v.type}, ${v.weather}, ${toNum(v.days, 1)} days)\n\n${items.map(i => `- [ ] ${i}`).join("\n")}`;
        }
        case "timezone": {
            const dt = v.base ? new Date(v.base) : new Date();
            const baseOffset = toNum(v.baseOffset, 0);
            const targets = parseCsvList(v.targets).map(x => toNum(x, 0));
            const utcMs = dt.getTime() - baseOffset * 3600000;
            const lines = targets.map(off => {
                const local = new Date(utcMs + off * 3600000);
                return `UTC${off >= 0 ? "+" : ""}${off}: ${local.toISOString().replace("T", " ").slice(0, 16)}`;
            });
            return `Base: UTC${baseOffset >= 0 ? "+" : ""}${baseOffset} -> ${dt.toISOString().replace("T", " ").slice(0, 16)}\n\n${lines.join("\n")}`;
        }
        case "visa": {
            const purpose = v.purpose || "Tourism";
            const core = [
                "Passport (6+ months validity)",
                "Visa application form",
                "Photographs as per specification",
                "Travel itinerary",
                "Accommodation proof",
                "Financial proof",
                "Travel insurance"
            ];
            if (purpose === "Business") core.push("Invitation letter", "Company cover letter");
            if (purpose === "Study") core.push("Admission letter", "Education transcripts");
            return `Visa Checklist: ${v.country || "Destination"} (${purpose})\n\n${core.map(i => `- [ ] ${i}`).join("\n")}`;
        }
        case "api": {
            const url = (v.url || "").trim();
            if (!url) return "Enter a valid URL.";
            const method = v.method || "GET";
            const init = { method };
            if (method === "POST" && (v.body || "").trim()) {
                init.headers = { "Content-Type": "application/json" };
                init.body = v.body;
            }
            try {
                const res = await fetch(url, init);
                const text = await res.text();
                let formatted = text;
                try {
                    formatted = JSON.stringify(JSON.parse(text), null, 2);
                } catch {
                    // keep text
                }
                return `Status: ${res.status} ${res.statusText}\n\n${formatted}`;
            } catch (err) {
                return `Request failed: ${err.message}\n\nTip: Some APIs block browser CORS requests.`;
            }
        }
        case "jwt": {
            const token = (v.token || "").trim();
            const parts = token.split(".");
            if (parts.length < 2) return "Invalid JWT format.";
            const decode = s => {
                const base64 = s.replace(/-/g, "+").replace(/_/g, "/");
                const pad = base64 + "=".repeat((4 - base64.length % 4) % 4);
                return decodeURIComponent(atob(pad).split("").map(c => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`).join(""));
            };
            try {
                const header = JSON.parse(decode(parts[0]));
                const payload = JSON.parse(decode(parts[1]));
                return `Header:\n${JSON.stringify(header, null, 2)}\n\nPayload:\n${JSON.stringify(payload, null, 2)}`;
            } catch {
                return "Could not decode JWT payload.";
            }
        }
        case "formatter": {
            const lang = v.lang || "json";
            const code = v.code || "";
            if (lang === "json") {
                try {
                    return JSON.stringify(JSON.parse(code), null, 2);
                } catch {
                    return "Invalid JSON.";
                }
            }
            if (lang === "javascript") return code.replace(/;\s*/g, ";\n").trim();
            if (lang === "css") return code.replace(/}\s*/g, "}\n").trim();
            return code.replace(/></g, ">\n<").trim();
        }
        case "mock": {
            const count = Math.max(1, Math.min(500, Math.round(toNum(v.count, 10))));
            const type = v.type || "users";
            const out = [];
            for (let i = 1; i <= count; i++) {
                if (type === "users") out.push({ id: i, name: `User ${i}`, email: `user${i}@example.com`, active: i % 2 === 0 });
                else if (type === "products") out.push({ id: i, sku: `SKU-${1000 + i}`, price: Number((Math.random() * 100).toFixed(2)), inStock: i % 3 !== 0 });
                else out.push({ id: i, orderNo: `ORD-${2000 + i}`, amount: Number((Math.random() * 500).toFixed(2)), status: ["new", "paid", "shipped"][i % 3] });
            }
            return JSON.stringify(out, null, 2);
        }
        case "quiz": {
            const count = Math.max(1, Math.min(30, Math.round(toNum(v.count, 5))));
            const topic = v.topic || "General";
            const qs = Array.from({ length: count }, (_, i) => `${i + 1}. ${topic} question ${i + 1}?\n   A) Option 1\n   B) Option 2\n   C) Option 3\n   D) Option 4\n   Answer: A`);
            return qs.join("\n\n");
        }
        case "worksheet": {
            const n = Math.max(1, Math.min(100, Math.round(toNum(v.count, 10))));
            const type = v.topic || "Addition";
            const lines = [];
            for (let i = 0; i < n; i++) {
                const a = 1 + Math.floor(Math.random() * 50);
                const b = 1 + Math.floor(Math.random() * 50);
                if (type === "Addition") lines.push(`${i + 1}. ${a} + ${b} = ____`);
                if (type === "Subtraction") lines.push(`${i + 1}. ${Math.max(a, b)} - ${Math.min(a, b)} = ____`);
                if (type === "Multiplication") lines.push(`${i + 1}. ${Math.floor(a / 2)} x ${Math.floor(b / 2)} = ____`);
                if (type === "Division") lines.push(`${i + 1}. ${a * b} / ${a} = ____`);
            }
            return lines.join("\n");
        }
        case "flashcards": {
            const topic = v.topic || "Topic";
            const terms = parseCsvList(v.terms);
            return terms.map((t, i) => `${i + 1}. Front: ${t}\n   Back: ${topic} definition for ${t}`).join("\n\n");
        }
        case "puzzle": {
            const ws = parseCsvList(v.words).map(w => w.toUpperCase());
            const scrambled = ws.map(w => w.split("").sort(() => Math.random() - 0.5).join(""));
            return ws.map((w, i) => `${i + 1}. ${scrambled[i]} (${w.length} letters)`).join("\n");
        }
        case "aim": {
            output.innerHTML = "";
            const box = el("div", { class: "aim-box" });
            const btn = el("button", { type: "button", class: "btn btn-primary" }, "Start Reaction Test");
            const target = el("button", { type: "button", class: "btn btn-secondary", style: "display:none;margin-top:12px;" }, "CLICK");
            const info = el("p", {}, "Click start and wait for CLICK prompt.");
            box.appendChild(btn);
            box.appendChild(target);
            box.appendChild(info);
            output.appendChild(box);
            let start = 0;
            btn.onclick = () => {
                info.textContent = "Wait for it...";
                target.style.display = "none";
                const delay = 800 + Math.random() * 2200;
                setTimeout(() => {
                    start = performance.now();
                    target.style.display = "inline-block";
                    info.textContent = "Click now!";
                }, delay);
            };
            target.onclick = () => {
                const ms = performance.now() - start;
                info.textContent = `Reaction Time: ${ms.toFixed(0)} ms`;
                target.style.display = "none";
            };
            return null;
        }
        case "sensitivity": {
            const fromDpi = toNum(v.fromDpi, 800);
            const fromSens = toNum(v.fromSens, 1);
            const toDpi = toNum(v.toDpi, 1600);
            const edpi = fromDpi * fromSens;
            const toSens = edpi / toDpi;
            return `Source eDPI: ${edpi.toFixed(3)}\nTarget Sensitivity: ${toSens.toFixed(3)}`;
        }
        case "bracket": {
            const players = parseLines(v.players);
            const size = Math.pow(2, Math.ceil(Math.log2(Math.max(2, players.length))));
            while (players.length < size) players.push("BYE");
            const pairs = [];
            for (let i = 0; i < players.length; i += 2) {
                pairs.push(`Match ${i / 2 + 1}: ${players[i]} vs ${players[i + 1]}`);
            }
            return `Tournament Bracket (${size} slots)\n\n${pairs.join("\n")}`;
        }
        case "hindi": {
            return translitEnToHi(v.text || "");
        }
        case "translit": {
            return v.dir === "hi-en" ? translitHiToEn(v.text || "") : translitEnToHi(v.text || "");
        }
        case "imageOcr": {
            const file = v.image;
            if (!(file instanceof File)) {
                return "Select an image file first.";
            }
            const lang = v.lang || "eng";
            output.innerHTML = "<pre>Loading OCR engine...</pre>";
            try {
                await loadScriptOnce("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js", () => !!window.Tesseract);
                const result = await window.Tesseract.recognize(file, lang, {
                    logger: (m) => {
                        if (!m || !m.status) return;
                        const pct = typeof m.progress === "number" ? ` ${Math.round(m.progress * 100)}%` : "";
                        output.innerHTML = `<pre>${m.status}${pct}</pre>`;
                    }
                });
                const text = (result && result.data && result.data.text ? result.data.text : "").trim();
                return text ? `Detected Text\n\n${text}` : "No text detected. Try a clearer image.";
            } catch (err) {
                return `OCR failed: ${err.message || err}`;
            }
        }
        case "pdfOcr": {
            const file = v.pdf;
            if (!(file instanceof File)) {
                return "Select a PDF file first.";
            }
            const lang = v.lang || "eng";
            const maxPages = Math.max(1, Math.min(10, Math.round(toNum(v.maxPages, 3))));
            output.innerHTML = "<pre>Loading PDF engine...</pre>";
            try {
                await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", () => !!window.pdfjsLib);
                if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                }
                const buffer = await file.arrayBuffer();
                const doc = await window.pdfjsLib.getDocument({ data: buffer }).promise;
                const pages = Math.min(doc.numPages, maxPages);
                const chunks = [];
                const ocrPages = [];

                for (let i = 1; i <= pages; i++) {
                    output.innerHTML = `<pre>Scanning page ${i}/${pages}...</pre>`;
                    const page = await doc.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(it => it.str).join(" ").replace(/\s+/g, " ").trim();
                    if (pageText.length >= 24) {
                        chunks.push(`--- Page ${i} ---\n${pageText}`);
                    } else {
                        ocrPages.push(i);
                    }
                }

                if (ocrPages.length) {
                    output.innerHTML = `<pre>Running OCR on ${ocrPages.length} scanned page(s)...</pre>`;
                    await loadScriptOnce("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js", () => !!window.Tesseract);
                    for (let idx = 0; idx < ocrPages.length; idx++) {
                        const pageNo = ocrPages[idx];
                        output.innerHTML = `<pre>OCR page ${pageNo} (${idx + 1}/${ocrPages.length})...</pre>`;
                        const page = await doc.getPage(pageNo);
                        const viewport = page.getViewport({ scale: 1.6 });
                        const canvas = document.createElement("canvas");
                        canvas.width = Math.ceil(viewport.width);
                        canvas.height = Math.ceil(viewport.height);
                        const ctx = canvas.getContext("2d");
                        await page.render({ canvasContext: ctx, viewport }).promise;
                        const result = await window.Tesseract.recognize(canvas, lang);
                        const text = (result && result.data && result.data.text ? result.data.text : "").replace(/\s+\n/g, "\n").trim();
                        chunks.push(`--- Page ${pageNo} (OCR) ---\n${text || "[No text detected]"}`);
                    }
                }

                return chunks.length ? chunks.join("\n\n") : "No readable text found in selected pages.";
            } catch (err) {
                return `PDF OCR failed: ${err.message || err}`;
            }
        }
        case "videoMp3": {
            const file = v.video;
            if (!(file instanceof File)) {
                return "Select a video file first.";
            }
            const bitrate = Math.round(clamp(toNum(v.bitrate, 128), 64, 320));
            let audioCtx = null;
            output.innerHTML = "<pre>Loading MP3 encoder...</pre>";
            try {
                await loadScriptOnce("https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js", () => !!window.lamejs);
                const Ctx = window.AudioContext || window.webkitAudioContext;
                if (!Ctx) return "Audio conversion is not supported in this browser.";
                audioCtx = new Ctx();

                output.innerHTML = "<pre>Decoding audio track...</pre>";
                const buffer = await file.arrayBuffer();
                const decoded = await audioCtx.decodeAudioData(buffer.slice(0));
                const channels = Math.min(2, decoded.numberOfChannels);
                const encoder = new window.lamejs.Mp3Encoder(channels, decoded.sampleRate, bitrate);
                const left = floatToInt16(decoded.getChannelData(0));
                const right = channels === 2 ? floatToInt16(decoded.getChannelData(1)) : null;
                const blockSize = 1152;
                const chunks = [];

                for (let i = 0; i < left.length; i += blockSize) {
                    const lChunk = left.subarray(i, i + blockSize);
                    let encoded;
                    if (channels === 2) {
                        const rChunk = right.subarray(i, i + blockSize);
                        encoded = encoder.encodeBuffer(lChunk, rChunk);
                    } else {
                        encoded = encoder.encodeBuffer(lChunk);
                    }
                    if (encoded.length) chunks.push(new Uint8Array(encoded));
                    if (i % (blockSize * 120) === 0) {
                        const pct = Math.round((i / left.length) * 100);
                        output.innerHTML = `<pre>Encoding MP3... ${pct}%</pre>`;
                    }
                }
                const flush = encoder.flush();
                if (flush.length) chunks.push(new Uint8Array(flush));

                const blob = new Blob(chunks, { type: "audio/mpeg" });
                const baseName = file.name.replace(/\.[^.]+$/, "") || "audio";
                const href = URL.createObjectURL(blob);
                const wrap = el("div", { class: "speech-wrap" });
                const info = el("p", {}, `Conversion complete. Output size: ${(blob.size / (1024 * 1024)).toFixed(2)} MB`);
                const dl = el("a", { href, download: `${baseName}.mp3`, class: "btn btn-primary" }, "Download MP3");
                wrap.appendChild(info);
                wrap.appendChild(dl);
                output.innerHTML = "";
                output.appendChild(wrap);
                setTimeout(() => URL.revokeObjectURL(href), 120000);
                return null;
            } catch (err) {
                return `Video conversion failed: ${err.message || err}`;
            } finally {
                if (audioCtx && typeof audioCtx.close === "function") {
                    try {
                        await audioCtx.close();
                    } catch {
                        // ignore close errors
                    }
                }
            }
        }
        case "grammar": {
            const text = String(v.text || "").trim();
            if (!text) return "Paste text to run grammar checks.";
            const sentences = (text.match(/[^.!?]+[.!?]*/g) || []).map(s => s.trim()).filter(Boolean);
            const issueLines = [];
            const repeats = [...text.matchAll(/\b([a-zA-Z]{2,})\s+\1\b/gi)].slice(0, 12);
            repeats.forEach(m => issueLines.push(`Repeated word: \"${m[0]}\"`));
            sentences.forEach((s, idx) => {
                if (/^[a-z]/.test(s)) issueLines.push(`Sentence ${idx + 1} starts with lowercase.`);
                if (!/[.!?]["')\]]?$/.test(s)) issueLines.push(`Sentence ${idx + 1} may need ending punctuation.`);
                const wc = words(s).length;
                if (wc > 32) issueLines.push(`Sentence ${idx + 1} is long (${wc} words). Consider splitting it.`);
            });
            const cleaned = text
                .replace(/\s+([,.!?;:])/g, "$1")
                .replace(/\bi\b/g, "I")
                .replace(/\s{2,}/g, " ")
                .trim();
            const wc = words(text).length;
            const avg = sentences.length ? wc / sentences.length : wc;
            return `Grammar Check Summary\nWords: ${wc}\nSentences: ${sentences.length}\nAverage Words/Sentence: ${avg.toFixed(1)}\n\nIssues Found:\n- ${issueLines.join("\n- ") || "No major issues detected."}\n\nCleaned Draft:\n${cleaned}`;
        }
        case "aiDetector": {
            const text = String(v.text || "").trim();
            if (!text) return "Paste text to estimate AI-likeness.";
            const tokenList = words(text);
            const sentenceList = (text.match(/[^.!?]+[.!?]*/g) || []).map(s => s.trim()).filter(Boolean);
            const lengths = sentenceList.map(s => words(s).length).filter(Boolean);
            const avgLen = lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : tokenList.length;
            const variance = lengths.length ? lengths.reduce((acc, n) => acc + Math.pow(n - avgLen, 2), 0) / lengths.length : 0;
            const burst = avgLen ? (Math.sqrt(variance) / avgLen) * 100 : 0;
            const uniqueRatio = tokenList.length ? (new Set(tokenList).size / tokenList.length) : 0;
            const contractions = (text.match(/\b[a-z]+('[a-z]+)\b/gi) || []).length;
            const transitions = (text.match(/\b(however|moreover|therefore|furthermore|additionally|overall|in conclusion)\b/gi) || []).length;

            let score = 50;
            if (uniqueRatio < 0.45) score += 16;
            if (burst < 32) score += 14;
            if (avgLen > 24) score += 10;
            if (contractions === 0) score += 8;
            if (transitions >= 3) score += 8;
            if (uniqueRatio > 0.58) score -= 12;
            if (burst > 55) score -= 10;
            if (contractions > Math.max(2, Math.floor(sentenceList.length / 3))) score -= 8;
            score = Math.round(clamp(score, 1, 99));

            let label = "Mixed pattern";
            if (score >= 70) label = "Likely AI-like pattern";
            if (score < 45) label = "Likely human-like pattern";

            return `AI Writing Heuristic\nScore: ${score}/100\nAssessment: ${label}\n\nSignals:\n- Vocabulary diversity: ${(uniqueRatio * 100).toFixed(1)}%\n- Sentence burstiness: ${burst.toFixed(1)}\n- Avg sentence length: ${avgLen.toFixed(1)} words\n- Contractions: ${contractions}\n\nNote: This is a heuristic estimate, not a definitive detector.`;
        }
        case "expenseTracker": {
            const income = toNum(v.income, 0);
            const rows = parseLines(v.entries).map(line => {
                const parts = line.split(",");
                const date = (parts[0] || "").trim() || "N/A";
                const category = (parts[1] || "Other").trim() || "Other";
                const amount = toNum((parts[2] || "").replace(/[^0-9.-]/g, ""), 0);
                const note = parts.slice(3).join(",").trim();
                return { date, category, amount, note };
            }).filter(r => r.amount > 0);
            if (!rows.length) {
                return "Add expense rows in the format: date,category,amount,note";
            }
            const totalSpend = rows.reduce((sum, r) => sum + r.amount, 0);
            const byCategory = new Map();
            rows.forEach(r => {
                byCategory.set(r.category, (byCategory.get(r.category) || 0) + r.amount);
            });
            const sortedCats = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);
            const balance = income - totalSpend;
            const categoryLines = sortedCats.map(([cat, amount]) => `- ${cat}: ${amount.toFixed(2)}`);
            const topRows = rows.slice(-5).map(r => `- ${r.date} | ${r.category} | ${r.amount.toFixed(2)}${r.note ? ` | ${r.note}` : ""}`);
            return `Expense Summary\nEntries: ${rows.length}\nTotal Spend: ${totalSpend.toFixed(2)}\nMonthly Income: ${income.toFixed(2)}\nBalance: ${balance.toFixed(2)}\n\nCategory Breakdown:\n${categoryLines.join("\n")}\n\nRecent Entries:\n${topRows.join("\n")}`;
        }
        case "timeDiff": {
            if (!v.start || !v.end) {
                return "Select both start and end date/time values.";
            }
            const startOffset = toNum(v.startOffset, 0);
            const endOffset = toNum(v.endOffset, 0);
            const startMs = new Date(v.start).getTime();
            const endMs = new Date(v.end).getTime();
            if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
                return "Invalid date/time input.";
            }
            const startUtc = startMs - startOffset * 3600000;
            const endUtc = endMs - endOffset * 3600000;
            const diffMs = endUtc - startUtc;
            const absMs = Math.abs(diffMs);
            const totalSec = Math.floor(absMs / 1000);
            const days = Math.floor(totalSec / 86400);
            const hours = Math.floor((totalSec % 86400) / 3600);
            const mins = Math.floor((totalSec % 3600) / 60);
            const secs = totalSec % 60;
            const relation = diffMs >= 0 ? "End is after start" : "Start is after end";
            return `Time Difference\n${relation}\n\nDuration: ${days}d ${hours}h ${mins}m ${secs}s\nHours Total: ${(absMs / 3600000).toFixed(2)}\nMinutes Total: ${(absMs / 60000).toFixed(2)}\n\nStart (UTC): ${new Date(startUtc).toISOString()}\nEnd (UTC): ${new Date(endUtc).toISOString()}`;
        }
        case "tripCost": {
            const distance = Math.max(0, toNum(v.distance, 0));
            const mileage = Math.max(0.1, toNum(v.mileage, 16));
            const fuelPrice = Math.max(0, toNum(v.fuelPrice, 0));
            const tolls = Math.max(0, toNum(v.tolls, 0));
            const parking = Math.max(0, toNum(v.parking, 0));
            const days = Math.max(1, Math.round(toNum(v.days, 1)));
            const travelers = Math.max(1, Math.round(toNum(v.travelers, 1)));
            const stayPerNight = Math.max(0, toNum(v.stayPerNight, 0));
            const foodPerPerson = Math.max(0, toNum(v.foodPerPerson, 0));
            const activities = Math.max(0, toNum(v.activities, 0));
            const misc = Math.max(0, toNum(v.misc, 0));

            const liters = distance / mileage;
            const fuelCost = liters * fuelPrice;
            const stayCost = Math.max(0, days - 1) * stayPerNight;
            const foodCost = days * travelers * foodPerPerson;
            const roadCost = tolls + parking;
            const total = fuelCost + stayCost + foodCost + roadCost + activities + misc;
            const perPerson = total / travelers;

            return `Trip Cost Estimate\nDistance: ${distance.toFixed(1)} km\nFuel Needed: ${liters.toFixed(2)} L\n\nFuel: ${fuelCost.toFixed(2)}\nTolls + Parking: ${roadCost.toFixed(2)}\nStay: ${stayCost.toFixed(2)}\nFood: ${foodCost.toFixed(2)}\nActivities: ${activities.toFixed(2)}\nMisc: ${misc.toFixed(2)}\n\nTotal Trip Cost: ${total.toFixed(2)}\nPer Traveler: ${perPerson.toFixed(2)}`;
        }
        case "fuelCost": {
            const distance = Math.max(0, toNum(v.distance, 0));
            const mileage = Math.max(0.1, toNum(v.mileage, 1));
            const fuelPrice = Math.max(0, toNum(v.fuelPrice, 0));
            const passengers = Math.max(1, Math.round(toNum(v.passengers, 1)));
            const liters = distance / mileage;
            const total = liters * fuelPrice;
            const perKm = distance ? total / distance : 0;
            const perPerson = total / passengers;
            return `Fuel Cost Summary\nDistance: ${distance.toFixed(2)} km\nMileage: ${mileage.toFixed(2)} km/l\nFuel Needed: ${liters.toFixed(2)} L\nTotal Fuel Cost: ${total.toFixed(2)}\nCost per KM: ${perKm.toFixed(2)}\nCost per Passenger: ${perPerson.toFixed(2)}`;
        }
        case "speech": {
            output.innerHTML = "";
            const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!Speech) {
                output.innerHTML = "<pre>Speech recognition is not supported in this browser.</pre>";
                return null;
            }
            const wrap = el("div", { class: "speech-wrap" });
            const startBtn = el("button", { type: "button", class: "btn btn-primary" }, "Start Recording");
            const stopBtn = el("button", { type: "button", class: "btn btn-secondary" }, "Stop");
            const txt = el("textarea", { rows: "8", style: "margin-top:12px;width:100%;" });
            txt.placeholder = "Transcript will appear here...";
            const rec = new Speech();
            rec.continuous = true;
            rec.interimResults = true;
            rec.lang = "en-IN";
            rec.onresult = (ev) => {
                let finalText = "";
                for (let i = 0; i < ev.results.length; i++) {
                    finalText += ev.results[i][0].transcript + " ";
                }
                txt.value = finalText.trim();
            };
            startBtn.onclick = () => rec.start();
            stopBtn.onclick = () => rec.stop();
            wrap.appendChild(startBtn);
            wrap.appendChild(stopBtn);
            wrap.appendChild(txt);
            output.appendChild(wrap);
            return null;
        }
        default:
            return "Tool is ready. Add input and click Run Tool.";
    }
}

function toClock(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function toSrtTime(totalSec) {
    const sec = Math.max(0, Math.floor(totalSec));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},000`;
}

function init() {
    const toolId = document.body.dataset.toolId;
    const def = TOOL_DEFS[toolId];
    const title = document.getElementById("tool-name");
    const desc = document.getElementById("tool-description");
    const categoryLink = document.getElementById("category-link");

    if (title) title.textContent = document.body.dataset.toolName || "Tool";
    if (desc) desc.textContent = document.body.dataset.toolDescription || "";
    if (categoryLink) {
        categoryLink.href = document.body.dataset.toolCategoryUrl || "../../tools/index.html";
        categoryLink.textContent = `Back to ${document.body.dataset.toolCategory || "Tools"}`;
    }

    if (!def) {
        document.getElementById("tool-app").innerHTML = "<p>This tool configuration was not found.</p>";
        return;
    }
    renderForm(toolId, def);
}

document.addEventListener("DOMContentLoaded", init);
