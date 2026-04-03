import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type CodeBlockHeaderProps = ComponentProps<"div"> & { className?: string };

export function CodeBlockHeader({
	className,
	children,
	...props
}: CodeBlockHeaderProps) {
	return (
		<div
			className={twMerge(
				"flex h-10 items-center gap-3 border-b border-border-primary px-4",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
