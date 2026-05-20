# Vibox AI Hub Data

AI Hub is built to support a small curated list or a large licensed directory.

## Current Data

- `data/tools.json` contains the current curated tools.
- `app.js` first tries to load `data/tools-manifest.json`.
- If no manifest is available, it falls back to `data/tools.json`.

## Import A Large Dataset

Use only datasets you own, created yourself, or are licensed to republish.

```bash
node ai-hub/scripts/import-tools.mjs path/to/ai-tools.csv --chunk-size 500
```

or:

```bash
node ai-hub/scripts/import-tools.mjs path/to/ai-tools.json --chunk-size 500
```

The importer writes:

- `data/tools/chunk-000.json`
- `data/tools/chunk-001.json`
- `data/tools-manifest.json`

## Supported Fields

`name`, `url`, `desc`, `category`, `subcat`, `price`, `tags`, `tagline`, `longDesc`, `pros`, `cons`, `features`, `bestFor`, `logo`, `isTrending`, `isLatest`

For CSV files, list-like fields such as `tags`, `pros`, `cons`, and `features` can use commas, semicolons, or pipes.
