import type { Metadata } from "next";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockHeader,
} from "@/components/ui/code-block";

export const metadata: Metadata = {
	title: "shame leaderboard — devroast",
	description: "the most roasted code on the internet, ranked by shame",
};

type LeaderboardEntry = {
	rank: number;
	score: number;
	language: string;
	code: string;
};

const entries: LeaderboardEntry[] = [
	{
		rank: 1,
		score: 1.2,
		language: "javascript",
		code: 'eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol',
	},
	{
		rank: 2,
		score: 1.8,
		language: "typescript",
		code: "if (x == true) { return true; }\nelse if (x == false) { return false; }\nelse { return !false; }",
	},
	{
		rank: 3,
		score: 2.1,
		language: "sql",
		code: "SELECT * FROM users WHERE 1=1\n-- TODO: add authentication",
	},
	{
		rank: 4,
		score: 2.3,
		language: "java",
		code: "catch (e) {\n  // ignore\n}",
	},
	{
		rank: 5,
		score: 2.5,
		language: "javascript",
		code: 'const sleep = (ms) =>\n  new Promise(r => setTimeout(r, ms))\nawait sleep(10000) // "loading..."',
	},
];

function LineNumbers({ count }: { count: number }) {
	return (
		<div className="flex w-10 shrink-0 flex-col items-end gap-1.5 border-r border-border-primary bg-bg-surface px-2.5 py-3.5">
			{Array.from({ length: count }, (_, i) => (
				<span
					key={`ln-${i}`}
					className="font-mono text-xs leading-snug text-text-tertiary"
				>
					{i + 1}
				</span>
			))}
		</div>
	);
}

export default async function LeaderboardPage() {
	return (
		<div className="mx-auto flex w-full max-w-240 flex-col gap-10 px-4 py-10 md:px-20">
			<section className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<span className="text-2xl font-bold text-accent-green md:text-3xl">
						{">"}
					</span>
					<h1 className="text-2xl font-bold text-text-primary md:text-3xl">
						shame_leaderboard
					</h1>
				</div>

				<p className="font-mono text-sm text-text-secondary">
					{"// the most roasted code on the internet"}
				</p>

				<div className="flex items-center gap-2">
					<span className="font-mono text-xs text-text-tertiary">
						2,847 submissions
					</span>
					<span className="font-mono text-xs text-text-tertiary">·</span>
					<span className="font-mono text-xs text-text-tertiary">
						avg score: 4.2/10
					</span>
				</div>
			</section>

			<section className="flex flex-col gap-5">
				{entries.map((entry) => {
					const lineCount = entry.code.split("\n").length;

					return (
						<article key={entry.rank}>
							<CodeBlock>
								<CodeBlockHeader className="h-12 justify-between px-5">
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1.5">
											<span className="font-mono text-3.25 text-text-tertiary">
												#
											</span>
											<span
												className={`font-mono text-3.25 font-bold ${entry.rank === 1 ? "text-accent-amber" : "text-text-tertiary"}`}
											>
												{entry.rank}
											</span>
										</div>
										<div className="flex items-center gap-1.5">
											<span className="font-mono text-xs text-text-tertiary">
												score:
											</span>
											<span className="font-mono text-3.25 font-bold text-accent-red">
												{entry.score.toFixed(1)}
											</span>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<span className="font-mono text-xs text-text-secondary">
											{entry.language}
										</span>
										<span className="font-mono text-xs text-text-tertiary">
											{lineCount} lines
										</span>
									</div>
								</CodeBlockHeader>

								<div className="flex">
									<LineNumbers count={lineCount} />
									<CodeBlockBody
										code={entry.code}
										language={entry.language}
										className="flex-1 px-4 py-3.5 text-xs leading-snug [&_pre]:p-0!"
									/>
								</div>
							</CodeBlock>
						</article>
					);
				})}
			</section>
		</div>
	);
}
