import type { BundledLanguage, Highlighter } from "shiki";
import { createHighlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;
const loadedLanguages = new Set<string>();

function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ["vesper"],
			langs: [],
		});
	}
	return highlighterPromise;
}

async function ensureLanguageLoaded(
	highlighter: Highlighter,
	lang: BundledLanguage,
): Promise<void> {
	if (loadedLanguages.has(lang)) return;
	await highlighter.loadLanguage(lang);
	loadedLanguages.add(lang);
}

export async function highlightCode(
	code: string,
	lang: BundledLanguage,
): Promise<string> {
	const highlighter = await getHighlighter();
	await ensureLanguageLoaded(highlighter, lang);

	return highlighter.codeToHtml(code, {
		lang,
		theme: "vesper",
	});
}
