import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AnalysisCardProps = ComponentProps<"div"> & {
	className?: string;
};

export function AnalysisCard({ className, ...props }: AnalysisCardProps) {
	return (
		<div
			className={twMerge(
				"flex flex-col gap-3 border border-border-primary p-5",
				className,
			)}
			{...props}
		/>
	);
}
