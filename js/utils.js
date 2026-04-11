/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Utility Functions                                           ║
 * ║  Image fallbacks, hero slider, shared helpers                ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ─── Image Fallback System ─────────────────────────────────────
// Gracefully replaces broken images with the company logo

export function setupImageFallbacks(scope = document) {
    const fallbackSrc = 'assets/images/sb-logo.png';
    const imgs = scope.querySelectorAll('img');

    imgs.forEach(img => {
        if (img.dataset.fallbackBound === '1') return;
        img.dataset.fallbackBound = '1';

        img.addEventListener('error', () => {
            if (img.dataset.fallbackApplied === '1') return;
            img.dataset.fallbackApplied = '1';
            img.src = fallbackSrc;
            img.classList.add('object-contain', 'bg-slate-100', 'p-2');
        });
    });
}

// ─── Hero Image Slider ─────────────────────────────────────────
// Cycles through hero images with a fade transition

const heroImages = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1647381518264-97ff1835026f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

let currentHeroImage = 0;

export function startHeroSlider() {
    setInterval(() => {
        currentHeroImage = (currentHeroImage + 1) % heroImages.length;
        const img = document.getElementById('hero-slider-img');
        if (img) {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = heroImages[currentHeroImage];
                img.onload = () => { img.style.opacity = '1'; };
            }, 300);
        }
    }, 4000); // Increased interval for better UX
}

// ─── Scroll Reveal Observer ────────────────────────────────────

export function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // stop observing once revealed for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));
}
