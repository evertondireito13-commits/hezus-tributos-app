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
Diagnóstico tributário · Recuperação de créditos · Planejamento tributário · BPO fiscal · Compliance e auditoria · Consultoria em licitações · Regularização cadastral · Educação tributária.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: otimização de carga tributária, recuperação de créditos (ICMS/IPI/PIS/COFINS), créditos sobre produtos intermediários, oportunidades consolidadas por STF/STJ (ex: exclusão do ICMS da base de PIS/COFINS), subvenções para investimento, reforma tributária (LC 214 — transição CBS/IBS, janela de créditos antes de 2027), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação e documentação, apoio técnico em questionamentos de edital, gestão de contratos administrativos.

## Painel do cliente (ClientPanel.jsx)
Mockup ilustrativo (dados fake: "Empresa Exemplo Ltda.") mostrando créditos identificados, status do processo, economia estimada — deixa claro que são "dados ilustrativos" e que o cliente real terá acesso ao painel de verdade após iniciar o diagnóstico. **Ainda não há painel real implementado**, é só a promessa visual na landing page.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp.
- **Pendência técnica confirmada no próprio README**: o formulário ainda não está conectado a nenhum destino real (hoje só faz `setSent(true)` local, sem salvar em lugar nenhum). Precisa ligar a algo como Supabase, planilha ou e-mail antes de publicar. Isso também é o que trava o upload real de SPED no simulador (ver seção Simulador acima).

## Hospedagem / deploy (importante!)
- **Lovable**: ferramenta de edição visual com IA, conectada ao repositório GitHub, mas com **limite diário de créditos grátis** — quando esgota, a prévia para de atualizar ("A prévia está desatualizada" / "Não foi possível atualizar a prévia") até renovar (24h) ou fazer upgrade pago.
- **Decisão tomada em 29/08/2026**: como o fluxo de edição já é feito direto no GitHub (com ajuda do Claude), o Lovable não é mais essencial — o código no GitHub é a fonte da verdade. Everton está avaliando publicar via **Vercel** (free tier "Hobby" tecnicamente restrito a uso não-comercial, zona cinzenta pra um site institucional comercial como este) ou alternativas como Netlify/Cloudflare Pages. **Ainda não decidido/configurado** — só discutido as opções e trade-offs de custo.
- Enquanto isso não é decidido, o Lovable continua sendo usado quando há crédito disponível.

## Incidentes resolvidos
- **29/08/2026 — CtaButtons.jsx quebrado (build failing) — recorrente:** esse arquivo quebrou (perdendo as tags de abertura `<a>` dos links) **três vezes** durante edições no editor web do GitHub — não foi o Lovable que causou, foi dificuldade de copiar/colar corretamente no editor (Ctrl+A às vezes não seleciona tudo antes de colar). Resolvido cada vez reescrevendo o arquivo ou inserindo a tag `<a` manualmente na posição exata via clique + digitação direta. **Lição para o Everton**: ao colar código novo no editor do GitHub, sempre confirmar visualmente que o texto antigo sumiu por completo antes de colar, e conferir o resultado com um print antes de commitar.
- **29/08/2026 — Simulator.jsx quebrado do mesmo jeito** (tag `<a>` do botão final de WhatsApp sem abertura): mesmo padrão do incidente acima, corrigido da mesma forma.
- **29/08/2026 — "Prévia desatualizada" no Lovable não era o bug real**: um aviso de prévia desatualizada ficou pendurado na tela do Lovable mesmo depois do build já ter rodado com o código novo; não confundir esse aviso com erro de sintaxe de verdade — sempre olhar a mensagem de erro específica (nome do arquivo + linha) pra saber se é cache ou bug real.

## Pendências já identificadas
1. Conectar o formulário de lead (`LeadForm.jsx`) a um destino real (Supabase, planilha ou e-mail).
2. Substituir os placeholders de CNPJ, contato e depoimentos no rodapé e na seção de depoimentos (`Testimonials.jsx`).
3. Revisão de um advogado/do Everton nas promessas de prazo e recuperação de crédito, antes de publicar — inclui revisar os percentuais (`min`/`max`) de cada tese no `Simulator.jsx`, que hoje são estimativas do Claude.
4. Decidir e configurar hospedagem definitiva (Vercel Pro, Netlify, Cloudflare Pages, ou manter Lovable) — ver seção "Hospedagem / deploy".
5. Decidir se/quando implementar upload real de SPED no simulador (depende do LeadForm ganhar backend primeiro).

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

**Dica prática ao colar código no GitHub**: sempre clicar dentro da caixa de código antes de `Ctrl+A`, confirmar visualmente que TODO o texto ficou selecionado antes de colar, e mandar um print pro Claude conferir antes de clicar em "Commit changes" — evita os erros recorrentes de tags `<a>` cortadas.
