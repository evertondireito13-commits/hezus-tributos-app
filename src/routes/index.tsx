import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
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
          <a href="#resultados" className="transition-colors hover:text-foreground">
            Resultados
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
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
            Consultoria tributária e contábil
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            Você paga impostos demais e sente que o governo{" "}
            <span className="text-primary">nunca devolve nada?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Ajudamos empresas a recuperar valores pagos a mais com total
            segurança: diagnóstico técnico completo, sem risco e sem
            complicação para a sua rotina.
          </p>
          <p className="mt-8 font-display text-xl italic text-accent md:text-2xl">
            "Não é sobre pagar menos. É sobre recuperar o que é seu por
            direito."
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
    title: "Você preenche um formulário simples",
    description:
      "Informe os dados da empresa e libere o acesso específico da RFB. Leva poucos minutos e não altera nada na sua operação.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Nossa equipe tributária analisa os dados",
    description:
      "Cruzamos suas informações com as decisões mais recentes do STF e do STJ para identificar hipóteses técnicas de recuperação.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Você recebe o diagnóstico técnico gratuito",
    description:
      "Um relatório com os valores estimados que podem ser recuperados e o embasamento em jurisprudência consolidada de cada oportunidade fiscal.",
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
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Search,
    title: "Raio-X tributário da empresa",
    description:
      "Um retrato claro de tudo o que está sendo pago — e do que pode estar sendo pago a mais.",
  },
  {
    icon: TrendingUp,
    title: "Identificação de oportunidades fiscais",
    description:
      "Mapeamento de hipóteses técnicas de recuperação aplicáveis ao seu segmento e regime.",
  },
  {
    icon: LineChart,
    title: "Base para decisões estratégicas",
    description:
      "Material técnico para alinhar com seu contador ou financeiro os próximos passos com confiança.",
  },
];

function Benefits() {
  return (
    <section id="beneficios" className="border-t border-border/60 bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Mesmo sem seguir adiante
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              O diagnóstico já vale por si só
            </h2>
            <p className="mt-6 font-display text-lg italic leading-relaxed text-accent">
              "Você não perde nada — só ganha conhecimento e clareza sobre o
              que está sendo pago e o que pode ser recuperado."
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

const testimonials = [
  {
    name: "Lucas",
    role: "Diretor Financeiro",
    company: "Distribuidora de Alimentos Ltda",
    amount: "R$ 340 mil",
    result: "recuperados em créditos de ICMS-ST dos últimos 5 anos.",
  },
  {
    name: "Thiago",
    role: "Controller",
    company: "Indústria de Componentes Eletrônicos S.A.",
    amount: "R$ 580 mil",
    result:
      "em créditos retroativos de exclusão do ICMS da base do PIS/COFINS, mais redução permanente de 8% na carga tributária mensal.",
  },
  {
    name: "Renata",
    role: "CFO",
    company: "Grupo Logístico e Transportes",
    amount: "R$ 420 mil+",
    result:
      "entre aproveitamento de prejuízo fiscal acumulado e créditos de PIS/COFINS sobre insumos.",
  },
  {
    name: "Claudia L.",
    role: "Diretora Administrativa",
    company: "Rede de Varejo e E-commerce",
    amount: "R$ 98 mil",
    result: "recuperados em créditos de INSS sobre verbas indenizatórias.",
  },
];

function Testimonials() {
  return (
    <section id="resultados" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Resultados reais
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Empresas que recuperaram o que era delas
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article key={t.name} className="card-elevated flex flex-col p-8">
              <Quote className="size-6 text-accent" />
              <p className="mt-5 font-mono text-3xl font-semibold text-primary md:text-4xl">
                {t.amount}
              </p>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                {t.result}
              </p>
              <footer className="mt-6 border-t border-border pt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: '"Meu contador já fez isso"',
    answer:
      "Nosso serviço complementa o trabalho do seu contador — não o substitui. Entregamos um diagnóstico técnico baseado nas decisões mais recentes do STF e do STJ, de forma gratuita e sem interferir em nada na rotina contábil da empresa.",
  },
  {
    question: '"Já tenho setor jurídico"',
    answer:
      "Perfeito: trabalhamos lado a lado com o jurídico interno. Nossa consultoria tributária é especializada em oportunidades fiscais específicas de recuperação de valores pagos indevidamente, e fornecemos relatórios técnicos com embasamento em jurisprudência consolidada para apoiar o time.",
  },
  {
    question: '"Já fiz isso e não preciso mais"',
    answer:
      "As decisões dos tribunais mudam constantemente, e o prazo de recuperação de 5 anos é contínuo — a cada mês, novos créditos dos últimos anos podem surgir e ainda não ter sido contemplados em análises anteriores.",
  },
  {
    question: '"Minha empresa não tem nada"',
    answer:
      "O sistema tributário brasileiro é um dos mais complexos do mundo: mesmo empresas que pagam tudo corretamente podem ter pago a mais. O diagnóstico é gratuito e sem compromisso — se não houver nada, você ganha a certeza técnica disso.",
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
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Objeções comuns, respostas diretas
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
        <div className="mt-14 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-all hover:brightness-110"
          >
            Solicitar diagnóstico gratuito
            <ArrowRight className="size-5" />
          </a>
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
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
