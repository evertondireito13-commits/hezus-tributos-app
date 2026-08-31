import { useMemo } from 'react'
import {
  CERTEZA_CONFIG,
  CERTEZA_ORDER,
  WHATSAPP_NUMBER,
  formatBRL,
  toRoman,
  decodeDiagnostico,
} from '../utils/diagnosticoShared'

function useDiagnosticoData() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('diagnostico')
    if (!raw) return null
    return decodeDiagnostico(raw)
  }, [])
}

export default function Diagnostico() {
  const data = useDiagnosticoData()

  const itensOrdenados = useMemo(() => {
    if (!data) return []
    return [...data.itens].sort(
      (a, b) => CERTEZA_ORDER.indexOf(a.certeza) - CERTEZA_ORDER.indexOf(b.certeza)
    )
  }, [data])

  const totalPorCerteza = useMemo(() => {
    const totals = { consolidado: 0, defensavel: 0, validacao: 0 }
    if (!data) return totals
    data.itens.forEach((item) => {
      totals[item.certeza] += (item.valorMin + item.valorMax) / 2
    })
    return totals
  }, [data])

  if (!data) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="section-label">Link inválido</p>
        <h1 className="mt-3 font-display text-2xl">Não conseguimos carregar esse diagnóstico</h1>
        <p className="mt-3 text-sm text-ice/60">
          O link pode estar incompleto ou corrompido. Gere um novo diagnóstico pelo simulador na página inicial.
        </p>
        <a
          href="/"
          className="mt-6 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Voltar para o site
        </a>
      </div>
    )
  }

  const totalGeral = Object.values(totalPorCerteza).reduce((a, b) => a + b, 0)

  const dataGeracaoFormatada = new Date(data.geradoEm).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const paginaUrl = window.location.href

  const whatsappMessage = [
    'Olá! Recebi meu diagnóstico de oportunidades tributárias da Hezus e gostaria de agendar uma apresentação.',
    `Empresa: ${data.nome}`,
    `CNPJ: ${data.cnpj}`,
  ].join('\n')
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  // Sem número: abre o WhatsApp deixando a própria pessoa escolher pra quem
  // encaminhar (inclusive "Mensagens para mim", pra guardar o link).
  const compartilharWhatsappLink = `https://wa.me/?text=${encodeURIComponent(
    `Meu diagnóstico tributário da Hezus: ${paginaUrl}`
  )}`

  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    `Diagnóstico tributário — ${data.nome}`
  )}&body=${encodeURIComponent(
    `Segue o diagnóstico de oportunidades tributárias gerado pela Hezus Capital e Tributos.\n\n${paginaUrl}`
  )}`

  const handleBaixarPdf = () => {
    window.print()
  }

  return (
    <div className="min-h-screen text-ice">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      <header className="border-b border-line bg-white/[0.02] px-5 py-10 text-center sm:px-6 sm:py-16">
        <p className="section-label">Diagnóstico de oportunidades tributárias</p>
        <h1 className="mt-4 font-display text-2xl font-bold sm:text-4xl">{data.nome}</h1>
        <p className="mt-2 text-xs text-ice/50 sm:text-sm">
          CNPJ {data.cnpj} · {data.regimeLabel} · Gerado em {dataGeracaoFormatada}
        </p>
      </header>

      <main className="mx-auto mt-10 max-w-4xl px-5 sm:px-6">
        <div className="no-print mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleBaixarPdf}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ice/70 transition hover:border-ice/40"
          >
            Baixar em PDF
          </button>
          <a
            href={mailtoLink}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ice/70 transition hover:border-ice/40"
          >
            Enviar por e-mail
          </a>
          <a
            href={compartilharWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ice/70 transition hover:border-ice/40"
          >
            Enviar pelo WhatsApp
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
            <p className="text-xs uppercase tracking-wide text-ice/50">Faixa estimada em 1 ano</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-gold">
              {formatBRL(data.low)} – {formatBRL(data.high)}
            </p>
          </div>
          <div className="rounded-xl border border-blue/40 bg-blue/10 p-5">
            <p className="text-xs uppercase tracking-wide text-ice/50">Potencial em 5 anos retroativos</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-blue">
              {formatBRL(data.low5)} – {formatBRL(data.high5)}
            </p>
          </div>
        </div>

        <section className="mt-12">
          <p className="section-label">Composição do total</p>
          <h2 className="mt-2 font-display text-xl">Onde está cada real identificado</h2>
          <div className="mt-5 flex h-3 overflow-hidden rounded-full border border-line">
            {CERTEZA_ORDER.map((key) => {
              const pct = totalGeral > 0 ? (totalPorCerteza[key] / totalGeral) * 100 : 0
              if (pct <= 0) return null
              return (
                <div
                  key={key}
                  className={CERTEZA_CONFIG[key].bar}
                  style={{ width: `${pct}%` }}
                  title={`${CERTEZA_CONFIG[key].label}: ${pct.toFixed(1)}%`}
                />
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-ice/60">
            {CERTEZA_ORDER.map((key) => {
              const pct = totalGeral > 0 ? (totalPorCerteza[key] / totalGeral) * 100 : 0
              if (pct <= 0) return null
              return (
                <span key={key} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${CERTEZA_CONFIG[key].bar}`} />
                  {CERTEZA_CONFIG[key].label} · {pct.toFixed(1)}%
                </span>
              )
            })}
          </div>
        </section>

        <section className="mt-12 border-t border-line pt-8">
          <p className="section-label">Cada número com o seu grau de certeza</p>
          <h2 className="mt-2 font-display text-xl">
            {itensOrdenados.length} {itensOrdenados.length === 1 ? 'frente identificada' : 'frentes identificadas'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ice/60">
            Não é uma lista de créditos. É a leitura honesta do que é consolidado, do que é defensável e do que
            ainda precisa de prova — antes de qualquer número virar promessa.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {itensOrdenados.map((item, i) => {
              const cfg = CERTEZA_CONFIG[item.certeza]
              return (
                <div key={i} className="rounded-lg border border-line bg-white/[0.02] p-4">
                  <p className="text-sm font-medium text-ice/85">
                    <span className="mr-2 font-mono text-blue-light/70">{toRoman(i + 1)}</span>
                    {item.label}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                    <span className="font-mono text-sm text-ice/80">
                      {formatBRL(item.valorMin)} – {formatBRL(item.valorMax)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ice/50">
                    <span className="font-medium text-ice/60">Fundamento: </span>
                    {item.explicacao}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ice/50">
                    <span className="font-medium text-ice/60">Condição para virar caixa: </span>
                    {item.condicao}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <p className="mt-8 text-xs text-ice/50">
          Estimativa preliminar e ilustrativa, sujeita a diagnóstico técnico detalhado. Não constitui garantia de
          valor ou de resultado.
        </p>

        <section className="no-print mt-12 rounded-2xl border border-line bg-white/[0.03] p-6 text-center sm:p-10">
          <p className="section-label">Próximo passo</p>
          <h2 className="mt-2 font-display text-xl sm:text-2xl">Vamos transformar diagnóstico em caixa.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ice/60">
            As frentes estão mapeadas e cada uma tem a sua condição definida. Fale com a gente para avançar para a
            fase de prova e recuperação.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-blue px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Falar com a Hezus no WhatsApp
          </a>
        </section>
      </main>

      <footer className="mt-16 border-t border-line px-5 py-8 text-center text-xs text-ice/40 sm:px-6">
        HEZUS CAPITAL E TRIBUTOS · DOCUMENTO GERADO PARA {data.nome.toUpperCase()}
      </footer>
    </div>
  )
}
