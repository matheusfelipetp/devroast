import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLine = tv({
  base: "flex gap-2 px-4 py-2 w-full font-mono text-[13px]",
  variants: {
    variant: {
      added: "bg-[#0A1A0F]",
      removed: "bg-[#1A0A0A]",
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
  added: "text-text-primary",
  removed: "text-text-secondary",
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
      <span className={prefix.className}>{prefix.symbol}</span>
      <span className={codeColor}>{children}</span>
    </div>
  );
}
