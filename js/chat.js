/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Professional Chat Bot Module                                ║
 * ║  Enhanced with Conversation Memory & Business Intelligence   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { API_KEY, GEMINI_MODEL } from './config.js';
import { SERVICES, PROJECTS, FAQS } from './data.js';

// ─── State Management ──────────────────────────────────────────
let chatHistory = [];
let isFirstOpen = true;
let lastTopic = null; // Basic memory for offline mode

// ─── Configuration ─────────────────────────────────────────────
const SUGGESTIONS = [
    { label: "❄️ خدمات التكييف", query: "ما هي خدمات التكييف التي تقدمونها؟" },
    { label: "⚡ طوارئ كهرباء", query: "لدي مشكلة طارئة في الكهرباء، ماذا أفعل؟" },
    { label: "💧 تسريب سباكة", query: "عندي تسريب مياه، كيف يمكنكم مساعدتي؟" },
    { label: "📊 عرض سعر", query: "كيف يمكنني الحصول على عرض سعر لمشروعي؟" },
    { label: "📹 كاميرات مراقبة", query: "هل تقومون بتركيب كاميرات المراقبة؟" }
];

// ─── Chat Window Toggle ────────────────────────────────────────

export function toggleChat() {
    const chat = document.getElementById('chat-window');
    const input = document.getElementById('chat-input');
    
    if (chat.classList.contains('hidden')) {
        chat.classList.remove('hidden');
        setTimeout(() => {
            chat.classList.remove('scale-95', 'opacity-0');
            chat.classList.add('scale-100', 'opacity-100');
            
            // Auto-focus input
            if (input) input.focus();

            // Auto-greet on first open
            if (isFirstOpen) {
                setTimeout(sendInitialGreeting, 500);
                isFirstOpen = false;
            }
        }, 30);
    } else {
        chat.classList.remove('scale-100', 'opacity-100');
        chat.classList.add('scale-95', 'opacity-0');
        setTimeout(() => chat.classList.add('hidden'), 300);
    }
}

// ─── Initial Greeting ──────────────────────────────────────────

function sendInitialGreeting() {
    const greeting = `مرحباً بك في **Seven Brothers Electromechanical**! 👋
أنا مساعدك الذكي. يمكنني مساعدتك في أي استفسارات حول صيانة التكييف، الكهرباء، السباكة، وكافة الخدمات الفنية في **أبوظبي والإمارات**.

كيف يمكنني مساعدتك اليوم؟`;
    
    addMessageToUI('bot', greeting);
    renderSuggestions();
}

// ─── Suggestions Logic ─────────────────────────────────────────

export function renderSuggestions() {
    const container = document.getElementById('chat-suggestions');
    if (!container) return;
    
    container.innerHTML = SUGGESTIONS.map(s => `
        <button class="suggestion-chip" onclick="window.useSuggestion('${s.query}')">
            ${s.label}
        </button>
    `).join('');
    
    container.classList.remove('hidden');
    scrollToBottom();
}

export function useSuggestion(query) {
    const input = document.getElementById('chat-input');
    if (!input) return;
    input.value = query;
    sendChatMessage();
    
    // Hide suggestions after use to clean up UI
    const suggestions = document.getElementById('chat-suggestions');
    if (suggestions) suggestions.classList.add('hidden');
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

    // Add User Message
    addMessageToUI('user', message);
    chatHistory.push({ role: "user", parts: [{ text: message }] });
    
    input.value = '';
    scrollToBottom();

    // Show Loading
    const loadingId = showLoading();

    // Call Gemini for Chat
    callGeminiChat(message).then(responseText => {
        hideLoading(loadingId);
        addMessageToUI('bot', responseText);
        chatHistory.push({ role: "model", parts: [{ text: responseText }] });
        scrollToBottom();
    }).catch(err => {
        hideLoading(loadingId);
        addMessageToUI('error', "عذراً، حدث خطأ. يرجى المحاولة لاحقاً.");
    });
}

// ─── UI Helpers ────────────────────────────────────────────────

function addMessageToUI(type, text) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    let html = '';

    if (type === 'user') {
        html = `
            <div class="flex justify-end animate-fade-in mb-2">
                <div class="message-user-bubble text-sm max-w-[85%]">
                    ${text}
                </div>
            </div>
        `;
    } else if (type === 'bot') {
        // Ensure marked is loaded (fallback to plain text if not)
        const parsedText = window.marked ? marked.parse(text) : text;
        html = `
            <div class="flex justify-start animate-fade-in mb-2">
                <div class="message-bot-bubble text-sm max-w-[85%]">
                    ${parsedText}
                </div>
            </div>
        `;
    } else {
        html = `
            <div class="flex justify-start mb-2">
                <div class="bg-red-50 text-red-600 p-3 rounded-xl text-xs border border-red-100">
                    ${text}
                </div>
            </div>
        `;
    }

    container.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
}

