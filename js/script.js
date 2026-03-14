const apiKey = "";

// ============================================
// DATA
// ============================================
const SERVICES = [
    { id: "ac", title: "صيانة التكييف والدكت", icon: "wind", shortDesc: "تركيب وإصلاح وتنظيف قنوات التكييف.", fullDesc: "في حرارة الإمارات، التكييف الجيد ضرورة. نقدم خدمات شاملة لصيانة مكيفات الهواء، تنظيف الملفات، وتعبئة الغاز.", features: ["تنظيف الكويل", "تعبئة غاز", "تعقيم الدكت"], img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" },
    { id: "plumbing", title: "أعمال السباكة", icon: "droplet", shortDesc: "كشف التسربات وإصلاح الأنابيب.", fullDesc: "من الحنفيات المسربة إلى التركيبات المعقدة. نستخدم تقنيات حديثة لكشف التسربات.", features: ["كشف التسربات", "إصلاح المضخات", "تصليح السخانات"], img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800" },
    { id: "electrical", title: "الأعمال الكهربائية", icon: "zap", shortDesc: "صيانة وتمديدات كهربائية آمنة.", fullDesc: "كهربائيونا المرخصون يضمنون سلامة منشأتك. نتعامل مع صناديق التوزيع وأعطال الماس.", features: ["إصلاح الماس", "تركيب الإضاءة", "صيانة المجمع"], img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800" },
    { id: "painting", title: "أعمال الصباغة", icon: "paint-bucket", shortDesc: "دهانات داخلية وخارجية.", fullDesc: "جدد مساحتك بخدمات الصباغة الاحترافية. نقدم استشارات للألوان وتجهيز الجدران.", features: ["داخلي / خارجي", "معالجة المعجون", "دهانات ديكورية"], img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800" },
    { id: "epoxy", title: "أرضيات إيبوكسي", icon: "check-circle", shortDesc: "أرضيات متينة للكراجات والمستودعات.", fullDesc: "مثالية للكراجات والمساحات الصناعية. مقاومة للزيوت والشحوم.", features: ["أرضيات الكراجات", "طلاء صناعي", "مقاوم للانزلاق"], img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800" },
    { id: "cleaning", title: "خدمات التنظيف", icon: "star", shortDesc: "تنظيف عميق للمنازل والمكاتب.", fullDesc: "تنظيف عميق يزيل الشحوم والأوساخ من الأماكن الصعبة.", features: ["تنظيف عميق", "ما بعد البناء", "الكنب والسجاد"], img: "https://images.unsplash.com/photo-1647381518264-97ff1835026f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "pest", title: "مكافحة الحشرات", icon: "shield-check", shortDesc: "قضاء فعال على الحشرات.", fullDesc: "حلول آمنة ومعتمدة لمكافحة الصراصير والنمل والقوارض.", features: ["جل", "رش", "مكافحة القوارض"], img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800" },
    { id: "amc", title: "عقود الصيانة", icon: "calendar", shortDesc: "عقود سنوية لراحة بالك.", fullDesc: "وفر المال مع باقات الصيانة السنوية للتكييف والكهرباء والسباكة.", features: ["طوارئ 24/7", "زيارات وقائية", "خصم قطع الغيار"], img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800" },
    { id: "civil", title: "أعمال مدنية", icon: "wrench", shortDesc: "بناء، نجارة، وإصلاحات.", fullDesc: "فريق ماهر للأعمال المدنية والنجارة وتجميع الأثاث.", features: ["سيراميك", "نجارة", "أعمال الطابوق"], img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" }
];

const PROJECTS = [
    { id: "villa-khalifa", title: "تجديد فيلا سكنية", category: "سكني", location: "مدينة خليفة أ", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", challenge: "احتاج العميل إلى تجديد كامل لنظام التكييف والسباكة لفيلا قديمة تعاني من تسربات متكررة وضعف التبريد.", solution: "قمنا باستبدال وحدات التكييف المركزية بوحدات موفرة للطاقة، وإعادة تمديد شبكة المياه باستخدام أنابيب PPR عالية الجودة.", result: "تحسن كفاءة التبريد بنسبة 40% واختفاء مشاكل التسربات بالكامل.", stats: { duration: "3 أسابيع", type: "صيانة شاملة" } },
    { id: "office-reem", title: "تجهيز مكاتب تجارية", category: "تجاري", location: "جزيرة الريم", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", challenge: "تطلب تجهيز طابق مكتبي كامل أعمال كهربائية معقدة وأنظمة إضاءة حديثة مع جداول زمنية ضيقة.", solution: "عمل فريقنا بنظام الورديات لتركيب لوحات التوزيع، الإضاءة الذكية، ونقاط البيانات (Data Points) في الوقت المحدد.", result: "تسليم المشروع قبل الموعد المحدد بيومين مع اجتياز جميع فحوصات السلامة.", stats: { duration: "شهر واحد", type: "كهرباء وإضاءة" } },
    { id: "warehouse-mussafah", title: "أرضيات إيبوكسي للمستودعات", category: "صناعي", location: "مصفح", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", challenge: "أرضية خرسانية متآكلة تسبب الغبار وتصعب حركة الرافعات الشوكية.", solution: "معالجة الشقوق وتطبيق 3 طبقات من طلاء الإيبوكسي الصناعي المقاوم للاحتكاك والمواد الكيميائية.", result: "أرضية ناعمة، لامعة، وسهلة التنظيف زادت من كفاءة العمليات اللوجستية.", stats: { duration: "10 أيام", type: "أرضيات" } },
    { id: "mall-ac", title: "تركيب تكييف مركز تجاري", category: "تجاري", location: "دبي مارينا", img: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&q=80&w=800", challenge: "تركيب نظام تكييف مركزي لمجمع تجاري جديد مع ضمان كفاءة استهلاك الطاقة.", solution: "تصميم وتنفيذ نظام VRF متطور مع وحدات تحكم ذكية لتوفير الطاقة.", result: "توفير بيئة تسوق مريحة مع خفض استهلاك الطاقة بنسبة 25%.", stats: { duration: "شهران", type: "تكييف مركزي" } },
    { id: "tower-electrical", title: "تمديدات كهربائية لفيلا فاخرة", category: "سكني", location: "نخلة جميرا", img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=800", challenge: "تنفيذ تمديدات كهربائية وإضاءة ذكية لفيلا فاخرة بتصاميم معقدة.", solution: "استخدام أحدث تقنيات الإضاءة LED وأنظمة التحكم الذكي (Smart Home Integration).", result: "إضاءة مذهلة وتحكم كامل عبر الهاتف الذكي لجميع مرافق الفيلا.", stats: { duration: "4 أسابيع", type: "كهرباء ذكية" } },
    { id: "hotel-plumbing", title: "صيانة سباكة فندق 5 نجوم", category: "ضيافة", location: "وسط مدينة دبي", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", challenge: "تجديد شبكة السباكة القديمة في فندق قيد التشغيل دون إزعاج الضيوف.", solution: "العمل في أوقات محددة وبأقسام معزولة باستخدام أنابيب صامتة وعالية المتانة.", result: "تحديث كامل للشبكة دون أي شكوى من النزلاء.", stats: { duration: "6 أسابيع", type: "سباكة" } },
    { id: "villa-painting", title: "دهانات داخلية وخارجية", category: "سكني", location: "المرابع العربية", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800", challenge: "إعادة طلاء فيلا كاملة مع معالجة تشققات الجدران الخارجية.", solution: "استخدام دهانات مقاومة للحرارة والرطوبة مع معالجة احترافية للأسطح.", result: "مظهر جديد وجذاب للفيلا مع حماية طويلة الأمد.", stats: { duration: "أسبوعان", type: "دهانات" } },
    { id: "gym-fitout", title: "تجهيز صالة رياضية", category: "تجاري", location: "القوز", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", challenge: "تركيب أرضيات مطاطية ونظام تهوية قوي لصالة ألعاب رياضية كبيرة.", solution: "تركيب أرضيات مخصصة لامتصاص الصدمات ونظام تهوية بضغط عالي.", result: "صالة رياضية آمنة وصحية جاهزة لاستقبال المشتركين.", stats: { duration: "3 أسابيع", type: "أعمال مدنية" } },
    { id: "clinic-maintenance", title: "عقد صيانة لعيادة طبية", category: "طبي", location: "الشارقة", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", challenge: "الحفاظ على بيئة معقمة ومثالية لعيادة طبية تعمل على مدار الساعة.", solution: "عقد صيانة سنوي يشمل التعقيم الدوري وصيانة التكييف والكهرباء.", result: "بيئة عمل آمنة ومستقرة للطاقم الطبي والمرضى.", stats: { duration: "مستمر", type: "AMC" } },
    { id: "showroom-lighting", title: "إضاءة معرض سيارات", category: "تجاري", location: "دبي مول", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800", challenge: "تركيب إضاءة تسلط الضوء على السيارات بشكل جذاب دون وهج.", solution: "توزيع مدروس للإضاءة الموجهة (Spotlights) والإضاءة المحيطة.", result: "عرض مبهر للسيارات زاد من جاذبية المعرض.", stats: { duration: "أسبوع واحد", type: "كهرباء" } },
    { id: "pool-maintenance", title: "صيانة وترميم مسبح", category: "سكني", location: "تلال الإمارات", img: "https://images.unsplash.com/photo-1572331165267-854da2b00cc6?auto=format&fit=crop&q=80&w=800", challenge: "تسرب مياه المسبح وتلف البلاط القديم.", solution: "إعادة العزل المائي وتغيير البلاط بالكامل مع صيانة المضخات.", result: "مسبح كالجديد جاهز للاستخدام الصيفي.", stats: { duration: "أسبوعان", type: "صيانة مسابح" } }
];

const FAQS = [
    { q: "هل تقدمون خدمات الطوارئ؟", a: "نعم، نقدم دعم طوارئ على مدار 24/7 للمشاكل الحرجة مثل تسربات المياه الكبيرة أو انقطاع الكهرباء." },
    { q: "هل الفنيون لديكم معتمدون؟", a: "بالتأكيد. جميع فنيينا مدربون ومعتمدون ولديهم خبرة في معايير السلامة في الإمارات." },
    { q: "ما هي المناطق التي تغطونها؟", a: "نخدم بشكل أساسي أبوظبي (بما في ذلك مدينة خليفة، جزيرة ياس، جزيرة الريم) ودبي." },
    { q: "كيف يمكنني الحصول على عرض سعر؟", a: "يمكنك الاتصال بنا مباشرة، أو إرسال رسالة واتساب، أو ملء نموذج الاتصال على هذا الموقع." }
];

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderServiceCard(service, index) {
    const delay = (index % 3) + 1;
    return `
    <div class="service-card reveal reveal-delay-${delay}">
        <div class="card-image">
            <img src="${service.img}" alt="${service.title}" loading="lazy">
            <div class="overlay"></div>
        </div>
        <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
                <div class="card-icon bg-blue-50 text-royal">
                    <i data-lucide="${service.icon}" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-slate-900">${service.title}</h3>
            </div>
            <p class="text-slate-500 mb-5 text-sm leading-relaxed">${service.shortDesc}</p>
            <button onclick="openServiceDetail('${service.id}')" class="card-btn text-sm">
                اقرأ المزيد <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </button>
        </div>
    </div>`;
}

function renderProjectCard(project, index) {
    const delay = (index % 3) + 1;
    return `
    <div class="project-card reveal reveal-delay-${delay}" onclick="openProjectDetail('${project.id}')">
        <img src="${project.img}" alt="${project.title}" loading="lazy">
        <div class="card-overlay">
            <span class="text-gold text-xs font-bold mb-2 uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg w-fit">${project.category}</span>
            <h3 class="text-2xl font-bold text-white mb-1">${project.title}</h3>
            <p class="text-slate-300 text-sm flex items-center gap-1.5 mb-3"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-red-400"></i> ${project.location}</p>
            <div class="view-btn flex items-center gap-2 text-sm font-bold text-gold">
                عرض التفاصيل <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </div>
        </div>
    </div>`;
}

// ============================================
// INIT
// ============================================
function init() {
    const homeGrid = document.getElementById('home-services-grid');
    if (homeGrid) homeGrid.innerHTML = SERVICES.slice(0, 6).map(renderServiceCard).join('');

    const allGrid = document.getElementById('all-services-grid');
    if (allGrid) allGrid.innerHTML = SERVICES.map(renderServiceCard).join('');

    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) projectsGrid.innerHTML = PROJECTS.map(renderProjectCard).join('');

    const faqList = document.getElementById('faq-list');
    if (faqList) faqList.innerHTML = FAQS.map((faq, i) => `
        <div class="faq-item p-6 reveal reveal-delay-${(i % 3) + 1}">
            <h3 class="font-bold text-lg text-navy mb-3 flex items-start gap-3">
                <span class="text-gold text-2xl leading-none font-black">س.</span> ${faq.q}
            </h3>
            <p class="text-slate-500 pr-8 leading-relaxed">${faq.a}</p>
        </div>
    `).join('');

    lucide.createIcons();
    startHeroSlider();
    initScrollReveal();
    initNavScroll();
    initCounters();
}

// ============================================
// HERO SLIDER
// ============================================
const heroImages = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1647381518264-97ff1835026f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
let currentHeroImage = 0;

function startHeroSlider() {
    setInterval(() => {
        currentHeroImage = (currentHeroImage + 1) % heroImages.length;
        const img = document.getElementById('hero-slider-img');
        if (img) {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = heroImages[currentHeroImage];
                img.onload = () => { img.style.opacity = '1'; };
            }, 400);
        }
    }, 3000);
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// NAV SCROLL EFFECT
// ============================================
function initNavScroll() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current + '+';
    }, 30);
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-observe reveal elements in new page
        setTimeout(() => {
            initScrollReveal();
            lucide.createIcons();
        }, 100);
    }

    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) toggleMobileMenu();

    document.querySelectorAll('.nav-link').forEach(btn => {
        if (btn.dataset.page === pageId) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// ============================================
// SERVICE DETAIL
// ============================================
function openServiceDetail(id) {
    const service = SERVICES.find(s => s.id === id);
    if (!service) return;

    document.getElementById('service-detail').innerHTML = `
        <div class="relative h-80 md:h-96 bg-navy overflow-hidden">
            <img src="${service.img}" class="w-full h-full object-cover opacity-30">
            <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <h1 class="text-4xl md:text-5xl font-black text-white text-center px-4">${service.title}</h1>
            </div>
            <button onclick="navigateTo('services')" class="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-xl hover:bg-white hover:text-navy transition flex items-center gap-2 font-bold z-10 text-sm">
                <i data-lucide="arrow-right" class="w-4 h-4"></i> عودة للخدمات
            </button>
        </div>
        <div class="container mx-auto px-6 py-16 -mt-16 relative z-10">
            <div class="flex flex-col lg:flex-row gap-10">
                <div class="lg:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
                    <h2 class="text-2xl font-bold text-navy mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div class="p-2.5 bg-blue-50 rounded-xl text-royal"><i data-lucide="${service.icon}" class="w-6 h-6"></i></div>
                        نظرة عامة على الخدمة
                    </h2>
                    <p class="text-slate-600 leading-loose text-lg mb-8">${service.fullDesc}</p>
                    <h3 class="text-xl font-bold text-navy mb-5">مميزات الخدمة:</h3>
                    <div class="grid md:grid-cols-2 gap-4 mb-4">
                        ${service.features.map(f => `
                            <div class="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-royal/20 transition">
                                <div class="w-6 h-6 bg-royal/10 rounded-full flex items-center justify-center"><i data-lucide="check" class="w-3 h-3 text-royal"></i></div>
                                <span class="font-medium text-slate-700">${f}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="lg:w-1/3">
                    <div class="bg-white p-8 rounded-2xl shadow-xl sticky top-28 border border-slate-100">
                        <h3 class="text-xl font-bold text-navy mb-2">احجز هذه الخدمة</h3>
                        <p class="text-slate-500 mb-6 text-sm">تواصل معنا للحصول على عرض سعر فوري</p>
                        <a href="tel:+971569098867" class="flex items-center gap-4 text-slate-700 hover:text-royal group p-3 rounded-xl hover:bg-slate-50 transition mb-4">
                            <div class="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition"><i data-lucide="phone" class="w-5 h-5 text-royal"></i></div>
                            <span dir="ltr" class="font-bold text-lg">+971 56 909 8867</span>
                        </a>
                        <button onclick="navigateTo('contact')" class="btn-primary w-full py-4">
                            اطلب عرض سعر <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    navigateTo('service-detail');
}

// ============================================
// PROJECT DETAIL
// ============================================
function openProjectDetail(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    document.getElementById('project-detail').innerHTML = `
        <div class="relative h-[550px] bg-navy overflow-hidden">
            <img src="${project.img}" class="w-full h-full object-cover opacity-50">
            <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"></div>
            <div class="absolute bottom-0 w-full p-6 md:p-16 text-white pb-24">
                <div class="container mx-auto">
                    <span class="bg-gold text-navy px-4 py-1.5 rounded-lg text-sm font-bold mb-4 inline-block uppercase tracking-wider">${project.category}</span>
                    <h1 class="text-4xl md:text-5xl font-black mb-4">${project.title}</h1>
                    <p class="text-xl text-slate-200 flex items-center gap-2"><i data-lucide="map-pin" class="text-red-400 w-5 h-5"></i> ${project.location}</p>
                </div>
            </div>
            <button onclick="navigateTo('projects')" class="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-xl hover:bg-white hover:text-navy transition flex items-center gap-2 font-bold z-10 text-sm">
                <i data-lucide="arrow-right" class="w-4 h-4"></i> عودة للمشاريع
            </button>
        </div>
        <div class="container mx-auto px-6 py-16 -mt-20 relative z-10">
            <div class="flex flex-col lg:flex-row gap-10">
                <div class="lg:w-2/3 space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div>
                        <h2 class="text-2xl font-bold text-navy mb-4 border-r-4 border-gold pr-4">التحدي</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">${project.challenge}</p>
                    </div>
                    <hr class="border-slate-100">
                    <div>
                        <h2 class="text-2xl font-bold text-navy mb-4 border-r-4 border-royal pr-4">الحل المقدم</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">${project.solution}</p>
                    </div>
                    <hr class="border-slate-100">
                    <div>
                        <h2 class="text-2xl font-bold text-navy mb-4 border-r-4 border-green-500 pr-4">النتيجة</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">${project.result}</p>
                    </div>
                </div>
                <div class="lg:w-1/3">
                    <div class="bg-slate-50 border border-slate-200 p-8 rounded-2xl sticky top-28">
                        <h3 class="font-bold text-navy text-xl mb-6">بيانات المشروع</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-slate-200 pb-3"><span class="text-slate-500 font-medium">النوع</span><span class="font-bold text-navy">${project.stats.type}</span></div>
                            <div class="flex justify-between border-b border-slate-200 pb-3"><span class="text-slate-500 font-medium">الموقع</span><span class="font-bold text-navy">${project.location}</span></div>
                            <div class="flex justify-between border-b border-slate-200 pb-3"><span class="text-slate-500 font-medium">المدة</span><span class="font-bold text-navy">${project.stats.duration}</span></div>
                        </div>
                        <button onclick="navigateTo('contact')" class="btn-primary w-full mt-8 py-4">لديك مشروع مشابه؟</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    navigateTo('project-detail');
}

// ============================================
// AI ADVISOR
// ============================================
async function analyzeProblem() {
    const input = document.getElementById('ai-problem-input').value.trim();
    const resultContainer = document.getElementById('ai-result-content');
    const initialState = document.getElementById('ai-initial-state');
    const loadingState = document.getElementById('ai-loading-state');

    if (!input) { alert("يرجى وصف المشكلة أولاً"); return; }

    initialState.classList.add('hidden');
    resultContainer.classList.add('hidden');
    loadingState.classList.remove('hidden');

    try {
        const data = await callGeminiAPI(input);
        let analysis;
        try {
            analysis = JSON.parse(data.replace(/```json/g, '').replace(/```/g, '').trim());
        } catch (e) {
            analysis = { category: "صيانة عامة", urgency: "غير محدد", diagnosis: "يرجى التواصل مع الفني للمعاينة المباشرة.", safety_tip: "افصل التيار الكهربائي إذا كنت تشك بوجود خطر." };
        }

        document.getElementById('ai-category').textContent = "التصنيف: " + analysis.category;
        document.getElementById('ai-diagnosis').textContent = analysis.diagnosis;
        document.getElementById('ai-safety').textContent = analysis.safety_tip;

        const badge = document.getElementById('ai-urgency-badge');
        if (analysis.urgency === 'High' || analysis.urgency === 'عالية') {
            badge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600";
            badge.textContent = "عاجل جداً";
        } else if (analysis.urgency === 'Medium' || analysis.urgency === 'متوسطة') {
            badge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-600";
            badge.textContent = "متوسطة";
        } else {
            badge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-600";
            badge.textContent = "عادية";
        }

        loadingState.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        loadingState.classList.add('hidden');
        initialState.classList.remove('hidden');
        alert("عذراً، حدث خطأ أثناء التحليل. حاول مرة أخرى.");
    }
}

async function callGeminiAPI(userMessage) {
    if (!apiKey) {
        await new Promise(r => setTimeout(r, 2000));
        const lowerMsg = userMessage.toLowerCase();
        let category = "صيانة عامة", diagnosis = "يرجى معاينة المشكلة من قبل فني مختص.", safety = "توخى الحذر ولا تقم بالإصلاح بنفسك.", urgency = "Medium";

        if (lowerMsg.match(/(تكييف|مكيف|حار|تبريد)/)) { category = "تكييف الهواء"; diagnosis = "احتمال وجود نقص في الغاز أو اتساخ في الفلاتر/الدكت."; safety = "أوقف تشغيل المكيف لتجنب تلف الضاغط."; urgency = "Medium"; }
        else if (lowerMsg.match(/(كهرباء|شرار|ريحة|حريق|طافي)/)) { category = "الكهرباء"; diagnosis = "احتمال وجود ماس كهربائي أو حمل زائد على القاطع."; safety = "افصل التيار الكهربائي من اللوحة الرئيسية فوراً."; urgency = "High"; }
        else if (lowerMsg.match(/(ماء|تسريب|يخر|غرق)/)) { category = "السباكة"; diagnosis = "تلف في الأنابيب أو وصلات المياه."; safety = "أغلق محبس المياه الرئيسي لمنع الأضرار."; urgency = "High"; }

        return JSON.stringify({ category, urgency, diagnosis, safety_tip: safety });
    }

    const systemPrompt = `You are an expert technical consultant for SB Electro (UAE). Analyze the user's maintenance problem description in Arabic. Output ONLY a JSON object with: { "category": "...", "urgency": "High/Medium/Low", "diagnosis": "...(Arabic)...", "safety_tip": "...(Arabic)..." }`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json" } }) });
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// ============================================
// CHAT BOT
// ============================================
function toggleChat() {
    const chat = document.getElementById('chat-window');
    if (chat.classList.contains('hidden')) {
        chat.classList.remove('hidden');
        setTimeout(() => { chat.classList.remove('scale-95', 'opacity-0'); chat.classList.add('scale-100', 'opacity-100'); }, 10);
    } else {
        chat.classList.remove('scale-100', 'opacity-100');
        chat.classList.add('scale-95', 'opacity-0');
        setTimeout(() => chat.classList.add('hidden'), 300);
    }
}

function handleChatInput(event) { if (event.key === 'Enter') sendChatMessage(); }

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const container = document.getElementById('chat-messages');
    container.insertAdjacentHTML('beforeend', `<div class="flex justify-end"><div class="bg-royal text-white p-3 rounded-2xl rounded-bl-sm shadow-sm text-sm max-w-[85%]">${message}</div></div>`);
    input.value = '';
    container.scrollTop = container.scrollHeight;

    const loadingId = 'loading-' + Date.now();
    container.insertAdjacentHTML('beforeend', `<div id="${loadingId}" class="flex justify-start"><div class="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-br-sm shadow-sm text-sm max-w-[85%]"><div class="flex gap-1"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div></div>`);
    container.scrollTop = container.scrollHeight;

    callGeminiChat(message).then(responseText => {
        const el = document.getElementById(loadingId);
        if (el) el.remove();
        container.insertAdjacentHTML('beforeend', `<div class="flex justify-start"><div class="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-br-sm shadow-sm text-sm max-w-[85%] leading-relaxed">${marked.parse(responseText)}</div></div>`);
        container.scrollTop = container.scrollHeight;
    }).catch(() => {
        const el = document.getElementById(loadingId);
        if (el) el.remove();
        container.insertAdjacentHTML('beforeend', `<div class="flex justify-start"><div class="bg-red-50 border border-red-100 text-red-600 p-3 rounded-2xl shadow-sm text-sm max-w-[85%]">عذراً، حدث خطأ في الاتصال.</div></div>`);
    });
}

async function callGeminiChat(userMessage) {
    if (!apiKey) {
        await new Promise(r => setTimeout(r, 1000));
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.match(/(مرحبا|هلا|السلام|hi|hello|hey)/)) return "أهلاً بك في SB Electro!\nكيف يمكنني مساعدتك اليوم في خدمات الصيانة؟";
        if (lowerMsg.match(/(تكييف|مكيف|تبريد|حار|ac|cool)/)) return "نقدم خدمات متكاملة للتكييف تشمل:\n- صيانة وقائية\n- تنظيف الدكت\n- تعبئة غاز\n- إصلاح الكمبروسر\n\nهل تود حجز موعد للصيانة؟";
        if (lowerMsg.match(/(كهرباء|لمبة|فيش|قاطع|electric|power|light)/)) return "فريقنا الكهربائي جاهز للمساعدة في:\n- تمديد الأسلاك\n- تركيب الإضاءة والمقابس\n- إصلاح الأعطال وانقطاع التيار\n\nنضمن لك أعلى معايير السلامة.";
        if (lowerMsg.match(/(سباكة|ماء|تسريب|مواسير|plumb|water|leak)/)) return "خدمات السباكة لدينا تشمل:\n- كشف التسربات\n- تركيب وإصلاح الأنابيب\n- صيانة السخانات والمضخات\n\nهل المشكلة طارئة؟";
        if (lowerMsg.match(/(دهان|صباغة|لون|جدار|paint)/)) return "نقدم خدمات صباغة احترافية:\n- دهانات داخلية وخارجية\n- معالجة الشقوق والرطوبة\n- دهانات ديكورية\n\nيمكننا إرسال كتالوج الألوان إليك.";
        if (lowerMsg.match(/(سعر|تكلفة|بكم|فلوس|price|cost)/)) return "تعتمد التكلفة على نوع الخدمة وحجم العمل.\nننصح بحجز **معاينة مجانية** لتقديم عرض سعر دقيق.\nيمكنك الاتصال بنا على 0569098867.";
        if (lowerMsg.match(/(موقع|عنوان|وين|location|address)/)) return "مقرنا في **أبوظبي، الإمارات**.\nونخدم جميع المناطق المجاورة.";
        if (lowerMsg.match(/(رقم|تليفون|اتصال|contact|phone)/)) return "يمكنك التواصل معنا مباشرة عبر:\nالهاتف: 0569098867\nالبريد: sevenbrotherelectromechanical@gmail.com";
        return "شكراً لتواصلك معنا. نحن متخصصون في جميع أعمال الصيانة (تكييف، كهرباء، سباكة، دهانات). يرجى وصف مشكلتك وسنقوم بمساعدتك، أو يمكنك الاتصال بنا مباشرة.";
    }

    const systemPrompt = `You are a helpful customer service agent for SB Electro (UAE). Your goal is to assist users with their inquiries about maintenance services. Rules: 1. Always reply in professional Arabic. 2. Keep answers concise. 3. If asked about prices, suggest a site visit. 4. Be polite.`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }) });
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// ============================================
// BOOT
// ============================================
window.addEventListener('DOMContentLoaded', init);
