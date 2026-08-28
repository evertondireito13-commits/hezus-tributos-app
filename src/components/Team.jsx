import useReveal from '../hooks/useReveal'

const team = [
  {
    name: 'Everton Pereira',
    role: 'Consultor Tributário, Contábil e em Licitações Públicas',
    photo: '/everton-pereira.png',
    bio: 'Formação em Direito e Ciências Contábeis, reunindo em um só profissional a visão contábil, fiscal e estratégica dos negócios. Conduz diagnósticos tributários completos e estrutura planejamentos alinhados à realidade operacional de cada cliente.',
  },
  {
    name: 'Paulo Felipe',
    role: 'Consultor em Engenharia Civil, Licitações e Contratos Públicos',
    photo: '/paulo-felipe.png',
    bio: 'Formação em Engenharia Civil e vasta experiência prática em execução de obras por todo o Brasil — do planejamento e execução até a gestão contratual e financeira, incluindo interface direta com o setor público em licitações.',
  },
]

export default function Team() {
  const ref = useReveal()
  return (
    <section id="time" className="bg-paper py-24 text-graphite">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className="reveal reveal-init mb-14 max-w-xl">
          <p className="section-label-dark mb-3">Time</p>
          <h2 className="font-display text-3xl">Quem conduz o seu diagnóstico</h2>
          <p className="mt-3 text-sm text-graphite/60">
            Time multidisciplinar em Direito, Contabilidade e Engenharia —
            atuação técnica e administrativa, sem invadir o que é privativo
            de advocacia.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {team.map((p) => (
            <div
              key={p.name}
              className="flex gap-5 rounded-2xl border border-graphite/10 bg-white p-6 shadow-sm"
            >
              <img
                src={p.photo}
                alt={p.name}
                className="h-28 w-24 flex-none rounded-xl object-cover object-top"
              />
              <div>
                <h3 className="font-display text-lg text-graphite">{p.name}</h3>
                <p className="mt-1 text-xs font-medium text-blue">{p.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite/60">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
