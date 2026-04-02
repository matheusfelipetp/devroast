import Link from "next/link";

export function Navbar() {
	return (
		<nav className="flex h-14 items-center justify-between border-b border-border-primary bg-bg-page px-4 md:px-10">
			<Link href="/" className="flex items-center gap-2">
				<span className="text-xl font-bold text-accent-green">&gt;</span>
				<span className="text-lg font-medium text-text-primary">devroast</span>
			</Link>

			<div className="flex items-center gap-6">
				<Link
					href="/leaderboard"
					className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
				>
					leaderboard
				</Link>
			</div>
		</nav>
	);
}
