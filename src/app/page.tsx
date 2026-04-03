import { RoastStats } from "@/components/roast-stats";
import { HomeContent } from "./home-content";

export default function Home() {
	return <HomeContent stats={<RoastStats />} />;
}
