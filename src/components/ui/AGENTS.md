# UI Components — Patterns

## Exports

- Always use **named exports**. Never use `export default`.

## Styling

- Use `tailwind-variants` (`tv`) to define variants. Pass `className` directly into the `tv()` call — it handles merge internally.
- Do **not** use `twMerge` alongside `tv`. The `tailwind-variants` library already merges classes.
- Use only design tokens defined in `globals.css` via `@theme` (e.g. `bg-bg-page`, `text-text-primary`, `border-border-primary`). Never hardcode color values or use default Tailwind palette colors like `zinc-800`.
- **Tailwind v4 canonical classes**: NEVER use arbitrary values (`[Npx]`) when a canonical Tailwind utility exists. Common conversions:
  - Sizes: `w-[50px]` → `w-12.5`, `h-[22px]` → `h-5.5`, `max-w-[960px]` → `max-w-240` (divide px by 4)
  - Data attributes: `data-[checked]:` → `data-checked:`
  - Important: `!bg-transparent` → `bg-transparent!`
  - Always prefer the canonical form to avoid `suggestCanonicalClasses` warnings.

## Types

- Extend native element props using `ComponentProps<"element">` from React.
- Create a variants type with `VariantProps<typeof componentVariants>`.
- Intersect both into a single props type, adding `className?: string`.

## Component structure

```tsx
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const component = tv({
  base: "...",
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: {
    variant: "...",
    size: "...",
  },
});

type ComponentVariants = VariantProps<typeof component>;

type ComponentProps = ComponentProps<"element"> &
  ComponentVariants & {
    className?: string;
  };

export function Component({ variant, size, className, ...props }: ComponentProps) {
  return <element className={component({ variant, size, className })} {...props} />;
}
```

## Composição e organização de arquivos

- **Componentes de elemento único** (Button, Badge, Toggle, DiffLine, ScoreRing): ficam como arquivos standalone (ex: `button.tsx`).
- **Componentes multi-parte** (AnalysisCard, CodeBlock, Leaderboard): são divididos em sub-components, cada um em seu próprio arquivo dentro de uma pasta com barrel `index.ts`.

### Estrutura de pasta multi-parte

```
component-name/
├── component-name.tsx          # Componente raiz
├── component-name-header.tsx   # Sub-component
├── component-name-body.tsx     # Sub-component
└── index.ts                    # Barrel re-exportando tudo
```

Exemplo de barrel (`index.ts`):

```ts
export { CodeBlock } from "./code-block";
export { CodeBlockHeader } from "./code-block-header";
export { CodeBlockBody } from "./code-block-body";
```

### Quando dividir

- Divida quando o componente tem **partes visuais distintas** que o consumidor monta via composição (ex: `<CodeBlock>` + `<CodeBlockHeader>` + `<CodeBlockBody>`).
- **Não** divida componentes simples que são sempre usados inteiros sem composição (ex: `<Button>`).
- Cada sub-component deve estender o elemento HTML nativo correspondente via `ComponentProps<"element">`.

## Component-specific patterns

- **Components with behavior** (toggle, dialog, tooltip): use `@base-ui/react` headless primitives. Mark the file with `"use client"`.
- **Server components** (CodeBlock): no `"use client"` directive. Use async functions for data fetching (e.g. shiki's `codeToHtml`).
- **Composition pattern** (Card): export multiple sub-components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`). Each extends its native element via `ComponentProps`. Use `twMerge` for className merging on simple components without variants.
- **`twMerge` vs `tv`**: use `tv()` when the component has variants. Use `twMerge` directly when the component only needs className merging without variants (e.g. Card sub-components).

## Design tokens reference

Defined in `src/app/globals.css` under `@theme`. Key tokens:

- **Backgrounds**: `bg-page`, `bg-surface`, `bg-elevated`, `bg-input`
- **Text**: `text-primary`, `text-secondary`, `text-tertiary`, `text-muted`
- **Border**: `border-primary`, `border-focus`
- **Accent**: `accent-green`, `accent-amber`, `accent-red`, `accent-cyan`, `accent-orange`, `accent-blue`
- **Semantic**: `success`, `error`, `warning`, `info` (each with `-foreground`)
- **Fonts**: `font-mono` (JetBrains Mono), `font-sans` (system default). Never use custom font classes like `font-primary` or `font-secondary`.
- **Radius**: `radius-none`, `radius-m`, `radius-pill`
- **Spacing**: `spacing-xs`, `spacing-sm`, `spacing-md`, `spacing-lg`, `spacing-xl`
