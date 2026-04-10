/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Chat Bot Module                                             ║
 * ║  Live chat interface with Gemini AI & offline responses      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { API_KEY, GEMINI_MODEL } from './config.js';

// ─── Chat Window Toggle ────────────────────────────────────────

export function toggleChat() {
    const chat = document.getElementById('chat-window');
    if (chat.classList.contains('hidden')) {
        chat.classList.remove('hidden');
        setTimeout(() => {
            chat.classList.remove('scale-95', 'opacity-0');
            chat.classList.add('scale-100', 'opacity-100');
        }, 10);
    } else {
        chat.classList.remove('scale-100', 'opacity-100');
        chat.classList.add('scale-95', 'opacity-0');
        setTimeout(() => chat.classList.add('hidden'), 300);
    }
}

// ─── Chat Input Handler ────────────────────────────────────────

export function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// ─── Send Chat Message ─────────────────────────────────────────

export function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const messagesContainer = document.getElementById('chat-messages');

    // User Message
    const userMsgHTML = `
        <div class="flex justify-end">
            <div class="bg-blue-600 text-white p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-sm text-sm max-w-[85%]">
                ${message}
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMsgHTML);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Bot Response (Loading)
    const loadingId = 'loading-' + Date.now();
    const loadingHTML = `
        <div id="${loadingId}" class="flex justify-start">
            <div class="bg-white border border-slate-200 text-slate-700 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm text-sm max-w-[85%]">
                <div class="flex gap-1">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', loadingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Call Gemini for Chat
    callGeminiChat(message).then(responseText => {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        const botMsgHTML = `
            <div class="flex justify-start">
                <div class="bg-white border border-slate-200 text-slate-700 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm text-sm max-w-[85%] leading-relaxed">
                    ${marked.parse(responseText)}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', botMsgHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }).catch(err => {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        const errorHTML = `
            <div class="flex justify-start">
                <div class="bg-red-50 border border-red-100 text-red-600 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm text-sm max-w-[85%]">
                    عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', errorHTML);
    });
}

// ─── Gemini Chat API Call ──────────────────────────────────────

async function callGeminiChat(userMessage) {
    // If no API key, use smart offline responses
    if (!API_KEY) {
        return getOfflineChatResponse(userMessage);
    }

    const systemPrompt = `
        You are a helpful customer service agent for Seven Brothers Electromechanical (UAE). 
        Your goal is to assist users with their inquiries about maintenance services (AC, Plumbing, Electrical, etc.).
        Rules:
        1. Always reply in professional Arabic.
        2. Keep answers concise and helpful.
        3. If asked about prices, give general info but suggest a site visit for accurate quotes.
        4. Be polite and engaging.
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: userMessage }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
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

// ─── Smart Offline Chat Responses ──────────────────────────────
// Keyword-based responses when API key is not configured

async function getOfflineChatResponse(userMessage) {
    await new Promise(r => setTimeout(r, 1000));

    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.match(/(مرحبا|هلا|السلام|hi|hello|hey)/)) {
        return "أهلاً بك في Seven Brothers Electromechanical! 🛠️\nكيف يمكنني مساعدتك اليوم في خدمات الصيانة؟";
    }

    if (lowerMsg.match(/(تكييف|مكيف|تبريد|حار|ac|cool)/)) {
        return "نقدم خدمات متكاملة للتكييف تشمل:\n❄️ صيانة وقائية\n❄️ تنظيف الدكت\n❄️ تعبئة غاز\n❄️ إصلاح الكمبروسر\n\nهل تود حجز موعد للصيانة؟";
    }

    if (lowerMsg.match(/(كهرباء|لمبة|فيش|قاطع|electric|power|light)/)) {
        return "فريقنا الكهربائي جاهز للمساعدة في:\n⚡ تمديد الأسلاك\n⚡ تركيب الإضاءة والمقابس\n⚡ إصلاح الأعطال وانقطاع التيار\n\nنضمن لك أعلى معايير السلامة.";
    }

    if (lowerMsg.match(/(سباكة|ماء|تسريب|مواسير|plumb|water|leak)/)) {
        return "خدمات السباكة لدينا تشمل:\n💧 كشف التسربات\n💧 تركيب وإصلاح الأنابيب\n💧 صيانة السخانات والمضخات\n\nهل المشكلة طارئة؟";
    }

    if (lowerMsg.match(/(دهان|صباغة|لون|جدار|paint)/)) {
        return "نقدم خدمات صباغة احترافية:\n🎨 دهانات داخلية وخارجية\n🎨 معالجة الشقوق والرطوبة\n🎨 دهانات ديكورية\n\nيمكننا إرسال كتالوج الألوان إليك.";
    }

    if (lowerMsg.match(/(كاميرا|مراقبة|سكيورتي|انذار|cctv|camera|security)/)) {
        return "نوفر حلولاً أمنية متكاملة:\n📹 توريد وتركيب كاميرات دقيقة\n📹 صيانة أنظمة المراقبة (DVR/NVR)\n📹 تركيب أجهزة التحكم بالدخول\n\nهل ترغب بتأمين منزلك أم مكان عملك؟";
    }

    if (lowerMsg.match(/(سعر|تكلفة|بكم|فلوس|price|cost)/)) {
        return "تعتمد التكلفة على نوع الخدمة وحجم العمل. 💰\nننصح بحجز **معاينة مجانية** لتقديم عرض سعر دقيق.\nيمكنك الاتصال بنا على +971 56 909 8867.";
    }

    if (lowerMsg.match(/(موقع|عنوان|وين|location|address)/)) {
        return "مقرنا في **أبوظبي، الإمارات**.\nونخدم جميع المناطق المجاورة. 📍";
    }

    if (lowerMsg.match(/(رقم|تليفون|اتصال|contact|phone)/)) {
        return "يمكنك التواصل معنا مباشرة عبر:\n📞 الهاتف: +971 56 909 8867\n📧 البريد: sevenbrotherelectromechanical@gmail.com";
    }

    // Default Fallback
    return "شكراً لتواصلك معنا. نحن متخصصون في جميع أعمال الصيانة (تكييف، كهرباء، سباكة، دهانات). يرجى وصف مشكلتك وسنقوم بمساعدتك، أو يمكنك الاتصال بنا مباشرة.";
}

// ─── Register Global Handlers ──────────────────────────────────

window.toggleChat = toggleChat;
window.handleChatInput = handleChatInput;
window.sendChatMessage = sendChatMessage;
