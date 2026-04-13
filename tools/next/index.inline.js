import { tools } from '../../js/utils/tools.js';

const grid = document.getElementById('next-grid');
const list = tools.filter(t =>
    t.id.startsWith('next-') &&
    t.id !== 'next-growth-toolkit' &&
    !t.id.endsWith('-cluster')
);

if (!list.length) {
    grid.innerHTML = '<p class="text-muted">No new tools available.</p>';
} else {
    grid.innerHTML = list.map(tool => `
        <a href="../../${tool.url}" class="tool-card zoom-in spotlight-card">
            <div class="tool-thumb" style="color:${tool.color}"><i class="${tool.icon}"></i></div>
            <div class="tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            </div>
            <div class="tool-arrow"><i class="fas fa-chevron-right"></i></div>
        </a>
    `).join('');
}

let raf = null;
if (grid) {
    grid.onmousemove = (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            for (const card of document.getElementsByClassName('spotlight-card')) {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }
            raf = null;
        });
    };
}