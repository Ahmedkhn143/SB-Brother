/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Projects Module                                             ║
 * ║  Rendering, filtering, sorting & project detail pages        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { PROJECTS, PROJECT_META } from './data.js';
import { navigateTo } from './navigation.js';
import { setupImageFallbacks } from './utils.js';

// ─── Local State ───────────────────────────────────────────────

let projectsState = {
    query: '',
    category: 'all',
    sort: 'recommended'
};

// ─── Project Card Renderer ─────────────────────────────────────

function renderProjectCard(project) {
    const meta = PROJECT_META[project.id] || { featured: false, badge: '', score: 99 };
    const featuredTag = meta.featured
        ? '<span class="text-[11px] font-bold bg-emerald-500/90 text-white px-2 py-1 rounded-full">مشروع مميز</span>'
        : '';
    return `
    <div class="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-96" onclick="openProjectDetail('${project.id}')">
        <img src="${project.img}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 text-white">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-amber-400 text-xs font-bold uppercase tracking-widest px-2 py-1 bg-white/10 backdrop-blur-md rounded w-fit">${project.category}</span>
                ${featuredTag}
            </div>
            <h3 class="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">${project.title}</h3>
            <p class="text-slate-300 text-sm flex items-center gap-1.5 mb-4"><i data-lucide="map-pin" class="w-4 h-4 text-red-400"></i> ${project.location}</p>
            <p class="text-xs text-blue-100/90 mb-4 bg-white/10 rounded-full px-3 py-1 w-fit">${meta.badge}</p>
            
            <div class="flex items-center gap-2 text-sm font-bold text-blue-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                عرض تفاصيل المشروع <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </div>
        </div>
    </div>`;
}

// ─── Filtering Logic ───────────────────────────────────────────

function getFilteredProjects() {
    const q = projectsState.query.trim().toLowerCase();

    let list = PROJECTS.filter(project => {
        const matchesCategory = projectsState.category === 'all' || project.category === projectsState.category;
        if (!matchesCategory) return false;

        if (!q) return true;
        const content = [
            project.title,
            project.location,
            project.category,
            project.challenge,
            project.solution,
            project.result,
            project.stats?.type || ''
        ].join(' ').toLowerCase();
        return content.includes(q);
    });

    if (projectsState.sort === 'name-asc') {
        list.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
    } else if (projectsState.sort === 'name-desc') {
        list.sort((a, b) => b.title.localeCompare(a.title, 'ar'));
    } else if (projectsState.sort === 'duration-fast') {
        list.sort((a, b) => ((PROJECT_META[a.id]?.durationDays || 999) - (PROJECT_META[b.id]?.durationDays || 999)));
    } else {
        list.sort((a, b) => ((PROJECT_META[a.id]?.score || 99) - (PROJECT_META[b.id]?.score || 99)));
    }

    return list;
}

// ─── Grid Renderer ─────────────────────────────────────────────

export function renderProjectsGrid() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const resultsCount = document.getElementById('projects-results-count');
    const totalCount = document.getElementById('projects-total-count');
    const emptyState = document.getElementById('projects-empty-state');

    const list = getFilteredProjects();
    grid.innerHTML = list.map(renderProjectCard).join('');

    if (resultsCount) resultsCount.textContent = String(list.length);
    if (totalCount) totalCount.textContent = String(PROJECTS.length);
    if (emptyState) emptyState.classList.toggle('hidden', list.length > 0);

    lucide.createIcons();
    setupImageFallbacks();
}

// ─── Interaction Setup ─────────────────────────────────────────

export function setupProjectsInteractions() {
    const searchInput = document.getElementById('projects-search');
    const sortSelect = document.getElementById('projects-sort');
    const chips = document.querySelectorAll('.projects-filter-chip');

    if (!searchInput || !sortSelect || chips.length === 0) {
        return;
    }

    searchInput.addEventListener('input', (event) => {
        projectsState.query = event.target.value || '';
        renderProjectsGrid();
    });

    sortSelect.addEventListener('change', (event) => {
        projectsState.sort = event.target.value;
        renderProjectsGrid();
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(btn => btn.classList.remove('is-active'));
            chip.classList.add('is-active');
            projectsState.category = chip.dataset.category || 'all';
            renderProjectsGrid();
        });
    });

    renderProjectsGrid();
}

// ─── Project Detail Page ───────────────────────────────────────

export function openProjectDetail(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    const detailContainer = document.getElementById('project-detail');
    detailContainer.innerHTML = `
        <div class="relative h-[600px] bg-slate-900">
            <img src="${project.img}" class="w-full h-full object-cover opacity-60">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            <div class="absolute bottom-0 w-full p-6 md:p-16 text-white pb-24">
                <div class="container mx-auto">
                    <span class="bg-amber-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold mb-4 inline-block uppercase tracking-wider shadow-lg shadow-amber-500/20">${project.category}</span>
                    <h1 class="text-4xl md:text-6xl font-bold mb-4">${project.title}</h1>
                    <p class="text-xl text-slate-200 flex items-center gap-2"><i data-lucide="map-pin" class="text-red-400"></i> ${project.location}</p>
                </div>
            </div>
            <button onclick="navigateTo('projects')" class="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition flex items-center gap-2 font-bold z-10">
                <i data-lucide="arrow-right" class="w-4 h-4"></i> عودة للمشاريع
            </button>
        </div>
        <div class="container mx-auto px-6 py-16 -mt-20 relative z-10">
            <div class="flex flex-col lg:flex-row gap-12">
                <div class="lg:w-2/3 space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-amber-500 pr-4">التحدي</h2>
                        <p class="text-slate-700 text-lg leading-relaxed">${project.challenge}</p>
                    </div>
                    <hr class="border-slate-100">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-blue-600 pr-4">الحل المقدم</h2>
                        <p class="text-slate-700 text-lg leading-relaxed">${project.solution}</p>
                    </div>
                    <hr class="border-slate-100">
                     <div>
                        <h2 class="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-green-500 pr-4">النتيجة</h2>
                        <p class="text-slate-700 text-lg leading-relaxed">${project.result}</p>
                    </div>
                </div>
                <div class="lg:w-1/3">
                    <div class="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm sticky top-28">
                        <h3 class="font-bold text-slate-900 text-xl mb-6">بيانات المشروع</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-slate-200 pb-3">
                                <span class="text-slate-500 font-medium">النوع</span>
                                <span class="font-bold text-slate-800">${project.stats.type}</span>
                            </div>
                            <div class="flex justify-between border-b border-slate-200 pb-3">
                                <span class="text-slate-500 font-medium">الموقع</span>
                                <span class="font-bold text-slate-800">${project.location}</span>
                            </div>
                            <div class="flex justify-between border-b border-slate-200 pb-3">
                                <span class="text-slate-500 font-medium">المدة</span>
                                <span class="font-bold text-slate-800">${project.stats.duration}</span>
                            </div>
                        </div>
                        <button onclick="navigateTo('contact')" class="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">لديك مشروع مشابه؟</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    setupImageFallbacks();
    navigateTo('project-detail');
}

// ─── Register Global Handlers ──────────────────────────────────

window.openProjectDetail = openProjectDetail;
