import useReveal from '../hooks/useReveal'

const principles = [
  {
    title: 'Critério antes do crédito',
    text: 'Cada oportunidade é classificada por risco — baixo, médio ou alto — e mostrada com justificativa. Nada entra na proposta sem critério.',
  },
  {
    title: 'O número precisa se sustentar',
    text: 'Todo cálculo é reconstruído e testado antes de chegar até você. Se o número não se sustenta, ele não vai para a proposta.',
  },
  {
    title: 'Tecnologia sem palco',
    text: 'Dashboards e ferramentas próprias existem para dar clareza ao processo — não para servir de vitrine de vendas.',
  },
  {
    title: 'Time multidisciplinar',
    text: 'Direito e Contabilidade internos, com parceria de escritório de advocacia terceirizado para a parte que exige atuação de advogado.',
  },
]

export default function Method() {
  const ref = useReveal()
  return (
    <section id="metodo" className="mx-auto max-w-6xl px-6 py-24">
      <div ref={ref} className="reveal reveal-init mb-12 max-w-xl">
        <p className="section-label mb-3">Método HEZUS</p>
        <h2 className="font-display text-3xl">
          Quatro princípios que sustentam cada diagnóstico
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {principles.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-line bg-white/[0.03] p-6 transition hover:border-blue/30"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-blue-light font-display text-sm font-bold text-white">
              H
            </div>
            <h3 className="font-display text-lg text-blue-light">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ice/65">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

