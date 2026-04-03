import {
	AnalysisCard,
	AnalysisCardDescription,
	AnalysisCardHeader,
	AnalysisCardTitle,
} from "@/components/ui/analysis-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockHeader,
} from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import {
	LeaderboardCell,
	LeaderboardCellFlex,
	LeaderboardRow,
} from "@/components/ui/leaderboard";
import { ScoreRing } from "@/components/ui/score-ring";
import { ToggleDemo } from "./toggle-demo";

const buttonVariants = [
	"primary",
	"secondary",
	"outline",
	"ghost",
	"destructive",
] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

function SectionTitle({ children }: { children: string }) {
	return (
		<div className="flex items-center gap-2">
			<span className="text-lg font-bold text-accent-green font-mono">$</span>
			<span className="text-lg font-bold text-text-primary font-mono">
				{children}
			</span>
		</div>
	);
}

function SubSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-4">
			<span className="text-xs text-text-tertiary font-mono">// {title}</span>
			{children}
		</div>
	);
}

const codeExample = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function ComponentsPage() {
	return (
		<div className="min-h-screen bg-bg-page px-4 sm:px-8 md:px-20 py-8 md:py-15 font-mono flex flex-col gap-8 md:gap-15">
			<div className="flex items-center gap-2">
				<span className="text-2xl font-bold text-accent-green">//</span>
				<h1 className="text-2xl font-bold text-text-primary">
					component_library
				</h1>
			</div>

			<section className="flex flex-col gap-8">
				<SectionTitle>button</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="variants">
						<div className="flex flex-wrap items-center gap-4">
							{buttonVariants.map((variant) => (
								<Button key={variant} variant={variant}>
									$ {variant}
								</Button>
							))}
						</div>
					</SubSection>

					<SubSection title="sizes">
						<div className="flex flex-wrap items-center gap-4">
							{buttonSizes.map((size) => (
								<Button key={size} size={size}>
									$ size_{size}
								</Button>
							))}
						</div>
					</SubSection>

					<SubSection title="disabled">
						<div className="flex flex-wrap items-center gap-4">
							{buttonVariants.map((variant) => (
								<Button key={variant} variant={variant} disabled>
									$ {variant}
								</Button>
							))}
						</div>
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>badge</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="variants">
						<div className="flex flex-wrap items-center gap-3 md:gap-6">
							<Badge variant="critical">critical</Badge>
							<Badge variant="warning">warning</Badge>
							<Badge variant="good">good</Badge>
						</div>
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>toggle</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="states">
						<ToggleDemo />
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>analysis_card</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="critical">
						<AnalysisCard>
							<AnalysisCardHeader>
								<Badge variant="critical">critical</Badge>
							</AnalysisCardHeader>
							<AnalysisCardTitle>
								using var instead of const/let
							</AnalysisCardTitle>
							<AnalysisCardDescription>
								the var keyword is function-scoped rather than block-scoped,
								which can lead to unexpected behavior and bugs. modern
								javascript uses const for immutable bindings and let for mutable
								ones.
							</AnalysisCardDescription>
						</AnalysisCard>
					</SubSection>

					<SubSection title="warning">
						<AnalysisCard>
							<AnalysisCardHeader>
								<Badge variant="warning">warning</Badge>
							</AnalysisCardHeader>
							<AnalysisCardTitle>
								nested callbacks without error handling
							</AnalysisCardTitle>
							<AnalysisCardDescription>
								deeply nested callbacks make code harder to read and maintain.
								consider using async/await or promise chains with proper
								.catch() handlers to improve readability and error resilience.
							</AnalysisCardDescription>
						</AnalysisCard>
					</SubSection>

					<SubSection title="good">
						<AnalysisCard>
							<AnalysisCardHeader>
								<Badge variant="good">good</Badge>
							</AnalysisCardHeader>
							<AnalysisCardTitle>
								consistent naming conventions
							</AnalysisCardTitle>
							<AnalysisCardDescription>
								the codebase follows camelCase for variables and functions
								consistently. this improves readability and makes the code
								easier to navigate for other developers.
							</AnalysisCardDescription>
						</AnalysisCard>
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>code_block</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="javascript">
						<CodeBlock>
							<CodeBlockHeader>
								<span className="size-2.5 rounded-full bg-accent-red" />
								<span className="size-2.5 rounded-full bg-accent-amber" />
								<span className="size-2.5 rounded-full bg-accent-green" />
								<span className="flex-1" />
								<span className="font-mono text-xs text-text-tertiary">
									calculate.js
								</span>
							</CodeBlockHeader>
							<CodeBlockBody code={codeExample} language="javascript" />
						</CodeBlock>
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>diff_line</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="variants">
						<div>
							<DiffLine variant="removed">var total = 0;</DiffLine>
							<DiffLine variant="added">const total = 0;</DiffLine>
							<DiffLine variant="context">
								{"for (let i = 0; i < items.length; i++) {"}
							</DiffLine>
						</div>
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>leaderboard</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="leaderboard">
						<div>
							<LeaderboardRow>
								<div className="flex items-center gap-3 md:contents">
									<LeaderboardCell className="w-8 md:w-10">
										<span className="text-3.25 text-text-tertiary">#1</span>
									</LeaderboardCell>
									<LeaderboardCell className="w-12 md:w-15">
										<span className="text-3.25 font-bold text-accent-red">
											2.1
										</span>
									</LeaderboardCell>
									<span className="text-xs text-text-tertiary md:hidden">
										· javascript
									</span>
								</div>
								<LeaderboardCellFlex>
									<span className="text-xs text-text-secondary truncate">
										{"function calculateTotal(items) { var total = 0; ..."}
									</span>
								</LeaderboardCellFlex>
								<LeaderboardCell className="hidden md:block w-25">
									<span className="text-xs text-text-tertiary">javascript</span>
								</LeaderboardCell>
							</LeaderboardRow>
							<LeaderboardRow>
								<div className="flex items-center gap-3 md:contents">
									<LeaderboardCell className="w-8 md:w-10">
										<span className="text-3.25 text-text-tertiary">#2</span>
									</LeaderboardCell>
									<LeaderboardCell className="w-12 md:w-15">
										<span className="text-3.25 font-bold text-accent-amber">
											4.7
										</span>
									</LeaderboardCell>
									<span className="text-xs text-text-tertiary md:hidden">
										· typescript
									</span>
								</div>
								<LeaderboardCellFlex>
									<span className="text-xs text-text-secondary truncate">
										{"async function fetchData() { const res = await fetch(..."}
									</span>
								</LeaderboardCellFlex>
								<LeaderboardCell className="hidden md:block w-25">
									<span className="text-xs text-text-tertiary">typescript</span>
								</LeaderboardCell>
							</LeaderboardRow>
							<LeaderboardRow>
								<div className="flex items-center gap-3 md:contents">
									<LeaderboardCell className="w-8 md:w-10">
										<span className="text-3.25 text-text-tertiary">#3</span>
									</LeaderboardCell>
									<LeaderboardCell className="w-12 md:w-15">
										<span className="text-3.25 font-bold text-accent-green">
											8.9
										</span>
									</LeaderboardCell>
									<span className="text-xs text-text-tertiary md:hidden">
										· typescript
									</span>
								</div>
								<LeaderboardCellFlex>
									<span className="text-xs text-text-secondary truncate">
										{"const sum = (a: number, b: number): number => a + b;"}
									</span>
								</LeaderboardCellFlex>
								<LeaderboardCell className="hidden md:block w-25">
									<span className="text-xs text-text-tertiary">typescript</span>
								</LeaderboardCell>
							</LeaderboardRow>
						</div>
					</SubSection>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<SectionTitle>score_ring</SectionTitle>
				<div className="flex flex-col gap-8 pl-3 md:pl-6 border-l border-border-primary">
					<SubSection title="scores">
						<div className="flex flex-wrap items-center gap-4 md:gap-8">
							<ScoreRing score={3.5} />
							<ScoreRing score={7.2} />
						</div>
					</SubSection>
				</div>
			</section>
		</div>
	);
}
