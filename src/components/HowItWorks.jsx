import useReveal from '../hooks/useReveal'

const steps = [
  { n: '01', title: 'Diagnóstico', text: 'Levantamento dos dados fiscais e contábeis da empresa.' },
  { n: '02', title: 'Classificação de oportunidades', text: 'Cada oportunidade é estratificada por risco, com justificativa.' },
  { n: '03', title: 'Execução', text: 'Cálculo e levantamento formal dos créditos administrativos aprovados.' },
  { n: '04', title: 'Entrega do diagnóstico', text: 'Relatório completo — por link, e-mail ou WhatsApp — com cada valor e seu grau de certeza.' },
]

export default function HowItWorks() {
  const ref = useReveal()
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-6 py-16 sm:py-24">
      <div ref={ref} className="reveal reveal-init mb-14 max-w-xl">
        <p className="section-label mb-3">Como funciona</p>
        <h2 className="font-display text-3xl">Um processo, do diagnóstico à entrega</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative pl-1">
            <p className="font-mono text-3xl text-blue-light/70">{s.n}</p>
            <h3 className="mt-3 font-display text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-ice/60">{s.text}</p>
            {i < steps.length - 1 && (
              <div className="mt-6 hidden h-px bg-line lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
