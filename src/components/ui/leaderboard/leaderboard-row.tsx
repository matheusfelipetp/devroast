import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type LeaderboardRowProps = ComponentProps<"div"> & {
	className?: string;
};

export function LeaderboardRow({ className, ...props }: LeaderboardRowProps) {
	return (
		<div
			className={twMerge(
				"flex flex-col gap-2 md:flex-row md:items-center md:gap-6 border-b border-border-primary px-3 md:px-5 py-3 md:py-4",
				className,
			)}
			{...props}
		/>
	);
}
