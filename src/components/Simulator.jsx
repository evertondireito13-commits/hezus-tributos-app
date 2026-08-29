import { useEffect, useMemo, useState } from 'react'

const REGIMES = {
  simples: { label: 'Simples Nacional' },
  presumido: { label: 'Lucro Presumido' },
  real: { label: 'Lucro Real' },
}

const SEGMENTOS = {
  industria: { label: 'Indústria' },
  comercio: { label: 'Comércio' },
  servicos: { label: 'Serviços' },
  construcao: { label: 'Construção Civil' },
  outro: { label: 'Outro / Não sei' },
}

const TESES = [
  {
    id: 'icms-pis-cofins',
    label: 'Exclusão do ICMS da base de PIS/COFINS',
    explicacao: 'O ICMS que sua empresa paga não deveria entrar no cálculo do PIS/COFINS — esse entendimento já está consolidado e pode gerar créditos a recuperar.',
    segments: ['industria', 'comercio'],
    min: 0.008, max: 0.02,
  },
  {
    id: 'iss-pis-cofins',
    label: 'Exclusão do ISS da base de PIS/COFINS',
    explicacao: 'Assim como o ICMS, o ISS pago por empresas de serviços também pode ser excluído da base de PIS/COFINS.',
    segments: ['servicos', 'construcao'],
    min: 0.003, max: 0.008,
  },
  {
    id: 'insumos-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre insumos essenciais',
    explicacao: 'Insumos essenciais usados diretamente na produção podem gerar créditos de PIS/COFINS que muitas empresas não aproveitam.',
    segments: ['industria', 'construcao'],
    min: 0.005, max: 0.015,
  },
  {
    id: 'energia-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre energia elétrica',
    explicacao: 'A energia elétrica usada na operação da empresa pode gerar créditos de PIS/COFINS, mesmo fora da produção direta.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    min: 0.001, max: 0.004,
  },
  {
    id: 'frete-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre frete (insumo)',
    explicacao: 'O frete pago para transportar insumos ou mercadorias pode ser considerado insumo e gerar créditos de PIS/COFINS.',
    segments: ['industria', 'comercio', 'construcao'],
    min: 0.001, max: 0.004,
  },
  {
    id: 'embalagens-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre embalagens',
    explicacao: 'Embalagens usadas no processo produtivo ou na venda de mercadorias também podem gerar créditos de PIS/COFINS.',
    segments: ['industria', 'comercio'],
    min: 0.001, max: 0.003,
  },
  {
    id: 'icms-st',
    label: 'Recuperação de ICMS-ST pago a maior',
    explicacao: 'Empresas que compram mercadorias com ICMS pago por substituição tributária costumam pagar a mais — esse valor pode ser recuperado.',
    segments: ['comercio'],
    min: 0.004, max: 0.012,
  },
  {
    id: 'icms-energia',
    label: 'Créditos de ICMS sobre energia elétrica (indústria)',
    explicacao: 'Indústrias que usam energia elétrica no processo produtivo podem ter direito a créditos de ICMS sobre esse consumo.',
    segments: ['industria'],
    min: 0.002, max: 0.006,
  },
  {
    id: 'icms-irpj-csll',
    label: 'Exclusão do ICMS da base de IRPJ/CSLL (subvenção)',
    explicacao: 'Incentivos e benefícios de ICMS concedidos pelo estado podem, em alguns casos, ser excluídos do cálculo do IRPJ e da CSLL.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    min: 0.003, max: 0.01,
  },
  {
    id: 'ipi-insumos',
    label: 'Créditos de IPI sobre insumos isentos/alíquota zero',
    explicacao: 'Indústrias que compram insumos isentos ou com alíquota zero de IPI podem ter direito a créditos que não estão sendo aproveitados.',
    segments: ['industria'],
    min: 0.002, max: 0.006,
  },
  {
    id: 'difal',
    label: 'Restituição de DIFAL pago indevidamente',
    explicacao: 'Empresas que compram de outros estados podem ter pago DIFAL a mais em algumas operações — esse valor pode ser restituído.',
    segments: ['comercio', 'industria'],
    min: 0.001, max: 0.005,
  },
  {
    id: 'produtos-intermediarios',
    label: 'Créditos sobre produtos intermediários',
    explicacao: 'Produtos usados no processo de fabricação, mesmo sem virar parte do produto final, também podem gerar créditos.',
    segments: ['industria'],
    min: 0.002, max: 0.006,
  },
  {
    id: 'segregacao-simples',
    label: 'Segregação de receitas no Simples Nacional',
    explicacao: 'Empresas do Simples Nacional com mais de uma atividade às vezes pagam imposto a mais por não separar corretamente as receitas de cada uma.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    min: 0.003, max: 0.012,
  },
  {
    id: 'verbas-inss',
    label: 'Exclusão de verbas indenizatórias da base do INSS patronal',
    explicacao: 'Algumas verbas pagas aos funcionários não deveriam entrar no cálculo do INSS pago pela empresa, o que pode gerar créditos sobre a folha.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    min: 0.002, max: 0.008,
  },
  {
    id: 'cnae-iss',
    label: 'Revisão de enquadramento de CNAE/ISS',
    explicacao: 'Se o enquadramento de atividade usado pelo município estiver incorreto, sua empresa pode estar pagando uma alíquota de ISS maior do que deveria.',
    segments: ['servicos', 'construcao'],
    min: 0.001, max: 0.005,
  },
  {
    id: 'software-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre softwares e licenças',
    explicacao: 'Softwares e licenças usados na operação da empresa também podem gerar créditos de PIS/COFINS.',
    segments: ['servicos', 'industria', 'comercio'],
    min: 0.001, max: 0.004,
  },
  {
    id: 'publicidade-pis-cofins',
    label: 'Créditos de PIS/COFINS sobre propaganda e publicidade',
    explicacao: 'Gastos com propaganda e publicidade, em certos casos, podem ser considerados insumo e gerar créditos de PIS/COFINS.',
    segments: ['comercio', 'servicos'],
    min: 0.001, max: 0.003,
  },
  {
    id: 'perdcomp',
    label: 'Compensação de créditos federais via PER/DCOMP',
    explicacao: 'Créditos federais que sua empresa já tem direito podem ser usados para compensar outros impostos, em vez de ficar parados.',
    segments: ['industria', 'comercio', 'servicos', 'construcao'],
    min: 0.002, max: 0.007,
  },
  {
    id: 'seguros-pis-cofins',
    label: 'Créditos sobre seguros obrigatórios (insumo)',
    explicacao: 'Seguros obrigatórios contratados pela empresa também podem ser considerados insumo e gerar créditos de PIS/COFINS.',
    segments: ['industria', 'comercio'],
    min: 0.001, max: 0.003,
  },
  {
    id: 'ipi-saida',
    label: 'Revisão da base de cálculo do IPI na saída de produtos',
    explicacao: 'O cálculo do IPI na saída de produtos às vezes é feito de forma equivocada, gerando pagamento a maior que pode ser revisto.',
    segments: ['industria'],
    min: 0.001, max: 0.004,
  },
]

