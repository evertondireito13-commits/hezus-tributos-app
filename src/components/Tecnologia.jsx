import useReveal from '../hooks/useReveal'
import CtaButtons from './CtaButtons.jsx'

const SYSTEMS = [
  {
    n: '01',
    tag: 'Governança tributária',
    name: 'Hezus Data',
    title: 'Leitura completa da escrituração fiscal',
    text: 'Motor proprietário que lê SPED/EFD linha a linha, classifica cada item conforme os critérios de risco estratificados no nosso método e devolve o número organizado para revisão técnica antes de chegar ao cliente. Substitui amostragem por leitura integral.',
    footnote: 'Uso exclusivo dos clientes da Hezus.',
    status: 'ativo',
  },
  {
    n: '02',
    tag: 'Governança de contingências',
    name: 'Hezus Radar',
    title: 'Controle de contingências fiscais administrativas',
    text: 'Painel alimentado pelo histórico de casos reais para projetar exposição fiscal, orientar provisão contábil e sustentar decisões sobre autuações — sempre na esfera administrativa. Cada estimativa carrega o histórico que a produziu.',
    footnote: 'Calibrado por desfechos reais, não por estatística genérica.',
    status: 'ativo',
  },
  {
    n: '03',
    tag: 'Licitações públicas',
    name: 'Hezus Editais',
    title: 'A próxima fronteira: radar de oportunidades em licitações',
    text: 'Leitura automatizada de editais publicados para identificar oportunidades compatíveis com o perfil do cliente antes do prazo se esgotar. Em construção, com o mesmo princípio das outras frentes: ler tudo, antes de decidir.',
    footnote: 'Frente em desenvolvimento.',
    status: 'em breve',
  },
]

export default function Tecnologia() {
  const ref = useReveal()
  return (
    <section id="tecnologia" className="border-t border-line bg-white/[0.015] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-14 max-w-2xl sm:mb-20">
          <p className="section-label mb-3">Tecnologia</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Sistemas que não estão à venda
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Cada plataforma nasce de um problema real de um cliente real.
            Desenhamos sob medida, operamos dentro da Hezus e não
            comercializamos. Grandes empresas não sofrem por falta de dados —
            sofrem por excesso: notas demais, planilhas demais. Nossos
            sistemas leem tudo isso e devolvem o que importa para decidir.
          </p>
        </div>

        <div className="space-y-5">
          {SYSTEMS.map((s) => (
            <div
              key={s.n}
              className="scan-border grid gap-6 rounded-2xl border border-line bg-graphite p-6 transition hover:border-blue/30 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-start"
            >
              <span className="font-mono text-2xl text-blue-light/60">{s.n}</span>
              <div>
                <p className="section-label mb-1">{s.tag}</p>
                <h3 className="font-display text-xl">
                  {s.name} <span className="text-ice/40">·</span>{' '}
                  <span className="text-ice/70">{s.title}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ice/65">{s.text}</p>
                <p className="mt-3 text-xs text-ice/40">{s.footnote}</p>
              </div>
              <span
                className={`flex h-fit items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs ${
                  s.status === 'ativo'
                    ? 'border-blue/30 bg-blue/10 text-blue-light'
                    : 'border-line text-ice/40'
                }`}
              >
                {s.status === 'ativo' && (
                  <span className="pulse-live h-1.5 w-1.5 rounded-full bg-blue" />
                )}
                {s.status === 'ativo' ? 'Em operação' : 'Em breve'}
              </span>
            </div>
          ))}
        </div>

        <blockquote className="mt-14 max-w-2xl border-l-2 border-blue/40 pl-6 font-display text-lg italic text-ice/75 sm:mt-20">
          "A tecnologia acelera a leitura. A decisão final é sempre sua — com
          o time técnico da Hezus ao lado."
        </blockquote>

        <div className="mt-10 max-w-2xl rounded-2xl border border-line bg-white/[0.03] p-6">
          <h4 className="font-display text-base text-blue-light">Sigilo como arquitetura</h4>
          <p className="mt-2 text-sm leading-relaxed text-ice/65">
            Dados fiscais e financeiros dos clientes tramitam em ambiente
            controlado, com acesso restrito e segregação por caso.
            Conformidade com a LGPD é tratada como pré-requisito, não como
            argumento comercial.
          </p>
        </div>

        <CtaButtons className="mt-10 sm:mt-14" />
      </div>
    </section>
  )
}
