"use client";

import { Select } from "@base-ui/react";
import { twMerge } from "tailwind-merge";
import { LANGUAGES } from "@/lib/languages";

type LanguageSelectorProps = {
	value: string | null;
	autoDetected: boolean;
	onChange: (languageId: string | null) => void;
	className?: string;
};

const AUTO_DETECT = "auto";

const ITEMS = [
	{ value: AUTO_DETECT, label: "auto-detect" },
	...LANGUAGES.map((lang) => ({ value: lang.id, label: lang.name })),
];

function ChevronDownIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-3.5"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 6l4 4 4-4" />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-3"
			fill="currentColor"
			viewBox="0 0 10 10"
		>
			<path d="M9.16 1.12a.96.96 0 0 1 .22 1.04L5.14 8.66a.96.96 0 0 1-.54.33.96.96 0 0 1-.6-.19L1.25 6.31a.96.96 0 1 1 1.06-1.06l2.1 1.91L8.12 1.34a.96.96 0 0 1 1.04-.22Z" />
		</svg>
	);
}

export function LanguageSelector({
	value,
	autoDetected,
	onChange,
	className,
}: LanguageSelectorProps) {
	return (
		<div className={twMerge("flex items-center gap-1.5", className)}>
			{autoDetected && value && (
				<span className="hidden text-xs text-text-tertiary sm:inline">
					(detected)
				</span>
			)}
			<Select.Root
				value={value ?? AUTO_DETECT}
				onValueChange={(val) => {
					onChange(val === AUTO_DETECT ? null : val);
				}}
				items={ITEMS}
				modal={false}
			>
				<Select.Trigger
					aria-label="Language"
					className="flex cursor-pointer items-center gap-1 bg-transparent py-1 pr-1 pl-1.5 font-mono text-xs text-text-tertiary outline-none transition-colors select-none hover:text-text-secondary data-popup-open:text-text-secondary"
				>
					<Select.Value />
					<Select.Icon className="flex">
						<ChevronDownIcon />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Positioner
						className="z-50 outline-hidden"
						sideOffset={8}
						alignItemWithTrigger={false}
						side="bottom"
						align="end"
					>
						<Select.Popup className="min-w-(--anchor-width) origin-(--transform-origin) border border-border-primary bg-bg-elevated p-1 shadow-lg outline-none transition-[transform,scale,opacity] data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0">
							<Select.ScrollUpArrow className="flex h-4 w-full cursor-default items-center justify-center text-center text-xs text-text-tertiary">
								&#x25B2;
							</Select.ScrollUpArrow>
							<Select.List className="max-h-60 overflow-y-auto scroll-py-1">
								{ITEMS.map((item) => (
									<Select.Item
										key={item.value}
										value={item.value}
										className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 px-2 py-1.5 font-mono text-xs text-text-secondary outline-none select-none data-highlighted:bg-bg-surface data-highlighted:text-text-primary data-selected:text-text-primary"
									>
										<Select.ItemIndicator className="col-start-1">
											<CheckIcon />
										</Select.ItemIndicator>
										<Select.ItemText className="col-start-2">
											{item.label}
										</Select.ItemText>
									</Select.Item>
								))}
							</Select.List>
							<Select.ScrollDownArrow className="flex h-4 w-full cursor-default items-center justify-center text-center text-xs text-text-tertiary">
								&#x25BC;
							</Select.ScrollDownArrow>
						</Select.Popup>
					</Select.Positioner>
				</Select.Portal>
			</Select.Root>
		</div>
	);
}
