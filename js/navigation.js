/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SPA Navigation                                              ║
 * ║  Page routing, mobile menu, active link management           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ─── Page Navigation ───────────────────────────────────────────
// Show/hide page sections to simulate multi-page routing

export function navigateTo(pageId) {
    // Hide all page sections
    document.querySelectorAll('.page-section').forEach(el => {
        el.classList.add('hidden');
    });

    // Show target page
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(btn => {
        if (btn.dataset.page === pageId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ─── Mobile Menu Toggle ────────────────────────────────────────

export function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// ─── Register Global Handlers ──────────────────────────────────
// Required for inline onclick attributes in HTML

window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;
