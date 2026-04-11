/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Application Configuration                                   ║
 * ║  Seven Brothers Electromechanical                            ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * ⚠️  SECURITY NOTICE:
 *     For production deployment, NEVER expose API keys in client-side code.
 *     Use a server-side proxy (Node.js, Cloudflare Worker, etc.) to handle
 *     API requests securely. The key below is for development/demo only.
 */

// ─── Gemini AI Configuration ───────────────────────────────────
// To enable AI features, add your Gemini API key here.
// For production: route requests through a backend proxy.
export const API_KEY = "";

export const GEMINI_MODEL = "gemini-2.5-flash";

// Resolve API key from multiple sources so key rotation does not require code edits.
export function getGeminiApiKey() {
	const fallback = (API_KEY || '').trim();

	if (typeof window === 'undefined') {
		return fallback;
	}

	const runtimeKey = (
		window.SB_RUNTIME_CONFIG?.geminiApiKey ||
		window.SB_GEMINI_API_KEY ||
		''
	).trim();

	let localStorageKey = '';
	try {
		localStorageKey = (window.localStorage.getItem('SB_GEMINI_API_KEY') || '').trim();
	} catch (_) {
		// Ignore storage access issues in restricted browser modes.
	}

	return runtimeKey || localStorageKey || fallback;
}

export function setGeminiApiKey(key) {
	if (typeof window === 'undefined') return;

	const value = (key || '').trim();
	if (!value) return;

	try {
		window.localStorage.setItem('SB_GEMINI_API_KEY', value);
	} catch (_) {
		// Ignore storage write errors.
	}
}

export function clearGeminiApiKey() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.removeItem('SB_GEMINI_API_KEY');
	} catch (_) {
		// Ignore storage removal errors.
	}
}

if (typeof window !== 'undefined') {
	window.setGeminiApiKey = setGeminiApiKey;
	window.clearGeminiApiKey = clearGeminiApiKey;
}

// ─── Company Contact Information ───────────────────────────────
export const WHATSAPP_NUMBER = "971569098867";
export const COMPANY_PHONE = "+971 56 909 8867";
export const COMPANY_EMAIL = "sevenbrotherelectromechanical@gmail.com";
