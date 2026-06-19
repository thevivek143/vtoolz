# Vibox - Secure, Client-Side Utilities

Vibox is a collection of 150+ web utilities that run entirely in your browser, plus a searchable AI-tool directory and browser games. Files processed by Vibox utilities stay on your device.

## 🔒 Privacy Promise
- **100% Client-Side**: All processing (PDF merging, Image compression, etc.) happens on your device.
- **No Uploads**: Your files never leave your computer.
- **Local Workspace**: Favorites, recents, collections, pipelines, presets, and preferences stay in browser storage.
- **Offline Capable**: Works without an internet connection once loaded.

## 🛠️ Features
- **PDF Tools**: Merge, Split, Convert, Rotate, and more.
- **Image Tools**: Compress, Resize, Crop, Convert, Filters.
- **Text Tools**: Word Count, Case Converter, Sort, Clean.
- **Developer Tools**: JSON Formatter, Base64, Hashing, Regex.
- **Security**: Password Generator, Strength Checker.

## 🧱 CSP Tightening Roadmap

The project currently uses an allowlist CSP with `'unsafe-inline'` / `'unsafe-eval'` for compatibility across many tools.
This roadmap hardens CSP in safe, staged steps without breaking tools:

### Phase 1 (Immediate)
- Keep functionality stable, but standardize CSP policy text across pages.
- Remove shortcut conflicts and avoid adding new inline handlers/styles.
- Track pages still using inline `style="..."`, `on*=` attributes, or eval-dependent libs.

### Phase 2 (Migration)
- Move inline styles into CSS classes and component utilities.
- Replace inline event handlers (`onclick`, `onload`, etc.) with `addEventListener` in JS modules.
- Reduce third-party CDN dependencies where possible (self-host critical assets).

### Phase 3 (Hardening)
- Remove `'unsafe-eval'` first (after validating vendor bundles).
- Remove `'unsafe-inline'` from `script-src` after handler migration.
- Introduce nonce/hash-based policy for any remaining unavoidable inline script.

### Phase 4 (Strict CSP)
- Enforce strict CSP for `script-src` and tighter `connect-src` / `font-src` / `img-src` scopes.
- Add CSP validation in CI to prevent regressions.

