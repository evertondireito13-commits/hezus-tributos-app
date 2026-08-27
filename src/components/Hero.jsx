import { useMemo, useState } from 'react'

const REGIMES = {
  simples: { label: 'Simples Nacional', low: 0.015, high: 0.035 },
  presumido: { label: 'Lucro Presumido', low: 0.02, high: 0.045 },
  real: { label: 'Lucro Real', low: 0.025, high: 0.06 },
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export default function Hero() {
  const [regime, setRegime] = useState('presumido')
  const [faturamento, setFaturamento] = useState(150000)

  const { low, high } = useMemo(() => {
    const r = REGIMES[regime]
    return { low: faturamento * r.low, high: faturamento * r.high }
  }, [regime, faturamento])

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24">
      <div className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-emerald/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="reveal-init">
          <p className="section-label mb-5">Consultoria tributária e contábil</p>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Todo <span className="text-emerald">real pago a mais</span> em tributo é um
            número que precisa se sustentar.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ice/70">
            Diagnóstico técnico, classificação de risco e cálculo de créditos —
            com tecnologia própria e acompanhamento em tempo real. Time
            multidisciplinar em Direito e Contabilidade.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#lead"
              className="rounded-full bg-emerald px-7 py-3 font-semibold text-graphite transition hover:brightness-110"
            >
              Solicitar diagnóstico gratuito
            </a>
            <a
              href="#servicos"
              className="rounded-full border border-line px-7 py-3 font-semibold text-ice/80 transition hover:border-ice/40 hover:text-ice"
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div className="reveal-init rounded-2xl border border-line bg-white/[0.03] p-6 shadow-2xl shadow-black/30 sm:p-8">
          <p className="section-label mb-1">Simulador</p>
          <h2 className="font-display text-xl">Estimativa de créditos recuperáveis</h2>

          <label className="mt-6 block text-sm text-ice/60">Regime tributário</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {Object.entries(REGIMES).map(([key, r]) => (
              <button
                key={key}
                onClick={() => setRegime(key)}
                className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                  regime === key
                    ? 'border-emerald bg-emerald/15 text-emerald'
                    : 'border-line text-ice/60 hover:border-ice/30'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <label className="mt-6 block text-sm text-ice/60">
            Faturamento médio mensal
          </label>
          <input
            type="range"
            min="20000"
            max="2000000"
            step="10000"
            value={faturamento}
            onChange={(e) => setFaturamento(Number(e.target.value))}
            className="mt-3 w-full accent-emerald"
          />
          <p className="mt-1 font-mono text-sm text-ice/70">{formatBRL(faturamento)}/mês</p>

          <div className="mt-6 rounded-xl border border-emerald/30 bg-emerald/10 p-5">
            <p className="text-xs uppercase tracking-wide text-ice/50">Faixa estimada</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-emerald">
              {formatBRL(low)} – {formatBRL(high)}
            </p>
            <p className="mt-2 text-xs text-ice/50">
              Estimativa preliminar e ilustrativa, sujeita a diagnóstico técnico
              detalhado. Não constitui garantia de valor ou de resultado.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