function showLoading() {
    const container = document.getElementById('chat-messages');
    const loadingId = 'loading-' + Date.now();
    const loadingHTML = `
        <div id="${loadingId}" class="flex justify-start mb-2">
            <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div class="flex gap-1.5">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', loadingHTML);
    scrollToBottom();
    return loadingId;
}

function hideLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function scrollToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// ─── Gemini Chat API Call ──────────────────────────────────────

async function callGeminiChat(userMessage) {
    if (!API_KEY || API_KEY === "") {
        return getOfflineChatResponse(userMessage);
    }

    const systemPrompt = `
        You are "SB Assistant", the official expert assistant for Seven Brothers Electromechanical (UAE).
        Your primary goal is to help users with maintenance and technical services in Abu Dhabi and Dubai.

        BUSINESS DATA:
        - Services: ${SERVICES.map(s => s.title).join(', ')}
        - Core Expertise: ${SERVICES.map(s => s.features.join(', ')).join(', ')}
        - Key Projects: ${PROJECTS.slice(0, 5).map(p => p.title + " in " + p.location).join(', ')}
        - Main Office: Abu Dhabi, UAE (we serve Abu Dhabi and surrounding areas primarily)
        - Contact: +971 56 909 8867 | Email: sevenbrotherelectromechanical@gmail.com

        RULES:
        1. Always speak in professional and helpful Arabic.
        2. Use the provided business data to give accurate answers. 
        3. If asked about prices, explain that they depend on the scope and suggest a FREE site visit.
        4. Maintain context. If the user refers to "it" or "the problem", check history to understand they mean the AC or plumbing.
        5. Keep responses concise but thorough.
        6. Use bullet points for readability.
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

    const payload = {
        contents: chatHistory,
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!result.ok) throw new Error('API Error');
    const data = await result.json();
    return data.candidates[0].content.parts[0].text;
}

// ─── Smart Offline Chat Responses (Enhanced Memory) ────────────

async function getOfflineChatResponse(userMessage) {
    await new Promise(r => setTimeout(r, 1000));
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for "What did I ask?" or "Memory" questions
    if (lowerMsg.match(/(ذكر|سألتك|قبل قليل|what did I ask)/)) {
        if (lastTopic) {
            return `لقد سألتني للتو عن **${lastTopic}**. كيف يمكنني التعمق أكثر في هذا الموضوع لمساعدتك؟`;
        }
        return "لقد بدأنا المحادثة للتو! أخبرني كيف يمكنني مساعدتك في خدمات الصيانة في **أبوظبي**؟";
    }

    if (lowerMsg.match(/(تكييف|مكيف|ac)/)) {
        lastTopic = "صيانة التكييف";
        return "لدينا خبرة واسعة في صيانة التكييف المركزي والـ Split. نخدم كافة مناطق **أبوظبي ودبي**. هل تود حجز موعد للمعاينة؟";
    }
    
    if (lowerMsg.match(/(كهرباء|electric)/)) {
        lastTopic = "الأعمال الكهربائية";
        return "فريقنا الكهربائي معتمد وخبير في تمديدات الفلل والمكاتب. هل تعاني من انقطاع مفاجئ؟";
    }
    
    if (lowerMsg.match(/(سعر|تكلفة|بكم)/)) return "تعتمد التكلفة على حجم العمل. يمكننا إرسال فني للمعاينة مجاناً وتقديم عرض سعر دقيق. اتصل بنا على +971 56 909 8867.";
    if (lowerMsg.match(/(رقم|تواصل|واتس)/)) return "يمكنك الاتصال بنا على +971 56 909 8867 أو مراسلتنا عبر واتساب للمساعدة الفورية.";
    
    return "شكراً لتواصلك. أنا أعمل حالياً في وضع المساعدة المحدودة، ولكنني أتذكر اهتمامك بقطاع الصيانة. يرجى الاتصال بنا مباشرة للحصول على رد فوري من خبير.";
}

// ─── Register Global Handlers ──────────────────────────────────
window.toggleChat = toggleChat;
window.handleChatInput = handleChatInput;
window.sendChatMessage = sendChatMessage;
window.useSuggestion = useSuggestion;
window.renderSuggestions = renderSuggestions;
