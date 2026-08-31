# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador multi-step no hero (CNPJ real, validação, sugestão de hipóteses, gera relatório compartilhável), painel do cliente ilustrativo (status indefinido, ver Pendências), timeline do processo, seção de metodologia com caso ilustrativo.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`), com uma exceção: `?diagnostico=<dados>` na URL renderiza a página `Diagnostico.jsx` no lugar da landing page (roteamento simples via `URLSearchParams`, sem react-router).
- Projeto conectado ao **Lovable** (sync automático via git, aviso em `AGENTS.md` pra nunca dar force-push/rebase na branch conectada).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas. Formação em Direito e Ciências Contábeis.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos. Formação em Engenharia Civil.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.

## Estrutura do código
- `src/App.jsx` — se a URL tem `?diagnostico=`, renderiza só `<Diagnostico />`. Senão, monta a landing page inteira, na ordem: Navbar, Hero (com Simulator embutido), TrustBar, Numbers, QuemSomos, Method, MethodDeep, Metodologia, Services, Atuacao, HowItWorks, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton. **`ClientPanel` não está mais na lista — ver Pendências.**
- `src/components/` — um arquivo por seção, incluindo `CtaButtons.jsx` (2 botões padrão reutilizáveis), `Simulator.jsx` (wizard de 5 passos) e `Diagnostico.jsx` (página de relatório compartilhável).
- `src/utils/diagnosticoShared.js` — funções e constantes compartilhadas entre `Simulator.jsx` e `Diagnostico.jsx` (ver seção própria abaixo).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca (cores: `graphite`, `ice`, `blue`, `blue-light`, `gold`, `line`).

## Sistema de diagnóstico compartilhável (Simulator + diagnosticoShared + Diagnostico)
Fluxo completo, sem precisar de backend:
1. Usuário preenche o `Simulator.jsx` (CNPJ validado, nome auto-preenchido via BrasilAPI, segmento, hipóteses filtradas por regime tributário).
2. No resultado (passo 5), os dados viram um objeto (nome, cnpj, regime, faturamento, faixas de valor, lista de hipóteses com fundamento/condição/certeza) que é codificado em base64 pela função `buildDiagnosticoUrl()` (de `diagnosticoShared.js`) e vira um link tipo `seusite.com/?diagnostico=XXXXX`.
3. Esse link aparece em 3 lugares: botão "Ver diagnóstico completo", botão "Copiar link", e embutido na mensagem do WhatsApp e no e-mail (EmailJS).
4. Ao abrir esse link, o `App.jsx` detecta o parâmetro e renderiza `Diagnostico.jsx`, que decodifica os dados (`decodeDiagnostico()`) e mostra um relatório formatado — sem re-preencher nada.
- `CERTEZA_CONFIG` (em `diagnosticoShared.js`) define 3 níveis: `consolidado` (azul), `defensavel` (dourado), `validacao` (neutro) — cada hipótese do simulador tem um desses níveis.
- Config do EmailJS: `service_8wpx9uq` / `template_glqg928` / chave pública `Sr1K9lFnEDRGBozQN`, destino `hezus.simulador@gmail.com`.
- A alíquota de PIS/COFINS não-cumulativo (9,25%) é a única baseada em lei explícita (Lei 10.637/2002 e 10.833/2003); as demais faixas min/max das 20 hipóteses são estimativas de mercado — revisar se houver dado real de portfólio.

## Metodologia.jsx (seção da landing page)
Caso ilustrativo fictício ("Metalúrgica Exemplo Ltda.", Lucro Real) com 4 frentes de recuperação, cada uma com grau de certeza, fundamento legal e condição. Abaixo, 4 etapas do processo. Aviso explícito de que é caso fictício. Termina com `<CtaButtons />`.
- **Menciona "taxa de êxito" como modelo de cobrança** — ainda não confirmado com o Everton se é isso mesmo que a Hezus pratica.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: otimização de carga tributária, recuperação de créditos, oportunidades consolidadas por STF/STJ, subvenções, reforma tributária (LC 214), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação, apoio técnico em questionamentos, gestão de contratos administrativos.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp.
- **Pendência técnica ainda não resolvida**: esse formulário específico ainda não está conectado a nenhum destino real (só faz `setSent(true)` local). O `Simulator.jsx` já resolveu isso pro fluxo dele via EmailJS + WhatsApp + link de diagnóstico — avaliar se `LeadForm.jsx` devia ser substituído por esse mesmo mecanismo, ou até removido, já que o Simulator cobre a mesma necessidade de forma mais completa.

