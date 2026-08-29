# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador multi-etapas no topo (hero), painel do cliente ilustrativo, timeline do processo.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app
- **Hospedagem/deploy:** fluxo de trabalho atual é editar direto no GitHub (via editor web, com ajuda do Claude no chat). Lovable ficou opcional (limite de crédito grátis diário). Everton está avaliando Vercel/Netlify/Cloudflare Pages para hospedagem definitiva — ainda não decidido.

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.

## Estrutura do código
- `src/App.jsx` — monta a página inteira (Navbar, Hero, TrustBar, QuemSomos, Method, MethodDeep, Services, Atuacao, HowItWorks, ClientPanel, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton).
- `src/components/Hero.jsx` — seção hero + renderiza `<Simulator />` dentro do card lateral.
- `src/components/Simulator.jsx` — o simulador de créditos recuperáveis, em 4 passos (ver seção "Simulador" abaixo).
- `src/components/CtaButtons.jsx` — botões de CTA reutilizáveis.
- `index.html` — favicon aponta para `/hezus-logo.png` (arquivo real, já existente em `public/`). Existe também `public/hezus-mark.png` (possível ícone isolado "H" da marca, ainda não confirmado visualmente) e `public/hezus-logo.svg` (criado por engano numa sessão, pode ser removido, não está em uso).

## Simulador (Simulator.jsx) — histórico de mudanças
**v1 (original):** só regime + faturamento mensal, cálculo simplista.

**v2 (29/08/2026):** reformulado para 4 passos:
1. Dados da empresa: nome, CNPJ (com máscara e validação de dígito verificador), regime tributário, faturamento médio mensal.
2. Seleção de teses: 20 checkboxes de teses tributárias conhecidas, cada uma com range de % sobre faturamento anual (percentuais são estimativas ilustrativas do Claude, **ainda precisam de revisão técnica do Everton antes de publicar**).
3. Documentação: checkbox "Tenho SPED/EFDs disponíveis" — não faz upload nem processa arquivo real (decisão deliberada, ver justificativa abaixo).
4. Resultado: faixa estimada em 1 ano **+ faixa estimada acumulada em 5 anos retroativos** (5× a faixa anual, com disclaimer de que assume faturamento estável) + disclaimers.

**v3 (29/08/2026, mesma sessão):** campos obrigatórios adicionados ao Passo 1 — **nome, CNPJ, telefone e e-mail agora são obrigatórios**, com validação (CNPJ com checksum real, telefone 10-11 dígitos, e-mail com regex) bloqueando o avanço até estarem corretos. ao clicar em "Ver estimativa" (fim do Passo 3), o simulador agora: (a) abre automaticamente uma nova aba do WhatsApp com a mensagem toda pré-preenchida (usuário só precisa confirmar o envio — não é possível pular esse clique sem WhatsApp Business API, que é paga/complexa), e (b) dispara e-mail automático via EmailJS (ver seção EmailJS abaixo).

**Decisão sobre SPED real:** processar SPED/EFD de verdade exigiria backend e regras fiscais complexas que o projeto não tem — fingir essa análise enganaria o usuário. Por isso ficou só como checkbox informativo, sem upload.

## Integração EmailJS (em configuração, 29/08/2026)
- Objetivo: captar lead automaticamente por e-mail quando alguém termina o simulador, sem precisar de backend próprio.
- Conta de e-mail dedicada criada: **hezus.simulador@gmail.com** (Gmail comum, gratuito — não Workspace).
- Conta EmailJS criada (login: e-mail do Everton, não anotado aqui por segurança).
- Serviço Gmail conectado no EmailJS: **Service ID = service_8wpx9uq**.
- Template criado ("Fale conosco" customizado) com campos: nome, cnpj, telefone, email, regime, faturamento_mensal, teses, faixa_1_ano, faixa_5_anos, tem_sped — destinatário configurado para hezus.simulador@gmail.com. **Template ID ainda não coletado/confirmado** (pendente — pegar na tela do EmailJS após salvar o template).
- **Public Key ainda não coletada** (fica em Account → General no painel do EmailJS).
- No código (`Simulator.jsx`), as 3 constantes `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` estão como placeholders vazios — o e-mail automático fica pausado (silenciosamente, sem quebrar o site) até essas 3 informações serem preenchidas no código.
- **Próximo passo:** Everton precisa pegar o Template ID e a Public Key e passar para o Claude preencher no código.

## Serviços oferecidos (Services.jsx)
Diagnóstico tributário · Recuperação de créditos · Planejamento tributário · BPO fiscal · Compliance e auditoria · Consultoria em licitações · Regularização cadastral · Educação tributária.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: recuperação de créditos (ICMS/IPI/PIS/COFINS), oportunidades STF/STJ, reforma tributária (LC 214), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação, gestão de contratos administrativos.

## Painel do cliente (ClientPanel.jsx)
Mockup ilustrativo, dados fake. **Ainda não há painel real implementado.**

## Formulário de lead (LeadForm.jsx)
Campos: Nome, Empresa, Faturamento aproximado, WhatsApp. **Ainda não conectado a nenhum destino real** (só `setSent(true)` local) — pendência conhecida, separada da integração EmailJS do Simulator.

## Incidentes resolvidos (recorrentes, mesma causa)
- **CtaButtons.jsx e Simulator.jsx quebraram repetidamente** (3-4 vezes) por perda da tag de abertura `<a>` ao colar código no editor web do GitHub — causa raiz: Ctrl+A às vezes não seleciona tudo antes de colar. Resolvido cada vez reescrevendo o trecho ou inserindo a tag manualmente. **Lição**: sempre confirmar visualmente que o texto antigo sumiu antes de colar, e mandar print antes de commitar.
- **"Prévia desatualizada" no Lovable** não é sempre bug real — às vezes é só cache; conferir a mensagem de erro específica (arquivo + linha) antes de assumir que é preciso corrigir código.
- **Lovable sem crédito grátis** trava a atualização de prévia até renovar (24h) ou upgrade pago — não é erro de código.

## Pendências já identificadas
1. Conectar o formulário de lead (`LeadForm.jsx`) a um destino real.
2. Substituir os placeholders de CNPJ, contato e depoimentos no rodapé/depoimentos.
3. Revisão do Everton nas promessas de prazo/recuperação de crédito e nos percentuais (`min`/`max`) de cada tese no `Simulator.jsx`, antes de publicar oficialmente.
4. Decidir e configurar hospedagem definitiva (Vercel Pro, Netlify, Cloudflare Pages, ou manter Lovable).
5. Finalizar integração EmailJS: coletar Template ID e Public Key, preencher no código.
6. Confirmar visualmente se `hezus-mark.png` é de fato um ícone isolado "H" (favicon melhor) ou a logo completa; ajustar favicon se necessário.
7. Decidir se/quando implementar upload real de SPED (depende do LeadForm ganhar backend).

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

**Convenção "SALVAR":** quando o Everton escrever a palavra `SALVAR` sozinha numa mensagem, o Claude deve: (1) resumir o que foi resolvido/decidido desde a última atualização; (2) reescrever este CONTEXT.md inteiro, atualizado, pronto pra copiar/colar no GitHub; (3) fazer isso a qualquer momento pedido, sem esperar o fim da conversa.

**Dica prática ao colar código no GitHub**: clicar dentro da caixa de código antes de `Ctrl+A`, confirmar visualmente que TODO o texto ficou selecionado antes de colar, mandar print pro Claude conferir antes de "Commit changes".
