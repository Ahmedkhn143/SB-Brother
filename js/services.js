/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Services Module                                             ║
 * ║  Rendering, filtering, sorting & service detail pages        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { SERVICES, SERVICE_META } from './data.js';
import { navigateTo } from './navigation.js';
import { setupImageFallbacks } from './utils.js';

// ─── Local State ───────────────────────────────────────────────

let servicesState = {
    query: '',
    category: 'all',
    sort: 'recommended'
};

// ─── Service Card Renderer ─────────────────────────────────────

export function renderServiceCard(service, showMeta = false) {
    const meta = SERVICE_META[service.id] || { badge: '', eta: '', priority: 99 };
    const metaBadge = showMeta
        ? `<span class="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 text-[11px] font-bold">${meta.badge}</span>`
        : '';
    const etaLine = showMeta
        ? `<p class="text-xs text-slate-500 mt-3">متوسط التنفيذ: <span class="font-bold text-slate-700">${meta.eta}</span></p>`
        : '';

    return `
    <div class="bg-white rounded-xl shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-slate-100">
        <div class="h-52 overflow-hidden relative">
            <img src="${service.img}" alt="${service.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-6">
            <div class="mb-3">${metaBadge}</div>
            <div class="flex items-center gap-3 mb-3 text-blue-600">
                <div class="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <i data-lucide="${service.icon}" class="w-6 h-6"></i>
                </div>
                <h3 class="font-bold text-xl text-slate-900 group-hover:text-blue-700 transition-colors">${service.title}</h3>
            </div>
            <p class="text-slate-600 mb-6 text-sm leading-relaxed">${service.shortDesc}</p>
            ${etaLine}
            <button onclick="openServiceDetail('${service.id}')" class="w-full py-2.5 rounded-lg bg-slate-50 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                اقرأ المزيد <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </button>
        </div>
    </div>`;
}

// ─── Filtering Logic ───────────────────────────────────────────

function getFilteredServices() {
    const q = servicesState.query.trim().toLowerCase();

    let list = SERVICES.filter(service => {
        const meta = SERVICE_META[service.id] || { category: 'all' };
        const matchesCategory = servicesState.category === 'all' || meta.category === servicesState.category;
        if (!matchesCategory) return false;

        if (!q) return true;
        const haystack = [
            service.title,
            service.shortDesc,
            service.fullDesc,
            ...(service.features || [])
        ].join(' ').toLowerCase();
        return haystack.includes(q);
    });

    if (servicesState.sort === 'name-asc') {
        list.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
    } else if (servicesState.sort === 'name-desc') {
        list.sort((a, b) => b.title.localeCompare(a.title, 'ar'));
    } else {
        list.sort((a, b) => {
            const aP = (SERVICE_META[a.id]?.priority) || 99;
            const bP = (SERVICE_META[b.id]?.priority) || 99;
            return aP - bP;
        });
    }

    return list;
}

// ─── Grid Renderer ─────────────────────────────────────────────

export function renderServicesGrid() {
    const allGrid = document.getElementById('all-services-grid');
    if (!allGrid) return;

    const resultCountEl = document.getElementById('services-results-count');
    const totalCountEl = document.getElementById('services-total-count');
    const emptyState = document.getElementById('services-empty-state');

    const filtered = getFilteredServices();
    allGrid.innerHTML = filtered.map(service => renderServiceCard(service, true)).join('');

    if (resultCountEl) resultCountEl.textContent = String(filtered.length);
    if (totalCountEl) totalCountEl.textContent = String(SERVICES.length);

    if (emptyState) {
        emptyState.classList.toggle('hidden', filtered.length > 0);
    }

    lucide.createIcons();
    setupImageFallbacks();
}

// ─── Interaction Setup ─────────────────────────────────────────

export function setupServicesInteractions() {
    const searchInput = document.getElementById('services-search');
    const sortSelect = document.getElementById('services-sort');
    const chips = document.querySelectorAll('.services-filter-chip');

    if (!searchInput || !sortSelect || chips.length === 0) {
        return;
    }

    searchInput.addEventListener('input', (event) => {
        servicesState.query = event.target.value || '';
        renderServicesGrid();
    });

    sortSelect.addEventListener('change', (event) => {
        servicesState.sort = event.target.value;
        renderServicesGrid();
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(btn => btn.classList.remove('is-active'));
            chip.classList.add('is-active');
            servicesState.category = chip.dataset.category || 'all';
            renderServicesGrid();
        });
    });

    renderServicesGrid();
}

// ─── Service Detail Page ───────────────────────────────────────

export function openServiceDetail(id) {
    const service = SERVICES.find(s => s.id === id);
    if (!service) return;

    const detailContainer = document.getElementById('service-detail');
    detailContainer.innerHTML = `
        <div class="relative h-96 bg-slate-900">
            <img src="${service.img}" class="w-full h-full object-cover opacity-40">
            <div class="absolute inset-0 flex items-center justify-center">
                <h1 class="text-4xl md:text-6xl font-extrabold text-white shadow-lg text-center px-4 tracking-tight">${service.title}</h1>
            </div>
            <button onclick="navigateTo('services')" class="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition flex items-center gap-2 font-bold z-10">
                <i data-lucide="arrow-right" class="w-4 h-4"></i> عودة للخدمات
            </button>
        </div>
        <div class="container mx-auto px-6 py-16 -mt-20 relative z-10">
            <div class="flex flex-col lg:flex-row gap-12">
                <div class="lg:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div class="p-2.5 bg-blue-50 rounded-xl text-blue-600"><i data-lucide="${service.icon}" class="w-6 h-6"></i></div>
                        نظرة عامة على الخدمة
                    </h2>
                    <p class="text-slate-700 leading-loose text-lg mb-8 text-justify">${service.fullDesc}</p>
                    
                    <h3 class="text-xl font-bold text-slate-900 mb-6">مميزات الخدمة:</h3>
                    <div class="grid md:grid-cols-2 gap-4 mb-8">
                        ${service.features.map(f => `
                            <div class="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                <div class="bg-blue-100 rounded-full p-1"><i data-lucide="check" class="w-3 h-3 text-blue-600"></i></div>
                                <span class="font-medium text-slate-700">${f}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="lg:w-1/3">
                    <div class="bg-white p-8 rounded-2xl shadow-xl sticky top-28 border border-slate-100">
                        <h3 class="text-xl font-bold text-slate-900 mb-2">احجز هذه الخدمة</h3>
                        <p class="text-slate-500 mb-6 text-sm">تواصل معنا للحصول على عرض سعر فوري</p>
                        
                        <div class="space-y-4 mb-8">
                            <a href="tel:+971569098867" class="flex items-center gap-4 text-slate-700 hover:text-blue-600 group p-3 rounded-lg hover:bg-slate-50 transition">
                                <div class="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition"><i data-lucide="phone" class="w-5 h-5 text-blue-600"></i></div>
                                <span dir="ltr" class="font-bold text-lg">+971 56 909 8867</span>
                            </a>
                        </div>
                        <button onclick="navigateTo('contact')" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                            اطلب عرض سعر <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    setupImageFallbacks();
    navigateTo('service-detail');
}

// ─── Register Global Handlers ──────────────────────────────────

window.openServiceDetail = openServiceDetail;
