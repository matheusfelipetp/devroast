# Editor com Syntax Highlighting

Spec de pesquisa e implementacao para o editor de codigo com syntax highlighting do devroast.

## Contexto

O devroast precisa de um editor onde o usuario cola trechos de codigo e recebe um "roast". O editor atual (`src/components/code-editor.tsx`) eh um `<textarea>` simples com line numbers, sem syntax highlighting. O projeto ja usa **shiki** como dependencia para exibicao estatica de codigo no `CodeBlockBody`.

O editor precisa:

1. Permitir que o usuario digite/cole codigo
2. Aplicar syntax highlighting em tempo real conforme a linguagem
3. Auto-detectar a linguagem do codigo colado
4. Oferecer selecao manual de linguagem como alternativa

---

## Pesquisa: como o ray-so faz

Repositorio: [raycast/ray-so](https://github.com/raycast/ray-so)

### Arquitetura

O ray-so usa o **padrao textarea overlay**:

- Um `<textarea>` transparente captura input do usuario (digitacao, selecao, copy/paste)
- Um `<div>` posicionado abaixo renderiza o codigo com syntax highlighting
- O textarea fica por cima com `color: transparent` e `background: transparent`, de forma que o usuario ve o codigo highlighted mas interage com o textarea nativo

### Syntax highlighting

- Usa **shiki** (`highlighter.codeToHtml()`) para gerar HTML highlighted
- Renderiza via `dangerouslySetInnerHTML` no div abaixo do textarea
- Linguagens sao **lazy-loaded** do shiki sob demanda
- Suporta 67 linguagens
- Temas customizados via CSS variables

### Auto-detecao de linguagem

- Usa **highlight.js** (`hljs.highlightAuto()`) **apenas para auto-detecao** (nao para highlighting)
- O highlighting em si eh feito pelo shiki
- Prioridade: selecao manual do usuario > linguagem do exemplo > auto-detecao

### State management

- Jotai atoms para: codigo, linguagem selecionada, linguagem detectada, tema
- Codigo e linguagem persistidos na URL via Base64

### Funcionalidades extras do editor

- Tab/Shift+Tab para indentacao (2 espacos)
- Enter com auto-indentacao (detecta brackets abertos)
- `}` com dedent automatico

---

## Opcoes avaliadas

### Opcao 1: Textarea overlay com shiki (recomendada)

Mesmo padrao do ray-so. Textarea transparente sobre codigo highlighted pelo shiki.

**Como funciona:**
- `<textarea>` com `color: transparent`, `caret-color: white`, `background: transparent`
- `<pre><code>` posicionado absolutamente abaixo com o HTML do shiki
- Ambos com a mesma fonte, tamanho, line-height e padding
- Scroll sincronizado entre os dois

**Pros:**
- Shiki **ja eh dependencia** do projeto (v4.0.2)
- Acessibilidade nativa do textarea (selecao, copy/paste, spellcheck, mobile)
- Bundle minimo — nao precisa de nova dependencia para o editor em si
- Mesmo approach validado pelo ray-so em producao
- Temas do shiki sao ricos (TextMate grammars)
- Server-side highlighting eh possivel (mas no editor sera client-side)

**Contras:**
- Fontes devem ser identicas entre textarea e pre (qualquer diferenca desalinha)
- Performance pode degradar com codigo muito longo (re-highlight a cada keystroke)
- Precisa implementar Tab, auto-indent, etc. manualmente
- `dangerouslySetInnerHTML` (mitigavel pois o input vem do usuario para si mesmo)

**Dependencias necessarias:** nenhuma nova para o editor (shiki ja existe). `highlight.js` para auto-detecao.

**Bundle size estimado adicional:** ~200-300KB (highlight.js com subset de linguagens para detecao)

---

### Opcao 2: CodeMirror 6

Editor de codigo completo, modular, usado por Replit, Chrome DevTools, etc.

**Pros:**
- Editor maduro com tudo embutido (Tab, undo, selecao, busca, etc.)
- Modular — importa so o que precisa
- ~300KB para setup basico (gzipped ~90KB)
- Suporte a acessibilidade (ARIA, screen readers)
- Auto-complete, bracket matching, etc. "de graca"

**Contras:**
- **Nao usa shiki** — tem sistema proprio de highlighting (Lezer parser)
- Visual muito "IDE" — pode ser dificil estilizar para o look minimalista do devroast
- Adiciona complexidade significativa para o caso de uso simples do devroast
- Precisa de wrapper React (`@uiw/react-codemirror` ou custom)
- Overkill para "colar codigo e receber roast"

**Dependencias:** `@codemirror/state`, `@codemirror/view`, `@codemirror/lang-*`, wrapper React

---

### Opcao 3: Monaco Editor

Editor do VS Code para web.

**Pros:**
- Experiencia completa do VS Code
- IntelliSense, 60+ linguagens, diff viewer

**Contras:**
- **Bundle enorme:** 5-10MB descomprimido
- Problematico com SSR/Next.js (requer dynamic import, `ssr: false`)
- **Massivamente overkill** para o caso de uso do devroast
- Dificil de customizar visual
- Web workers necessarios

**Veredito:** descartado por bundle size e complexidade.

---

### Opcao 4: react-simple-code-editor

Biblioteca que implementa o padrao textarea overlay de forma reutilizavel.

**Pros:**
- Implementa o padrao textarea overlay pronto
- Aceita qualquer funcao de highlight (pode usar shiki)
- Leve (~3KB)

**Contras:**
- Ultima atualizacao pode estar desatualizada
- Compatibilidade com React 19 nao confirmada
- Menos controle que implementacao propria
- Adiciona dependencia para algo que sao ~50 linhas de codigo

**Veredito:** possivel, mas implementacao propria da mais controle e o projeto ja tem o textarea base.

---

### Opcao 5: shikicode (shiki-editor)

Editor leve baseado em shiki com arquitetura de plugins.

**Pros:**
- Construido especificamente para shiki
- Extensivel via plugins

**Contras:**
- Projeto comunitario, nao oficial do shiki
- Adocao ainda pequena
- Nao eh especifico para React
- Documentacao limitada

**Veredito:** interessante mas imaturo para producao.

---

## Decisao: Opcao 1 — Textarea overlay com shiki

### Justificativas

1. **Shiki ja esta no projeto** — zero fricao para highlighting
2. **Padrao validado** — ray-so usa exatamente isso em producao
3. **Bundle minimo** — so precisa adicionar highlight.js (subset) para auto-detecao
4. **Controle total** — implementacao propria permite estilizar exatamente como o design do devroast
5. **Simplicidade** — o caso de uso eh "colar codigo, ver bonito, submeter". Nao precisa de IDE.

### Auto-detecao de linguagem

Usar **highlight.js** (`hljs.highlightAuto()`) apenas para deteccao, mesmo approach do ray-so. Importar apenas o core + subset de linguagens para reduzir bundle.

**Limitacoes conhecidas:**
- Pode confundir linguagens similares (JS vs YAML em certos casos)
- Funciona melhor com trechos maiores de codigo
- Selecao manual como override eh essencial

---

## Especificacao de implementacao

### Arquitetura do componente

```
CodeEditor (client component)
├── <div> container (position: relative)
│   ├── <textarea> (transparent, z-index superior, captura input)
│   └── <div> highlighted output (shiki HTML, position: absolute, z-index inferior)
├── LineNumbers (manter implementacao atual, sincronizado com scroll)
└── LanguageSelector (dropdown abaixo do editor)
```

### Linguagens suportadas (subset inicial)

Priorizar as mais comuns para o contexto do devroast:

- JavaScript, TypeScript, JSX, TSX
- Python, Java, Go, Rust, C, C++
- HTML, CSS, SQL
- Ruby, PHP, Swift, Kotlin
- Bash, JSON, YAML

### Debounce do highlighting

- Aplicar highlight no `onPaste` imediatamente
- No `onChange` (digitacao), debounce de ~150ms para evitar re-renders excessivos
- Auto-detecao de linguagem apenas no paste (nao a cada keystroke)

### Funcionalidades do editor

- [x] Textarea com syntax highlighting overlay
- [x] Line numbers sincronizados com scroll
- [x] Auto-detecao de linguagem no paste
- [x] Selecao manual de linguagem (dropdown)
- [x] Tab/Shift+Tab para indentacao
- [x] Placeholder quando vazio
- [x] Responsivo

---

## To-dos de implementacao

- [ ] Criar o componente `CodeEditor` com padrao textarea overlay
  - [ ] Textarea transparente com caret visivel
  - [ ] Div de output com shiki `codeToHtml`
  - [ ] Sincronizacao de scroll entre textarea e div
  - [ ] Mesma fonte/tamanho/padding em ambos
- [ ] Integrar shiki para highlighting client-side
  - [ ] Criar/reusar instancia do highlighter (singleton ou context)
  - [ ] Lazy-load linguagens sob demanda
  - [ ] Usar tema "vesper" (mesmo do CodeBlockBody)
- [ ] Implementar auto-detecao de linguagem
  - [ ] Instalar highlight.js (core + subset de linguagens)
  - [ ] Detectar linguagem no evento de paste
  - [ ] Fallback para "plaintext" se confianca baixa
- [ ] Criar componente `LanguageSelector`
  - [ ] Dropdown com linguagens suportadas
  - [ ] Override manual desativa auto-detecao
  - [ ] Indicador visual de "auto-detectado" vs "manual"
- [ ] Funcionalidades de edicao
  - [ ] Tab/Shift+Tab para indent/dedent
  - [ ] Manter cursor position apos operacoes
- [ ] Performance
  - [ ] Debounce do highlighting (~150ms no onChange)
  - [ ] Highlight imediato no onPaste
  - [ ] Singleton do highlighter shiki (evitar re-criacao)
- [ ] Integrar na homepage (`src/app/page.tsx`)
  - [ ] Substituir CodeEditor atual pelo novo
  - [ ] Conectar com estado de submissao

---

## Decisoes tomadas

1. **Tema do shiki:** usar "vesper" (mesmo tema ja usado no `CodeBlockBody`)
2. **Limite de tamanho:** sem limite de caracteres/linhas
3. **Persistencia:** banco de dados (nao URL ou localStorage)
4. **LanguageSelector:** dropdown posicionado abaixo do editor
5. **Line numbers:** manter implementacao atual
6. **Auto-detecao:** highlight.js (battle-tested, mesmo approach do ray-so)

---

## Referencias

- [raycast/ray-so — GitHub](https://github.com/raycast/ray-so) — implementacao de referencia
- [Shiki docs](https://shiki.style/) — documentacao oficial
- [highlight.js](https://highlightjs.org/) — auto-detecao de linguagem
- [shikijs/shiki#650](https://github.com/shikijs/shiki/discussions/650) — discussao sobre shiki editor
- [react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor) — alternativa textarea overlay
- [CodeMirror vs Monaco](https://agenthicks.com/research/codemirror-vs-monaco-editor-comparison) — comparativo de editores
