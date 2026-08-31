import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const RISK_TIERS = [
  {
    tier: 'Robusto',
    label: 'Amparado em norma expressa ou entendimento pacificado',
    text: 'Base normativa direta ou jurisprudência consolidada dos tribunais superiores. Risco marginal de contestação.',
  },
  {
    tier: 'Defensável',
    label: 'Amparado em entendimento favorável e prova documental',
    text: 'Jurisprudência favorável, mas ainda não pacificada, sustentada por documentação robusta. Você decide, com clareza, se avança.',
  },
  {
    tier: 'Excluído por cautela',
    label: 'O que não entra na conta',
    text: 'Interpretação frágil ou prova documental insuficiente ficam de fora. Mostramos o que descartamos, e por quê.',
  },
]

const CONTEXT_STEPS = [
  {
    n: '01',
    title: 'O cliente',
    text: 'Antes de abrir qualquer documento fiscal, mapeamos o catálogo de produtos, a região de operação e o histórico da empresa.',
  },
  {
    n: '02',
    title: 'O setor',
    text: 'Estudamos como empresas do mesmo segmento costumam operar e quais oportunidades fiscais são comuns nesse tipo de negócio.',
  },
  {
    n: '03',
    title: 'A cadeia produtiva',
    text: 'Fontes públicas, associações e federações do setor ajudam a montar um panorama dos insumos e processos envolvidos.',
  },
  {
    n: '04',
    title: 'A análise',
    text: 'Só então os documentos fiscais são abertos — já com contexto sobre o que procurar e onde é mais provável encontrar.',
  },
]

export default function MethodDeep() {
  const ref = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()
  const ref4 = useReveal()
  const [showExample, setShowExample] = useState(false)

  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Intro */}
        <div ref={ref} className="reveal reveal-init mb-14 max-w-2xl sm:mb-20">
          <p className="section-label mb-3">Como chegamos ao número</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Afiar o machado antes de executar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Um diagnóstico tributário não vale pelo software que lê os dados —
            vale pela profundidade com que eles são lidos. É isso que separa um
            número que se sustenta de uma estimativa otimista.
          </p>
        </div>

        {/* Bloco 1 — a lacuna técnica */}
        <div className="mb-16 grid gap-8 sm:mb-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-label mb-3">A lacuna técnica</p>
            <h3 className="font-display text-2xl">
              O que a maioria das ferramentas deixa passar
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ice/65">
              A maior parte das revisões fiscais automatizadas lê o SPED
              buscando apenas os códigos mais óbvios. Em créditos de ICMS
              sobre produtos intermediários, por exemplo, é comum a busca se
              limitar a CFOPs como 1556 e 2556. Isso deixa de fora compras
              lançadas em CFOPs genéricos — como 1949 e 2949 — e CSTs
              igualmente genéricos, como 090 (ICMS) e 49 (IPI). Nosso
              diagnóstico é construído para ler o arquivo fiscal inteiro, não
              só os códigos mais frequentes.
            </p>
          </div>
          <div className="scan-border rounded-2xl border border-line bg-white/[0.03] p-6">
            <p className="mb-4 text-xs uppercase tracking-wide text-ice/40">
              Códigos frequentemente ignorados
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {['CFOP 1556', 'CFOP 2556', 'CFOP 1949', 'CFOP 2949', 'CST 090', 'CST 49'].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-blue/25 bg-blue/10 px-3 py-1.5 text-blue-light"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ice/45">
              Ilustrativo. Os códigos relevantes variam conforme o CNAE e a
              operação de cada empresa.
            </p>
          </div>
        </div>

        {/* Bloco 2 — contexto antes do documento */}
        <div ref={ref2} className="reveal reveal-init mb-16 sm:mb-24">
          <p className="section-label mb-3">Contexto antes do documento</p>
          <h3 className="font-display text-2xl">Primeiro o cenário. Depois o arquivo fiscal.</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTEXT_STEPS.map((s) => (
              <div key={s.n}>
                <p className="font-mono text-2xl text-blue-light/70">{s.n}</p>
                <h4 className="mt-2 font-display text-base">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ice/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 3 — estratificação por risco */}
        <div ref={ref3} className="reveal reveal-init mb-16 sm:mb-24">
          <p className="section-label mb-3">Estratificação por risco</p>
          <h3 className="font-display text-2xl">Critério antes do crédito</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ice/65">
            Toda oportunidade identificada entra em uma de três categorias, e
            você sabe exatamente onde está pisando antes de decidir avançar.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {RISK_TIERS.map((r) => (
              <div key={r.tier} className="rounded-2xl border border-line bg-white/[0.03] p-6">
                <h4 className="font-display text-lg text-blue-light">{r.tier}</h4>
                <p className="mt-1 text-xs uppercase tracking-wide text-ice/40">{r.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ice/65">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 4 — verificação interna */}
        <div ref={ref4} className="reveal reveal-init">
          <p className="section-label mb-3">Verificação interna</p>
          <h3 className="font-display text-2xl">
            O rigor de uma fiscalização, aplicado antes de qualquer entrega
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ice/65">
            Antes de qualquer número chegar até você, ele passa por uma
            revisão interna que tenta derrubá-lo — do mesmo jeito que um
            órgão fiscalizador tentaria. Só sobrevive o que resiste a esse
            teste.
          </p>

          <button
            onClick={() => setShowExample((v) => !v)}
            className="mt-6 text-sm font-medium text-blue-light underline decoration-blue-light/40 underline-offset-4 hover:decoration-blue-light"
          >
            {showExample ? 'Fechar exemplo ilustrativo' : 'Ver exemplo ilustrativo do processo'}
          </button>

          {showExample && (
            <div className="mt-4 max-w-xl rounded-2xl border border-blue/25 bg-blue/[0.06] p-6">
              <p className="text-xs uppercase tracking-wide text-ice/40">
                Exemplo ilustrativo — não é um caso real de cliente
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ice/70">
                Em um diagnóstico hipotético, o levantamento inicial aponta{' '}
                <span className="font-mono text-blue-light">R$ X</span> em
                créditos potenciais. Após a verificação interna, parte é
                descartada por prova documental insuficiente ou entendimento
                desfavorável, e o valor final apresentado ao cliente é menor
                — mas sólido o suficiente para sustentar qualquer
                fiscalização.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
