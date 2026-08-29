import useReveal from '../hooks/useReveal'
import CtaButtons from './CtaButtons.jsx'

// Números confirmados por Everton em 29/08/2026:
// 232 empresas assessoradas · R$465M+ recuperados · 96% de taxa de oportunidade
// identificada. O "5 anos" é soma da experiência dos sócios, não o tempo da
// Hezus como empresa (esse dado é o que já foi enviado antes — mantenha a
// distinção sempre que citar anos de atuação em qualquer texto do site).
const STATS = [
  { value: '30+', label: 'Soluções para empresas do Lucro Presumido ou Lucro Real' },
  { value: 'R$ 465M+', label: 'Recuperados para clientes até hoje' },
  { value: '232+', label: 'Empresas assessoradas, do pequeno negócio à grande corporação' },
  { value: '96%', label: 'Das empresas analisadas tinham oportunidade identificada' },
]

export default function Numbers() {
  const ref = useReveal()

  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-10 max-w-2xl sm:mb-14">
          <p className="section-label mb-3">Resultados</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Não somos só mais uma consultoria — os números mostram isso.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Cada real recuperado representa a diferença entre pagar tributos
            desnecessários e investir no crescimento da sua empresa.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-white/[0.03] p-6">
              <p className="font-display text-3xl text-blue-light">{s.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-ice/60">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-white/[0.03] p-6 sm:mt-14 sm:p-8">
          <h3 className="font-display text-lg text-blue-light">Equipe multidisciplinar</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ice/65">
            Apresentamos as oportunidades, elaboramos a estratégia e
            operacionalizamos tudo — você e sua contabilidade dormindo em
            paz. Trabalhamos exclusivamente com taxa de êxito: você só paga
            se recuperarmos recursos.
          </p>
          <p className="mt-3 max-w-2xl text-xs text-ice/40">
            Nossos sócios somam mais de 5 anos de experiência combinada em
            consultoria tributária e licitações públicas.
          </p>
        </div>

        <CtaButtons className="mt-10 sm:mt-14" />
      </div>
    </section>
  )
}
