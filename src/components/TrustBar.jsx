const items = [
  'Dados protegidos (LGPD)',
  'Atendimento nos 3 regimes tributários',
  'Time multidisciplinar: Direito + Contabilidade',
]

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white/[0.02] py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-sm text-ice/60">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
