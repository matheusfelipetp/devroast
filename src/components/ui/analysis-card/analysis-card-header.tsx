import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AnalysisCardHeaderProps = ComponentProps<"div"> & {
	className?: string;
};

export function AnalysisCardHeader({
	className,
	...props
}: AnalysisCardHeaderProps) {
	return (
		<div className={twMerge("flex items-center gap-2", className)} {...props} />
	);
}
