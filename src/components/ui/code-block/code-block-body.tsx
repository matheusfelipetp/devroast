import type { ComponentProps } from "react";
import { codeToHtml } from "shiki";
import { twMerge } from "tailwind-merge";

type CodeBlockBodyProps = ComponentProps<"div"> & {
	code: string;
	language?: string;
	className?: string;
};

export async function CodeBlockBody({
	code,
	language = "javascript",
	className,
	...props
}: CodeBlockBodyProps) {
	const html = await codeToHtml(code, {
		lang: language,
		theme: "vesper",
	});

	return (
		<div
			className={twMerge(
				"overflow-x-auto font-mono text-3.25 [&_pre]:bg-transparent! [&_pre]:p-3 [&_code]:bg-transparent!",
				className,
			)}
			dangerouslySetInnerHTML={{ __html: html }}
			{...props}
		/>
	);
}
