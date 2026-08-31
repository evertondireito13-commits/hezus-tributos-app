import { useEffect, useMemo, useState } from 'react'
import {
  REGIMES,
  CERTEZA_CONFIG,
  CERTEZA_ORDER,
  WHATSAPP_NUMBER,
  toRoman,
  formatBRL,
  buildDiagnosticoUrl,
} from '../utils/diagnosticoShared'

const SEGMENTOS = {
  industria: { label: 'Indústria' },
  comercio: { label: 'Comércio' },
  servicos: { label: 'Serviços' },
  construcao: { label: 'Construção Civil' },
  outro: { label: 'Outro / Não sei' },
}

const PIS_COFINS_NAO_CUMULATIVO = 0.0925

const TESES = [
  {
    id: 'icms-pis-cofins',
    label: 'Exclusão do ICMS da base de PIS/COFINS',
    explicacao: 'O ICMS destacado na nota não deveria compor a base de cálculo do PIS/COFINS (Tema 69/STF, já pacificado). Aplica-se a empresas do Lucro Presumido e do Lucro Real.',
    segments: ['industria', 'comercio'],
    regimes: ['presumido', 'real'],
    min: 0.008, max: 0.02,
    certeza: 'consolidado',
    condicao: 'Escriturável desde já, a partir da revisão da apuração dos períodos não prescritos.',
  },
  {
    id: 'iss-pis-cofins',
    label: 'Exclusão do ISS da base de PIS/COFINS',
    explicacao: 'Mesmo raciocínio do ICMS, aplicado ao ISS: o imposto municipal destacado não deveria integrar a base de PIS/COFINS de empresas de serviço no Presumido ou Real.',
    segments: ['servicos', 'construcao'],
    regimes: ['presumido', 'real'],
    min: 0.003, max: 0.008,
    certeza: 'defensavel',
    condicao: 'Requer levantamento dos valores de ISS destacados nas notas dos períodos não prescritos.',
  },
  {
    id: 'insumos-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre insumos essenciais',
    explicacao: 'No regime não-cumulativo (Lucro Real), insumos essenciais ao processo geram crédito de 9,25%. Estimativa: base de insumos entre 8% e 20% do faturamento, conforme o segmento.',
    segments: ['industria', 'construcao'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.08, max: PIS_COFINS_NAO_CUMULATIVO * 0.2,
    certeza: 'defensavel',
    condicao: 'Exige mapear os itens que se enquadram no conceito de insumo (critério de essencialidade e relevância).',
  },
  {
    id: 'energia-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre energia elétrica',
    explicacao: 'Energia elétrica consumida no estabelecimento gera crédito de 9,25% no regime não-cumulativo, mesmo fora da produção direta. Estimativa: base entre 1% e 4% do faturamento.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.01, max: PIS_COFINS_NAO_CUMULATIVO * 0.04,
    certeza: 'consolidado',
    condicao: 'Basta o levantamento do consumo de energia elétrica nas notas fiscais do período.',
  },
  {
    id: 'frete-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre frete (insumo)',
    explicacao: 'Frete pago para transportar insumos ou mercadorias entre estabelecimentos costuma ser tratado como insumo. Estimativa: base entre 1% e 4% do faturamento.',
    segments: ['industria', 'comercio', 'construcao'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.01, max: PIS_COFINS_NAO_CUMULATIVO * 0.04,
    certeza: 'defensavel',
    condicao: 'Requer identificar os fretes vinculados a insumos ou mercadorias, separando-os dos não elegíveis.',
  },
  {
    id: 'embalagens-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre embalagens',
    explicacao: 'Embalagens usadas no processo produtivo ou na expedição de mercadorias também compõem a base de crédito de 9,25%. Estimativa: base entre 0,5% e 2% do faturamento.',
    segments: ['industria', 'comercio'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.005, max: PIS_COFINS_NAO_CUMULATIVO * 0.02,
    certeza: 'defensavel',
    condicao: 'Exige separar as embalagens de uso no processo produtivo das de uso administrativo.',
  },
  {
    id: 'icms-st',
    label: 'Recuperação de ICMS-ST pago a maior',
    explicacao: 'Quando a base presumida da substituição tributária supera o valor da venda efetiva, a diferença de ICMS pode ser restituída (LC 87/96, art. 10, e decisão do STF no Tema 201).',
    segments: ['comercio'],
    regimes: ['presumido', 'real'],
    min: 0.004, max: 0.012,
    certeza: 'consolidado',
    condicao: 'Requer levantamento das vendas efetivas por período para apurar a diferença entre base presumida e base real.',
  },
  {
    id: 'icms-energia',
    label: 'Créditos de ICMS sobre energia elétrica (indústria)',
    explicacao: 'Indústrias que consomem energia elétrica no processo produtivo têm direito a crédito de ICMS sobre esse consumo — item que costuma passar despercebido na apuração de rotina.',
    segments: ['industria'],
    regimes: ['presumido', 'real'],
    min: 0.002, max: 0.006,
    certeza: 'defensavel',
    condicao: 'Depende de laudo técnico ou memória de cálculo do consumo de energia na produção.',
  },
  {
    id: 'icms-irpj-csll',
    label: 'Exclusão do ICMS da base de IRPJ/CSLL (subvenção)',
    explicacao: 'Incentivos fiscais de ICMS concedidos por convênio estadual podem ser excluídos da base de IRPJ/CSLL quando registrados como subvenção para investimento, cumpridos os requisitos legais.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    regimes: ['real'],
    min: 0.003, max: 0.01,
    certeza: 'validacao',
    condicao: 'Depende do registro da subvenção em reserva de incentivos fiscais e do cumprimento dos requisitos da LC 160/2017.',
  },
  {
    id: 'ipi-insumos',
    label: 'Créditos de IPI sobre insumos isentos/alíquota zero',
    explicacao: 'Estabelecimentos industriais que compram insumos isentos ou com alíquota zero de IPI têm, em determinadas hipóteses, direito ao crédito presumido correspondente.',
    segments: ['industria'],
    regimes: ['presumido', 'real'],
    min: 0.002, max: 0.006,
    certeza: 'validacao',
    condicao: 'Requer identificação, nota a nota, dos insumos isentos ou com alíquota zero utilizados na produção.',
  },
  {
    id: 'difal',
    label: 'Restituição de DIFAL pago indevidamente',
    explicacao: 'Compras interestaduais com cálculo incorreto do diferencial de alíquota costumam gerar recolhimento a maior, passível de restituição administrativa.',
    segments: ['comercio', 'industria'],
    regimes: ['simples', 'presumido', 'real'],
    min: 0.001, max: 0.005,
    certeza: 'defensavel',
    condicao: 'Requer conferência do cálculo do diferencial de alíquota em cada operação interestadual do período.',
  },
  {
    id: 'produtos-intermediarios',
    label: 'Créditos sobre produtos intermediários',
    explicacao: 'Itens consumidos no processo de fabricação sem integrar fisicamente o produto final — mas essenciais a ele — também podem gerar crédito de ICMS e IPI.',
    segments: ['industria'],
    regimes: ['presumido', 'real'],
    min: 0.002, max: 0.006,
    certeza: 'validacao',
    condicao: 'Depende de leitura ampla da escrituração para separar itens tratados, por erro, como uso e consumo.',
  },
  {
    id: 'segregacao-simples',
    label: 'Segregação de receitas no Simples Nacional',
    explicacao: 'Empresas do Simples com mais de uma atividade (ex: comércio e serviço) que não segregam corretamente as receitas por anexo costumam pagar alíquota efetiva maior que a devida.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    regimes: ['simples'],
    min: 0.003, max: 0.012,
    certeza: 'defensavel',
    condicao: 'Exige reclassificação das receitas por anexo do Simples Nacional, com apuração retroativa.',
  },
  {
    id: 'verbas-inss',
    label: 'Exclusão de verbas indenizatórias da base do INSS patronal',
    explicacao: 'Verbas de natureza indenizatória (como aviso prévio indenizado e terço constitucional de férias) não deveriam compor a base da contribuição previdenciária patronal.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    regimes: ['presumido', 'real'],
    min: 0.002, max: 0.008,
    certeza: 'defensavel',
    condicao: 'Requer identificação das verbas de natureza indenizatória na folha de pagamento do período.',
  },
  {
    id: 'cnae-iss',
    label: 'Revisão de enquadramento de CNAE/ISS',
    explicacao: 'Enquadramento de atividade divergente do praticado pode levar o município a exigir alíquota de ISS acima da devida — comum em empresas com atividade mista.',
    segments: ['servicos', 'construcao'],
    regimes: ['simples', 'presumido', 'real'],
    min: 0.001, max: 0.005,
    certeza: 'validacao',
    condicao: 'Depende de análise do enquadramento de atividade praticado frente ao CNAE cadastrado.',
  },
  {
    id: 'software-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre softwares e licenças',
    explicacao: 'Licenças de software essenciais à operação, no regime não-cumulativo, podem compor a base de crédito de 9,25% quando caracterizadas como insumo.',
    segments: ['servicos', 'industria', 'comercio'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.005, max: PIS_COFINS_NAO_CUMULATIVO * 0.02,
    certeza: 'validacao',
    condicao: 'Exige demonstrar a essencialidade da licença de software para a atividade-fim.',
  },
  {
    id: 'publicidade-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre propaganda e publicidade',
    explicacao: 'Em segmentos onde publicidade é essencial à atividade-fim, gastos com propaganda podem ser enquadrados como insumo e compor a base de crédito de 9,25%.',
    segments: ['comercio', 'servicos'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.003, max: PIS_COFINS_NAO_CUMULATIVO * 0.01,
    certeza: 'validacao',
    condicao: 'Exige demonstrar a essencialidade do gasto com publicidade para a atividade-fim.',
  },
  {
    id: 'perdcomp',
    label: 'Compensação de créditos federais via PER/DCOMP',
    explicacao: 'Créditos federais já reconhecidos e não utilizados ficam parados na escrita fiscal quando a empresa não formaliza a compensação — o crédito existe, só falta ser operacionalizado.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    regimes: ['presumido', 'real'],
    min: 0.002, max: 0.007,
    certeza: 'consolidado',
    condicao: 'Basta formalizar a compensação de créditos já reconhecidos e ainda não utilizados.',
  },
  {
    id: 'seguros-pis-cofins',
    label: 'Créditos sobre seguros obrigatórios (insumo)',
    explicacao: 'Seguros obrigatórios vinculados diretamente à operação podem, a depender do caso, ser tratados como insumo e compor a base de crédito de PIS/COFINS não-cumulativo.',
    segments: ['industria', 'comercio'],
    regimes: ['real'],
    min: PIS_COFINS_NAO_CUMULATIVO * 0.003, max: PIS_COFINS_NAO_CUMULATIVO * 0.01,
    certeza: 'validacao',
    condicao: 'Exige demonstrar o vínculo direto do seguro com a operação.',
  },
  {
    id: 'ipi-saida',
    label: 'Revisão da base de cálculo do IPI na saída de produtos',
    explicacao: 'Erros na composição da base de cálculo do IPI na saída (descontos incondicionais, frete, embalagem) geram recolhimento a maior recorrente, mês após mês.',
    segments: ['industria'],
    regimes: ['presumido', 'real'],
    min: 0.001, max: 0.004,
    certeza: 'defensavel',
    condicao: 'Requer revisão da composição da base de cálculo do IPI, nota a nota.',
  },
]

const EMAILJS_SERVICE_ID = 'service_8wpx9uq'
const EMAILJS_TEMPLATE_ID = 'template_glqg928'
const EMAILJS_PUBLIC_KEY = 'Sr1K9lFnEDRGBozQN'

function formatCNPJ(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 14)
  let out = digits
  if (digits.length > 2) out = `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length > 5) out = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length > 8) out = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  if (digits.length > 12) out = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
  return out
}

function isValidCNPJ(raw) {
  const c = raw.replace(/\D/g, '')
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false
  const calc = (base) => {
    let sum = 0
    let pos = base.length - 7
    for (let i = base.length; i >= 1; i--) {
      sum += Number(base[base.length - i]) * pos--
      if (pos < 2) pos = 9
    }
    const result = sum % 11
    return result < 2 ? 0 : 11 - result
  }
  const d1 = calc(c.slice(0, 12))
  const d2 = calc(c.slice(0, 12) + d1)
  return c === c.slice(0, 12) + String(d1) + String(d2)
}

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, (m, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : `(${a}`
    )
  }
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, (m, a, b, c) =>
    c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : `(${a}`
  )
}

function isValidPhone(raw) {
  const digits = raw.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

function isValidEmail(raw) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim())
}

function inferSegmentFromCnae(cnaeFiscal) {
  if (!cnaeFiscal) return 'outro'
  const code = String(cnaeFiscal).padStart(7, '0')
  const div = Number(code.slice(0, 2))
  if (Number.isNaN(div)) return 'outro'
  if (div >= 5 && div <= 39) return 'industria'
  if (div >= 41 && div <= 43) return 'construcao'
  if (div >= 45 && div <= 47) return 'comercio'
  if (div >= 49 && div <= 99) return 'servicos'
  return 'outro'
}

export default function Simulator({ onStepChange } = {}) {
  const [step, setStep] = useState(1)
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [regime, setRegime] = useState('presumido')
  const [faturamento, setFaturamento] = useState(150000)
  const [selectedTeses, setSelectedTeses] = useState([])
  const [hasDocs, setHasDocs] = useState(false)
  const [errors, setErrors] = useState({})
  const [emailStatus, setEmailStatus] = useState(null)
  const [linkCopiado, setLinkCopiado] = useState(false)

  const [nomeAuto, setNomeAuto] = useState(false)
  const [nomeLoading, setNomeLoading] = useState(false)
  const [nomeFetchFailed, setNomeFetchFailed] = useState(false)

  const [segmentMode, setSegmentMode] = useState(null)
  const [companySegment, setCompanySegment] = useState(null)
  const [cnaeInfo, setCnaeInfo] = useState(null)
  const [segmentLoading, setSegmentLoading] = useState(false)
  const [segmentError, setSegmentError] = useState(null)

  useEffect(() => {
    onStepChange?.(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => {
    const digits = cnpj.replace(/\D/g, '')

    if (digits.length !== 14 || !isValidCNPJ(cnpj)) {
      setNomeAuto(false)
      setNomeFetchFailed(false)
      setNomeLoading(false)
      return undefined
    }

    let cancelled = false
    setNomeLoading(true)
    setNomeFetchFailed(false)

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`)
        if (!res.ok) throw new Error('CNPJ não encontrado')
        const data = await res.json()
        if (cancelled) return
        const nomeOficial = data.razao_social || data.nome_fantasia
        if (nomeOficial) {
          setNome(nomeOficial)
          setNomeAuto(true)
        } else {
          setNomeAuto(false)
          setNomeFetchFailed(true)
        }
      } catch {
        if (!cancelled) {
          setNomeAuto(false)
          setNomeFetchFailed(true)
        }
      } finally {
        if (!cancelled) setNomeLoading(false)
      }
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [cnpj])

  const handleTrocarNomeManualmente = () => {
    setNomeAuto(false)
    setNome('')
  }

  const toggleTese = (id) => {
    setSelectedTeses((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const teseAplicavelAoRegime = (t) => t.regimes.includes(regime)

  const isRecommendedTese = (t) => {
    if (!companySegment) return false
    if (t.id === 'segregacao-simples' && regime !== 'simples') return false
    return t.segments.includes(companySegment)
  }

  const visibleTeses = useMemo(
    () => TESES.filter(teseAplicavelAoRegime),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regime]
  )

  const sortedTeses = useMemo(() => {
    if (!companySegment) return visibleTeses
    return [...visibleTeses].sort((a, b) => Number(isRecommendedTese(b)) - Number(isRecommendedTese(a)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySegment, regime, visibleTeses])

  useEffect(() => {
    setSelectedTeses((prev) => prev.filter((id) => TESES.find((t) => t.id === id)?.regimes.includes(regime)))
  }, [regime])

  const { low, high, low5, high5, faturamentoAnual } = useMemo(() => {
    const anual = faturamento * 12
    const teses = TESES.filter((t) => selectedTeses.includes(t.id))
    const minSum = teses.reduce((acc, t) => acc + t.min, 0)
    const maxSum = teses.reduce((acc, t) => acc + t.max, 0)
    const lowAnual = anual * minSum
    const highAnual = anual * maxSum
    return {
      low: lowAnual,
      high: highAnual,
      low5: lowAnual * 5,
      high5: highAnual * 5,
      faturamentoAnual: anual,
    }
  }, [faturamento, selectedTeses])

  const itensDoDiagnostico = useMemo(() => {
    const selecionadas = TESES.filter((t) => selectedTeses.includes(t.id))
    const ordenadas = [...selecionadas].sort(
      (a, b) => CERTEZA_ORDER.indexOf(a.certeza) - CERTEZA_ORDER.indexOf(b.certeza)
    )
    return ordenadas.map((t) => ({
      ...t,
      valorMin: faturamentoAnual * t.min,
      valorMax: faturamentoAnual * t.max,
    }))
  }, [selectedTeses, faturamentoAnual])

  const diagnosticoUrl = useMemo(() => {
    const dados = {
      nome,
      cnpj,
      regimeLabel: REGIMES[regime].label,
      faturamentoAnual,
      low,
      high,
      low5,
      high5,
      geradoEm: new Date().toISOString(),
      itens: itensDoDiagnostico.map((item) => ({
        label: item.label,
        explicacao: item.explicacao,
        condicao: item.condicao,
        certeza: item.certeza,
        valorMin: item.valorMin,
        valorMax: item.valorMax,
      })),
    }
    return buildDiagnosticoUrl(dados)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, cnpj, regime, faturamentoAnual, low, high, low5, high5, itensDoDiagnostico])

  const buildWhatsappLink = () => {
    const teseLabels = TESES.filter((t) => selectedTeses.includes(t.id))
      .map((t) => t.label)
      .join('; ')
    const message = [
      'Olá! Fiz uma simulação no site da Hezus e gostaria de agendar um diagnóstico.',
      `Empresa: ${nome}`,
      `CNPJ: ${cnpj}`,
      `Telefone: ${telefone}`,
      `E-mail: ${email}`,
      `Regime: ${REGIMES[regime].label}`,
      `Faturamento médio mensal: ${formatBRL(faturamento)}`,
      `Hipóteses selecionadas: ${teseLabels || '-'}`,
      `Faixa estimada (1 ano): ${formatBRL(low)} – ${formatBRL(high)}`,
      `Faixa estimada (5 anos retroativos): ${formatBRL(low5)} – ${formatBRL(high5)}`,
      `Tenho SPED/EFDs dos últimos 5 anos: ${hasDocs ? 'Sim' : 'Não'}`,
      `Diagnóstico completo: ${diagnosticoUrl}`,
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(diagnosticoUrl)
      setLinkCopiado(true)
      setTimeout(() => setLinkCopiado(false), 2000)
    } catch {
      setLinkCopiado(false)
    }
  }

  const sendLeadEmail = async () => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) return
    const teseLabels = TESES.filter((t) => selectedTeses.includes(t.id))
      .map((t) => t.label)
      .join(', ')
    setEmailStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            nome,
            cnpj,
            telefone,
            email,
            regime: REGIMES[regime].label,
            faturamento_mensal: formatBRL(faturamento),
            teses: teseLabels || '-',
            faixa_1_ano: `${formatBRL(low)} – ${formatBRL(high)}`,
            faixa_5_anos: `${formatBRL(low5)} – ${formatBRL(high5)}`,
            tem_sped: hasDocs ? 'Sim' : 'Não',
            link_diagnostico: diagnosticoUrl,
          },
        }),
      })
      setEmailStatus(res.ok ? 'sent' : 'error')
    } catch {
      setEmailStatus('error')
    }
  }

  const validateStep1 = () => {
    const errs = {}
    if (!nome.trim()) {
      errs.nome = 'Informe o nome da empresa.'
    } else if (!/[a-zA-ZÀ-ÿ]/.test(nome)) {
      errs.nome = 'O nome da empresa não pode ser só números.'
    }
    if (!isValidCNPJ(cnpj)) errs.cnpj = 'CNPJ inválido.'
    if (!isValidPhone(telefone)) errs.telefone = 'Informe um telefone válido (WhatsApp ou fixo).'
    if (!isValidEmail(email)) errs.email = 'Informe um e-mail válido.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleAvancarStep1 = () => {
    if (validateStep1()) setStep(2)
  }

  const fetchCnaeInfo = async () => {
    setSegmentMode('auto')
    setSegmentLoading(true)
    setSegmentError(null)
    try {
      const digits = cnpj.replace(/\D/g, '')
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`)
      if (!res.ok) throw new Error('CNPJ não encontrado')
      const data = await res.json()
      const segmento = inferSegmentFromCnae(data.cnae_fiscal)
      setCnaeInfo({ codigo: data.cnae_fiscal, descricao: data.cnae_fiscal_descricao })
      setCompanySegment(segmento)
    } catch (err) {
      setSegmentError('Não conseguimos consultar automaticamente pelo CNPJ agora. Selecione seu segmento manualmente:')
    } finally {
      setSegmentLoading(false)
    }
  }

  const handleSelectManualSegment = (key) => {
    setSegmentMode('manual')
    setCnaeInfo(null)
    setCompanySegment(key)
  }

  const handlePularSegmento = () => {
    setSegmentMode(null)
    setCompanySegment(null)
    setCnaeInfo(null)
    setSegmentError(null)
    setStep(3)
  }

  const handleVerEstimativa = () => {
    setStep(5)
    const link = buildWhatsappLink()
    window.open(link, '_blank', 'noopener,noreferrer')
    sendLeadEmail()
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="section-label">Simulador</p>
        <p className="text-xs text-ice/40">Passo {step} de 5</p>
      </div>
      <h2 className="font-display text-xl">Estimativa de créditos recuperáveis</h2>

      {step === 1 && (
        <div className="mt-6">
          <label className="block text-sm text-ice/60">CNPJ *</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
            placeholder="00.000.000/0000-00"
            className={`mt-2 w-full rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-ice outline-none focus:border-blue ${
              errors.cnpj ? 'border-red-500' : 'border-line'
            }`}
          />
          {errors.cnpj && <p className="mt-1 text-xs text-red-400">{errors.cnpj}</p>}

          <label className="mt-4 block text-sm text-ice/60">Nome da empresa *</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            readOnly={nomeAuto}
            placeholder={nomeLoading ? 'Verificando nome pelo CNPJ...' : 'Ex: Empresa Exemplo Ltda.'}
            className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm text-ice outline-none focus:border-blue ${
              nomeAuto ? 'cursor-not-allowed bg-white/[0.06]' : 'bg-white/[0.03]'
            } ${errors.nome ? 'border-red-500' : 'border-line'}`}
          />
          {nomeLoading && (
            <p className="mt-1 text-xs text-ice/40">Verificando nome oficial na Receita Federal...</p>
          )}
          {nomeAuto && !nomeLoading && (
            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-blue">
              Nome verificado automaticamente pelo CNPJ.
              <button
                type="button"
                onClick={handleTrocarNomeManualmente}
                className="underline text-ice/40 hover:text-ice/70"
              >
                não é sua empresa? corrigir o CNPJ
              </button>
            </p>
          )}
          {nomeFetchFailed && !nomeLoading && (
            <p className="mt-1 text-xs text-ice/40">
              Não conseguimos confirmar automaticamente — confira se o nome digitado corresponde ao CNPJ informado.
            </p>
          )}
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome}</p>}

          <label className="mt-4 block text-sm text-ice/60">Telefone (WhatsApp ou fixo) *</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(formatPhone(e.target.value))}
            placeholder="(41) 99999-9999"
            className={`mt-2 w-full rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-ice outline-none focus:border-blue ${
              errors.telefone ? 'border-red-500' : 'border-line'
            }`}
          />
          {errors.telefone && <p className="mt-1 text-xs text-red-400">{errors.telefone}</p>}

          <label className="mt-4 block text-sm text-ice/60">E-mail *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contato@empresa.com.br"
            className={`mt-2 w-full rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-ice outline-none focus:border-blue ${
              errors.email ? 'border-red-500' : 'border-line'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}

          <label className="mt-4 block text-sm text-ice/60">Regime tributário</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {Object.entries(REGIMES).map(([key, r]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRegime(key)}
                className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                  regime === key
                    ? 'border-blue bg-blue/15 text-blue'
                    : 'border-line text-ice/60 hover:border-ice/30'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm text-ice/60">Faturamento médio mensal</label>
          <input
            type="range"
            min="20000"
            max="2000000"
            step="10000"
            value={faturamento}
            onChange={(e) => setFaturamento(Number(e.target.value))}
            className="mt-3 w-full accent-blue"
          />
          <p className="mt-1 font-mono text-sm text-ice/70">{formatBRL(faturamento)}/mês</p>

          <button
            type="button"
            onClick={handleAvancarStep1}
            className="mt-6 w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Avançar
          </button>
          <p className="mt-2 text-center text-xs text-ice/40">
            * Campos obrigatórios — usados para enviar seu diagnóstico.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <p className="text-sm text-ice/60">
            Antes de escolher as hipóteses aplicáveis, vamos identificar o perfil da sua
            empresa para sugerir as mais prováveis.
          </p>

          {!segmentLoading && !companySegment && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={fetchCnaeInfo}
                className="rounded-lg border border-blue bg-blue/10 px-4 py-3 text-left text-sm font-medium text-blue transition hover:brightness-110"
              >
                Buscar automaticamente pelo CNPJ
                <span className="mt-1 block text-xs font-normal text-ice/50">
                  Consultamos o CNAE cadastrado da sua empresa.
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSegmentMode('manual')}
                className="rounded-lg border border-line px-4 py-3 text-left text-sm font-medium text-ice/70 transition hover:border-ice/40"
              >
                Selecionar meu segmento manualmente
                <span className="mt-1 block text-xs font-normal text-ice/50">
                  Você escolhe entre algumas opções.
                </span>
              </button>
            </div>
          )}

          {segmentLoading && (
            <p className="mt-4 text-sm text-ice/50">Consultando o CNAE da sua empresa...</p>
          )}

          {segmentError && (
            <p className="mt-4 text-xs text-red-400">{segmentError}</p>
          )}

          {(segmentMode === 'manual' || segmentError) && !companySegment && !segmentLoading && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Object.entries(SEGMENTOS).map(([key, s]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectManualSegment(key)}
                  className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-ice/70 transition hover:border-ice/30"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {companySegment && (
            <div className="mt-4 rounded-lg border border-gold/30 bg-gold/10 p-4">
              {cnaeInfo ? (
                <p className="text-sm text-ice/70">
                  Identificamos sua atividade principal como{' '}
                  <span className="font-medium text-gold">{cnaeInfo.descricao}</span>. Vamos
                  destacar as hipóteses mais prováveis para o segmento{' '}
                  <span className="font-medium text-gold">{SEGMENTOS[companySegment].label}</span>.
                </p>
              ) : (
                <p className="text-sm text-ice/70">
                  Perfil selecionado:{' '}
                  <span className="font-medium text-gold">{SEGMENTOS[companySegment].label}</span>.
                  Vamos destacar as hipóteses mais prováveis para esse segmento.
                </p>
              )}
              <p className="mt-2 text-xs text-ice/40">
                Isso é só uma sugestão inicial — o diagnóstico técnico confirma o que
                realmente se aplica à sua empresa.
              </p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
            >
              Voltar
            </button>
            {companySegment ? (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Continuar
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePularSegmento}
                className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
              >
                Pular essa etapa
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <p className="text-sm text-ice/60">
            {companySegment
              ? 'Com base no perfil identificado, destacamos primeiro as hipóteses mais prováveis — mas você pode marcar quantas quiser:'
              : 'Selecione as hipóteses que podem se aplicar à sua empresa:'}
          </p>
          <p className="mt-1 text-xs text-ice/40">
            Mostrando só as hipóteses juridicamente aplicáveis ao regime {REGIMES[regime].label}.
          </p>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {sortedTeses.map((t) => (
              <label
                key={t.id}
                className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2 text-xs transition ${
                  isRecommendedTese(t)
                    ? 'border-gold/40 bg-gold/5'
                    : 'border-line bg-white/[0.02] hover:border-ice/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTeses.includes(t.id)}
                  onChange={() => toggleTese(t.id)}
                  className="mt-0.5 accent-blue"
                />
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ice/80">{t.label}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${CERTEZA_CONFIG[t.certeza].badge}`}>
                      {CERTEZA_CONFIG[t.certeza].label}
                    </span>
                    {isRecommendedTese(t) && (
                      <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">
                        Recomendada pro seu perfil
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-ice/50">{t.explicacao}</span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              disabled={selectedTeses.length === 0}
              className="w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Avançar
            </button>
          </div>
          {selectedTeses.length === 0 && (
            <p className="mt-2 text-xs text-ice/40">Selecione ao menos uma hipótese para continuar.</p>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-line bg-white/[0.02] p-3 text-sm text-ice/70">
            <input
              type="checkbox"
              checked={hasDocs}
              onChange={(e) => setHasDocs(e.target.checked)}
              className="mt-0.5 accent-blue"
            />
            <span>Tenho SPED Fiscal / EFDs dos últimos 5 anos disponíveis para envio</span>
          </label>
          <p className="mt-2 text-xs text-ice/40">
            Não é necessário anexar nada agora — nosso time solicita a documentação
            diretamente durante o diagnóstico técnico.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={handleVerEstimativa}
              className="w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Ver estimativa
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="mt-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
              <p className="text-xs uppercase tracking-wide text-ice/50">Faixa estimada em 1 ano</p>
              <p className="mt-1 font-mono text-2xl font-semibold text-gold">
                {formatBRL(low)} – {formatBRL(high)}
              </p>
              <p className="mt-1 text-xs text-ice/50">
                Com base em faturamento anual de {formatBRL(faturamentoAnual)} e {selectedTeses.length}{' '}
                hipótese(s) selecionada(s).
              </p>
            </div>

            <div className="rounded-xl border border-blue/40 bg-blue/10 p-5">
              <p className="text-xs uppercase tracking-wide text-ice/50">
                Potencial acumulado em 5 anos retroativos
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-blue">
                {formatBRL(low5)} – {formatBRL(high5)}
              </p>
              <p className="mt-1 text-xs text-ice/50">
                Por lei, é possível pleitear a recuperação de créditos tributários dos
                últimos 5 anos. Este valor projeta a faixa anual para o período completo,
                assumindo faturamento estável — o valor real pode variar conforme o
                histórico de faturamento da empresa.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="section-label mb-1">Como chegamos nesse número</p>
            <h3 className="font-display text-lg">
              {nome || 'Sua empresa'} — {REGIMES[regime].label}
            </h3>
            <p className="mt-1 font-mono text-base font-semibold text-ice/80">
              {formatBRL(low)} – {formatBRL(high)} identificados em {itensDoDiagnostico.length}{' '}
              {itensDoDiagnostico.length === 1 ? 'frente' : 'frentes'}, com graus de certeza diferentes.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ice/60">
              Não é uma lista de créditos. É a leitura honesta do que é consolidado,
              do que é defensável e do que ainda precisa de prova — antes de
              qualquer número virar promessa.
            </p>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {itensDoDiagnostico.map((item, i) => {
                const cfg = CERTEZA_CONFIG[item.certeza]
                return (
                  <div key={item.id} className="rounded-lg border border-line bg-white/[0.02] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-ice/85">
                        <span className="mr-2 font-mono text-blue-light/70">{toRoman(i + 1)}</span>
                        {item.label}
                      </p>
                    </div>
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

          <div className="mt-6 rounded-lg border border-line bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-wide text-ice/50">Diagnóstico completo</p>
            <p className="mt-1 text-sm text-ice/60">
              Gere um link único com esse diagnóstico completo, pronto pra enviar por
              WhatsApp ou e-mail — sem precisar refazer a simulação.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a href={diagnosticoUrl} target="_blank" rel="noopener noreferrer" className="block w-full rounded-full bg-blue px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto">Ver diagnóstico completo</a>
              <button
                type="button"
                onClick={handleCopiarLink}
                className="w-full rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ice/70 transition hover:border-ice/40 sm:w-auto"
              >
                {linkCopiado ? 'Link copiado!' : 'Copiar link'}
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-ice/50">
            Estimativa preliminar e ilustrativa, sujeita a diagnóstico técnico
            detalhado. Não constitui garantia de valor ou de resultado.
          </p>

          <p className="mt-3 text-xs text-ice/40">
            Sua conversa no WhatsApp foi aberta em uma nova aba com os dados
            preenchidos — é só confirmar o envio por lá.
            {emailStatus === 'sent' && ' Também enviamos uma cópia por e-mail à nossa equipe.'}
          </p>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row">
            <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer" className="block w-full rounded-full bg-blue px-6 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110">Abrir conversa no WhatsApp novamente</a>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
