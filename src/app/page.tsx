"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { BundledLanguage } from "shiki";
import { CODE_MAX_LENGTH, CodeEditor } from "@/components/code-editor";
import { Button } from "@/components/ui/button";
import {
	LeaderboardCell,
	LeaderboardCellFlex,
	LeaderboardRow,
} from "@/components/ui/leaderboard";
import { Toggle } from "@/components/ui/toggle";

const leaderboardData = [
	{
		rank: "1",
		rankColor: "text-accent-amber",
		score: "1.2",
		lines: [
			'eval(prompt("enter code"))',
			"document.write(response)",
			"// trust the user lol",
		],
		commentStart: 2,
		lang: "javascript",
	},
	{
		rank: "2",
		rankColor: "text-text-secondary",
		score: "1.8",
		lines: [
			"if (x == true) { return true; }",
			"else if (x == false) { return false; }",
			"else { return !false; }",
		],
		commentStart: -1,
		lang: "typescript",
	},
	{
		rank: "3",
		rankColor: "text-text-secondary",
		score: "2.1",
		lines: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
		commentStart: 1,
		lang: "sql",
	},
];

export default function Home() {
	const [code, setCode] = useState("");
	const [roastMode, setRoastMode] = useState(true);
	const [language, setLanguage] = useState<BundledLanguage | null>(null);
	const [autoDetected, setAutoDetected] = useState(false);

	const handleLanguageDetected = useCallback((lang: string) => {
		setLanguage(lang as BundledLanguage);
		setAutoDetected(true);
	}, []);

	const handleLanguageChange = useCallback((lang: string | null) => {
		setLanguage(lang as BundledLanguage | null);
		setAutoDetected(false);
	}, []);

	return (
		<div className="flex w-full flex-col items-center gap-6 md:gap-8 px-4 md:px-0 pb-10 md:pb-15">
			<section className="flex flex-col items-center gap-3 pt-10 md:pt-20">
				<div className="flex flex-wrap items-center gap-2 md:gap-3">
					<span className="text-2xl md:text-4xl font-bold text-accent-green">
						$
					</span>
					<h1 className="text-2xl md:text-4xl font-bold text-text-primary">
						paste your code. get roasted.
					</h1>
				</div>
				<p className="text-sm text-text-secondary">
					{
						"// drop your code below and we'll rate it — brutally honest or full roast mode"
					}
				</p>
			</section>

			<div className="flex w-full max-w-195 flex-col gap-2">
				<CodeEditor
					value={code}
					onChange={setCode}
					language={language}
					autoDetected={autoDetected}
					onLanguageDetected={handleLanguageDetected}
					onLanguageChange={handleLanguageChange}
				/>
			</div>

			<div className="mx-auto flex w-full max-w-195 flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2.5">
						<Toggle checked={roastMode} onCheckedChange={setRoastMode} />
						<span className="text-3.25 text-accent-green">roast mode</span>
					</div>
					<span className="hidden text-xs text-text-tertiary sm:inline">
						{"// maximum sarcasm enabled"}
					</span>
				</div>

				<Button
					variant="primary"
					disabled={code.trim().length === 0 || code.length > CODE_MAX_LENGTH}
				>
					$ roast_my_code
				</Button>
			</div>

			<div className="flex items-center gap-3 md:gap-6 justify-center">
				<span className="text-xs text-text-tertiary">2,847 codes roasted</span>
				<span className="text-xs text-text-tertiary">·</span>
				<span className="text-xs text-text-tertiary">avg score: 4.2/10</span>
			</div>

			<div className="h-8 md:h-15" />

			<section className="w-full max-w-240 flex flex-col gap-4 md:gap-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-sm font-bold text-accent-green">{"//"}</span>
						<span className="text-sm font-bold text-text-primary">
							shame_leaderboard
						</span>
					</div>
					<Link href="/leaderboard">
						<Button variant="outline" size="sm">
							$ view_all &gt;&gt;
						</Button>
					</Link>
				</div>

				<p className="text-3.25 text-text-tertiary">
					{"// the worst code on the internet, ranked by shame"}
				</p>

				<div className="border border-border-primary">
					<div className="hidden md:flex h-10 items-center gap-6 bg-bg-surface border-b border-border-primary px-5">
						<span className="w-12.5 text-xs font-medium text-text-tertiary">
							#
						</span>
						<span className="w-17.5 text-xs font-medium text-text-tertiary">
							score
						</span>
						<span className="min-w-0 flex-1 text-xs font-medium text-text-tertiary">
							code
						</span>
						<span className="w-25 text-xs font-medium text-text-tertiary">
							lang
						</span>
					</div>

					{leaderboardData.map((row) => (
						<LeaderboardRow key={row.rank}>
							<div className="flex items-center gap-3 md:contents">
								<LeaderboardCell className="w-8 md:w-12.5">
									<span className={`text-xs ${row.rankColor}`}>{row.rank}</span>
								</LeaderboardCell>
								<LeaderboardCell className="w-12 md:w-17.5">
									<span className="text-xs font-bold text-accent-red">
										{row.score}
									</span>
								</LeaderboardCell>
								<span className="text-xs text-text-secondary md:hidden">
									· {row.lang}
								</span>
							</div>
							<LeaderboardCellFlex>
								<div className="flex flex-col gap-0.5 overflow-hidden">
									{row.lines.map((line, i) => (
										<span
											key={line}
											className={`truncate text-xs ${i >= row.commentStart && row.commentStart >= 0 ? "text-text-muted" : "text-text-primary"}`}
										>
											{line}
										</span>
									))}
								</div>
							</LeaderboardCellFlex>
							<LeaderboardCell className="hidden md:block w-25">
								<span className="text-xs text-text-secondary">{row.lang}</span>
							</LeaderboardCell>
						</LeaderboardRow>
					))}
				</div>

				<div className="flex justify-center py-4">
					<span className="text-xs text-text-tertiary">
						showing top 3 of 2,847 ·{" "}
						<Link
							href="/leaderboard"
							className="text-text-tertiary hover:text-text-primary transition-colors"
						>
							view full leaderboard &gt;&gt;
						</Link>
					</span>
				</div>
			</section>
		</div>
	);
}
