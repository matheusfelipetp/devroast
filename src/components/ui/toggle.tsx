"use client";

import { Switch } from "@base-ui/react";
import { twMerge } from "tailwind-merge";

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
};

export function Toggle({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  name,
  className,
}: ToggleProps) {
  return (
    <Switch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      name={name}
      className={twMerge(
        "group inline-flex h-5.5 w-10 cursor-pointer items-center rounded-[11px] bg-border-primary p-0.75 transition-colors data-checked:bg-accent-green disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <Switch.Thumb className="block size-4 rounded-full bg-text-secondary transition-transform data-checked:translate-x-4.5 data-checked:bg-bg-page" />
    </Switch.Root>
  );
}
