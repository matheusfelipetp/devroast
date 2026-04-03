"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function RoastStats() {
	const trpc = useTRPC();
	const { data } = useQuery(trpc.roast.getStats.queryOptions());

	const totalRoasts = data?.totalRoasts ?? 0;
	const avgScore = data?.avgScore ?? 0;

	return (
		<div className="flex items-center gap-3 md:gap-6 justify-center">
			<span className="text-xs text-text-tertiary">
				<NumberFlow value={totalRoasts} locales="en-US" /> codes roasted
			</span>
			<span className="text-xs text-text-tertiary">·</span>
			<span className="text-xs text-text-tertiary">
				avg score:{" "}
				<NumberFlow
					value={avgScore}
					format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
				/>
				/10
			</span>
		</div>
	);
}
