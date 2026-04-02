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
			<span className="size-2.5 rounded-full bg-accent-red" />
			<span className="size-2.5 rounded-full bg-accent-amber" />
			<span className="size-2.5 rounded-full bg-accent-green" />
			<span className="flex-1" />
			{children}
		</div>
	);
}
