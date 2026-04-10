/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Application Data                                            ║
 * ║  Services, Projects, FAQs & Metadata                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════

export const SERVICES = [
    { id: "ac", title: "صيانة التكييف والدكت", icon: "wind", shortDesc: "تركيب وإصلاح وتنظيف قنوات التكييف.", fullDesc: "في حرارة الإمارات، التكييف الجيد ضرورة. نقدم خدمات شاملة لصيانة مكيفات الهواء، تنظيف الملفات، وتعبئة الغاز.", features: ["تنظيف الكويل", "تعبئة غاز", "تعقيم الدكت"], img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" },
    { id: "plumbing", title: "أعمال السباكة", icon: "droplet", shortDesc: "كشف التسربات وإصلاح الأنابيب.", fullDesc: "من الحنفيات المسربة إلى التركيبات المعقدة. نستخدم تقنيات حديثة لكشف التسربات.", features: ["كشف التسربات", "إصلاح المضخات", "تصليح السخانات"], img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800" },
    { id: "electrical", title: "الأعمال الكهربائية", icon: "zap", shortDesc: "صيانة وتمديدات كهربائية آمنة.", fullDesc: "كهربائيونا المرخصون يضمنون سلامة منشأتك. نتعامل مع صناديق التوزيع وأعطال الماس.", features: ["إصلاح الماس", "تركيب الإضاءة", "صيانة المجمع"], img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800" },
    { id: "painting", title: "أعمال الصباغة", icon: "paint-bucket", shortDesc: "دهانات داخلية وخارجية.", fullDesc: "جدد مساحتك بخدمات الصباغة الاحترافية. نقدم استشارات للألوان وتجهيز الجدران.", features: ["داخلي / خارجي", "معالجة المعجون", "دهانات ديكورية"], img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800" },
    { id: "epoxy", title: "أرضيات إيبوكسي", icon: "check-circle", shortDesc: "أرضيات متينة للكراجات والمستودعات.", fullDesc: "مثالية للكراجات والمساحات الصناعية. مقاومة للزيوت والشحوم.", features: ["أرضيات الكراجات", "طلاء صناعي", "مقاوم للانزلاق"], img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800" },
    { id: "cleaning", title: "خدمات التنظيف", icon: "star", shortDesc: "تنظيف عميق للمنازل والمكاتب.", fullDesc: "تنظيف عميق يزيل الشحوم والأوساخ من الأماكن الصعبة.", features: ["تنظيف عميق", "ما بعد البناء", "الكنب والسجاد"], img: "https://images.unsplash.com/photo-1647381518264-97ff1835026f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "pest", title: "مكافحة الحشرات", icon: "shield-check", shortDesc: "قضاء فعال على الحشرات.", fullDesc: "حلول آمنة ومعتمدة لمكافحة الصراصير والنمل والقوارض.", features: ["جل", "رش", "مكافحة القوارض"], img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800" },
    { id: "amc", title: "عقود الصيانة", icon: "calendar", shortDesc: "عقود سنوية لراحة بالك.", fullDesc: "وفر المال مع باقات الصيانة السنوية للتكييف والكهرباء والسباكة.", features: ["طوارئ 24/7", "زيارات وقائية", "خصم قطع الغيار"], img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800" },
    { id: "civil", title: "أعمال مدنية", icon: "wrench", shortDesc: "بناء، نجارة، وإصلاحات.", fullDesc: "فريق ماهر للأعمال المدنية والنجارة وتجميع الأثاث.", features: ["سيراميك", "نجارة", "أعمال الطابوق"], img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" },
    { id: "security", title: "الأنظمة الأمنية و CCTV", icon: "video", shortDesc: "تركيب وصيانة كاميرات المراقبة والأنظمة الأمنية.", fullDesc: "احمِ منشأتك بأحدث تقنيات المراقبة. صيانة وتركيب جميع أنواع الكاميرات وأنظمة الدخول الذكية.", features: ["كاميرات ذكية", "أنظمة تحكم بالدخول", "صيانة دورية"], img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800" }
];

export const SERVICE_META = {
    ac:         { category: 'cooling',    badge: 'الأكثر طلباً',          eta: 'خلال 60 دقيقة',       priority: 1 },
    electrical: { category: 'electrical', badge: 'فنيون معتمدون',         eta: 'خلال 60-90 دقيقة',    priority: 2 },
    plumbing:   { category: 'plumbing',   badge: 'طوارئ 24/7',           eta: 'خلال 45-75 دقيقة',    priority: 3 },
    painting:   { category: 'finishing',  badge: 'تشطيب احترافي',         eta: 'خلال نفس اليوم',      priority: 6 },
    epoxy:      { category: 'finishing',  badge: 'أعمال متخصصة',         eta: 'موعد حسب المشروع',    priority: 8 },
    cleaning:   { category: 'finishing',  badge: 'خدمة مرنة',            eta: 'خلال نفس اليوم',      priority: 7 },
    pest:       { category: 'safety',     badge: 'حلول آمنة',            eta: 'خلال 2-4 ساعات',      priority: 5 },
    amc:        { category: 'contracts',  badge: 'توفير طويل الأجل',      eta: 'خطة مخصصة',          priority: 9 },
    civil:      { category: 'finishing',  badge: 'فريق متعدد التخصص',    eta: 'حسب نطاق العمل',     priority: 10 },
    security:   { category: 'safety',     badge: 'أنظمة ذكية',           eta: 'خلال 2-4 ساعات',      priority: 4 }
};

// ═══════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════

export const PROJECTS = [
    {
        id: "villa-khalifa",
        title: "تجديد فيلا سكنية",
        category: "سكني",
        location: "مدينة خليفة أ",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        challenge: "احتاج العميل إلى تجديد كامل لنظام التكييف والسباكة لفيلا قديمة تعاني من تسربات متكررة وضعف التبريد.",
        solution: "قمنا باستبدال وحدات التكييف المركزية بوحدات موفرة للطاقة، وإعادة تمديد شبكة المياه باستخدام أنابيب PPR عالية الجودة.",
        result: "تحسن كفاءة التبريد بنسبة 40% واختفاء مشاكل التسربات بالكامل.",
        stats: { duration: "3 أسابيع", type: "صيانة شاملة" }
    },
    {
        id: "office-reem",
        title: "تجهيز مكاتب تجارية",
        category: "تجاري",
        location: "جزيرة الريم",
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        challenge: "تطلب تجهيز طابق مكتبي كامل أعمال كهربائية معقدة وأنظمة إضاءة حديثة مع جداول زمنية ضيقة.",
        solution: "عمل فريقنا بنظام الورديات لتركيب لوحات التوزيع، الإضاءة الذكية، ونقاط البيانات (Data Points) في الوقت المحدد.",
        result: "تسليم المشروع قبل الموعد المحدد بيومين مع اجتياز جميع فحوصات السلامة.",
        stats: { duration: "شهر واحد", type: "كهرباء وإضاءة" }
    },
    {
        id: "warehouse-mussafah",
        title: "أرضيات إيبوكسي للمستودعات",
        category: "صناعي",
        location: "مصفح",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        challenge: "أرضية خرسانية متآكلة تسبب الغبار وتصعب حركة الرافعات الشوكية.",
        solution: "معالجة الشقوق وتطبيق 3 طبقات من طلاء الإيبوكسي الصناعي المقاوم للاحتكاك والمواد الكيميائية.",
        result: "أرضية ناعمة، لامعة، وسهلة التنظيف زادت من كفاءة العمليات اللوجستية.",
        stats: { duration: "10 أيام", type: "أرضيات" }
    },
    {
        id: "mall-ac",
        title: "تركيب تكييف مركز تجاري",
        category: "تجاري",
        location: "دبي مارينا",
        img: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&q=80&w=800",
        challenge: "تركيب نظام تكييف مركزي لمجمع تجاري جديد مع ضمان كفاءة استهلاك الطاقة.",
        solution: "تصميم وتنفيذ نظام VRF متطور مع وحدات تحكم ذكية لتوفير الطاقة.",
        result: "توفير بيئة تسوق مريحة مع خفض استهلاك الطاقة بنسبة 25%.",
        stats: { duration: "شهران", type: "تكييف مركزي" }
    },
    {
        id: "tower-electrical",
        title: "تمديدات كهربائية لفيلا فاخرة",
        category: "سكني",
        location: "نخلة جميرا",
        img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=800",
        challenge: "تنفيذ تمديدات كهربائية وإضاءة ذكية لفيلا فاخرة بتصاميم معقدة.",
        solution: "استخدام أحدث تقنيات الإضاءة LED وأنظمة التحكم الذكي (Smart Home Integration).",
        result: "إضاءة مذهلة وتحكم كامل عبر الهاتف الذكي لجميع مرافق الفيلا.",
        stats: { duration: "4 أسابيع", type: "كهرباء ذكية" }
    },
    {
        id: "hotel-plumbing",
        title: "صيانة سباكة فندق 5 نجوم",
        category: "ضيافة",
        location: "وسط مدينة دبي",
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
        challenge: "تجديد شبكة السباكة القديمة في فندق قيد التشغيل دون إزعاج الضيوف.",
        solution: "العمل في أوقات محددة وبأقسام معزولة باستخدام أنابيب صامتة وعالية المتانة.",
        result: "تحديث كامل للشبكة دون أي شكوى من النزلاء.",
        stats: { duration: "6 أسابيع", type: "سباكة" }
    },
    {
        id: "villa-painting",
        title: "دهانات داخلية وخارجية",
        category: "سكني",
        location: "المرابع العربية",
        img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800",
        challenge: "إعادة طلاء فيلا كاملة مع معالجة تشققات الجدران الخارجية.",
        solution: "استخدام دهانات مقاومة للحرارة والرطوبة مع معالجة احترافية للأسطح.",
        result: "مظهر جديد وجذاب للفيلا مع حماية طويلة الأمد.",
        stats: { duration: "أسبوعان", type: "دهانات" }
    },
    {
        id: "gym-fitout",
        title: "تجهيز صالة رياضية",
        category: "تجاري",
        location: "القوز",
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        challenge: "تركيب أرضيات مطاطية ونظام تهوية قوي لصالة ألعاب رياضية كبيرة.",
        solution: "تركيب أرضيات مخصصة لامتصاص الصدمات ونظام تهوية بضغط عالي.",
        result: "صالة رياضية آمنة وصحية جاهزة لاستقبال المشتركين.",
        stats: { duration: "3 أسابيع", type: "أعمال مدنية" }
    },
    {
        id: "clinic-maintenance",
        title: "عقد صيانة لعيادة طبية",
        category: "طبي",
        location: "الشارقة",
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
        challenge: "الحفاظ على بيئة معقمة ومثالية لعيادة طبية تعمل على مدار الساعة.",
        solution: "عقد صيانة سنوي يشمل التعقيم الدوري وصيانة التكييف والكهرباء.",
        result: "بيئة عمل آمنة ومستقرة للطاقم الطبي والمرضى.",
        stats: { duration: "مستمر", type: "AMC" }
    },
    {
        id: "showroom-lighting",
        title: "إضاءة معرض سيارات",
        category: "تجاري",
        location: "دبي مول",
        img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
        challenge: "تركيب إضاءة تسلط الضوء على السيارات بشكل جذاب دون وهج.",
        solution: "توزيع مدروس للإضاءة الموجهة (Spotlights) والإضاءة المحيطة.",
        result: "عرض مبهر للسيارات زاد من جاذبية المعرض.",
        stats: { duration: "أسبوع واحد", type: "كهرباء" }
    },
    {
        id: "pool-maintenance",
        title: "صيانة وترميم مسبح",
        category: "سكني",
        location: "تلال الإمارات",
        img: "https://images.unsplash.com/photo-1572331165267-854da2b00cc6?auto=format&fit=crop&q=80&w=800",
        challenge: "تسرب مياه المسبح وتلف البلاط القديم.",
        solution: "إعادة العزل المائي وتغيير البلاط بالكامل مع صيانة المضخات.",
        result: "مسبح كالجديد جاهز للاستخدام الصيفي.",
        stats: { duration: "أسبوعان", type: "صيانة مسابح" }
    }
];

export const PROJECT_META = {
    "villa-khalifa":       { featured: true,  score: 1,  durationDays: 21,  badge: "تحسين كفاءة 40%" },
    "office-reem":         { featured: true,  score: 2,  durationDays: 30,  badge: "تسليم قبل الموعد" },
    "warehouse-mussafah":  { featured: false, score: 6,  durationDays: 10,  badge: "تحمل صناعي عالٍ" },
    "mall-ac":             { featured: true,  score: 3,  durationDays: 60,  badge: "توفير طاقة 25%" },
    "tower-electrical":    { featured: false, score: 5,  durationDays: 28,  badge: "تحكم ذكي كامل" },
    "hotel-plumbing":      { featured: false, score: 8,  durationDays: 42,  badge: "تنفيذ دون تعطيل" },
    "villa-painting":      { featured: false, score: 9,  durationDays: 14,  badge: "حماية طويلة الأمد" },
    "gym-fitout":          { featured: false, score: 7,  durationDays: 21,  badge: "جاهزية تشغيل كاملة" },
    "clinic-maintenance":  { featured: true,  score: 4,  durationDays: 365, badge: "عقد مستمر" },
    "showroom-lighting":   { featured: false, score: 10, durationDays: 7,   badge: "إبراز بصري احترافي" },
    "pool-maintenance":    { featured: false, score: 11, durationDays: 14,  badge: "إعادة تأهيل كامل" }
};

// ═══════════════════════════════════════════════════════════════
// FAQs
// ═══════════════════════════════════════════════════════════════

export const FAQS = [
    { q: "هل تقدمون خدمات الطوارئ؟", a: "نعم، نقدم دعم طوارئ على مدار 24/7 للمشاكل الحرجة مثل تسربات المياه الكبيرة أو انقطاع الكهرباء." },
    { q: "هل الفنيون لديكم معتمدون؟", a: "بالتأكيد. جميع فنيينا مدربون ومعتمدون ولديهم خبرة في معايير السلامة في الإمارات." },
    { q: "ما هي المناطق التي تغطونها؟", a: "نخدم بشكل أساسي أبوظبي (بما في ذلك مدينة خليفة، جزيرة ياس، جزيرة الريم) ودبي." },
    { q: "كيف يمكنني الحصول على عرض سعر؟", a: "يمكنك الاتصال بنا مباشرة، أو إرسال رسالة واتساب، أو ملء نموذج الاتصال على هذا الموقع." },
    { q: "هل المعاينة الأولية مجانية؟", a: "في معظم الحالات نعم، نقدم معاينة أولية مجانية داخل مناطق الخدمة لتحديد نطاق العمل بدقة." },
    { q: "كم يستغرق وصول الفني بعد الحجز؟", a: "عادة خلال 45 إلى 90 دقيقة حسب نوع الخدمة وموقعك وحجم الطلبات الحالية." },
    { q: "هل توفرون ضماناً بعد تنفيذ الخدمة؟", a: "نعم، يتم تقديم ضمان حسب نوع الخدمة وقطع الغيار المستخدمة، ويتم توضيحه قبل بدء التنفيذ." },
    { q: "هل يمكن تنفيذ الصيانة في العطلات ونهاية الأسبوع؟", a: "نعم، لدينا فرق عمل مرنة متاحة خلال عطلات نهاية الأسبوع وخارج أوقات الدوام للحالات الخاصة." },
    { q: "هل توفرون عقود صيانة للشركات والمباني؟", a: "نعم، نوفر عقود صيانة دورية مخصصة للشركات، الفلل، الأبراج، والمرافق التجارية." },
    { q: "ما طرق الدفع المتاحة؟", a: "نقبل التحويل البنكي، النقد، وبعض وسائل الدفع الإلكتروني حسب طبيعة المشروع." },
    { q: "هل يمكن طلب أكثر من خدمة في نفس الزيارة؟", a: "نعم، يمكن دمج أكثر من خدمة مثل التكييف والكهرباء والسباكة في زيارة واحدة لتوفير الوقت والتكلفة." },
    { q: "هل تستخدمون قطع غيار أصلية؟", a: "نحرص على استخدام قطع غيار أصلية أو معتمدة عالية الجودة، ونوضح خيارات القطع قبل التركيب." }
];
