/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AI Advisor Module                                           ║
 * ║  Problem analysis using Gemini AI with smart offline fallback║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { API_KEY, GEMINI_MODEL } from './config.js';
import { navigateTo } from './navigation.js';

// ─── Analyze Problem (Main Entry) ──────────────────────────────

export async function analyzeProblem() {
    const input = document.getElementById('ai-problem-input').value.trim();
    const resultContainer = document.getElementById('ai-result-content');
    const initialState = document.getElementById('ai-initial-state');
    const loadingState = document.getElementById('ai-loading-state');

    if (!input) {
        alert("يرجى وصف المشكلة أولاً");
        return;
    }

    // UI Transitions
    initialState.classList.add('hidden');
    resultContainer.classList.add('hidden');
    loadingState.classList.remove('hidden');

    try {
        // Call Gemini API (or smart fallback)
        const data = await callGeminiAPI(input);

        // Parse JSON response
        let analysis;
        try {
            const cleanJson = data.replace(/```json/g, '').replace(/```/g, '').trim();
            analysis = JSON.parse(cleanJson);
        } catch (e) {
            console.error("JSON Parse Error", e);
            analysis = {
                category: "صيانة عامة",
                urgency: "غير محدد",
                diagnosis: "يرجى التواصل مع الفني للمعاينة المباشرة.",
                safety_tip: "افصل التيار الكهربائي إذا كنت تشك بوجود خطر."
            };
        }

        // Update UI
        document.getElementById('ai-category').textContent = "التصنيف: " + analysis.category;
        document.getElementById('ai-diagnosis').textContent = analysis.diagnosis;
        document.getElementById('ai-safety').textContent = analysis.safety_tip;

        const urgencyBadge = document.getElementById('ai-urgency-badge');
        if (analysis.urgency === 'High' || analysis.urgency === 'عالية') {
            urgencyBadge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600";
            urgencyBadge.textContent = "عاجل جداً";
        } else if (analysis.urgency === 'Medium' || analysis.urgency === 'متوسطة') {
            urgencyBadge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-600";
            urgencyBadge.textContent = "متوسطة";
        } else {
            urgencyBadge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-600";
            urgencyBadge.textContent = "عادية";
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

// ─── Gemini API Call (with Smart Offline Fallback) ──────────────

async function callGeminiAPI(userMessage) {
    // If no API key, use expert offline logic
    if (!API_KEY) {
        return getOfflineAnalysis(userMessage);
    }

    const systemPrompt = `
        You are an expert technical consultant for Seven Brothers Electromechanical (UAE). Analyze the user's maintenance problem description in Arabic.
        Output ONLY a JSON object with this structure:
        {
            "category": "Service Category (e.g., AC, Plumbing, Electrical)",
            "urgency": "High/Medium/Low",
            "diagnosis": "A short technical explanation of what might be wrong (in Arabic)",
            "safety_tip": "One immediate safety action the user should take (in Arabic)"
        }
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: userMessage }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// ─── Smart Offline Analysis ────────────────────────────────────
// Expert-level rule-based fallback when no API key is configured

async function getOfflineAnalysis(userMessage) {
    await new Promise(r => setTimeout(r, 2000));

    const lowerMsg = userMessage.toLowerCase();
    let category = "صيانة عامة (General Maintenance)";
    let diagnosis = "بناءً على وصفك، نوصي بمعاينة ميدانية من قبل فني مختص للوقوف على المشكلة الدقيقة.";
    let safety = "يرجى عدم محاولة الإصلاح بنفسك لتجنب أي مخاطر أو أضرار إضافية.";
    let urgency = "Medium";

    // AC Issues
    if (lowerMsg.match(/(تكييف|مكيف|حار|تبريد|صوت|ac|air|cooler|hot|cooling|noise|not cold|freon|gas)/)) {
        category = "تكييف الهواء (Air Conditioning)";
        if (lowerMsg.match(/(صوت|ازعاج|noise|loud)/)) {
            diagnosis = "قد يكون هناك مشكلة في مروحة الوحدة الداخلية/الخارجية، أو أجزاء ميكانيكية متآكلة تحتاج إلى استبدال.";
            safety = "يُفضل إيقاف تشغيل الوحدة لتجنب تفاقم العطل في المحرك الميكانيكي.";
        } else if (lowerMsg.match(/(حار|تبريد|hot|not cold|warm)/)) {
            diagnosis = "احتمال كبير بوجود نقص في غاز الفريون نتيجة تسريب، أو اتساخ شديد في الفلاتر والكويل يمنع التبادل الحراري.";
            safety = "أوقف تشغيل المكيف فوراً لتجنب وضع حمل إضافي يؤدي لاحتراق الضاغط (الكمبروسر).";
        } else {
            diagnosis = "يحتاج النظام إلى فحص شامل لمستوى الغاز، الفلاتر، وكفاءة الضاغط ومروحة التبريد.";
            safety = "تأكد من نظافة الفلاتر بشكل أولي، وإذا استمرت المشكلة اطلب الدعم الفني المختص.";
        }
        urgency = lowerMsg.match(/(حار|hot|not cold)/) ? "High" : "Medium";
    }
    // Electrical Issues
    else if (lowerMsg.match(/(كهرباء|شرار|ريحة|حريق|طافي|التماس|انقطاع|electric|spark|fire|power|breaker|outage|smoke)/)) {
        category = "الأعمال الكهربائية (Electrical)";
        diagnosis = "احتمال وجود تماس كهربائي (Short Circuit)، حمل زائد على القاطع (Tripped Breaker)، أو تآكل وتعرية في الأسلاك.";
        safety = "⚠️ تحذير: افصل التيار الكهربائي من اللوحة الرئيسية فوراً وابتعد عن مكان المشكلة.";
        urgency = "High";
    }
    // Plumbing / Leaks
    else if (lowerMsg.match(/(ماء|تسريب|يخر|غرق|حمام|مغسلة|مطبخ|بالوعة|انسداد|water|leak|pipe|plumb|sink|drain|clog|block)/)) {
        category = "السباكة (Plumbing)";
        if (lowerMsg.match(/(انسداد|مسدود|بالوعة|clog|block|drain)/)) {
            diagnosis = "انسداد في خطوط الصرف نتيجة تراكم الأوساخ أو ترسبات صلبة داخل الأنابيب.";
            safety = "تجنب استخدام المواد الكيميائية القوية (الأسيد) فقد تتآكل الأنابيب. اتصل بفني لفتح السدد بالمعدات المختصة.";
            urgency = "Medium";
        } else {
            diagnosis = "تسرب مياه ناتج عن كسر في الأنابيب أو تلف في الوصلات والصمامات المطاطية.";
            safety = "أغلق محبس المياه الرئيسي للوحدة فوراً لمنع حدوث تسربات وأضرار كبيرة في الأرضيات والجدران.";
            urgency = "High";
        }
    }
    // Painting / Decor
    else if (lowerMsg.match(/(صبغ|دهان|رطوبة|تقشر|جدار|paint|color|wall|moisture|peel)/)) {
        category = "أعمال الصباغة (Painting)";
        diagnosis = "تقشر الدهان ينتج غالباً عن تسرب رطوبة مخفي خلف الجدار، أو أخطاء في التأسيس واستخدام مواد غير مقاومة للرطوبة.";
        safety = "إذا لاحظت بقع رطوبة مستمرة، يجب فحص السباكة القريبة قبل البدء بأي أعمال صباغة جديدة.";
        urgency = "Low";
    }
    // Security Cameras
    else if (lowerMsg.match(/(كاميرا|مراقبة|سكيورتي|انذار|cctv|camera|security|alarm)/)) {
        category = "الأنظمة الأمنية وكاميرات المراقبة (Security & CCTV)";
        diagnosis = "قد يتطلب الأمر فحص التوصيلات الشبكية للكميرات، التخزين (DVR/NVR)، أو تحديد مواقع التركيب المثلى لتحقيق أفضل تغطية أمنية.";
        safety = "احرص على عدم العبث بأسلاك الشبكة أو مقابس الـ DVR لتجنب فقدان أي تسجيلات مهمة.";
        urgency = "Medium";
    }

    return JSON.stringify({
        category: category,
        urgency: urgency,
        diagnosis: diagnosis,
        safety_tip: safety
    });
}

// ─── Register Global Handlers ──────────────────────────────────

window.analyzeProblem = analyzeProblem;
