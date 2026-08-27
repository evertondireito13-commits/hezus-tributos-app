import useReveal from '../hooks/useReveal'

const testimonials = [
  { quote: 'Espaço reservado para o depoimento do primeiro cliente.', name: 'Empresa A', role: 'Comércio varejista' },
  { quote: 'Espaço reservado para o depoimento do segundo cliente.', name: 'Empresa B', role: 'Indústria' },
  { quote: 'Espaço reservado para o depoimento do terceiro cliente.', name: 'Empresa C', role: 'Serviços' },
]

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div ref={ref} className="reveal reveal-init mb-12 max-w-xl">
        <p className="section-label mb-3">Clientes</p>
        <h2 className="font-display text-3xl">O que dizem sobre o processo</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="rounded-2xl border border-line bg-white/[0.03] p-6">
            <p className="text-sm italic text-ice/70">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-4 text-xs text-ice/45">
              <span className="text-ice/70">{t.name}</span> — {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
