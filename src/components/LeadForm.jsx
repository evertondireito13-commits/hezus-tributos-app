import { useState } from 'react'
import useReveal from '../hooks/useReveal'

export default function LeadForm() {
  const ref = useReveal()
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar a um endpoint real (ex: Supabase, Google Sheets, e-mail) antes de publicar.
    setSent(true)
  }

  return (
    <section id="lead" className="border-t border-line bg-white/[0.02] py-16 sm:py-24">
      <div ref={ref} className="reveal reveal-init mx-auto max-w-2xl px-5 sm:px-6 text-center">
        <p className="section-label mb-3">Próximo passo</p>
        <h2 className="font-display text-3xl">Quero fazer meu diagnóstico</h2>
        <p className="mt-3 text-sm text-ice/60">
          Sem compromisso. Retornamos com um panorama inicial da sua situação
          fiscal.
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-blue/30 bg-blue/10 p-6 text-blue">
            Recebido! Nossa equipe entra em contato em breve.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <input required placeholder="Nome" className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue" />
            <input required placeholder="Empresa" className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue" />
            <input required placeholder="Faturamento aproximado" className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue" />
            <input required placeholder="WhatsApp" className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue" />
            <button
              type="submit"
              className="sm:col-span-2 mt-2 rounded-full bg-blue px-7 py-3 font-semibold text-white transition hover:brightness-110"
            >
              Solicitar diagnóstico gratuito
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

