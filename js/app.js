/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Application Entry Point                                     ║
 * ║  Seven Brothers Electromechanical                            ║
 * ║                                                              ║
 * ║  This module initializes all features on page load.          ║
 * ║  Each feature is a self-contained ES module.                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  Module Architecture:
 *  ┌─────────────────────────────────────────────────────┐
 *  │  app.js (entry point)                               │
 *  │  ├── config.js      → API keys, constants           │
 *  │  ├── data.js        → Services, Projects, FAQs      │
 *  │  ├── utils.js       → Image fallbacks, hero slider  │
 *  │  ├── navigation.js  → SPA routing, mobile menu      │
 *  │  ├── services.js    → Service cards, filters, detail │
 *  │  ├── projects.js    → Project cards, filters, detail │
 *  │  ├── faq.js         → FAQ accordion                 │
 *  │  ├── contact.js     → Contact form + WhatsApp       │
 *  │  ├── ai-advisor.js  → AI problem analysis           │
 *  │  └── chat.js        → Live chatbot                  │
 *  └─────────────────────────────────────────────────────┘
 */

// ─── Feature Modules ───────────────────────────────────────────
import { SERVICES } from './data.js';
import { setupImageFallbacks, startHeroSlider } from './utils.js';
import { renderServiceCard, renderServicesGrid, setupServicesInteractions } from './services.js';
import { renderProjectsGrid, setupProjectsInteractions } from './projects.js';
import { renderFaqAccordion } from './faq.js';
import { setupContactForm } from './contact.js';

// Side-effect imports — these modules register their own window handlers
import './navigation.js';
import './ai-advisor.js';
import './chat.js';

// ─── Application Initialization ────────────────────────────────

function init() {
    // Render home page service cards (first 6)
    const homeGrid = document.getElementById('home-services-grid');
    if (homeGrid) {
        homeGrid.innerHTML = SERVICES.slice(0, 6).map(s => renderServiceCard(s)).join('');
    }

    // Initialize all page modules
    renderServicesGrid();
    setupServicesInteractions();

    renderProjectsGrid();
    setupProjectsInteractions();

    renderFaqAccordion();

    // Initialize icons, slider & fallbacks
    lucide.createIcons();
    startHeroSlider();
    setupImageFallbacks();
}

// ─── DOM Ready ─────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
    init();
    setupContactForm();
});
