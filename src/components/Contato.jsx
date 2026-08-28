import useReveal from '../hooks/useReveal'

const WHATSAPP_NUMBER = '5541995206026'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, gostaria de falar com a Hezus Capital & Tributos.')}`
const EMAIL = 'contato@hezus.com.br'

export default function Contato() {
  const ref = useReveal()

  return (
    <section id="contato" className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-14 max-w-2xl sm:mb-20">
          <p className="section-label mb-3">Contato</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Traga seus números. Nós trazemos o método.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Uma conversa direta, sem compromisso. Se pudermos ajudar, você
            saberá exatamente como.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* WhatsApp */}
          <div className="rounded-2xl border border-line bg-white/[0.03] p-6 sm:p-8">
            <p className="section-label mb-2">WhatsApp</p>
            <h3 className="font-display text-xl">Fale direto com o consultor responsável</h3>
            <p className="mt-3 text-sm leading-relaxed text-ice/65">
              Atendimento sem intermediários. Do primeiro contato ao
              diagnóstico, você fala com quem conduz o caso.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Abrir WhatsApp →
            </a>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-line bg-white/[0.03] p-6 sm:p-8">
            <p className="section-label mb-2">E-mail</p>
            <h3 className="font-display text-xl">Para envio de documentos e propostas</h3>
            <p className="mt-3 text-sm leading-relaxed text-ice/65">
              Ambiente controlado para troca de arquivos fiscais e
              financeiros. Sigilo como arquitetura.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-light underline decoration-blue-light/40 underline-offset-4 hover:decoration-blue-light"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-8 rounded-2xl border border-line bg-graphite p-6 sm:p-8 lg:grid-cols-3">
          <div>
            <p className="section-label mb-2">O que esperar</p>
            <p className="text-sm leading-relaxed text-ice/65">
              Uma conversa direta, sem apresentação comercial. Atendimento
              sem intermediários: do primeiro contato ao diagnóstico, você
              fala com quem toca o seu caso.
            </p>
          </div>
          <div>
            <p className="section-label mb-2">Endereço</p>
            <p className="text-sm text-ice/65">Alameda Dom Pedro II, 155 — Batel</p>
            <p className="text-sm text-ice/65">Curitiba/PR</p>
            <p className="mt-1 text-sm text-ice/45">Atendimento em todo o Brasil</p>
          </div>
          <div>
            <p className="section-label mb-2">Responsável</p>
            <p className="text-sm text-ice/65">Everton William Pereira</p>
            <p className="mt-1 text-xs text-ice/45">
              Consultor Tributário, Contábil e em Licitações Públicas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
