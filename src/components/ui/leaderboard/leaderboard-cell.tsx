import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type LeaderboardCellProps = ComponentProps<"div"> & { className?: string };

export function LeaderboardCell({ className, ...props }: LeaderboardCellProps) {
	return <div className={twMerge("shrink-0", className)} {...props} />;
}
