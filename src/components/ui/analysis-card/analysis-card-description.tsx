import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AnalysisCardDescriptionProps = ComponentProps<"p"> & {
	className?: string;
};

export function AnalysisCardDescription({
	className,
	...props
}: AnalysisCardDescriptionProps) {
	return (
		<p
			className={twMerge(
				"text-xs leading-relaxed text-text-secondary",
				className,
			)}
			{...props}
		/>
	);
}
