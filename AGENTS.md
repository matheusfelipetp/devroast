# devroast

## Sobre

App web onde usuários colam trechos de código e recebem reviews brutalmente honestas com nota de 0 a 10. Possui "roast mode" para sarcasmo máximo. Inclui um leaderboard público da vergonha ranqueando os piores códigos enviados.

## Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4, tailwind-variants, tailwind-merge
- **Primitivos UI**: @base-ui/react (headless)
- **Syntax highlighting**: shiki
- **Lint/formatação**: Biome (tabs, aspas duplas, organização de imports)

## Estrutura do projeto

```
src/
├── app/              # Páginas e layouts (App Router)
├── components/
│   ├── ui/           # Primitivos UI reutilizáveis (ver ui/AGENTS.md)
│   └── *.tsx         # Componentes de aplicação
```

## Padrões globais

- **Named exports apenas** — nunca usar `export default` (exceto páginas do Next.js).
- **Classes canônicas do Tailwind v4** — nunca usar valores arbitrários (`[Npx]`) quando existir classe canônica. Dividir px por 4 (ex: `w-[50px]` -> `w-12.5`).
- **Design tokens** — usar apenas tokens do `globals.css` `@theme`. Nunca hardcodar cores ou usar paleta padrão do Tailwind.
- **Composição sobre props** — componentes multi-parte usam sub-components em pastas com barrel `index.ts`. Componentes de elemento único ficam como arquivos standalone.
- **`tv` vs `twMerge`** — usar `tv()` para componentes com variantes. Usar `twMerge` para sub-components de composição simples sem variantes.
- **Tipagem** — estender elementos nativos via `ComponentProps<"element">`. Intersectar com `VariantProps` quando aplicável.
- **Sem comentários JSX** — código deve ser autoexplicativo. Não usar `{/* ... */}` para rotular seções.
- **Server-first** — só adicionar `"use client"` quando o componente precisar de interatividade ou APIs do navegador.
