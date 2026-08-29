const WHATSAPP_NUMBER = '5541995206026'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, gostaria de falar com a Hezus Capital & Tributos.')}`

export default function CtaButtons({ align = 'left', className = '' }) {
  const justify = align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${justify} ${className}`}>
      
        href="#lead"
        className="rounded-full bg-blue px-6 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
      >
        Quero fazer meu diagnóstico
      </a>
      
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-line px-6 py-3 text-center text-sm font-semibold text-ice/80 transition hover:border-ice/40 hover:text-ice"
      >
        Entrar em contato agora
      </a>
    </div>
  )
}
