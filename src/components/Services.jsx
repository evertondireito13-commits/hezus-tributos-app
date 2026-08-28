import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const services = [
  {
    title: 'Diagnóstico tributário',
    detail: 'Mapeamento técnico-contábil para identificar pagamentos a maior e inconsistências no enquadramento fiscal atual.',
  },
  {
    title: 'Recuperação de créditos',
    detail: 'Levantamento e cálculo de créditos tributários pela via administrativa, com classificação de risco por oportunidade.',
  },
  {
    title: 'Planejamento tributário',
    detail: 'Análise de enquadramento de regime (Simples, Presumido, Real) e elisão fiscal dentro dos limites legais.',
  },
  {
    title: 'BPO fiscal',
    detail: 'Terceirização de rotinas fiscais e obrigações acessórias, com acompanhamento contínuo via painel do cliente.',
  },
  {
    title: 'Compliance e auditoria',
    detail: 'Auditoria interna e diagnóstico de conformidade fiscal para reduzir exposição a autuações.',
  },
  {
    title: 'Consultoria em licitações',
    detail: 'Suporte técnico e administrativo em processos licitatórios — habilitação fiscal e documentação.',
  },
  {
    title: 'Regularização cadastral',
    detail: 'Regularização de pendências cadastrais e fiscais de empresas junto aos órgãos competentes.',
  },
  {
    title: 'Educação tributária',
    detail: 'Conteúdo, treinamentos e materiais para times financeiros entenderem sua própria carga tributária.',
  },
]

export default function Services() {
  const ref = useReveal()
  const [open, setOpen] = useState(null)

  return (
    <section id="servicos" className="border-t border-line bg-white/[0.015] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-12 max-w-xl">
          <p className="section-label mb-3">Serviços</p>
          <h2 className="font-display text-3xl">
            O que fazemos — e o que deixamos para o advogado parceiro
          </h2>
          <p className="mt-3 text-sm text-ice/60">
            Atuamos no diagnóstico técnico, contábil e administrativo. Não
            oferecemos consultoria jurídica nem atuação em processo judicial.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <button
                key={s.title}
                onClick={() => setOpen(isOpen ? null : i)}
                className="rounded-xl border border-line bg-graphite p-5 text-left transition hover:border-blue/30"
              >
                <span className="font-mono text-xs text-blue">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-base">{s.title}</h3>
                <p
                  className={`mt-2 overflow-hidden text-xs leading-relaxed text-ice/60 transition-all ${
                    isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {s.detail}
                </p>
                <span className="mt-2 block text-xs text-ice/40">
                  {isOpen ? 'Fechar' : 'Ver detalhe'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

