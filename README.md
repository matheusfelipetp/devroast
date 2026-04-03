# devroast

Cole seu código. Receba o roast.

**devroast** é um app web onde você cola trechos de código e recebe reviews brutalmente honestas com uma nota de 0 a 10. Ative o **roast mode** para sarcasmo máximo e zero piedade.

Construído durante o evento NLW da [Rocketseat](https://www.rocketseat.com.br/).

## Funcionalidades

- **Code review com nota** — cole qualquer trecho de código e receba uma análise honesta com nota de 0 (desastre) a 10 (impecável)
- **Roast mode** — ative o sarcasmo máximo para reviews sem filtro
- **Análise detalhada** — cada review separa os problemas por severidade (crítico, alerta, bom) com explicações
- **Syntax highlighting** — código exibido com destaque de sintaxe para múltiplas linguagens
- **Leaderboard da vergonha** — ranking público dos piores códigos já enviados, ordenados por nota

## Como rodar

```bash
# Instalar dependências
npm install

# Subir o banco de dados (PostgreSQL via Docker)
docker compose up -d

# Aplicar migrations
npm run db:migrate

# Popular o banco com dados fake (opcional)
npm run db:seed

# Rodar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o app.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Rodar linter (Biome) |
| `npm run format` | Formatar código (Biome) |
| `npm run db:generate` | Gerar migrations (Drizzle Kit) |
| `npm run db:migrate` | Aplicar migrations no banco |
| `npm run db:push` | Push direto do schema para o banco |
| `npm run db:studio` | Abrir Drizzle Studio (GUI do banco) |
| `npm run db:seed` | Popular o banco com 100 roasts fake |
