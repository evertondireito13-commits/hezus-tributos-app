import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const AREAS = {
  tributario: {
    label: 'Tributário',
    tagline: 'Do diagnóstico à recuperação, sempre a partir da escrituração real.',
    items: [
      {
        title: 'Otimização da carga tributária',
        text: 'Revisão do desenho tributário da operação — enquadramento de regime e elisão fiscal. Pagar o que é devido, e nada além.',
      },
      {
        title: 'Recuperação de créditos',
        text: 'ICMS, IPI, PIS e COFINS pagos a maior, reconstruídos item a item na escrituração fiscal, pela via administrativa.',
      },
      {
        title: 'Créditos sobre produtos intermediários',
        text: 'Insumos consumidos no processo produtivo que a escrituração comum trata, por erro, como simples uso e consumo.',
      },
      {
        title: 'Oportunidades fiscais consolidadas',
        text: 'Aplicação administrativa de entendimentos já pacificados por STF e STJ — como a exclusão do ICMS da base de PIS/COFINS.',
      },
      {
        title: 'Subvenções para investimento',
        text: 'Habilitação e aproveitamento do crédito fiscal, com observância dos requisitos legais aplicáveis.',
      },
      {
        title: 'Reforma tributária (LC 214)',
        text: 'Diagnóstico da transição para CBS/IBS e da janela de aproveitamento de créditos acumulados antes de 2027.',
      },
      {
        title: 'Suporte técnico em autuações',
        text: 'Reconstruímos o número por trás do auto de infração. A defesa formal é conduzida por escritório de advocacia parceiro.',
      },
    ],
  },
  licitacoes: {
    label: 'Licitações Públicas',
    tagline: 'Estruturação técnica, do edital ao contrato administrativo.',
    items: [
      {
        title: 'Análise de editais',
        text: 'Leitura de riscos e oportunidades antes de decidir participar de um certame.',
      },
      {
        title: 'Estruturação de propostas',
        text: 'Visão comercial, tributária e financeira integrada na montagem da proposta.',
      },
      {
        title: 'Habilitação e documentação',
        text: 'Organização da documentação fiscal e cadastral exigida para habilitação.',
      },
      {
        title: 'Apoio técnico em questionamentos de edital',
        text: 'Levantamento técnico de inconsistências no edital, articulado com advogado parceiro quando a resposta exigir petição formal.',
      },
      {
        title: 'Gestão de contratos administrativos',
        text: 'Acompanhamento de prazos, aditivos e obrigações após a vitória no certame.',
      },
    ],
  },
  capital: {
    label: 'Capital & Estruturação Financeira',
    tagline: 'Alinhar a estrutura de capital ao crescimento, à rentabilidade e ao risco.',
    items: [
      {
        title: 'Análise da estrutura de capital',
        text: 'Relação dívida x capital próprio, custo médio ponderado de capital e cronograma de amortizações.',
      },
      {
        title: 'Reestruturação de dívidas',
        text: 'Recomendações para melhorar o perfil de alavancagem e o cronograma de endividamento.',
      },
      {
        title: 'Apoio técnico em negociações',
        text: 'Suporte na conversa com instituições financeiras e investidores, com números organizados.',
      },
      {
        title: 'Integração tributária e financeira',
        text: 'Otimização do impacto tributário dos instrumentos de captação, alinhada ao planejamento fiscal.',
      },
    ],
  },
}

export default function Atuacao() {
  const ref = useReveal()
  const [tab, setTab] = useState('tributario')
  const area = AREAS[tab]

  return (
    <section id="atuacao" className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-10 max-w-2xl sm:mb-14">
          <p className="section-label mb-3">Atuação</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Três frentes. Um jeito de trabalhar.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            Diagnóstico técnico, clareza sobre risco e acompanhamento até a
            entrega — em cada uma das áreas em que atuamos.
          </p>
        </div>

        {/* Abas */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-line pb-px">
          {Object.entries(AREAS).map(([key, a]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
                tab === key
                  ? 'border-b-2 border-blue text-ice'
                  : 'text-ice/50 hover:text-ice/80'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <p className="mb-8 max-w-xl text-sm text-ice/60">{area.tagline}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {area.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line bg-white/[0.03] p-6 transition hover:border-blue/30"
            >
              <span className="font-mono text-xs text-blue">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-base">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ice/65">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-xs leading-relaxed text-ice/40">
          Quando uma demanda exige atuação judicial ou parecer jurídico
          formal, articulamos com escritório de advocacia parceiro — sem
          conflito com o jurídico ou a contabilidade da sua empresa.
        </p>
      </div>
    </section>
  )
}
