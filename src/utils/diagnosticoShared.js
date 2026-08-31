export const REGIMES = {
  simples: { label: 'Simples Nacional' },
  presumido: { label: 'Lucro Presumido' },
  real: { label: 'Lucro Real' },
}

export const CERTEZA_CONFIG = {
  consolidado: {
    label: 'Consolidado',
    desc: 'Amparado em entendimento pacificado (STF/STJ) ou em norma expressa. Risco marginal de contestação.',
    badge: 'border-blue/40 bg-blue/10 text-blue',
    bar: 'bg-blue',
  },
  defensavel: {
    label: 'Defensável',
    desc: 'Amparado em jurisprudência favorável e boa base documental, mas ainda sujeito a interpretação.',
    badge: 'border-gold/40 bg-gold/10 text-gold',
    bar: 'bg-gold',
  },
  validacao: {
    label: 'Sujeito a validação',
    desc: 'Depende de comprovação documental específica da sua operação antes de virar número final.',
    badge: 'border-line bg-white/[0.04] text-ice/60',
    bar: 'bg-ice/30',
  },
}

export const CERTEZA_ORDER = ['consolidado', 'defensavel', 'validacao']

export const WHATSAPP_NUMBER = '5541995206026'

const ROMAN_NUMERALS = [
  '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
]
export function toRoman(n) {
  return ROMAN_NUMERALS[n] || String(n)
}

export function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

// Codifica os dados do diagnóstico numa string segura para URL — sem precisar de backend.
export function encodeDiagnostico(data) {
  const json = JSON.stringify(data)
  return btoa(unescape(encodeURIComponent(json)))
}

export function decodeDiagnostico(str) {
  try {
    const json = decodeURIComponent(escape(atob(str)))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function buildDiagnosticoUrl(data) {
  const encoded = encodeDiagnostico(data)
  const base = `${window.location.origin}${window.location.pathname}`
  return `${base}?diagnostico=${encoded}`
}
