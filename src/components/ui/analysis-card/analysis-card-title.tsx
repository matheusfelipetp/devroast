import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AnalysisCardTitleProps = ComponentProps<"p"> & {
	className?: string;
};

export function AnalysisCardTitle({
	className,
	...props
}: AnalysisCardTitleProps) {
	return (
		<p
			className={twMerge("font-mono text-3.25 text-text-primary", className)}
			{...props}
		/>
	);
}
