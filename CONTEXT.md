# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador multi-step no hero (CNPJ real, validação, sugestão de hipóteses), painel do cliente ilustrativo, timeline do processo, seção de metodologia com caso ilustrativo.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`).
- Projeto conectado ao **Lovable** (sync automático via git, aviso em `AGENTS.md` pra nunca dar force-push/rebase na branch conectada).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas. Formação em Direito e Ciências Contábeis. Responsável por diagnósticos tributários, recuperação de créditos, planejamento tributário/financeiro.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos. Formação em Engenharia Civil, experiência em execução de obras e licitações públicas.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.

## Estrutura do código
- `src/App.jsx` — monta a página inteira, na ordem: Navbar, Hero (com Simulator embutido), TrustBar, Numbers, QuemSomos, Method, MethodDeep, **Metodologia**, Services, Atuacao, HowItWorks, ClientPanel, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton.
- `src/components/` — um arquivo por seção. Inclui `CtaButtons.jsx` (componente reutilizável com os 2 botões padrão de CTA, usado em várias seções) e `Simulator.jsx` (wizard de 5 passos, provavelmente renderizado dentro de `Hero.jsx` — confirmar).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca (cores: `graphite`, `ice`, `blue`, `blue-light`, `gold`, `line`).

## Simulator.jsx (wizard de diagnóstico)
5 passos: (1) CNPJ + dados de contato — CNPJ validado por dígito verificador, nome da empresa auto-preenchido via BrasilAPI e travado enquanto confirmado; (2) identificação de segmento — automática via CNAE ou manual; (3) seleção de hipóteses tributárias entre as 20 cadastradas, **filtradas pelas juridicamente aplicáveis ao regime tributário escolhido** (ex: crédito de PIS/COFINS não-cumulativo só aparece pra Lucro Real) e ordenadas por recomendação de segmento; (4) confirmação se tem SPED/EFDs; (5) resultado — faixa estimada em 1 ano e em 5 anos retroativos, abre WhatsApp com mensagem pronta (`5541995206026`) e envia cópia por e-mail via EmailJS (`service_8wpx9uq` / `template_glqg928`, chave pública `Sr1K9lFnEDRGBozQN`, destino `hezus.simulador@gmail.com`).
- A alíquota de PIS/COFINS não-cumulativo (9,25%) é a única baseada em lei explícita (Lei 10.637/2002 e 10.833/2003); as demais faixas min/max são estimativas de mercado — revisar se houver dado real de portfólio.

## Metodologia.jsx (seção nova)
Caso ilustrativo fictício ("Metalúrgica Exemplo Ltda.", Lucro Real) com 4 frentes de recuperação, cada uma com grau de certeza (`Consolidado` / `Defensável` / `Sujeito a validação`), fundamento legal e condição para "virar caixa". Abaixo, 4 etapas do processo (Mapeamento → Prova documental → Constituição do crédito → Recuperação). Aviso explícito de que é caso fictício. Termina com `<CtaButtons />`.
- **Menciona "taxa de êxito" como modelo de cobrança** — confirmar com o Everton se é isso mesmo que a Hezus pratica antes de publicar definitivamente.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: otimização de carga tributária, recuperação de créditos (ICMS/IPI/PIS/COFINS), créditos sobre produtos intermediários, oportunidades consolidadas por STF/STJ (ex: exclusão do ICMS da base de PIS/COFINS), subvenções para investimento, reforma tributária (LC 214 — transição CBS/IBS, janela de créditos antes de 2027), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação e documentação, apoio técnico em questionamentos de edital, gestão de contratos administrativos.

## Painel do cliente (ClientPanel.jsx)
Mockup ilustrativo (dados fake: "Empresa Exemplo Ltda.") mostrando créditos identificados, status do processo, economia estimada — deixa claro que são "dados ilustrativos" e que o cliente real terá acesso ao painel de verdade após iniciar o diagnóstico. **Ainda não há painel real implementado**, é só a promessa visual na landing page.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp.
- **Pendência técnica confirmada no próprio README**: o formulário ainda não está conectado a nenhum destino real (hoje só faz `setSent(true)` local, sem salvar em lugar nenhum). Precisa ligar a algo como Supabase, planilha ou e-mail antes de publicar. (Obs: `Simulator.jsx` já resolveu isso pro próprio fluxo dele via EmailJS + WhatsApp — avaliar se `LeadForm.jsx` devia usar o mesmo mecanismo.)

## Problema técnico recorrente: bug de colagem no editor do GitHub
Quando uma tag `<a` fica **sozinha em uma linha** (com atributos nas linhas seguintes, ex: `<a\n  href="..."\n>`), o editor web do GitHub apaga essa linha silenciosamente ao colar, quebrando o JSX (`Unexpected token`, `Expected corresponding JSX closing tag`, etc.). Já aconteceu em `Navbar.jsx`, `Hero.jsx`, `LeadForm.jsx` e `Simulator.jsx`.
**Regra permanente pra qualquer edição futura**: sempre escrever tags `<a>` com todos os atributos em uma única linha, nunca quebrada em múltiplas linhas, antes de entregar código pro Everton colar.

## Regra de conteúdo: nunca reproduzir dados de concorrentes como se fossem da Hezus
Everton colou uma vez um FAQ + bloco de números ("11 anos de atuação", "95% de sucesso", "232 empresas", "R$ 1 bilhão recuperado") que era cópia literal do site de um concorrente real (JP Balaban, inclusive citado pelo nome em uma das perguntas). Recusado: usar isso seria propaganda enganosa (número de histórico que não é da Hezus) e reforça a palavra "direito tributário" (problema de OAB). Se pedido de novo, sempre oferecer reconstruir a mesma estrutura visual (FAQ + números em destaque) com dados reais/confirmados da Hezus, nunca copiar números ou nome de concorrente.

## Pendências já identificadas
1. Conectar o formulário de lead (`LeadForm.jsx`) a um destino real (ou substituir pelo mesmo mecanismo do `Simulator.jsx`).
2. Substituir os placeholders de CNPJ, contato e depoimentos no rodapé e na seção de depoimentos (`Testimonials.jsx`).
3. Confirmar com o Everton se "taxa de êxito" é realmente o modelo de cobrança da Hezus (mencionado no `Metodologia.jsx`).
4. Decidir com o Everton os números reais (ou uma versão honesta "empresa nova, time experiente") pra uma futura seção de FAQ + estatísticas em destaque — sem reaproveitar dados de concorrente.
5. Revisão de um advogado nas promessas de prazo e recuperação de crédito, antes de publicar definitivamente.
6. Confirmar se `src/components/Simulator.jsx` já foi de fato substituído pelo arquivo corrigido (com a tag `<a>` final em linha única) — última pendência em aberto no momento deste SALVAR.

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
