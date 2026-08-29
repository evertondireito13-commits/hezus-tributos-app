# CONTEXT.md — Hezus Capital e Tributos (site institucional)

> Este arquivo existe pra qualquer sessão nova do Claude (em qualquer conta) entender o projeto **sem precisar de upload de zip**. Basta colar o link bruto (raw) deste arquivo no chat e pedir pra buscar (fetch). Atualize este arquivo sempre que algo relevante mudar.

## Visão geral
- Site institucional (landing page) da **Hezus Capital e Tributos**, uma consultoria tributária, contábil e em licitações públicas — **não é escritório de advocacia** (regra de linguagem explícita no projeto: evitar termos jurídicos, usar termos técnico-contábeis).
- Landing page com "pegada de app": simulador no topo (hero), painel do cliente ilustrativo, timeline do processo, bloco de números/resultados.
- Stack: **React + Vite + Tailwind CSS**, single-page (tudo montado em `src/App.jsx`).
- Projeto conectado ao **Lovable** (sync automático via git, aviso em `AGENTS.md` pra nunca dar force-push/rebase na branch conectada).
- Repositório: https://github.com/evertondireito13-commits/hezus-tributos-app

## Responsáveis / equipe (mostrados no site, seção "Quem somos")
- **Everton Pereira** — Consultor Tributário, Contábil e em Licitações Públicas. Formação em Direito e Ciências Contábeis. Responsável por diagnósticos tributários, recuperação de créditos, planejamento tributário/financeiro.
- **Paulo Felipe** — Consultor em Engenharia Civil, Licitações e Contratos Públicos. Formação em Engenharia Civil, experiência em execução de obras e licitações públicas.
- Endereço: Alameda Dom Pedro II, 155 — Batel, Curitiba/PR. Atendimento em todo o Brasil.
- Contato: WhatsApp +55 41 99520-6026, e-mail contato@hezus.com.br.
- **Ex-integrante removida do site a pedido do Everton**: Silmara (não participa mais da equipe, não deve aparecer em nenhuma seção).

## Estrutura do código
- `src/App.jsx` — monta a página inteira, na ordem: Navbar, Hero (com Simulator dentro), TrustBar, **Numbers**, QuemSomos, Method, MethodDeep, Services, Atuacao, HowItWorks, ClientPanel, Tecnologia, Testimonials, FAQ, Contato, LeadForm, Footer, WhatsAppButton.
- `src/components/` — um arquivo por seção, incluindo `Simulator.jsx`, `Numbers.jsx` e `CtaButtons.jsx` (componente reutilizável de botões, ver abaixo).
- `src/hooks/useReveal.js` — hook de animação de entrada (scroll reveal).
- `tailwind.config.js` — paleta e tipografia da marca (grafite/gelo + azul + dourado como destaque).

## Números e resultados (Numbers.jsx) — confirmados por Everton em 29/08/2026
- **232+** empresas assessoradas
- **R$ 465M+** recuperados para clientes até hoje
- **96%** das empresas analisadas tinham oportunidade identificada (confirmado)
- **30+** soluções para empresas do Lucro Presumido ou Lucro Real
- Modelo de cobrança: **taxa de êxito** — só cobra se recuperar recursos.
- ⚠️ Regra importante de honestidade: o "mais de 5 anos" citado no site é a **experiência combinada dos sócios** em consultoria tributária/licitações — não é o tempo da Hezus como empresa. Nunca misturar as duas coisas em texto novo.

## CtaButtons.jsx (componente reutilizável)
Dois botões — "Quero fazer meu diagnóstico" (`#lead`) e "Entrar em contato agora" (WhatsApp `wa.me/5541995206026`) — espalhados ao final de: `Numbers.jsx`, `Method.jsx`, `Services.jsx`, `Atuacao.jsx`, `Tecnologia.jsx`.

## FAQ.jsx — perguntas atuais
Custo/taxa de êxito · Como garantem oportunidades (96%, experiência dos sócios) · Por que a Hezus (não generalista) · Experiência por setor · Atuação em processos judiciais (não atuam, parceria com advocacia) · Confiabilidade do simulador (estimativa, não garantia) · Prazo do diagnóstico · Segurança de dados (LGPD).

## Serviços oferecidos (seção Services.jsx)
Diagnóstico tributário · Recuperação de créditos · Planejamento tributário · BPO fiscal · Compliance e auditoria · Consultoria em licitações · Regularização cadastral · Educação tributária.

## Área "Atuação" (Atuacao.jsx) — duas frentes
1. **Tributário**: otimização de carga tributária, recuperação de créditos (ICMS/IPI/PIS/COFINS), créditos sobre produtos intermediários, oportunidades consolidadas por STF/STJ (ex: exclusão do ICMS da base de PIS/COFINS), subvenções para investimento, reforma tributária (LC 214 — transição CBS/IBS, janela de créditos antes de 2027), suporte técnico em autuações (defesa formal fica com escritório de advocacia parceiro).
2. **Licitações Públicas**: análise de editais, estruturação de propostas, habilitação e documentação, apoio técnico em questionamentos de edital, gestão de contratos administrativos.

## Painel do cliente (ClientPanel.jsx)
Mockup ilustrativo (dados fake: "Empresa Exemplo Ltda.") mostrando créditos identificados, status do processo, economia estimada — deixa claro que são "dados ilustrativos". **Ainda não há painel real implementado**, é só a promessa visual na landing page.

