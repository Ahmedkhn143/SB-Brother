/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Contact Form Module                                         ║
 * ║  Validation, submission & WhatsApp redirect                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { WHATSAPP_NUMBER } from './config.js';

// ─── Service Label Mapping ─────────────────────────────────────

const SERVICE_LABELS = {
    ac: 'صيانة التكييف',
    plumbing: 'أعمال السباكة',
    electrical: 'الأعمال الكهربائية',
    painting: 'صباغة ودهانات',
    cleaning: 'تنظيف',
    security: 'كاميرات المراقبة والأنظمة الأمنية',
    other: 'خدمة أخرى'
};

const PREFERRED_LABELS = {
    phone: 'اتصال هاتفي',
    whatsapp: 'واتساب',
    email: 'بريد إلكتروني'
};

// ─── Contact Form Setup ────────────────────────────────────────

export function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('contact-submit');
    const feedback = document.getElementById('contact-form-feedback');
    const msgInput = document.getElementById('contact-message');
    const msgCounter = document.getElementById('contact-message-counter');

    // Feedback helper
    const setFeedback = (message, type) => {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-700', 'bg-green-50', 'border-green-200', 'text-green-700');
        if (type === 'error') {
            feedback.classList.add('bg-red-50', 'border-red-200', 'text-red-700');
        } else {
            feedback.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
        }
    };

    // Character counter
    if (msgInput && msgCounter) {
        const syncCounter = () => {
            msgCounter.textContent = `${msgInput.value.length} / 800`;
        };
        syncCounter();
        msgInput.addEventListener('input', syncCounter);
    }

    // Form submit handler
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.elements.name.value.trim();
        const phone = form.elements.phone.value.trim();
        const service = form.elements.service.value;
        const message = form.elements.message.value.trim();
        const email = (form.elements.email?.value || '').trim();
        const preferred = form.elements.preferred?.value || 'phone';
        const preferredTime = form.elements.preferredTime?.value || 'أي وقت';
        const urgent = Boolean(form.elements.urgent?.checked);
        const consent = Boolean(form.elements.consent?.checked);

        // ─── Validation ────────────────────────────────
        const phoneRegex = /^\+?[0-9\s-]{8,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || name.length < 2) {
            setFeedback('يرجى إدخال الاسم بشكل صحيح (حرفان على الأقل).', 'error');
            return;
        }
        if (!phoneRegex.test(phone)) {
            setFeedback('يرجى إدخال رقم هاتف صحيح.', 'error');
            return;
        }
        if (!service) {
            setFeedback('يرجى اختيار نوع الخدمة المطلوبة.', 'error');
            return;
        }
        if (!message || message.length < 10) {
            setFeedback('يرجى كتابة رسالة أوضح (10 أحرف على الأقل).', 'error');
            return;
        }
        if (email && !emailRegex.test(email)) {
            setFeedback('يرجى إدخال بريد إلكتروني صحيح أو تركه فارغاً.', 'error');
            return;
        }
        if (!consent) {
            setFeedback('يرجى الموافقة على سياسة التواصل قبل الإرسال.', 'error');
            return;
        }

        // ─── Build WhatsApp Message ────────────────────
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
        }

        const serviceText = SERVICE_LABELS[service] || service;
        const preferredText = PREFERRED_LABELS[preferred] || 'اتصال هاتفي';

        const waText =
`طلب جديد من الموقع
الاسم: ${name}
الهاتف: ${phone}
البريد الإلكتروني: ${email || 'غير مضاف'}
الخدمة: ${serviceText}
طريقة التواصل المفضلة: ${preferredText}
الوقت المناسب للتواصل: ${preferredTime}
حالة الطلب: ${urgent ? 'طارئ' : 'عادي'}
الرسالة: ${message}`;

        setFeedback('تم تجهيز رسالتك بنجاح. سيتم تحويلك إلى واتساب لإرسال الطلب مباشرة.', 'success');

        setTimeout(() => {
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        }, 600);
    });
}
