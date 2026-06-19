import { tools } from './tools.js';

const STORE_KEY = 'vibox-workspace-v1';
const DEFAULT_STATE = {
    favorites: [],
    collections: [{ id: 'quick-kit', name: 'My quick kit', tools: [] }],
    pipelines: [],
    settings: { reducedMotion: false, highContrast: false, largeControls: false }
};

const PIPELINE_TEMPLATES = [
    { name: 'Polish a PDF', steps: ['pdf-merge', 'pdf-compress', 'pdf-watermark'] },
    { name: 'Prepare an image', steps: ['img-crop', 'img-resize', 'img-compress'] },
    { name: 'Publish text', steps: ['txt-counter', 'txt-case', 'txt-diff'] },
    { name: 'Developer check', steps: ['dev-json', 'dev-base64', 'dev-hash'] }
];

function cloneDefault() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function readState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
        return {
            ...cloneDefault(),
            ...saved,
            settings: { ...DEFAULT_STATE.settings, ...(saved.settings || {}) },
            collections: Array.isArray(saved.collections) ? saved.collections : cloneDefault().collections,
            favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
            pipelines: Array.isArray(saved.pipelines) ? saved.pipelines : []
        };
    } catch {
        return cloneDefault();
    }
}

function writeState(state) {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('vibox:workspace-change', { detail: state }));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
}

function toolById(id) {
    return tools.find(tool => tool.id === id);
}

function rootUrl(relativePath = '') {
    const manifest = document.querySelector('link[rel="manifest"]');
    const base = manifest ? new URL('./', manifest.href) : new URL('/', location.href);
    return new URL(relativePath, base).href;
}

function download(name, content, type = 'application/json') {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function encodePreset(value) {
    const bytes = new TextEncoder().encode(JSON.stringify(value));
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodePreset(value) {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0))));
}

export class ViboxWorkspace {
    constructor() {
        this.state = readState();
        this.activeTab = 'home';
        this.fileSuggestions = [];
        this.init();
    }

    init() {
        if (document.getElementById('vibox-workspace')) return;
        this.importSharedPreset();
        this.applySettings();
        this.renderShell();
        this.bindGlobalEvents();
        this.decorateToolCards();
        this.cardObserver = new MutationObserver(() => this.decorateToolCards());
        this.cardObserver.observe(document.body, { childList: true, subtree: true });
        this.showPipelineProgress();
    }

    importSharedPreset() {
        const encoded = new URLSearchParams(location.search).get('vibox');
        if (!encoded) return;
        try {
            const preset = decodePreset(encoded);
            if (preset && Array.isArray(preset.tools)) {
                const name = String(preset.name || 'Shared collection').slice(0, 60);
                const validTools = preset.tools.filter(id => toolById(id));
                this.state.collections = this.state.collections.filter(item => item.id !== 'shared');
                this.state.collections.unshift({ id: 'shared', name, tools: validTools });
                writeState(this.state);
                history.replaceState({}, '', location.pathname + location.hash);
                setTimeout(() => window.Utils?.showToast?.(`Imported “${name}” locally.`, 'success'), 300);
            }
        } catch {
            setTimeout(() => window.Utils?.showToast?.('That Vibox preset is invalid.', 'error'), 300);
        }
    }

    applySettings() {
        document.documentElement.classList.toggle('vibox-reduced-motion', this.state.settings.reducedMotion);
        document.documentElement.classList.toggle('vibox-high-contrast', this.state.settings.highContrast);
        document.documentElement.classList.toggle('vibox-large-controls', this.state.settings.largeControls);
    }

    renderShell() {
        const shell = document.createElement('div');
        shell.id = 'vibox-workspace';
        shell.innerHTML = `
            <button class="workspace-launcher" type="button" aria-haspopup="dialog" aria-controls="workspace-panel">
                <i class="fas fa-layer-group" aria-hidden="true"></i>
                <span>Workspace</span>
                <span class="workspace-count" aria-label="favorite count">${this.state.favorites.length}</span>
            </button>
            <div class="workspace-backdrop" hidden></div>
            <aside id="workspace-panel" class="workspace-panel" role="dialog" aria-modal="true" aria-label="Vibox workspace" aria-hidden="true">
                <header class="workspace-header">
                    <div><span class="workspace-eyebrow">LOCAL WORKSPACE</span><h2>Make Vibox yours</h2></div>
                    <button class="workspace-close" type="button" aria-label="Close workspace"><i class="fas fa-times"></i></button>
                </header>
                <nav class="workspace-tabs" aria-label="Workspace sections">
                    ${[['home','Dashboard'],['pipelines','Pipelines'],['offline','Offline'],['settings','Settings']].map(([id, label]) => `<button type="button" data-workspace-tab="${id}" class="${id === 'home' ? 'active' : ''}">${label}</button>`).join('')}
                </nav>
                <div class="workspace-content" tabindex="-1"></div>
            </aside>`;
        document.body.appendChild(shell);
        this.shell = shell;
        this.renderContent();
    }

