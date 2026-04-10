/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  FAQ Accordion Module                                        ║
 * ║  Render and manage FAQ expand/collapse behavior              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { FAQS } from './data.js';

// ─── FAQ Accordion Renderer ────────────────────────────────────

export function renderFaqAccordion() {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;

    faqList.innerHTML = FAQS.map((faq, index) => `
        <div class="faq-item bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <button type="button" class="faq-question w-full p-5 text-right flex items-center justify-between gap-4" aria-expanded="${index === 0 ? 'true' : 'false'}">
                <span class="font-bold text-base md:text-lg text-blue-900 leading-relaxed">${faq.q}</span>
                <span class="faq-chevron text-blue-600 text-xl leading-none transition-transform ${index === 0 ? 'rotate-180' : ''}">⌄</span>
            </button>
            <div class="faq-answer-wrapper overflow-hidden transition-all duration-300" style="max-height: 0px;">
                <div class="px-5 pb-5">
                    <p class="text-slate-600 leading-relaxed">${faq.a}</p>
                </div>
            </div>
        </div>
    `).join('');

    // ─── Accordion Behavior ────────────────────────────────
    const items = faqList.querySelectorAll('.faq-item');

    const closeItem = (item) => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer-wrapper');
        const chevron = item.querySelector('.faq-chevron');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.style.maxHeight = '0px';
        if (chevron) chevron.classList.remove('rotate-180');
    };

    const openItem = (item) => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer-wrapper');
        const chevron = item.querySelector('.faq-chevron');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
        if (chevron) chevron.classList.add('rotate-180');
    };

    items.forEach((item, index) => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;

        // Open first item by default
        if (index === 0) {
            openItem(item);
        }

        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            items.forEach(closeItem);
            if (!isOpen) {
                openItem(item);
            }
        });
    });
}
