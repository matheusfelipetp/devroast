@AGENTS.md

# Instruções gerais

- Sempre faça perguntas ao usuário quando houver ambiguidade, decisões de design, ou dúvidas sobre a implementação. Não assuma — pergunte.
- Não adicione comentários JSX (`{/* ... */}`) para distinguir seções ou componentes no código. O código deve ser autoexplicativo.
- Nunca use valores arbitrários do Tailwind (`[Npx]`) quando existir uma classe canônica equivalente. Divida o valor em px por 4 para obter a classe (ex: `w-[50px]` → `w-12.5`, `max-w-[960px]` → `max-w-240`). Isso vale para todo o projeto, não apenas componentes UI.
