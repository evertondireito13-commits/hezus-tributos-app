const WHATSAPP_NUMBER = '5541995206026' // (41) 99520-6026
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, gostaria de falar com a Hezus Capital & Tributos.')}`

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto max-w-6xl px-5 text-sm text-ice/45 sm:px-6">
        <p className="font-display text-ice/70">HEZUS Capital & Tributos</p>
        <p className="mt-1 text-xs text-ice/35">HEZUS LTDA</p>
        <p className="mt-3">CNPJ: 50.136.240/0001-96</p>
        <p className="mt-1">Alameda Dom Pedro II, 155 — Batel, Curitiba/PR — CEP 80420-060</p>
        <p className="mt-1">
          contato@hezus.com.br ·{' '}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-light underline decoration-blue-light/40 underline-offset-4 hover:decoration-blue-light"
          >
            (41) 99520-6026 · WhatsApp
          </a>
        </p>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ice/40">
          Conteúdo institucional e informativo. Serviços de natureza contábil,
          fiscal e administrativa — não constitui consultoria jurídica. Quando
          a demanda exigir atuação de advogado, indicamos escritório de
          advocacia parceiro.
        </p>
        <p className="mt-4 text-xs text-ice/30">
          © {new Date().getFullYear()} HEZUS Capital & Tributos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

