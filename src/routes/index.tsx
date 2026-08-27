import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ClipboardList,
  FileSearch,
  LineChart,
  Mail,
  MessageCircle,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HEZUS — Consultoria Tributária e Contábil | Recuperação de Impostos" },
      {
        name: "description",
        content:
          "Diagnóstico técnico gratuito para recuperar valores pagos a mais em impostos. Análise baseada nas decisões mais recentes do STF e STJ, sem risco e sem complicação.",
      },
      { property: "og:title", content: "HEZUS — Recupere o que é seu por direito" },
      {
        property: "og:description",
        content:
          "Consultoria tributária especializada em recuperação de créditos fiscais. Diagnóstico técnico gratuito e sem compromisso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/5500000000000";
const EMAIL = "contato@hezus.com.br";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">
            HEZUS
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            tributos
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#como-funciona" className="transition-colors hover:text-foreground">
            Como funciona
          </a>
          <a href="#beneficios" className="transition-colors hover:text-foreground">
            Benefícios
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
          <a href="#resultados" className="transition-colors hover:text-foreground">
            Resultados
          </a>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          Diagnóstico gratuito
          <ArrowRight className="size-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="glow-emerald pointer-events-none absolute inset-0" />
      <div className="glow-gold pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" />
            Inteligência Tributária
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            Você paga impostos demais e sente que o governo{" "}
            <span className="text-primary">nunca devolve nada?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Descubra como empresas como a sua estão recuperando valores pagos a
            mais — sem risco, sem complicação e com diagnóstico técnico
            completo.
          </p>
          <p className="mt-8 font-display text-xl italic text-accent md:text-2xl">
            "Não é sobre pagar menos. É sobre recuperar o que é seu por
            direito."
          </p>
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted-foreground">
            Se você é dono ou gestor de uma empresa, essa mensagem é pra você.
            A maioria das empresas brasileiras paga tributos indevidamente todos
            os meses — e nem sabe disso. O pior? Muitos acreditam que "o
            contador já cuida disso" ou que "não tem mais nada a fazer". Mas a
            verdade é que existem créditos escondidos que podem ser recuperados
            com segurança técnica.
          </p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Transparência, segurança e simplicidade — é assim que conduzimos
            todo o processo. Mesmo que você decida não seguir com a restituição,
            você já terá em mãos um diagnóstico técnico completo, com
            informações valiosas sobre a saúde tributária da sua empresa.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-all hover:brightness-110"
            >
              Solicitar diagnóstico gratuito
              <ArrowRight className="size-5" />
            </a>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              100% gratuito · sem compromisso
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Primeiro passo",
    description:
      "Você preenche um formulário simples com os dados da sua empresa. E libera um acesso específico da RFB.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Análise",
    description:
      "Nossa equipe tributária analisa os dados com base nas decisões mais recentes do STF e STJ.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Diagnóstico",
    description:
      "Você recebe um diagnóstico técnico gratuito, com os valores estimados que podem ser recuperados e o embasamento técnico.",
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Como funciona
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Três passos. Zero complicação.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="card-elevated p-8">
              <div className="flex items-center justify-between">
                <step.icon className="size-7 text-primary" />
                <span className="font-mono text-4xl font-light text-accent/60">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-3xl text-center leading-relaxed text-muted-foreground">
          Todo o processo é feito com acompanhamento completo e total
          transparência. Se você aprovar, seguimos com o levantamento e cálculo
          do crédito de forma segura, com contrato claro, sem promessas
          milagrosas e sem risco para sua empresa.
        </p>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Search,
    title: "Um raio-X tributário da sua empresa",
    description:
      "Um retrato claro de tudo o que está sendo pago — e do que pode estar sendo pago a mais.",
  },
  {
    icon: TrendingUp,
    title: "Identificação de falhas ou oportunidades fiscais",
    description:
      "Mapeamento de hipóteses técnicas de recuperação aplicáveis ao seu segmento e regime.",
  },
  {
    icon: LineChart,
    title: "Base para tomadas de decisão mais estratégicas",
    description:
      "Material técnico para alinhar com seu contador ou setor financeiro os próximos passos com confiança.",
  },
];

