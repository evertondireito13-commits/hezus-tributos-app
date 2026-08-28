import useReveal from '../hooks/useReveal'

const PARTNERS = [
  {
    name: 'Everton Pereira',
    role: 'Consultor Tributário, Contábil e em Licitações Públicas',
    bio: 'Formação em Direito e Ciências Contábeis, reunindo em um só profissional a visão contábil, fiscal e estratégica dos negócios. Sua trajetória combina experiência prática em rotinas contábeis e fiscais com atuação em consultoria para licitações públicas. É um dos responsáveis por conduzir diagnósticos tributários completos, identificar oportunidades de recuperação de créditos e otimização da carga fiscal, e estruturar planejamentos tributários e financeiros alinhados à realidade operacional e ao perfil de risco de cada cliente.',
  },
  {
    name: 'Paulo Felipe',
    role: 'Consultor em Engenharia Civil, Licitações e Contratos Públicos',
    bio: 'Formação em Engenharia Civil e vasta experiência prática em execução de obras por todo o Brasil, atuando como engenheiro responsável e como proprietário de empresas de construção — o que dá a ele uma visão completa do ciclo de projetos, do planejamento à gestão contratual e financeira. Ao longo dos anos, liderou projetos de infraestrutura de grande porte, gestão de equipes e recursos, e interface direta com o setor público, incluindo participação em licitações e execução de contratos administrativos.',
  },
]

const NARRATIVE = [
  {
    title: 'Nascimento',
    text: 'A HEZUS Capital e Tributos nasce do encontro entre técnica, experiência prática e um propósito claro: ajudar empresas a realizarem seus projetos com mais segurança, recursos e organização.',
  },
  {
    title: 'Isso é HEZUS',
    text: 'Cada diagnóstico tributário, cada planejamento e cada projeto em licitações é conduzido com responsabilidade técnica, transparência e foco em resultado mensurável — sempre respeitando a legislação e as boas práticas institucionais.',
  },
  {
    title: 'Mais uma consultoria?',
    text: 'Mais do que uma consultoria pontual, atuamos como parceiro técnico da contabilidade e das lideranças da empresa, oferecendo uma visão integrada tributária e financeira que apoia decisões de hoje e constrói bases sólidas para o futuro.',
  },
]

export default function QuemSomos() {
  const ref = useReveal()

  return (
    <section id="quem-somos" className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div ref={ref} className="reveal reveal-init mb-12 max-w-2xl sm:mb-16">
          <p className="section-label mb-3">Quem somos</p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Inteligência tributária, financeira e estratégica — não advocacia.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice/65 sm:text-base">
            A HEZUS Capital e Tributos é uma consultoria especializada em diagnóstico tributário,
            estruturação financeira e apoio técnico em licitações, voltada para empresas de médio
            e grande porte e parceiros institucionais. Atendemos um número específico de clientes
            por vez — o foco é profundidade técnica, não volume.
          </p>
        </div>

        {/* Aviso de posicionamento — deixa claro que não é banca de advocacia */}
        <div className="mb-14 rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 sm:mb-20 sm:p-8">
          <h3 className="font-display text-lg text-blue-light">Não somos um escritório de advocacia</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ice/70">
            Trabalhamos com diagnóstico técnico-contábil, cálculo e levantamento administrativo de
            créditos, planejamento tributário e apoio em licitações. Não peticionamos, não
            representamos clientes judicialmente e não emitimos parecer jurídico. Quando uma
            demanda exige atuação de advogado, articulamos com escritório de advocacia parceiro —
            sem conflito com a contabilidade ou o jurídico interno da sua empresa.
          </p>
        </div>

        {/* Narrativa institucional */}
        <div className="mb-14 grid gap-5 sm:mb-20 sm:grid-cols-3">
          {NARRATIVE.map((n) => (
            <div key={n.title} className="rounded-2xl border border-line bg-white/[0.03] p-6">
              <h3 className="font-display text-base text-blue-light">{n.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ice/65">{n.text}</p>
            </div>
          ))}
        </div>

        {/* Consultores */}
        <div className="mb-4">
          <p className="section-label mb-3">Time</p>
          <h3 className="font-display text-2xl">Consultores</h3>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PARTNERS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-line bg-white/[0.03] p-6">
              <h4 className="font-display text-lg">{p.name}</h4>
              <p className="mt-1 text-xs uppercase tracking-wide text-blue-light">{p.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ice/65">{p.bio}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-ice/50">Sede em Curitiba/PR, com atendimento em todo o Brasil.</p>
      </div>
    </section>
  )
}
