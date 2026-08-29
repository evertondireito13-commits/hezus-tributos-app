# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador multi-etapas no topo (hero), painel do cliente ilustrativo, timeline do processo.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app
- **Hospedagem/deploy:** o fluxo de trabalho atual é editar direto no GitHub (via editor web, com ajuda do Claude no chat) — o Lovable ficou opcional, usado só quando sobra crédito grátis (ver seção "Hospedagem" abaixo).

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas. Formação em Direito e Ciências Contábeis. Responsável por diagnósticos tributários, recuperação de créditos, planejamento tributário/financeiro.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos. Formação em Engenharia Civil, experiência em execução de obras e licitações públicas.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.

## Estrutura do código
- `src/App.jsx` — monta a página inteira, na ordem: Navbar, Hero, TrustBar, QuemSomos, Method, MethodDeep, Services, Atuacao, HowItWorks, ClientPanel, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton.
- `src/components/Hero.jsx` — seção hero (título, texto, botões CTA via `CtaButtons.jsx`) + renderiza `<Simulator />` dentro do card lateral.
- `src/components/Simulator.jsx` — **novo componente** (separado do Hero), o simulador de créditos recuperáveis em 4 passos (ver seção "Simulador" abaixo).
- `src/components/CtaButtons.jsx` — botões de CTA reutilizáveis ("Quero fazer meu diagnóstico" e "Entrar em contato agora" via WhatsApp).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca.

## Simulador (Simulator.jsx) — reformulado em 29/08/2026
Motivo: o simulador antigo era simplista demais (só regime + faturamento mensal, sem lógica real). Reformulado para 4 passos:
1. **Dados da empresa**: nome, CNPJ (com máscara automática), regime tributário (Simples/Presumido/Real), faturamento médio mensal (slider).
2. **Seleção de teses**: checkboxes com 20 teses tributárias conhecidas (exclusão ICMS da base PIS/COFINS, créditos sobre insumos, ICMS-ST, DIFAL, segregação no Simples, etc.), cada uma com um range de % (`min`/`max`) sobre faturamento anual — **os percentuais são estimativas ilustrativas do Claude, ainda precisam de revisão técnica do Everton antes de publicar oficialmente**.
3. **Documentação**: checkbox "Tenho SPED Fiscal/EFDs dos últimos 5 anos disponíveis" — **não faz upload nem processa arquivo real** (decisão deliberada: processar SPED de verdade exigiria backend e regras fiscais complexas que o projeto não tem; fingir isso enganaria o usuário). Serve só de sinalização pro time.
4. **Resultado**: soma os ranges das teses marcadas × faturamento anual → faixa estimada com disclaimer forte ("estimativa preliminar e ilustrativa... não constitui garantia"). Botão final abre WhatsApp com mensagem pré-preenchida contendo todos os dados coletados (nome, CNPJ, regime, faturamento, teses escolhidas, faixa estimada, se tem SPED).

## Serviços oferecidos (seção Services.jsx)
Diagnóstico tributário · Recuperação de créditos ·
