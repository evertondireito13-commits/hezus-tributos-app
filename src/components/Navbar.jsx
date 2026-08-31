import { useState } from 'react'
const LINKS = [
  { href: '#quem-somos', label: 'Quem somos' },
  { href: '#metodo', label: 'Método' },
  { href: '#metodologia', label: 'Metodologia' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#atuacao', label: 'Atuação' },
  { href: '#tecnologia', label: 'Tecnologia' },
  { href: '#painel', label: 'Painel do cliente' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contato', label: 'Contato' },
]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  function handleLinkClick() {
    setOpen(false)
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-graphite/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex shrink-0 items-center" onClick={handleLinkClick}>
          <img
            src="/hezus-logo.png"
            alt="Hezus Capital & Tributos"
            className="h-8 w-auto shrink-0 object-contain sm:h-10"
          />
        </a>
        <div className="hidden min-w-0 items-center whitespace-nowrap md:flex md:space-x-3 lg:space-x-6 xl:space-x-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ice/70 transition hover:text-ice">{l.label}</a>
          ))}
        </div>
        <a href="#lead" className="hidden shrink-0 rounded-full bg-blue px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 lg:ml-6 lg:inline-block">Diagnóstico gratuito</a>
        {/* Botão hamburguer — só aparece em telas pequenas */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-ice/80 md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>
      {/* Menu mobile */}
      <div className={`overflow-hidden border-b border-line bg-graphite transition-[max-height] duration-300 md:hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="flex flex-col gap-1 px-5 py-3">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={handleLinkClick} className="rounded-lg px-2 py-2.5 text-sm text-ice/75 transition hover:bg-white/5 hover:text-ice">{l.label}</a>
          ))}
          <a href="#lead" onClick={handleLinkClick} className="mt-2 rounded-full bg-blue px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-110">Diagnóstico gratuito</a>
        </div>
      </div>
    </header>
  )
}
