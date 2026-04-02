import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type LeaderboardCellFlexProps = ComponentProps<"div"> & {
	className?: string;
};

export function LeaderboardCellFlex({
	className,
	...props
}: LeaderboardCellFlexProps) {
	return <div className={twMerge("min-w-0 flex-1", className)} {...props} />;
}
