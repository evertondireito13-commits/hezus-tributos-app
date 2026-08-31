import { CERTEZA_CONFIG, CERTEZA_ORDER, formatBRL, toRoman } from '../utils/diagnosticoShared'
import useReveal from '../hooks/useReveal'
import CtaButtons from './CtaButtons.jsx'

// Exemplo fictício, sempre visível — usado pra mostrar como fica o painel do
// cliente mesmo pra quem não passou pelo simulador. Nome, CNPJ e valores não
// correspondem a nenhum cliente real.
const EXEMPLO = {
  nome: 'Metalúrgica Exemplo Ltda.',
  cnpj: '12.345.678/0001-90',
  regimeLabel: 'Lucro Real',
  low: 398000,
  high: 612000,
  low5: 1990000,
  high5: 3060000,
  itens: [
    {
      label: 'Exclusão do ICMS da base de PIS/COFINS',
      explicacao: 'O ICMS destacado na nota não deveria compor a base de cálculo do PIS/COFINS (Tema 69/STF, já pacificado).',
      condicao: 'Escriturável desde já, a partir da revisão da apuração dos períodos não prescritos.',
      certeza: 'consolidado',
      valorMin: 172000,
      valorMax: 268000,
    },
    {
      label: 'Créditos de PIS/COFINS sobre insumos essenciais',
      explicacao: 'No regime não-cumulativo, insumos essenciais ao processo produtivo geram crédito de 9,25%.',
      condicao: 'Exige mapear os itens que se enquadram no conceito de insumo (essencialidade e relevância).',
      certeza: 'defensavel',
      valorMin: 141000,
      valorMax: 219000,
    },
    {
      label: 'ICMS sobre produtos intermediários',
      explicacao: 'Itens consumidos no processo produtivo sem integrar fisicamente o produto final também podem gerar crédito.',
      condicao: 'Valor sujeito à validação documental das notas fiscais de entrada.',
      certeza: 'validacao',
      valorMin: 85000,
      valorMax: 125000,
    },
  ],
}

export default function PainelCliente() {
  const ref = useReveal()

  const totalPorCerteza = { consolidado: 0, defensavel: 0, validacao: 0 }
  EXEMPLO.itens.forEach((item) => {
    totalPorCerteza[item.certeza] += (item.valorMin + item.valorMax) / 2
  })
  const totalGeral = Object.values(totalPorCerteza).reduce((a, b) => a + b, 0)

  return (
    <section id="painel" className="border-t border-line bg-white/[0.015] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-10 max-w-2xl sm:mb-14">
          <p className="section-label mb-3">Painel do cliente</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            É assim que o seu diagnóstico chega até você.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Não precisa preencher o simulador pra ver como funciona. Este é um
            exemplo completo e ilustrativo de como fica o painel depois do
            diagnóstico técnico — com o mesmo formato que você recebe de verdade.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-xs text-ice/40">
          Empresa, CNPJ e valores fictícios, só para ilustração. Não corresponde a
          nenhum cliente real.
        </div>

        <div className="rounded-2xl border border-line bg-graphite p-6 sm:p-8">
          <header className="border-b border-line pb-6 text-center">
            <p className="section-label">Diagnóstico de oportunidades tributárias</p>
            <h3 className="mt-3 font-display text-2xl font-bold">{EXEMPLO.nome}</h3>
            <p className="mt-2 text-xs text-ice/50">
              CNPJ {EXEMPLO.cnpj} · {EXEMPLO.regimeLabel} · Exemplo ilustrativo
            </p>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
              <p className="text-xs uppercase tracking-wide text-ice/50">Faixa estimada em 1 ano</p>
              <p className="mt-1 font-mono text-2xl font-semibold text-gold">
                {formatBRL(EXEMPLO.low)} – {formatBRL(EXEMPLO.high)}
              </p>
            </div>
            <div className="rounded-xl border border-blue/40 bg-blue/10 p-5">
              <p className="text-xs uppercase tracking-wide text-ice/50">Potencial em 5 anos retroativos</p>
              <p className="mt-1 font-mono text-2xl font-semibold text-blue">
                {formatBRL(EXEMPLO.low5)} – {formatBRL(EXEMPLO.high5)}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="section-label">Composição do total</p>
            <h4 className="mt-2 font-display text-lg">Onde está cada real identificado</h4>
            <div className="mt-4 flex h-3 overflow-hidden rounded-full border border-line">
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
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-ice/60">
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
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="section-label">Cada número com o seu grau de certeza</p>
            <h4 className="mt-2 font-display text-lg">
              {EXEMPLO.itens.length} frentes identificadas
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ice/60">
              Não é uma lista de créditos. É a leitura honesta do que é
              consolidado, do que é defensável e do que ainda precisa de prova —
              antes de qualquer número virar promessa.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXEMPLO.itens.map((item, i) => {
                const cfg = CERTEZA_CONFIG[item.certeza]
                return (
                  <div key={item.label} className="rounded-lg border border-line bg-white/[0.02] p-4">
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
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ice/40">
          Quando você faz sua própria simulação, recebe um relatório com esse
          mesmo formato — só que com os dados e o cálculo específicos da sua
          empresa, gerados a partir das hipóteses que você selecionar.
        </p>

        <CtaButtons className="mt-8" />
      </div>
    </section>
  )
}
