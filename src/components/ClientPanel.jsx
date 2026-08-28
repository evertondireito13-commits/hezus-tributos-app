import useReveal from '../hooks/useReveal'

const cards = [
  { label: 'Créditos identificados', value: 'R$ 187.400', sub: '6 oportunidades mapeadas' },
  { label: 'Status do processo', value: 'Em execução', sub: '3 de 4 etapas concluídas' },
  { label: 'Economia estimada acumulada', value: 'R$ 42.900', sub: 'Últimos 12 meses' },
]

export default function ClientPanel() {
  const ref = useReveal()
  return (
    <section id="painel" className="border-t border-line bg-white/[0.015] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-12 max-w-xl">
          <p className="section-label mb-3">Painel do cliente</p>
          <h2 className="font-display text-3xl">Acompanhe tudo em tempo real</h2>
          <p className="mt-3 text-sm text-ice/60">
            Dados ilustrativos. Cada cliente tem acesso ao painel real assim
            que o diagnóstico é iniciado.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-graphite p-4 shadow-xl shadow-black/30 sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
            <span className="font-display text-sm text-ice/70">Painel — Empresa Exemplo Ltda.</span>
            <span className="rounded-full bg-blue/15 px-3 py-1 font-mono text-xs text-blue">
              Ativo
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {cards.map((c) => (
              <div key={c.label} className="rounded-xl border border-line p-4">
                <p className="text-xs uppercase tracking-wide text-ice/45">{c.label}</p>
                <p className="mt-2 font-mono text-xl font-semibold text-blue">{c.value}</p>
                <p className="mt-1 text-xs text-ice/45">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

