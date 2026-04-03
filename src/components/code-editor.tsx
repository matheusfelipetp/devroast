"use client";

import {
	type KeyboardEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import type { BundledLanguage } from "shiki";
import { twMerge } from "tailwind-merge";
import { LanguageSelector } from "@/components/language-selector";
import { detectLanguage } from "@/lib/detect-language";
import { highlightCode } from "@/lib/highlighter";

type CodeEditorProps = {
	value: string;
	onChange: (value: string) => void;
	language: BundledLanguage | null;
	autoDetected: boolean;
	onLanguageDetected: (language: string) => void;
	onLanguageChange: (language: string | null) => void;
	className?: string;
};

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

export function CodeEditor({
	value,
	onChange,
	language,
	autoDetected,
	onLanguageDetected,
	onLanguageChange,
	className,
}: CodeEditorProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const highlightRef = useRef<HTMLDivElement>(null);
	const lineNumbersRef = useRef<HTMLDivElement>(null);
	const [lineCount, setLineCount] = useState(1);
	const [highlightedHtml, setHighlightedHtml] = useState("");
	const highlightTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
	const detectTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
	const valueRef = useRef(value);
	valueRef.current = value;

	const updateLineCount = useCallback((text: string) => {
		setLineCount(text.split("\n").length || 1);
	}, []);

	const runHighlight = useCallback(
		async (code: string, lang: BundledLanguage | null) => {
			if (!code) {
				setHighlightedHtml("");
				return;
			}

			if (!lang) {
				setHighlightedHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
				return;
			}

			const html = await highlightCode(code, lang);
			setHighlightedHtml(html);
		},
		[],
	);

	const debouncedHighlight = useCallback(
		(code: string, lang: BundledLanguage | null) => {
			if (highlightTimerRef.current) {
				clearTimeout(highlightTimerRef.current);
			}
			highlightTimerRef.current = setTimeout(() => {
				runHighlight(code, lang);
			}, 100);
		},
		[runHighlight],
	);

	const debouncedDetect = useCallback(
		(code: string) => {
			if (detectTimerRef.current) {
				clearTimeout(detectTimerRef.current);
			}
			detectTimerRef.current = setTimeout(() => {
				const detected = detectLanguage(code);
				if (detected) {
					onLanguageDetected(detected);
				}
			}, 400);
		},
		[onLanguageDetected],
	);

	useEffect(() => {
		return () => {
			if (highlightTimerRef.current) {
				clearTimeout(highlightTimerRef.current);
			}
			if (detectTimerRef.current) {
				clearTimeout(detectTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		runHighlight(valueRef.current, language);
	}, [language, runHighlight]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const text = e.target.value;
			onChange(text);
			updateLineCount(text);
			debouncedHighlight(text, language);

			if (autoDetected || !language) {
				debouncedDetect(text);
			}
		},
		[
			onChange,
			updateLineCount,
			debouncedHighlight,
			debouncedDetect,
			language,
			autoDetected,
		],
	);

	const handlePaste = useCallback(
		(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
			const pastedText = e.clipboardData.getData("text");
			const textarea = textareaRef.current;
			const start = textarea?.selectionStart ?? 0;
			const end = textarea?.selectionEnd ?? 0;
			const currentValue = valueRef.current;
			const fullText =
				currentValue.slice(0, start) + pastedText + currentValue.slice(end);

			const detected = detectLanguage(fullText);
			if (detected) {
				onLanguageDetected(detected);
			}
		},
		[onLanguageDetected],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLTextAreaElement>) => {
			const textarea = textareaRef.current;
			if (!textarea) return;

			if (e.key === "Tab") {
				e.preventDefault();
				const { selectionStart, selectionEnd, value: text } = textarea;

				if (e.shiftKey) {
					const lineStart = text.lastIndexOf("\n", selectionStart - 1) + 1;
					const line = text.slice(lineStart, selectionEnd);
					const dedented = line.replace(/^\t/, "");
					const removed = line.length - dedented.length;

					if (removed > 0) {
						const newText =
							text.slice(0, lineStart) + dedented + text.slice(selectionEnd);
						onChange(newText);
						updateLineCount(newText);
						debouncedHighlight(newText, language);
						requestAnimationFrame(() => {
							textarea.selectionStart = Math.max(
								selectionStart - removed,
								lineStart,
							);
							textarea.selectionEnd = selectionEnd - removed;
						});
					}
				} else {
					const newText = `${text.slice(0, selectionStart)}\t${text.slice(selectionEnd)}`;
					onChange(newText);
					updateLineCount(newText);
					debouncedHighlight(newText, language);
					requestAnimationFrame(() => {
						textarea.selectionStart = selectionStart + 1;
						textarea.selectionEnd = selectionStart + 1;
					});
				}
			}
		},
		[onChange, updateLineCount, debouncedHighlight, language],
	);

	const handleScroll = useCallback(() => {
		const textarea = textareaRef.current;
		const highlight = highlightRef.current;
		const lineNumbers = lineNumbersRef.current;

		if (textarea && highlight) {
			highlight.scrollTop = textarea.scrollTop;
			highlight.scrollLeft = textarea.scrollLeft;
		}

		if (textarea && lineNumbers) {
			lineNumbers.scrollTop = textarea.scrollTop;
		}
	}, []);

	return (
		<div
			className={twMerge(
				"w-full overflow-hidden border border-border-primary bg-bg-input",
				className,
			)}
		>
			<div className="flex h-10 items-center justify-between border-b border-border-primary px-4">
				<div className="flex items-center gap-2">
					<span className="size-3 rounded-full bg-accent-red" />
					<span className="size-3 rounded-full bg-accent-amber" />
					<span className="size-3 rounded-full bg-accent-green" />
				</div>
				<LanguageSelector
					value={language}
					autoDetected={autoDetected}
					onChange={onLanguageChange}
				/>
			</div>

			<div className="flex h-60 md:h-90">
				<div
					ref={lineNumbersRef}
					className="flex w-12 shrink-0 flex-col border-r border-border-primary bg-bg-surface px-3 py-4 text-right select-none overflow-hidden"
				>
					{Array.from({ length: lineCount }, (_, i) => (
						<span
							key={i}
							className="text-xs text-text-tertiary leading-snug shrink-0"
						>
							{i + 1}
						</span>
					))}
				</div>

				<div className="relative min-w-0 flex-1">
					<div
						ref={highlightRef}
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 overflow-hidden p-4 font-mono text-xs leading-snug whitespace-pre-wrap wrap-break-word [&_pre]:m-0! [&_pre]:p-0! [&_pre]:bg-transparent! [&_code]:bg-transparent! [&_pre]:font-mono! [&_pre]:text-xs! [&_pre]:leading-snug!"
						dangerouslySetInnerHTML={{ __html: highlightedHtml }}
					/>

					<textarea
						ref={textareaRef}
						value={value}
						onChange={handleChange}
						onPaste={handlePaste}
						onKeyDown={handleKeyDown}
						onScroll={handleScroll}
						spellCheck={false}
						placeholder="// paste your code here..."
						className={twMerge(
							"relative z-10 size-full resize-none bg-transparent p-4 font-mono text-xs leading-snug caret-text-primary outline-none placeholder:text-text-muted",
							value ? "text-transparent" : "text-text-primary",
						)}
					/>
				</div>
			</div>
		</div>
	);
}
