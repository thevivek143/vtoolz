import { tools } from '../../js/utils/tools.js';

const CLUSTERS = {
    career: {
        ids: [
            'next-ats-resume-checker',
            'next-cover-letter-formatter',
            'next-grammar-checker',
            'next-ai-text-detector',
            'next-salary-breakup-calculator',
            'next-interview-prep-cards',
            'next-form-format-validator',
            'next-eligibility-calculator'
        ]
    },
    finance: {
        ids: [
            'next-sip-calculator',
            'next-emi-calculator',
            'next-fd-calculator',
            'next-tax-estimator',
            'next-budgeting-sheet',
            'next-expense-tracker',
            'next-debt-payoff-planner',
            'next-fuel-cost-calculator',
            'next-margin-calculator',
            'next-gst-vat-calculator',
            'next-invoice-generator',
            'next-receipt-parser',
            'next-quotation-maker'
        ]
    },
    travel: {
        ids: [
            'next-itinerary-builder',
            'next-packing-list-builder',
            'next-timezone-planner',
            'next-time-difference-calculator',
            'next-trip-cost-calculator',
            'next-fuel-cost-calculator',
            'next-visa-doc-checker'
        ]
    },
    creator: {
        ids: [
            'next-thumbnail-caption-maker',
            'next-subtitle-formatter',
            'next-script-timer',
            'next-hashtag-title-generator',
            'next-image-to-text-ocr',
            'next-pdf-ocr-extractor',
            'next-audio-to-text-transcriber',
            'next-video-to-mp3-converter',
            'next-audio-cleanup-notes',
            'next-speech-to-text-notes'
        ]
    }
};

const cluster = document.body.dataset.cluster;
const grid = document.getElementById('cluster-grid');

if (!cluster || !CLUSTERS[cluster] || !grid) {
    if (grid) {
        grid.innerHTML = '<p class="text-muted">Cluster data is not available.</p>';
    }
} else {
    const list = CLUSTERS[cluster].ids
        .map(id => tools.find(tool => tool.id === id))
        .filter(Boolean);

    if (!list.length) {
        grid.innerHTML = '<p class="text-muted">No tools available in this cluster yet.</p>';
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
