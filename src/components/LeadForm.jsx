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
    <section id="lead" className="relative overflow-hidden border-t border-line bg-white/[0.02] py-24">
      <img
        src="/hezus-mark.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -bottom-16 hidden h-96 w-auto rotate-12 opacity-[0.05] md:block"
      />
      <div ref={ref} className="reveal reveal-init relative mx-auto max-w-2xl px-6 text-center">
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
              Quero fazer meu diagnóstico
            </button>
            
              href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20entrar%20em%20contato%20com%20a%20Hezus%20Capital%20e%20Tributos."
              target="_blank"
              rel="noreferrer"
              className="sm:col-span-2 rounded-full border border-line px-7 py-3 text-center text-sm font-medium text-ice/70 transition hover:border-ice/40 hover:text-ice"
            >
              Prefere WhatsApp? Entrar em contato agora
            </a>
          </form>
        )}
      </div>
    </section>
  )
}
