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
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="brand-glow pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full blur-3xl" />
      <img src="/hezus-mark.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-16 top-24 hidden h-[28rem] w-auto opacity-[0.06] lg:block" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:gap-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="reveal-init">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs text-ice/60">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Inteligência tributária, financeira e estratégica
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.3rem]">
            Você paga tributos a mais e sente que esse dinheiro nunca volta?
          </h1>
          <p className="mt-5 max-w-lg text-base text-ice/70 sm:mt-6 sm:text-lg">
            Descubra se sua empresa está entre as que pagam mais do que
            deveria — com diagnóstico técnico gratuito, tecnologia própria e
            time multidisciplinar em Direito e Contabilidade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            <a href="#lead" className="rounded-full bg-blue px-7 py-3 text-center font-semibold text-white transition hover:brightness-110">Quero fazer meu diagnóstico</a>
            <a href="https://wa.me/5541995206026?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Hezus%20Capital%20%26%20Tributos." target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-7 py-3 text-center font-semibold text-ice/80 transition hover:border-ice/40 hover:text-ice">Entrar em contato agora</a>
          </div>
        </div>

        <div className="reveal-init rounded-2xl border border-line bg-white/[0.03] p-5 shadow-2xl shadow-black/30 sm:p-8">
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
                    ? 'border-blue bg-blue/15 text-blue'
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
            className="mt-3 w-full accent-blue"
          />
          <p className="mt-1 font-mono text-sm text-ice/70">{formatBRL(faturamento)}/mês</p>

          <div className="mt-6 rounded-xl border border-blue/30 bg-blue/10 p-5">
            <p className="text-xs uppercase tracking-wide text-ice/50">Faixa estimada</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-blue-light">
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

