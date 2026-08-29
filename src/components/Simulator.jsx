import { useMemo, useState } from 'react'

const REGIMES = {
  simples: { label: 'Simples Nacional' },
  presumido: { label: 'Lucro Presumido' },
  real: { label: 'Lucro Real' },
}

const TESES = [
  { id: 'icms-pis-cofins', label: 'Exclusão do ICMS da base de PIS/COFINS', min: 0.008, max: 0.02 },
  { id: 'iss-pis-cofins', label: 'Exclusão do ISS da base de PIS/COFINS', min: 0.003, max: 0.008 },
  { id: 'insumos-pis-cofins', label: 'Créditos de PIS/COFINS sobre insumos essenciais', min: 0.005, max: 0.015 },
  { id: 'energia-pis-cofins', label: 'Créditos de PIS/COFINS sobre energia elétrica', min: 0.001, max: 0.004 },
  { id: 'frete-pis-cofins', label: 'Créditos de PIS/COFINS sobre frete (insumo)', min: 0.001, max: 0.004 },
  { id: 'embalagens-pis-cofins', label: 'Créditos de PIS/COFINS sobre embalagens', min: 0.001, max: 0.003 },
  { id: 'icms-st', label: 'Recuperação de ICMS-ST pago a maior', min: 0.004, max: 0.012 },
  { id: 'icms-energia', label: 'Créditos de ICMS sobre energia elétrica (indústria)', min: 0.002, max: 0.006 },
  { id: 'icms-irpj-csll', label: 'Exclusão do ICMS da base de IRPJ/CSLL (subvenção)', min: 0.003, max: 0.01 },
  { id: 'ipi-insumos', label: 'Créditos de IPI sobre insumos isentos/alíquota zero', min: 0.002, max: 0.006 },
  { id: 'difal', label: 'Restituição de DIFAL pago indevidamente', min: 0.001, max: 0.005 },
  { id: 'produtos-intermediarios', label: 'Créditos sobre produtos intermediários', min: 0.002, max: 0.006 },
  { id: 'segregacao-simples', label: 'Segregação de receitas no Simples Nacional', min: 0.003, max: 0.012 },
  { id: 'verbas-inss', label: 'Exclusão de verbas indenizatórias da base do INSS patronal', min: 0.002, max: 0.008 },
  { id: 'cnae-iss', label: 'Revisão de enquadramento de CNAE/ISS', min: 0.001, max: 0.005 },
  { id: 'software-pis-cofins', label: 'Créditos de PIS/COFINS sobre softwares e licenças', min: 0.001, max: 0.004 },
  { id: 'publicidade-pis-cofins', label: 'Créditos de PIS/COFINS sobre propaganda e publicidade', min: 0.001, max: 0.003 },
  { id: 'perdcomp', label: 'Compensação de créditos federais via PER/DCOMP', min: 0.002, max: 0.007 },
  { id: 'seguros-pis-cofins', label: 'Créditos sobre seguros obrigatórios (insumo)', min: 0.001, max: 0.003 },
  { id: 'ipi-saida', label: 'Revisão da base de cálculo do IPI na saída de produtos', min: 0.001, max: 0.004 },
]

const WHATSAPP_NUMBER = '5541995206026'

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

export default function Simulator() {
  const [step, setStep] = useState(1)
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [regime, setRegime] = useState('presumido')
  const [faturamento, setFaturamento] = useState(150000)
  const [selectedTeses, setSelectedTeses] = useState([])
  const [hasDocs, setHasDocs] = useState(false)

  const toggleTese = (id) => {
    setSelectedTeses((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const { low, high, faturamentoAnual } = useMemo(() => {
    const anual = faturamento * 12
    const teses = TESES.filter((t) => selectedTeses.includes(t.id))
    const minSum = teses.reduce((acc, t) => acc + t.min, 0)
    const maxSum = teses.reduce((acc, t) => acc + t.max, 0)
    return { low: anual * minSum, high: anual * maxSum, faturamentoAnual: anual }
  }, [faturamento, selectedTeses])

  const whatsappLink = useMemo(() => {
    const teseLabels = TESES.filter((t) => selectedTeses.includes(t.id))
      .map((t) => t.label)
      .join('; ')
    const message = [
      'Olá! Fiz uma simulação no site da Hezus e gostaria de agendar um diagnóstico.',
      `Empresa: ${nome || '-'}`,
      `CNPJ: ${cnpj || '-'}`,
      `Regime: ${REGIMES[regime].label}`,
      `Faturamento médio mensal: ${formatBRL(faturamento)}`,
      `Teses selecionadas: ${teseLabels || '-'}`,
      `Faixa estimada: ${formatBRL(low)} – ${formatBRL(high)}`,
      `Tenho SPED/EFDs dos últimos 5 anos: ${hasDocs ? 'Sim' : 'Não'}`,
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [nome, cnpj, regime, faturamento, selectedTeses, low, high, hasDocs])

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="section-label">Simulador</p>
        <p className="text-xs text-ice/40">Passo {step} de 4</p>
      </div>
      <h2 className="font-display text-xl">Estimativa de créditos recuperáveis</h2>

      {step === 1 && (
        <div className="mt-6">
          <label className="block text-sm text-ice/60">Nome da empresa</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Empresa Exemplo Ltda."
            className="mt-2 w-full rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-sm text-ice outline-none focus:border-blue"
          />

          <label className="mt-4 block text-sm text-ice/60">CNPJ</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
            placeholder="00.000.000/0000-00"
            className="mt-2 w-full rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-sm text-ice outline-none focus:border-blue"
          />

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
            onClick={() => setStep(2)}
            className="mt-6 w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Avançar
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <p className="text-sm text-ice/60">
            Selecione as teses que podem se aplicar à sua empresa:
          </p>
          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
            {TESES.map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-start gap-2 rounded-lg border border-line bg-white/[0.02] p-2 text-xs text-ice/70 transition hover:border-ice/30"
              >
                <input
                  type="checkbox"
                  checked={selectedTeses.includes(t.id)}
                  onChange={() => toggleTese(t.id)}
                  className="mt-0.5 accent-blue"
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={selectedTeses.length === 0}
              className="w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Avançar
            </button>
          </div>
          {selectedTeses.length === 0 && (
            <p className="mt-2 text-xs text-ice/40">Selecione ao menos uma tese para continuar.</p>
          )}
        </div>
      )}

      {step === 3 && (
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
              onClick={() => setStep(2)}
              className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="w-full rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Ver estimativa
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="mt-6">
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
            <p className="text-xs uppercase tracking-wide text-ice/50">Faixa estimada de créditos recuperáveis</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-gold">
              {formatBRL(low)} – {formatBRL(high)}
            </p>
            <p className="mt-1 text-xs text-ice/50">
              Com base em faturamento anual de {formatBRL(faturamentoAnual)} e {selectedTeses.length}{' '}
              tese(s) selecionada(s).
            </p>
            <p className="mt-3 text-xs text-ice/50">
              Estimativa preliminar e ilustrativa, sujeita a diagnóstico técnico
              detalhado. Não constitui garantia de valor ou de resultado.
            </p>
          </div>

          
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-full bg-blue px-6 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
          >
            Falar com um consultor agora
          </a>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="mt-3 w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-ice/70 transition hover:border-ice/40"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  )
}
