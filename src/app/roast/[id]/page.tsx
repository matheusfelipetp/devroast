import type { Metadata } from "next";
import {
	AnalysisCard,
	AnalysisCardDescription,
	AnalysisCardHeader,
	AnalysisCardTitle,
} from "@/components/ui/analysis-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockBody } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";

export const metadata: Metadata = {
	title: "roast result — devroast",
	description: "your code has been roasted. see the brutal results.",
};

const roastData = {
	score: 3.5,
	verdict: "needs_serious_help" as const,
	roastMessage:
		'"this code looks like it was written during a power outage... in 2005."',
	language: "javascript",
	lineCount: 16,
	code: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }

  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }

  // TODO: handle tax calculation
  // TODO: handle currency conversion

  return total;
}`,
	analysis: [
		{
			severity: "critical" as const,
			title: "using var instead of const/let",
			description:
				"var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
		},
		{
			severity: "warning" as const,
			title: "imperative loop pattern",
			description:
				"for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
		},
		{
			severity: "good" as const,
			title: "clear naming conventions",
			description:
				"calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
		},
		{
			severity: "good" as const,
			title: "single responsibility",
			description:
				"the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
		},
	],
	diff: [
		{ type: "context" as const, code: "function calculateTotal(items) {" },
		{ type: "removed" as const, code: "  var total = 0;" },
		{
			type: "removed" as const,
			code: "  for (var i = 0; i < items.length; i++) {",
		},
		{ type: "removed" as const, code: "    total = total + items[i].price;" },
		{ type: "removed" as const, code: "  }" },
		{ type: "removed" as const, code: "  return total;" },
		{
			type: "added" as const,
			code: "  return items.reduce((sum, item) => sum + item.price, 0);",
		},
		{ type: "context" as const, code: "}" },
	],
};

function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center gap-2">
			<span className="text-sm font-bold text-accent-green">{"// "}</span>
			<span className="text-sm font-bold text-text-primary">{children}</span>
		</div>
	);
}

function Divider() {
	return <div className="h-px w-full bg-border-primary" />;
}

function LineNumbers({ count }: { count: number }) {
	return (
		<div className="flex w-12 shrink-0 flex-col items-end gap-2 border-r border-border-primary bg-bg-surface px-3 py-4">
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

export default async function RoastResultPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	void id;

	return (
		<div className="mx-auto flex w-full max-w-240 flex-col gap-10 px-4 py-10 md:px-20">
			<section className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">
				<ScoreRing score={roastData.score} />

				<div className="flex flex-1 flex-col gap-4">
					<Badge
						variant={
							roastData.verdict === "needs_serious_help" ? "critical" : "good"
						}
					>
						{"verdict: "}
						{roastData.verdict}
					</Badge>

					<p className="text-lg leading-relaxed text-text-primary md:text-xl">
						{roastData.roastMessage}
					</p>

					<div className="flex items-center gap-4">
						<span className="font-mono text-xs text-text-tertiary">
							lang: {roastData.language}
						</span>
						<span className="font-mono text-xs text-text-tertiary">·</span>
						<span className="font-mono text-xs text-text-tertiary">
							{roastData.lineCount} lines
						</span>
					</div>

					<div>
						<Button variant="outline" size="sm">
							$ share_roast
						</Button>
					</div>
				</div>
			</section>

			<Divider />

			<section className="flex flex-col gap-4">
				<SectionTitle>your_submission</SectionTitle>

				<CodeBlock>
					<div className="flex">
						<LineNumbers count={roastData.lineCount} />
						<CodeBlockBody
							code={roastData.code}
							language={roastData.language}
							className="flex-1 px-4 py-4 text-xs leading-snug [&_pre]:p-0!"
						/>
					</div>
				</CodeBlock>
			</section>

			<Divider />

			<section className="flex flex-col gap-6">
				<SectionTitle>detailed_analysis</SectionTitle>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{roastData.analysis.map((item) => (
						<AnalysisCard key={item.title}>
							<AnalysisCardHeader>
								<Badge variant={item.severity}>{item.severity}</Badge>
							</AnalysisCardHeader>
							<AnalysisCardTitle>{item.title}</AnalysisCardTitle>
							<AnalysisCardDescription>
								{item.description}
							</AnalysisCardDescription>
						</AnalysisCard>
					))}
				</div>
			</section>

			<Divider />

			<section className="flex flex-col gap-6">
				<SectionTitle>suggested_fix</SectionTitle>

				<div className="overflow-hidden border border-border-primary bg-bg-input">
					<div className="flex h-10 items-center border-b border-border-primary px-4">
						<span className="font-mono text-xs font-medium text-text-secondary">
							{"your_code.ts → improved_code.ts"}
						</span>
					</div>

					<div className="flex flex-col py-1">
						{roastData.diff.map((line, i) => (
							<DiffLine key={`diff-${i}`} variant={line.type}>
								{line.code}
							</DiffLine>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
