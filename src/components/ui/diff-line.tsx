import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLine = tv({
	base: "flex items-center px-4 h-7 w-full font-mono text-xs",
	variants: {
		variant: {
			added: "bg-diff-added",
			removed: "bg-diff-removed",
			context: "bg-transparent",
		},
	},
	defaultVariants: {
		variant: "context",
	},
});

const prefixMap = {
	added: { symbol: "+", className: "text-accent-green" },
	removed: { symbol: "-", className: "text-accent-red" },
	context: { symbol: " ", className: "text-text-tertiary" },
} as const;

const codeColorMap = {
	added: "text-accent-green",
	removed: "text-accent-red",
	context: "text-text-secondary",
} as const;

type DiffLineVariants = VariantProps<typeof diffLine>;

type DiffLineProps = ComponentProps<"div"> &
	DiffLineVariants & {
		className?: string;
	};

export function DiffLine({
	variant = "context",
	className,
	children,
	...props
}: DiffLineProps) {
	const prefix = prefixMap[variant!];
	const codeColor = codeColorMap[variant!];

	return (
		<div className={diffLine({ variant, className })} {...props}>
			<span className={`w-5 shrink-0 ${prefix.className}`}>
				{prefix.symbol}
			</span>
			<span className={codeColor}>{children}</span>
		</div>
	);
}