function Benefits() {
  return (
    <section id="beneficios" className="border-t border-border/60 bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Mesmo que opte por não seguir
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              O diagnóstico já te entrega:
            </h2>
            <p className="mt-6 font-display text-lg italic leading-relaxed text-accent">
              "Ou seja, você não perde nada. Só ganha conhecimento e clareza
              sobre o que está sendo pago — e o que pode ser recuperado."
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Mapeamos, analisamos e aplicamos as oportunidades fiscais com
              maior potencial de economia — sempre com técnica, segurança e
              alinhamento à realidade da sua empresa.
            </p>
          </div>
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-5 rounded-xl border border-border bg-background p-6"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                  <benefit.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Meu contador já fez isso.",
    answer:
      "Perfeito, e isso é ótimo! O que fazemos aqui não substitui o trabalho do contador, mas complementa com uma análise tributária e contábil aprofundada, baseada em decisões recentes do STF e STJ que, muitas vezes, não são aplicadas automaticamente pela contabilidade tradicional. Inclusive, muitos contadores nos indicam justamente por saberem que não têm obrigação de revisar tributos pagos indevidamente nos últimos 5 anos. Nosso diagnóstico é gratuito, técnico e não interfere na rotina contábil da sua empresa. É como fazer um check-up tributário com especialistas em jurisprudência e recuperação de crédito.",
  },
  {
    question: "Já tenho setor jurídico.",
    answer:
      "Excelente! Isso só fortalece o processo. O que oferecemos é uma consultoria altamente especializada em oportunidades fiscais específicas, com foco em recuperação de valores pagos indevidamente — algo que, muitas vezes, não está no escopo do jurídico interno, que geralmente atua com foco em contratos, contencioso ou demandas operacionais. Inclusive, trabalhamos lado a lado com departamentos jurídicos, fornecendo relatórios técnicos e embasamento em jurisprudência consolidada para tomada de decisão. Nosso papel é somar tecnicamente, trazendo oportunidades que talvez ainda não tenham sido mapeadas.",
  },
  {
    question: "Já fiz isso e não preciso mais.",
    answer:
      "Ótimo saber que você já buscou esse tipo de recuperação. Isso mostra que sua empresa é proativa. Mas vale lembrar que as decisões dos tribunais mudam constantemente, e novas oportunidades vêm sendo reconhecidas pelos tribunais superiores. Além disso, o prazo de 5 anos é contínuo — ou seja, mesmo que você tenha feito uma restituição há 2 anos, os últimos 3 anos ainda podem conter créditos recuperáveis. Nosso diagnóstico é gratuito e atualizado com base nas últimas decisões do STF e STJ. Você pode se surpreender com valores que não foram contemplados anteriormente.",
  },
  {
    question: "Minha empresa não tem nada.",
    answer:
      "Essa é a resposta mais comum que ouvimos — até que o diagnóstico mostra o contrário. Muitas empresas acreditam que não têm créditos porque pagam 'certo' ou estão no Simples Nacional, mas a verdade é que o sistema tributário brasileiro é tão complexo que até quem paga corretamente pode pagar a mais sem saber. Nosso trabalho é verificar se há valores pagos indevidamente nos últimos 5 anos, com base em cruzamento de dados da Receita Federal e jurisprudência atualizada. E o melhor: se realmente não houver nada, você terá a certeza de que está 100% em dia — sem custo algum. É um raio-X tributário completo, sem compromisso.",
  },
];

