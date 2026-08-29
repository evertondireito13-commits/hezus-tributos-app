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
- `src/components/` — um arquivo por seção (17 componentes), incluindo `Simulator.jsx` (simulador de créditos recuperáveis, dentro do Hero).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca.

## Serviços oferecidos (seção Services.jsx)
Diagnóstico tributário · Recuperação de créditos · Planejamento tributário · BPO fiscal · Compliance e auditoria · Consultoria em licitações · Regularização cadastral · Educação tributária.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: otimização de carga tributária, recuperação de créditos (ICMS/IPI/PIS/COFINS), créditos sobre produtos intermediários, oportunidades consolidadas por STF/STJ (ex: exclusão do ICMS da base de PIS/COFINS), subvenções para investimento, reforma tributária (LC 214 — transição CBS/IBS, janela de créditos antes de 2027), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação e documentação, apoio técnico em questionamentos de edital, gestão de contratos administrativos.

## Painel do cliente (ClientPanel.jsx)
Mockup ilustrativo (dados fake: "Empresa Exemplo Ltda.") mostrando créditos identificados, status do processo, economia estimada — deixa claro que são "dados ilustrativos" e que o cliente real terá acesso ao painel de verdade após iniciar o diagnóstico. **Ainda não há painel real implementado**, é só a promessa visual na landing page.

## Simulador de créditos (Simulator.jsx) — status: funcionando ✅
- Formulário de 4 passos: dados da empresa (nome, CNPJ, telefone, e-mail, regime tributário, faturamento) → seleção de teses/hipóteses técnicas → confirmação de SPED/EFDs → estimativa final (faixa 1 ano e faixa 5 anos retroativos).
- Ao finalizar (`handleVerEstimativa`), abre uma conversa no WhatsApp com os dados preenchidos **e** dispara um e-mail via **EmailJS** para `hezus.simulador@gmail.com` com o resumo da simulação.
- **Configuração atual do EmailJS**: `EMAILJS_SERVICE_ID = 'service_8wpx9uq'` (Gmail), `EMAILJS_TEMPLATE_ID = 'template_glqg928'` (template "Contact Us", formato tabela HTML). O template antigo `template_a22m6xa` foi **excluído** da conta EmailJS — não usar mais esse ID em lugar nenhum do código.
- Testado e confirmado (29/08/2026): 1 simulação = 1 e-mail (sem duplicar) + 1 abertura de WhatsApp, ambos com todos os campos preenchidos corretamente.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp.
- **Pendência técnica confirmada no próprio README**: o formulário ainda não está conectado a nenhum destino real (hoje só faz `setSent(true)` local, sem salvar em lugar nenhum). Precisa ligar a algo como Supabase, planilha ou e-mail antes de publicar.

## Pendências
1. Conectar o formulário de lead (`LeadForm.jsx`) a um destino real.
2. Substituir os placeholders de CNPJ, contato e depoimentos no rodapé e na seção de depoimentos (`Testimonials.jsx`).
3. Revisão de um advogado nas promessas de prazo e recuperação de crédito, antes de publicar.

## Bugs resolvidos (histórico)
- `Simulator.jsx`: a tag `<a>` do botão "Abrir conversa no WhatsApp novamente" (passo 4) sumia ao colar o código no GitHub via app mobile — corrigido, confirmado presente e funcional.
- `Simulator.jsx` / EmailJS: e-mail de lead chegava duplicado (2 e-mails por simulação, formatos diferentes). Causa raiz: existiam 2 templates na conta EmailJS (`template_a22m6xa` e `template_glqg928`) e ambos, de alguma forma, estavam sendo usados/testados na mesma janela de tempo — não era clique duplo nem Auto-Reply (investigado e descartado). Resolvido excluindo o template antigo (`template_a22m6xa`) e atualizando o código para usar só o `template_glqg928`, que usa as mesmas variáveis (`{{nome}}`, `{{cnpj}}`, `{{telefone}}`, `{{email}}`, `{{regime}}`, `{{faturamento_mensal}}`, `{{teses}}`, `{{faixa_1_ano}}`, `{{faixa_5_anos}}`, `{{tem_sped}}`).

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
