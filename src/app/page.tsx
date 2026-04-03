import { RoastStats } from "@/components/roast-stats";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { HomeContent } from "./home-content";

export default function Home() {
	prefetch(trpc.roast.getStats.queryOptions());

	return (
		<HydrateClient>
			<HomeContent stats={<RoastStats />} />
		</HydrateClient>
	);
}
