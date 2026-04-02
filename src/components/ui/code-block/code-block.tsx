import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type CodeBlockProps = ComponentProps<"div"> & { className?: string };

export function CodeBlock({ className, ...props }: CodeBlockProps) {
	return (
		<div
			className={twMerge(
				"overflow-hidden border border-border-primary bg-bg-input",
				className,
			)}
			{...props}
		/>
	);
}