const WHATSAPP_NUMBER = '5541995206026'

// Configuração do EmailJS (envio automático de e-mail para hezus.simulador@gmail.com)
const EMAILJS_SERVICE_ID = 'service_8wpx9uq'
const EMAILJS_TEMPLATE_ID = 'template_glqg928'
const EMAILJS_PUBLIC_KEY = 'Sr1K9lFnEDRGBozQN'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

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

// Deduz um segmento aproximado a partir da divisão (2 primeiros dígitos) do CNAE fiscal.
// É só uma sugestão inicial — não substitui o diagnóstico técnico.
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

export default function Simulator() {
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
  const [emailStatus, setEmailStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  // Verificação automática do nome da empresa a partir do CNPJ (Receita Federal via BrasilAPI).
  // Enquanto o nome vier confirmado por essa busca, o campo fica travado (readOnly) para
  // impedir que alguém digite o CNPJ de uma empresa e o nome de outra.
  const [nomeAuto, setNomeAuto] = useState(false)
  const [nomeLoading, setNomeLoading] = useState(false)
  const [nomeFetchFailed, setNomeFetchFailed] = useState(false)

  // Identificação de segmento (passo novo, entre dados e teses)
  const [segmentMode, setSegmentMode] = useState(null) // null | 'auto' | 'manual'
  const [companySegment, setCompanySegment] = useState(null)
  const [cnaeInfo, setCnaeInfo] = useState(null) // { codigo, descricao }
  const [segmentLoading, setSegmentLoading] = useState(false)
  const [segmentError, setSegmentError] = useState(null)

  // Busca automática do nome oficial assim que o CNPJ digitado for válido.
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

  const isRecommendedTese = (t) => {
    if (!companySegment) return false
    if (t.id === 'segregacao-simples' && regime !== 'simples') return false
    return t.segments.includes(companySegment)
  }

  const sortedTeses = useMemo(() => {
    if (!companySegment) return TESES
    return [...TESES].sort((a, b) => Number(isRecommendedTese(b)) - Number(isRecommendedTese(a)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySegment, regime])

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
      `Teses selecionadas: ${teseLabels || '-'}`,
      `Faixa estimada (1 ano): ${formatBRL(low)} – ${formatBRL(high)}`,
      `Faixa estimada (5 anos retroativos): ${formatBRL(low5)} – ${formatBRL(high5)}`,
      `Tenho SPED/EFDs dos últimos 5 anos: ${hasDocs ? 'Sim' : 'Não'}`,
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
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

          <div className="mt-4 rounded-xl border border-blue/40 bg-blue/10 p-5">
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

          <p className="mt-3 text-xs text-ice/50">
            Estimativa preliminar e ilustrativa, sujeita a diagnóstico técnico
            detalhado. Não constitui garantia de valor ou de resultado.
          </p>

          <p className="mt-3 text-xs text-ice/40">
            Sua conversa no WhatsApp foi aberta em uma nova aba com os dados
            preenchidos — é só confirmar o envio por lá.
            {emailStatus === 'sent' && ' Também enviamos uma cópia por e-mail à nossa equipe.'}
          </p>

          <a
            href={buildWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-full bg-blue px-6 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
          >
            Abrir conversa no WhatsApp novamente
          </a>
          <button
            type="button"
            onClick={() => setStep(4)}
            className="mt-3 w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  )
}