function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Perguntas frequentes
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight italic md:text-3xl">
            "Dúvidas? Todas, né? Eu sei, é normal. Vou te esclarecer algumas
            situações aqui."
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-background open:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ShieldCheck className="size-5 shrink-0 text-primary transition-transform group-open:rotate-12" />
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-14 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
          <p className="font-display text-lg font-semibold text-accent md:text-xl">
            A Receita só permite a restituição de tributos pagos nos últimos 5
            anos. Quanto mais tempo passa, mais dinheiro você perde. Não deixe
            o governo ficar com o que é seu.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Construímos propostas alinhadas ao porte da empresa, ao volume de
            tributos e à complexidade das operações.
          </p>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Lucas",
    role: "Diretor Financeiro",
    company: "Distribuidora de Alimentos Ltda.",
    segment: "Distribuição e Varejo",
    quote:
      "Trabalhávamos com ICMS-ST há anos e nunca havia questionado se estávamos pagando a mais. A Hezus fez uma análise profunda das nossas operações e identificou que a base presumida era significativamente superior aos valores reais. Recuperamos R$ 340 mil em créditos de ICMS-ST dos últimos 5 anos. Mais importante: agora sabemos exatamente quanto devemos pagar daqui para frente.",
  },
  {
    name: "Thiago",
    role: "Controller",
    company: "Indústria de Componentes Eletrônicos S.A.",
    segment: "Manufatura/Indústria",
    quote:
      "Tínhamos ICMS na base do PIS/COFINS sem nunca questionar. Quando a Hezus apresentou a hipótese técnica sobre exclusão do ICMS reconhecida pelo STF, ficamos surpresos de não ter explorado isso antes. O diagnóstico revelou créditos de R$ 580 mil retroativos e uma redução permanente de 8% na nossa carga tributária mensal. Impacto direto no caixa e na margem operacional.",
  },
  {
    name: "Renata",
    role: "CFO",
    company: "Grupo Logístico e Transportes",
    segment: "Logística",
    quote:
      "Tínhamos prejuízos fiscais acumulados de anos anteriores e não sabíamos como aproveitá-los de forma estratégica. A Hezus mapeou tudo, estruturou a compensação de até 30% do lucro tributável e ainda identificou créditos de PIS/COFINS sobre insumos que não estávamos aproveitando. Entre recuperação e redução de carga, o impacto foi de mais de R$ 420 mil em fluxo de caixa nos primeiros 12 meses.",
  },
  {
    name: "Claudia L.",
    role: "Diretora Administrativa",
    company: "Rede de Varejo e E-commerce",
    segment: "Comércio Eletrônico",
    quote:
      "Operávamos em Lucro Real e pagávamos INSS sobre verbas indenizatórias sem questionar. A Hezus identificou que estávamos tributando aviso prévio indenizado e terço de férias indevidamente. Além da recuperação de R$ 98 mil, conseguimos estruturar um planejamento para os próximos períodos que reduz a carga mensal. Trabalho técnico, sem promessas irreais.",
  },
];

function Testimonials() {
  return (
    <section id="resultados" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Resultados reais
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Veja como nossa atuação estratégica trouxe segurança,
            previsibilidade e novos recursos para o caixa de nossos clientes.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article key={t.name} className="card-elevated flex flex-col p-8">
              <Quote className="size-6 text-accent" />
              <p className="mt-5 flex-1 leading-relaxed text-muted-foreground">
                {t.quote}
              </p>
              <footer className="mt-6 border-t border-border pt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.role} · {t.company}
                </p>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-primary">
                  {t.segment}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const differentials = [
  "Visão integrada: tributária, financeira, contábil e contratual.",
  "Alinhamento com a contabilidade e o jurídico interno, sem conflito de atuação.",
  "Foco em resultados mensuráveis e acompanhamento até a efetiva recuperação dos créditos.",
  "Atuação ética, dentro da lei e com respeito às boas práticas de governança.",
];

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-24">
      <div className="glow-emerald pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-gold pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Inteligência Tributária e Financeira
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Recupere o que é da sua empresa.{" "}
          <span className="text-primary">Cresça com segurança.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Diagnóstico tributário profundo, recuperação de créditos já pagos
          indevidamente e estratégias para reduzir a carga fiscal de forma
          segura, técnica e alinhada à realidade do seu negócio.
        </p>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 text-left md:grid-cols-2">
          {differentials.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-all hover:brightness-110"
          >
            Solicitar diagnóstico gratuito
            <ArrowRight className="size-5" />
          </a>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Sem compromisso · sem risco
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-semibold">HEZUS</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Conteúdo de caráter informativo e técnico-fiscal. Este serviço
              não constitui consultoria jurídica.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-primary/50"
            >
              <MessageCircle className="size-4 text-primary" />
              WhatsApp — fale com um especialista
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-primary/50"
            >
              <Mail className="size-4 text-primary" />
              {EMAIL}
            </a>
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} HEZUS · Consultoria Tributária e
          Contábil
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Faq />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
