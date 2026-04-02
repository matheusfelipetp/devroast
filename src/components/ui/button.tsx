import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center font-medium font-mono text-[13px] cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-accent-green text-bg-page hover:bg-accent-green/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-border-primary bg-transparent text-text-primary hover:bg-bg-elevated",
      ghost: "bg-transparent text-text-primary hover:bg-bg-elevated",
      destructive: "bg-destructive text-bg-page hover:bg-destructive/80",
    },
    size: {
      sm: "px-4 py-1.5 text-xs",
      md: "px-6 py-2.5 text-[13px]",
      lg: "px-8 py-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ComponentProps<"button"> &
  ButtonVariants & {
    className?: string;
  };

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={button({ variant, size, className })}
      {...props}
    />
  );
}