## Simulador de créditos (Simulator.jsx) — o componente mais complexo do projeto
Fluxo de **5 passos**, dentro do Hero:
1. **Dados da empresa**: CNPJ primeiro → busca automática do nome oficial na Receita Federal (via BrasilAPI, `https://brasilapi.com.br/api/cnpj/v1/{cnpj}`) e **trava o campo "Nome da empresa" (readOnly)** enquanto o nome vier confirmado — impede colocar CNPJ de uma empresa com nome de outra. Se a busca falhar, libera edição manual com aviso, e a validação de nome exige ao menos uma letra (não aceita só números). Telefone e e-mail com validação própria; CNPJ e telefone aceitam colar com ou sem pontuação (a máscara reformata sozinha).
2. **Identificação de segmento**: busca automática do CNAE (mesma BrasilAPI) pra inferir segmento (indústria/comércio/serviços/construção/outro), ou seleção manual. Usado só pra ordenar/destacar hipóteses recomendadas no passo 3 (marca dourada "Recomendada pro seu perfil") — não é obrigatório, dá pra pular.
3. **Seleção de hipóteses técnicas** (20 teses tributárias pré-cadastradas, cada uma com explicação simples e faixa de recuperação estimada).
4. **Confirmação de SPED/EFDs disponíveis** (checkbox, não obrigatório anexar nada agora).
5. **Estimativa final**: faixa 1 ano + faixa 5 anos retroativos, com aviso de que é estimativa preliminar, não garantia.

**Ao finalizar** (`handleVerEstimativa`): abre WhatsApp (`wa.me/5541995206026`) com os dados preenchidos na mensagem — **isso é intencional, confirmado pelo Everton**: o visitante manda a mensagem pro número da Hezus, não o contrário. O telefone que o cliente digitou vai só como informação dentro do texto, não como destino da conversa. **Não mexer nisso.**

**EmailJS (notificação interna)**: `EMAILJS_SERVICE_ID = 'service_8wpx9uq'`, `EMAILJS_TEMPLATE_ID = 'template_glqg928'`, `EMAILJS_PUBLIC_KEY = 'Sr1K9lFnEDRGBozQN'`. Manda 1 e-mail por simulação para `hezus.simulador@gmail.com`, confirmado sem duplicar. **Decisão consciente**: não existe e-mail de confirmação automático pro cliente — o WhatsApp já cumpre esse papel. Chegou a ser testado um segundo template (`template_a22m6xa` / confirmação ao cliente), mas foi abandonado porque o serviço Gmail pessoal do EmailJS não entrega de forma confiável pra terceiros (limitação conhecida, não é bug de configuração). Se um dia quiserem reativar isso, o caminho certo é um serviço transacional (ex: Brevo) — não o Gmail pessoal.

⚠️ **Segurança**: a chave privada do EmailJS já apareceu numa captura de tela nesta conversa — o ideal é ter sido regenerada em Account → API Keys → "Teclas de atualização" no painel do EmailJS (confirmar com o Everton se isso já foi feito).

## Bug recorrente do editor do GitHub (importante saber)
Ao colar código JSX com **duas ou mais tags `<a>`** diretamente no editor web do GitHub, a tag `<a` de uma delas (geralmente a segunda) some sozinha, quebrando o build no Lovable com erro de "Unexpected token" ou "Expected corresponding JSX closing tag". **Correção rápida**: localizar a linha órfã tipo `href={...}` sem `<a` antes, clicar no início dela e digitar (não colar) `<a` + Enter. Prevenção: preferir mandar o arquivo **completo** para download em vez de trechos pra colar, quando o arquivo tiver múltiplos links.

## Formulário de lead (LeadForm.jsx)
- Campos: Nome, Empresa, Faturamento aproximado, WhatsApp.
- **Pendência técnica**: ainda não conectado a nenhum destino real (hoje só faz `setSent(true)` local). Precisa ligar a algo como Supabase, planilha ou e-mail antes de publicar.

## Pendências
1. Conectar o formulário de lead (`LeadForm.jsx`) a um destino real.
2. Substituir os placeholders de CNPJ, contato e depoimentos no rodapé e na seção de depoimentos (`Testimonials.jsx`).
3. Revisão de um advogado nas promessas de prazo e recuperação de crédito, antes de publicar.
4. Confirmar se a chave privada do EmailJS foi regenerada após ter aparecido em print.
5. Testar e confirmar (ainda pendente de retorno do Everton) a trava CNPJ→Nome recém-implementada no Simulator.jsx.

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
3. Se for mexer em algo pontual (ex: Simulator.jsx), cole o conteúdo atual daquele arquivo específico direto no chat — não confie cegamente neste CONTEXT.md pra detalhes de código, porque ele pode ficar desatualizado se alguém mexer no projeto fora desta conversa (já aconteceu antes).

**Convenção "SALVAR":** quando o Everton escrever a palavra `SALVAR` sozinha numa mensagem, o Claude deve: (1) resumir o que foi resolvido/decidido nesta conversa desde a última atualização; (2) reescrever este arquivo CONTEXT.md inteiro, já atualizado, pronto pra ele copiar e colar no GitHub (Edit → Ctrl+A → colar → Commit changes); (3) não esperar o fim da conversa pra isso — pode e deve ser pedido a qualquer momento, assim que algo importante for concluído.
