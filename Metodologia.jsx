import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import CtaButtons from './CtaButtons.jsx'

// Caso ilustrativo — empresa e números fictícios, só para explicar o método.
const FRENTES = [
  {
    id: 'a',
    numero: 'I',
    titulo: 'Exclusão do ICMS da base de PIS/COFINS',
    certeza: 'Consolidado',
    corCerteza: 'text-blue-light border-blue/30 bg-blue/10',
    fundamento: 'Tema 69/STF, já pacificado — a matéria não depende de julgamento pendente.',
    condicao: 'Escriturável desde já, a partir da revisão da apuração dos períodos não prescritos.',
    valor: 612000,
    percentual: 46,
  },
  {
    id: 'b',
    numero: 'II',
    titulo: 'Créditos de PIS/COFINS sobre insumos e energia',
    certeza: 'Defensável',
    corCerteza: 'text-gold border-gold/30 bg-gold/10',
    fundamento: 'Regime não-cumulativo (Lucro Real), alíquota de 9,25% sobre a base de insumos essenciais.',
    condicao: 'Depende de cruzamento entre EFD-Contribuições e notas de entrada para confirmar o enquadramento como insumo.',
    valor: 398000,
    percentual: 30,
  },
  {
    id: 'c',
    numero: 'III',
    titulo: 'ICMS sobre produtos intermediários',
    certeza: 'Sujeito a validação',
    corCerteza: 'text-ice/60 border-line bg-white/[0.03]',
    fundamento: 'Itens consumidos no processo produtivo sem integrar fisicamente o produto final.',
    condicao: 'Valor sujeito à validação documental das notas fiscais de entrada (XML).',
    valor: 214000,
    percentual: 16,
  },
  {
    id: 'd',
    numero: 'IV',
    titulo: 'Restituição de ICMS-ST pago a maior',
    certeza: 'Defensável',
    corCerteza: 'text-gold border-gold/30 bg-gold/10',
    fundamento: 'Base presumida da substituição tributária superior ao valor da venda efetiva (Tema 201/STF).',
    condicao: 'Requer levantamento das vendas efetivas por período para apurar a diferença.',
    valor: 109000,
    percentual: 8,
  },
]

const ETAPAS = [
  { fase: '1', titulo: 'Mapeamento', prazo: '5 a 10 dias', texto: 'Revisão da escrituração fiscal dos períodos não prescritos, competência a competência, para localizar tributo pago a maior e crédito não aproveitado.' },
  { fase: '2', titulo: 'Prova documental', prazo: '2 a 3 semanas', texto: 'Cruzamento entre EFD, ECF e notas fiscais de entrada (XML), para sustentar cada crédito com documento — não com estimativa.' },
  { fase: '3', titulo: 'Constituição do crédito', prazo: '30 a 45 dias', texto: 'Escrituração e retificação das apurações, dentro do prazo legal para cada competência.' },
  { fase: '4', titulo: 'Recuperação', prazo: 'Conforme o caso', texto: 'Compensação administrativa (PER/DCOMP) ou, quando necessário, articulação com escritório de advocacia parceiro para a via judicial.' },
]

const TOTAL = FRENTES.reduce((acc, f) => acc + f.valor, 0)

function formatBRL(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export default function Metodologia() {
  const ref = useReveal()
  const [aberta, setAberta] = useState('a')

  return (
    <section id="metodologia" className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-4 max-w-2xl">
          <p className="section-label mb-3">Metodologia</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Do diagnóstico à recuperação — passo a passo, com exemplo.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Não entregamos uma lista de créditos. Entregamos a leitura honesta do que é
            robusto, do que é defensável e do que ainda precisa de prova — antes de
            qualquer número virar promessa. Veja como isso funciona, na prática, com um
            caso ilustrativo.
          </p>
        </div>

        <div className="mb-10 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-xs text-ice/40 sm:mb-14">
          Caso fictício, com empresa e valores meramente ilustrativos, criado para
          demonstrar o método. Não corresponde a nenhum cliente real.
        </div>

        {/* Composição do total */}
        <div className="mb-10 grid gap-6 sm:mb-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-ice/40">
              Exemplo: Metalúrgica Exemplo Ltda. (fictícia) — Lucro Real
            </p>
            <p className="mt-2 font-display text-3xl text-gold sm:text-4xl">{formatBRL(TOTAL)}</p>
            <p className="mt-1 text-sm text-ice/60">
              identificados em quatro frentes, com graus de certeza diferentes.
            </p>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full border border-line">
            {FRENTES.map((f) => (
              <div
                key={f.id}
                style={{ width: `${f.percentual}%` }}
                className={f.id === 'a' ? 'bg-blue' : f.id === 'c' ? 'bg-ice/20' : 'bg-gold'}
                title={`${f.titulo} — ${f.percentual}%`}
              />
            ))}
          </div>
        </div>

        {/* Frentes (accordion) */}
        <div className="mb-14 space-y-3 sm:mb-20">
          {FRENTES.map((f) => {
            const isOpen = aberta === f.id
            return (
              <div key={f.id} className="rounded-2xl border border-line bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setAberta(isOpen ? null : f.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-ice/40">{f.numero}</span>
                    <span className="font-display text-base">{f.titulo}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${f.corCerteza}`}>
                      {f.certeza}
                    </span>
                    <span className="font-mono text-sm text-ice/70">{formatBRL(f.valor)}</span>
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-ice/65">
                    <p><span className="text-ice/40">Fundamento: </span>{f.fundamento}</p>
                    <p className="mt-2"><span className="text-ice/40">Condição para virar caixa: </span>{f.condicao}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Etapas */}
        <div className="mb-4">
          <p className="section-label mb-3">Como conduzimos</p>
          <h3 className="font-display text-2xl">Do mapeamento à recuperação</h3>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e) => (
            <div key={e.fase} className="rounded-2xl border border-line bg-white/[0.03] p-5">
              <span className="font-mono text-xs text-blue-light">FASE {e.fase}</span>
              <h4 className="mt-2 font-display text-base">{e.titulo}</h4>
              <p className="mt-2 text-xs leading-relaxed text-ice/60">{e.texto}</p>
              <p className="mt-3 text-[11px] uppercase tracking-wide text-ice/30">{e.prazo}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ice/40">
          Nossos honorários se estruturam por taxa de êxito sobre o crédito efetivamente
          identificado e recuperado — só cobramos quando o crédito sai do papel. Quando
          uma frente exige atuação judicial, articulamos com escritório de advocacia
          parceiro, sem conflito com a contabilidade ou o jurídico interno da sua empresa.
        </p>

        <CtaButtons className="mt-10 sm:mt-14" />
      </div>
    </section>
  )
}
