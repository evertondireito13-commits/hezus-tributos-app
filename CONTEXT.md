[CONTEXT.md](https://github.com/user-attachments/files/31665091/CONTEXT.md)
# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador no topo (hero), timeline do processo.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`).
- Projeto conectado ao **Lovable** (sync automático via git, aviso em `AGENTS.md` pra nunca dar force-push/rebase na branch conectada).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas. Formação em Direito e Ciências Contábeis. Responsável por diagnósticos tributários, recuperação de créditos, planejamento tributário/financeiro.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos. Formação em Engenharia Civil, experiência em execução de obras e licitações públicas.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.
- Números reais da empresa (ainda não implementados no FAQ do site): 3 anos de existência, sócios com 10+ anos de expertise em licitações/reestruturação, 87 empresas já atendidas.

## Estrutura do código
- `src/App.jsx` — monta a página inteira. Checa `?diagnostico=` na URL: se presente, renderiza só `Diagnostico.jsx` (página de relatório completo); senão, monta a landing normal (Navbar, Hero, TrustBar, QuemSomos, Method, MethodDeep, Services, Atuacao, HowItWorks, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton). **Não tem mais `<ClientPanel />`** — a seção "Painel do cliente" foi removida do site.
- `src/components/` — um arquivo por seção.
- `src/utils/diagnosticoShared.js` — constantes compartilhadas (REGIMES, CERTEZA_CONFIG/ORDER, WHATSAPP_NUMBER, formatBRL, toRoman) + `buildDiagnosticoUrl`/`decodeDiagnostico`, que codificam o resultado do simulador direto na URL (sem backend).
- `src/components/Diagnostico.jsx` — página de relatório completo no estilo de um diagnóstico tributário real (referência: exemplo enviado de um escritório concorrente para uma empresa cliente): valores por frente, grau de certeza (Consolidado/Defensável/Em validação), CTA de agendamento. Tem botões "Baixar em PDF" (via `window.print()`), "Enviar por e-mail" e "Enviar pelo WhatsApp". O print preserva o tema escuro do site (usa `print-color-adjust: exact` — antes forçava fundo branco).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca.

## Simulador (Simulator.jsx) e fluxo de diagnóstico
- 4 passos: dados da empresa (CNPJ com busca automática na BrasilAPI, nome, telefone, e-mail, regime, faturamento) → identificação de segmento (auto via CNAE ou manual) → seleção de hipóteses tributárias aplicáveis → confirmação de documentos (SPED/EFDs).
- Ao final ("Ver estimativa"): abre o WhatsApp com o resumo, dispara e-mail via EmailJS, e navega a própria aba pra URL do diagnóstico (`?diagnostico=...`), que é a mesma página que pode ser compartilhada depois.
- Mais de 20 hipóteses tributárias mapeadas por segmento/regime/grau de certeza no array `TESES`.

## EmailJS (envio de leads por e-mail)
- Já configurado e em uso, sem backend próprio — chamada direta à API REST do EmailJS via `fetch` (sem SDK).
- Credenciais (reaproveitadas em todo o projeto, não precisam ser recriadas):
  - Service ID: `service_8wpx9uq`
  - Template ID: `template_glqg928`
  - Public Key: `Sr1K9lFnEDRGBozQN`
- Usado em dois pontos:
  1. `Simulator.jsx` (`sendLeadEmail`) — manda todos os campos do diagnóstico completo (nome, cnpj, telefone, email, regime, faturamento, teses selecionadas, faixas de valor, link do diagnóstico).
  2. `LeadForm.jsx` (formulário de contato do rodapé) — reaproveita o mesmo service/template/key, mas só coleta Nome, Empresa, Faturamento aproximado e WhatsApp. Como o template foi feito pros campos do simulador, os campos que o LeadForm não coleta (CNPJ, regime, teses, faixas) chegam em branco no e-mail. Funciona, mas não é "bonito" — criar um template dedicado no EmailJS é uma melhoria futura opcional, não obrigatória.

## Navbar (Navbar.jsx)
- 9 links + logo + botão "Diagnóstico gratuito" + hamburguer mobile.
- Logo tem `shrink-0` pra nunca ser espremida pelo flexbox (bug corrigido: antes ficava distorcida em telas intermediárias).
- Espaçamento entre links usa `space-x-*` responsivo (não `gap-*`) por ser mais robusto entre builds do Tailwind.
- Botão "Diagnóstico gratuito" só aparece a partir do breakpoint `lg` (antes era `md`) — evita que ele dispute espaço com os 9 links em telas médias/tablet.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp — agora controlados via `useState`.
- **Já conectado ao EmailJS** (ver seção acima). Mostra "Enviando...", trata erro de envio com mensagem e permite tentar de novo; só mostra "Recebido!" se o envio realmente funcionar.

## Pendências conhecidas
1. Substituir os placeholders de depoimentos (`Testimonials.jsx`).
2. Revisão de um advogado nas promessas de prazo e recuperação de crédito, antes de publicar.
3. Confirmar se Hezus Data/Radar (seção Tecnologia) estão operacionais ou devem aparecer como "Em breve".
4. Implementar no FAQ os números reais da empresa (87 empresas atendidas, 3 anos de existência, 10+ anos de expertise dos sócios).
5. Aplicação das fotos do Everton e do Paulo na seção QuemSomos ficou interrompida.
6. Confirmar se `FAQ.jsx`/`CtaButtons.jsx` foram de fato subidos no GitHub.
7. (Opcional) Criar um template dedicado no EmailJS para o LeadForm do rodapé, já que hoje reaproveita o template do simulador e manda vários campos em branco.

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
3. Só peça upload de arquivo específico (não o zip inteiro) se for mexer em algo pontual daquele arquivo — o Claude não consegue navegar livremente pela árvore de arquivos do GitHub, só ler links exatos que você fornecer.

**Convenção "SALVAR":** quando o Everton escrever a palavra `SALVAR` sozinha numa mensagem, o Claude deve: (1) resumir o que foi resolvido/decidido nesta conversa desde a última atualização; (2) reescrever este arquivo CONTEXT.md inteiro, já atualizado, pronto pra ele copiar e colar no GitHub (Edit → Ctrl+A → colar → Commit changes); (3) não esperar o fim da conversa pra isso — pode e deve ser pedido a qualquer momento, assim que algo importante for concluído.
