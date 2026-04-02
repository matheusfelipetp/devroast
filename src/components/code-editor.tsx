"use client";

import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function CodeEditor({
	value,
	onChange,
	className,
}: {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const lineNumbersRef = useRef<HTMLDivElement>(null);
	const [lineCount, setLineCount] = useState(1);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const text = e.target.value;
			onChange(text);
			setLineCount(text.split("\n").length || 1);
		},
		[onChange],
	);

	const handleScroll = useCallback(() => {
		if (textareaRef.current && lineNumbersRef.current) {
			lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
		}
	}, []);

	return (
		<div
			className={twMerge(
				"w-full overflow-hidden border border-border-primary bg-bg-input",
				className,
			)}
		>
			<div className="flex h-10 items-center gap-2 border-b border-border-primary px-4">
				<span className="size-3 rounded-full bg-accent-red" />
				<span className="size-3 rounded-full bg-accent-amber" />
				<span className="size-3 rounded-full bg-accent-green" />
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

				<textarea
					ref={textareaRef}
					value={value}
					onChange={handleChange}
					onScroll={handleScroll}
					spellCheck={false}
					placeholder="// paste your code here..."
					className="min-w-0 flex-1 resize-none bg-transparent p-4 font-mono text-xs leading-snug text-text-primary outline-none placeholder:text-text-muted"
				/>
			</div>
		</div>
	);
}