## Problema técnico recorrente: bug de colagem no editor do GitHub
Quando uma tag `<a` fica **sozinha em uma linha** (com atributos nas linhas seguintes), o editor web do GitHub apaga essa linha silenciosamente ao colar, quebrando o JSX. Já aconteceu repetidamente em `Navbar.jsx`, `Hero.jsx`, `LeadForm.jsx`, `Simulator.jsx` (2 vezes) e quase em `Diagnostico.jsx` (corrigido antes de colar).
**Regra permanente**: sempre escrever tags `<a>` com todos os atributos em uma única linha antes de entregar código pro Everton colar. Quando o arquivo já existe com esse bug, localizar o trecho via Ctrl+F pelo texto visível (ex: "Ver diagnóstico completo") e trocar só aquele bloco, em vez de reescrever o arquivo inteiro — é mais rápido de confirmar que funcionou.
**Observação de processo**: arquivos grandes mandados como anexo/download pra baixar têm gerado confusão (Everton não consegue achar/baixar o anexo às vezes). Preferir, quando o trecho a corrigir for pequeno, dar instrução de Ctrl+F + substituição pontual, reservando o anexo de arquivo inteiro só quando a mudança for extensa.

## Regra de conteúdo: nunca reproduzir dados de concorrentes como se fossem da Hezus
Everton colou uma vez um FAQ + números ("11 anos de atuação", "95% de sucesso", "232 empresas", "R$ 1 bilhão recuperado") que era cópia literal do site de um concorrente real (JP Balaban, citado pelo nome). Recusado — seria propaganda enganosa e reforça "direito tributário" (problema de OAB). Se pedido de novo: sempre oferecer a mesma estrutura visual com dados reais/confirmados da Hezus, nunca copiar números ou nome de concorrente.

## Pendências já identificadas
1. **Confirmar se a correção pontual do `Simulator.jsx` (botão "Ver diagnóstico completo") foi de fato colada** — último ponto em aberto no momento deste SALVAR.
2. Decidir se `ClientPanel.jsx` volta pro `App.jsx` ou fica removido definitivamente (Everton está reavaliando).
3. Conectar `LeadForm.jsx` a um destino real, ou substituí-lo pelo mecanismo do `Simulator.jsx`.
4. Substituir os placeholders de CNPJ/depoimentos no rodapé e em `Testimonials.jsx`.
5. Confirmar se "taxa de êxito" é realmente o modelo de cobrança da Hezus (mencionado no `Metodologia.jsx`).
6. Decidir números reais (ou versão honesta "empresa nova, time experiente") pra uma futura seção de FAQ + estatísticas — sem reaproveitar dados de concorrente.
7. Revisão de um advogado nas promessas de prazo e recuperação de crédito, antes de publicar definitivamente.

## Regras de linguagem do projeto (importante manter sempre)
| Evitar | Usar no lugar |
|---|---|
| "Consultoria jurídica", "assessoria jurídica" | "Consultoria tributária", "assessoria fiscal e contábil" |
| "Parecer jurídico", "fundamentação legal" | "Diagnóstico técnico", "embasamento em jurisprudência consolidada" |
| "Tese jurídica" | "Hipótese técnica" / "oportunidade fiscal" |
| "Defesa", "recurso", "petição" | "Levantamento e cálculo do crédito" |
| "Representação judicial" | "Acompanhamento administrativo" |

---
**Como usar este arquivo numa conta nova do Claude:**
1. Cole o link bruto: `https://raw.githubusercontent.com/evertondireito13-commits/hezus-tributos-app/main/CONTEXT.md`
2. Peça: "busca esse link e me diz que já entendeu o projeto."
3. Só peça upload de arquivo específico (não o zip inteiro) se for mexer em algo pontual daquele arquivo.

**Convenção "SALVAR":** quando o Everton escrever a palavra `SALVAR` sozinha numa mensagem, o Claude deve: (1) resumir o que foi resolvido/decidido nesta conversa desde a última atualização; (2) reescrever este arquivo CONTEXT.md inteiro, já atualizado, pronto pra ele copiar e colar no GitHub (Edit → Ctrl+A → colar → Commit changes); (3) não esperar o fim da conversa pra isso — pode e deve ser pedido a qualquer momento, assim que algo importante for concluído.