    bindGlobalEvents() {
        this.shell.querySelector('.workspace-launcher').addEventListener('click', () => this.open());
        this.shell.querySelector('.workspace-close').addEventListener('click', () => this.close());
        this.shell.querySelector('.workspace-backdrop').addEventListener('click', () => this.close());
        this.shell.querySelector('.workspace-tabs').addEventListener('click', event => {
            const button = event.target.closest('[data-workspace-tab]');
            if (!button) return;
            this.activeTab = button.dataset.workspaceTab;
            this.shell.querySelectorAll('[data-workspace-tab]').forEach(tab => tab.classList.toggle('active', tab === button));
            this.renderContent();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && this.isOpen()) this.close();
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'w') {
                event.preventDefault();
                this.isOpen() ? this.close() : this.open();
            }
        });
        document.addEventListener('dragover', event => {
            if (event.dataTransfer?.types?.includes('Files')) document.body.classList.add('vibox-file-dragging');
        });
        document.addEventListener('dragleave', event => {
            if (!event.relatedTarget) document.body.classList.remove('vibox-file-dragging');
        });
        document.addEventListener('drop', event => {
            document.body.classList.remove('vibox-file-dragging');
            const files = [...(event.dataTransfer?.files || [])];
            if (!files.length || event.target.closest('input, textarea, [data-accept-drop]')) return;
            event.preventDefault();
            this.routeFiles(files);
        });
        window.addEventListener('vibox:workspace-change', event => {
            this.state = event.detail;
            this.applySettings();
            this.updateCount();
            this.decorateToolCards();
            if (this.isOpen()) this.renderContent();
        });
    }

    isOpen() {
        return this.shell.querySelector('.workspace-panel').getAttribute('aria-hidden') === 'false';
    }

    open(tab = this.activeTab) {
        this.activeTab = tab;
        this.shell.querySelectorAll('[data-workspace-tab]').forEach(button => button.classList.toggle('active', button.dataset.workspaceTab === tab));
        this.renderContent();
        this.shell.querySelector('.workspace-backdrop').hidden = false;
        this.shell.querySelector('.workspace-panel').setAttribute('aria-hidden', 'false');
        document.body.classList.add('workspace-open');
        this.shell.querySelector('.workspace-close').focus();
    }

    close() {
        this.shell.querySelector('.workspace-backdrop').hidden = true;
        this.shell.querySelector('.workspace-panel').setAttribute('aria-hidden', 'true');
        document.body.classList.remove('workspace-open');
        this.shell.querySelector('.workspace-launcher').focus();
    }

    updateCount() {
        this.shell.querySelector('.workspace-count').textContent = this.state.favorites.length;
    }

    routeFiles(files) {
        const extensions = [...new Set(files.map(file => file.name.split('.').pop().toLowerCase()))];
        const map = {
            pdf: ['pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-watermark'],
            jpg: ['img-compress', 'img-resize', 'img-crop', 'pdf-conv-pdf'],
            jpeg: ['img-compress', 'img-resize', 'img-crop', 'pdf-conv-pdf'],
            png: ['img-compress', 'img-resize', 'img-crop', 'img-color'],
            webp: ['img-compress', 'img-resize', 'img-convert'],
            json: ['dev-json', 'dev-base64', 'txt-diff'],
            txt: ['txt-counter', 'txt-case', 'txt-diff'],
            docx: ['word-to-pdf', 'office-word'],
            xlsx: ['excel-to-pdf', 'office-excel'],
            zip: ['dev-zip'], mp3: ['util-audio'], wav: ['util-audio'], mp4: ['next-video-to-mp3-converter']
        };
        this.fileSuggestions = [...new Set(extensions.flatMap(extension => map[extension] || []))].map(toolById).filter(Boolean);
        this.activeTab = 'home';
        this.open('home');
        window.Utils?.showToast?.(`Found ${this.fileSuggestions.length} local tool suggestions for ${files.length} file${files.length === 1 ? '' : 's'}.`, 'info');
    }

    renderContent() {
        const content = this.shell.querySelector('.workspace-content');
        if (this.activeTab === 'pipelines') this.renderPipelines(content);
        else if (this.activeTab === 'offline') this.renderOffline(content);
        else if (this.activeTab === 'settings') this.renderSettings(content);
        else this.renderDashboard(content);
    }

    toolRows(ids, emptyText) {
        const rows = ids.map(toolById).filter(Boolean).map(tool => `
            <a class="workspace-tool-row" href="${rootUrl(tool.url)}">
                <i class="${tool.icon}" style="color:${tool.color}" aria-hidden="true"></i>
                <span><strong>${escapeHtml(tool.name)}</strong><small>${escapeHtml(tool.description)}</small></span>
                <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>`).join('');
        return rows || `<p class="workspace-empty">${escapeHtml(emptyText)}</p>`;
    }

    renderDashboard(content) {
        const recent = (() => { try { return JSON.parse(localStorage.getItem('recentTools') || '[]'); } catch { return []; } })();
        content.innerHTML = `
            ${this.fileSuggestions.length ? `<section><div class="workspace-section-title"><h3>Recommended for your files</h3><button data-clear-suggestions>Clear</button></div>${this.toolRows(this.fileSuggestions.map(tool => tool.id), '')}</section>` : ''}
            <section><div class="workspace-section-title"><h3>Favorites</h3><span>${this.state.favorites.length}</span></div>${this.toolRows(this.state.favorites, 'Use the heart on any tool card to pin it here.')}</section>
            <section><div class="workspace-section-title"><h3>Recently used</h3><button data-clear-recent>Clear</button></div>${this.toolRows(recent.slice(0, 6), 'Tools you open will appear here.')}</section>
            <section><div class="workspace-section-title"><h3>Collections</h3><button data-new-collection>New</button></div>
                <div class="workspace-collections">${this.state.collections.map(collection => `<button type="button" data-collection="${escapeHtml(collection.id)}"><i class="fas fa-folder"></i><span>${escapeHtml(collection.name)}</span><small>${collection.tools.length} tools</small></button>`).join('')}</div>
            </section>`;
        content.querySelector('[data-clear-suggestions]')?.addEventListener('click', () => { this.fileSuggestions = []; this.renderDashboard(content); });
        content.querySelector('[data-clear-recent]')?.addEventListener('click', () => { localStorage.removeItem('recentTools'); this.renderDashboard(content); });
        content.querySelector('[data-new-collection]')?.addEventListener('click', () => this.createCollection());
        content.querySelectorAll('[data-collection]').forEach(button => button.addEventListener('click', () => this.renderCollection(content, button.dataset.collection)));
    }

    renderCollection(content, id) {
        const collection = this.state.collections.find(item => item.id === id);
        if (!collection) return;
        content.innerHTML = `<button class="workspace-back" type="button"><i class="fas fa-arrow-left"></i> Dashboard</button>
            <div class="workspace-section-title"><h3>${escapeHtml(collection.name)}</h3><button data-share-collection>Share preset</button></div>
            ${this.toolRows(collection.tools, 'This collection is empty. Add favorites from any tool card.')}
            <div class="workspace-action-row"><button data-fill-favorites>Add all favorites</button><button data-delete-collection class="danger">Delete</button></div>`;
        content.querySelector('.workspace-back').addEventListener('click', () => this.renderDashboard(content));
        content.querySelector('[data-fill-favorites]').addEventListener('click', () => {
            collection.tools = [...new Set([...collection.tools, ...this.state.favorites])]; writeState(this.state);
        });
        content.querySelector('[data-share-collection]').addEventListener('click', async () => {
            const url = new URL(rootUrl('index.html'));
            url.searchParams.set('vibox', encodePreset({ name: collection.name, tools: collection.tools }));
            try { await navigator.clipboard.writeText(url.href); window.Utils?.showToast?.('Private preset link copied. No files are included.', 'success'); }
            catch { window.prompt('Copy this preset link:', url.href); }
        });
        content.querySelector('[data-delete-collection]').addEventListener('click', () => {
            this.state.collections = this.state.collections.filter(item => item.id !== id);
            if (!this.state.collections.length) this.state.collections = cloneDefault().collections;
            writeState(this.state);
        });
    }

    createCollection() {
        const name = window.prompt('Collection name');
        if (!name?.trim()) return;
        this.state.collections.push({ id: `collection-${Date.now()}`, name: name.trim().slice(0, 60), tools: [] });
        writeState(this.state);
    }

    renderPipelines(content) {
        const templates = [...PIPELINE_TEMPLATES, ...this.state.pipelines];
        content.innerHTML = `<p class="workspace-intro">Open a sequence of compatible tools. Outputs stay on your device; Vibox remembers only which step comes next.</p>
            <div class="workspace-pipelines">${templates.map((pipeline, index) => `<article><div><h3>${escapeHtml(pipeline.name)}</h3><p>${pipeline.steps.map(id => toolById(id)?.name).filter(Boolean).map(escapeHtml).join(' → ')}</p></div><button type="button" data-run-pipeline="${index}">Start</button></article>`).join('')}</div>
            <button class="workspace-primary" type="button" data-new-pipeline><i class="fas fa-plus"></i> Build from favorites</button>`;
        content.querySelectorAll('[data-run-pipeline]').forEach(button => button.addEventListener('click', () => this.startPipeline(templates[Number(button.dataset.runPipeline)])));
        content.querySelector('[data-new-pipeline]').addEventListener('click', () => {
            if (this.state.favorites.length < 2) return window.Utils?.showToast?.('Favorite at least two tools first.', 'info');
            const name = window.prompt('Pipeline name', 'My workflow');
            if (!name?.trim()) return;
            this.state.pipelines.push({ name: name.trim().slice(0, 60), steps: this.state.favorites.slice(0, 8) });
            writeState(this.state);
        });
    }

    startPipeline(pipeline) {
        const steps = pipeline.steps.filter(id => toolById(id));
        if (!steps.length) return;
        sessionStorage.setItem('vibox-active-pipeline', JSON.stringify({ name: pipeline.name, steps, index: 0 }));
        location.href = rootUrl(toolById(steps[0]).url);
    }

    showPipelineProgress() {
        let active;
        try { active = JSON.parse(sessionStorage.getItem('vibox-active-pipeline') || 'null'); } catch { return; }
        if (!active?.steps?.length) return;
        const current = tools.find(tool => location.pathname.endsWith('/' + tool.url));
        const index = active.steps.indexOf(current?.id);
        if (index < 0) return;
        active.index = index;
        sessionStorage.setItem('vibox-active-pipeline', JSON.stringify(active));
        const next = toolById(active.steps[index + 1]);
        const bar = document.createElement('div');
        bar.className = 'workspace-pipeline-bar';
        bar.innerHTML = `<span><i class="fas fa-route"></i><strong>${escapeHtml(active.name)}</strong> · Step ${index + 1}/${active.steps.length}</span>
            <span>${next ? `<a href="${rootUrl(next.url)}">Next: ${escapeHtml(next.name)} <i class="fas fa-arrow-right"></i></a>` : '<button type="button">Finish</button>'}<button class="pipeline-cancel" type="button" aria-label="Cancel pipeline"><i class="fas fa-times"></i></button></span>`;
        document.body.appendChild(bar);
        bar.querySelector('.pipeline-cancel').addEventListener('click', () => { sessionStorage.removeItem('vibox-active-pipeline'); bar.remove(); });
        if (!next) bar.querySelector('button:not(.pipeline-cancel)').addEventListener('click', () => { sessionStorage.removeItem('vibox-active-pipeline'); location.href = rootUrl('index.html'); });
    }

    async renderOffline(content) {
        content.innerHTML = '<p class="workspace-empty">Checking offline storage…</p>';
        let usage = 0, quota = 0, cacheNames = [];
        try {
            const estimate = await navigator.storage?.estimate?.(); usage = estimate?.usage || 0; quota = estimate?.quota || 0;
            cacheNames = 'caches' in window ? await caches.keys() : [];
        } catch { /* browser does not expose storage details */ }
        const percent = quota ? Math.min(100, Math.round((usage / quota) * 100)) : 0;
        content.innerHTML = `<section class="workspace-storage"><i class="fas fa-cloud-download-alt"></i><h3>${navigator.onLine ? 'Online and ready' : 'Working offline'}</h3>
            <p>${cacheNames.length} Vibox cache${cacheNames.length === 1 ? '' : 's'} · ${this.formatBytes(usage)} used</p>
            <div><span style="width:${percent}%"></span></div></section>
            <div class="workspace-action-stack"><button data-cache-vendors><i class="fas fa-download"></i> Download core libraries</button><button data-clear-caches><i class="fas fa-trash-alt"></i> Clear offline caches</button></div>
            <p class="workspace-note">Individual tools are cached when opened. Large games remain on-demand to protect device storage.</p>`;
        content.querySelector('[data-cache-vendors]').addEventListener('click', async () => {
            const registration = await navigator.serviceWorker?.ready; registration?.active?.postMessage('CACHE_VENDORS');
            window.Utils?.showToast?.('Core libraries are being saved for offline use.', 'success');
        });
        content.querySelector('[data-clear-caches]').addEventListener('click', async () => {
            if (!window.confirm('Clear Vibox offline caches? Your favorites and collections will stay.')) return;
            await Promise.all((await caches.keys()).filter(name => name.startsWith('vtoolz-')).map(name => caches.delete(name)));
            this.renderOffline(content);
        });
    }

    formatBytes(value) {
        if (!value) return '0 B';
        const unit = Math.min(3, Math.floor(Math.log(value) / Math.log(1024)));
        return `${(value / (1024 ** unit)).toFixed(unit ? 1 : 0)} ${['B','KB','MB','GB'][unit]}`;
    }

    renderSettings(content) {
        content.innerHTML = `<section class="workspace-settings">
            ${[['reducedMotion','Reduce motion','Calmer transitions and no decorative animation'],['highContrast','High contrast','Stronger borders and clearer focus states'],['largeControls','Larger controls','Increase tap targets and interface text']].map(([key, title, description]) => `<label><span><strong>${title}</strong><small>${description}</small></span><input type="checkbox" data-setting="${key}" ${this.state.settings[key] ? 'checked' : ''}></label>`).join('')}
            </section><div class="workspace-action-stack"><button data-export-workspace><i class="fas fa-file-export"></i> Export workspace</button><label class="workspace-import"><i class="fas fa-file-import"></i> Import workspace<input type="file" accept="application/json" hidden></label><button data-reset-workspace class="danger"><i class="fas fa-undo"></i> Reset local workspace</button></div>
            <p class="workspace-note">Everything here stays in this browser unless you explicitly export it.</p>`;
        content.querySelectorAll('[data-setting]').forEach(input => input.addEventListener('change', () => { this.state.settings[input.dataset.setting] = input.checked; writeState(this.state); }));
        content.querySelector('[data-export-workspace]').addEventListener('click', () => download('vibox-workspace.json', JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), ...this.state }, null, 2)));
        content.querySelector('.workspace-import input').addEventListener('change', async event => {
            try {
                const imported = JSON.parse(await event.target.files[0].text());
                this.state = { ...cloneDefault(), ...imported, settings: { ...DEFAULT_STATE.settings, ...(imported.settings || {}) } };
                writeState(this.state); window.Utils?.showToast?.('Workspace imported.', 'success');
            } catch { window.Utils?.showToast?.('Could not import that workspace file.', 'error'); }
        });
        content.querySelector('[data-reset-workspace]').addEventListener('click', () => {
            if (!window.confirm('Reset favorites, collections, pipelines, and accessibility settings?')) return;
            this.state = cloneDefault(); writeState(this.state);
        });
    }

    decorateToolCards() {
        document.querySelectorAll('a.tool-card').forEach(card => {
            const href = card.getAttribute('href') || '';
            const tool = tools.find(item => href.endsWith(item.url) || href.endsWith(item.url.replace(/^tools\//, '')) || new URL(card.href, location.href).pathname.endsWith('/' + item.url));
            if (!tool) return;
            card.dataset.toolId = tool.id;
            let wrapper = card.parentElement?.classList.contains('tool-card-wrap') ? card.parentElement : null;
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.className = 'tool-card-wrap';
                card.parentNode?.insertBefore(wrapper, card);
                wrapper.appendChild(card);
            }
            let button = wrapper.querySelector(':scope > .tool-favorite');
            if (!button) {
                button = document.createElement('button');
                button.type = 'button'; button.className = 'tool-favorite';
                button.addEventListener('click', () => this.toggleFavorite(tool.id));
                wrapper.appendChild(button);
            }
            const favorite = this.state.favorites.includes(tool.id);
            button.classList.toggle('active', favorite);
            button.setAttribute('aria-label', `${favorite ? 'Remove' : 'Add'} ${tool.name} ${favorite ? 'from' : 'to'} favorites`);
            const iconClass = `${favorite ? 'fas' : 'far'} fa-heart`;
            if (button.firstElementChild?.className !== iconClass) button.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
        });
    }

    toggleFavorite(id) {
        this.state.favorites = this.state.favorites.includes(id) ? this.state.favorites.filter(item => item !== id) : [id, ...this.state.favorites];
        writeState(this.state);
    }
}
