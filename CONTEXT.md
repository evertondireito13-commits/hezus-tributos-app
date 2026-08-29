[CONTEXT-hezus.md](https://github.com/user-attachments/files/31579091/CONTEXT-hezus.md)
# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador no topo (hero), painel do cliente ilustrativo, timeline do processo.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`).
- Projeto conectado ao **Lovable** (sync automático via git, aviso em `AGENTS.md` pra nunca dar force-push/rebase na branch conectada).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas. Formação em Direito e Ciências Contábeis. Responsável por diagnósticos tributários, recuperação de créditos, planejamento tributário/financeiro.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos. Formação em Engenharia Civil, experiência em execução de obras e licitações públicas.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.

## Estrutura do código
- `src/App.jsx` — monta a página inteira, na ordem: Navbar, Hero, TrustBar, QuemSomos, Method, MethodDeep, Services, Atuacao, HowItWorks, ClientPanel, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton.
- `src/components/` — um arquivo por seção (17 componentes).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca.

## Serviços oferecidos (seção Services.jsx)
Diagnóstico tributário · Recuperação de créditos · Planejamento tributário · BPO fiscal · Compliance e auditoria · Consultoria em licitações · Regularização cadastral · Educação tributária.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: otimização de carga tributária, recuperação de créditos (ICMS/IPI/PIS/COFINS), créditos sobre produtos intermediários, oportunidades consolidadas por STF/STJ (ex: exclusão do ICMS da base de PIS/COFINS), subvenções para investimento, reforma tributária (LC 214 — transição CBS/IBS, janela de créditos antes de 2027), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação e documentação, apoio técnico em questionamentos de edital, gestão de contratos administrativos.

## Painel do cliente (ClientPanel.jsx)
Mockup ilustrativo (dados fake: "Empresa Exemplo Ltda.") mostrando créditos identificados, status do processo, economia estimada — deixa claro que são "dados ilustrativos" e que o cliente real terá acesso ao painel de verdade após iniciar o diagnóstico. **Ainda não há painel real implementado**, é só a promessa visual na landing page.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp.
- **Pendência técnica confirmada no próprio README**: o formulário ainda não está conectado a nenhum destino real (hoje só faz `setSent(true)` local, sem salvar em lugar nenhum). Precisa ligar a algo como Supabase, planilha ou e-mail antes de publicar.

## Pendências já identificadas no próprio repo (README.md)
1. Conectar o formulário de lead (`LeadForm.jsx`) a um destino real.
2. Substituir os placeholders de CNPJ, contato e depoimentos no rodapé e na seção de depoimentos (`Testimonials.jsx`).
3. Revisão de um advogado nas promessas de prazo e recuperação de crédito, antes de publicar.

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
