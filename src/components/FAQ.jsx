import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const faqs = [
  {
    q: 'Vocês atuam em processos judiciais?',
    a: 'Não. Não somos um escritório de advocacia. Cuidamos do diagnóstico técnico e do cálculo de créditos; quando há necessidade de atuação judicial, trabalhamos em conjunto com escritório de advocacia parceiro.',
  },
  {
    q: 'O valor estimado no simulador é garantido?',
    a: 'Não. É uma estimativa preliminar e ilustrativa, baseada em faixas médias por regime tributário. O valor real só é definido após diagnóstico técnico detalhado.',
  },
  {
    q: 'Quanto tempo leva um diagnóstico?',
    a: 'Varia conforme o porte da empresa e a organização dos dados fiscais, mas a etapa inicial de mapeamento costuma ser rápida — normalmente entre 5 e 10 dias úteis.',
  },
  {
    q: 'Meus dados fiscais ficam seguros?',
    a: 'Sim. O tratamento de dados segue a LGPD, com acesso restrito à equipe responsável pelo seu diagnóstico.',
  },
]

export default function FAQ() {
  const ref = useReveal()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="border-t border-line py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div ref={ref} className="reveal reveal-init mb-10">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="font-display text-3xl">Perguntas frequentes</h2>
        </div>
        <div className="divide-y divide-line border-t border-b border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="font-display text-base">{f.q}</span>
                  <span className="ml-4 text-emerald">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-ice/65">{f.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
