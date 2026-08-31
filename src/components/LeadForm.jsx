import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const EMAILJS_SERVICE_ID = 'service_8wpx9uq'
const EMAILJS_TEMPLATE_ID = 'template_glqg928'
const EMAILJS_PUBLIC_KEY = 'Sr1K9lFnEDRGBozQN'

export default function LeadForm() {
  const ref = useReveal()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const [nome, setNome] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [faturamento, setFaturamento] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            nome: empresa,
            cnpj: '-',
            telefone: whatsapp,
            email: '-',
            regime: '-',
            faturamento_mensal: faturamento,
            teses: '-',
            faixa_1_ano: '-',
            faixa_5_anos: '-',
            tem_sped: '-',
            link_diagnostico: '-',
            origem: 'Formulário de contato (rodapé do site)',
            nome_contato: nome,
          },
        }),
      })
      if (!res.ok) throw new Error('Falha no envio')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
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
            <input
              required
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue"
            />
            <input
              required
              placeholder="Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue"
            />
            <input
              required
              placeholder="Faturamento aproximado"
              value={faturamento}
              onChange={(e) => setFaturamento(e.target.value)}
              className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue"
            />
            <input
              required
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="rounded-lg border border-line bg-graphite px-4 py-3 text-sm outline-none focus:border-blue"
            />
            {error && (
              <p className="text-xs text-red-400 sm:col-span-2">
                Não conseguimos enviar agora. Tenta de novo em instantes ou chama a gente no WhatsApp.
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="sm:col-span-2 mt-2 rounded-full bg-blue px-7 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Enviando...' : 'Solicitar diagnóstico gratuito'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
