# specs/

Specs sao documentos de planejamento criados **antes** da implementacao de uma feature. Servem como contrato entre o agente e o desenvolvedor sobre o que sera feito.

## Formato

Cada spec é um arquivo Markdown na pasta `specs/` com nome em `kebab-case` descrevendo a feature (ex: `drizzle-database.md`, `editor-syntax-highlight.md`).

### Estrutura obrigatoria

```markdown
# Titulo da Feature

> Resumo de uma linha descrevendo o que a spec cobre.

## Contexto

Por que essa feature existe. Qual problema resolve no devroast.
Estado atual relevante (o que ja existe, o que falta).

## Decisoes de design

Escolhas tecnicas importantes com justificativa curta.
Se houve opcoes avaliadas, documentar cada uma com pros/contras
e indicar a decisao final com justificativa.

## Especificacao de implementacao

Detalhamento tecnico do que sera implementado:
- Arquitetura de componentes/modulos
- Estrutura de dados (schemas, tipos, tabelas)
- Trechos de codigo ilustrativos quando relevante
- Estrutura de arquivos resultante

## To-dos de implementacao

Lista de checkboxes (`- [ ]`) com as tarefas ordenadas
para executar a spec. Granular o suficiente para que cada
item seja implementavel de forma independente.
```

### Secoes opcionais

- **Enums / Tabelas / Queries** — quando a feature envolve dados persistidos.
- **Dependencias** — pacotes novos necessarios com comandos de instalacao.
- **Scripts** — novos scripts npm resultantes.
- **Referencias** — links para repos, docs ou discussoes relevantes.
- **Diagramas** — ASCII art para relacoes entre entidades ou arquitetura.

## Regras

- Escrever em **portugues sem acentos** (consistente com o restante dos specs).
- Codigo e nomes tecnicos em ingles.
- Ser direto — sem introducoes genericas ou texto de preenchimento.
- Trechos de codigo sao **ilustrativos**, nao precisam compilar, mas devem refletir a implementacao real.
- To-dos usam `- [ ]` (checkbox Markdown), nunca `- []`.
