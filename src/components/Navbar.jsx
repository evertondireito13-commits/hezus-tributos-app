export default function Navbar() {
  const links = [
    { href: '#metodo', label: 'Método' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#painel', label: 'Painel do cliente' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-graphite/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <img src="/hezus-logo.svg" alt="Hezus Capital & Tributos" className="logo-mark h-6 w-auto" />
        </a>
        <div className="hidden gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ice/70 transition hover:text-ice"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#lead"
          className="rounded-full bg-blue px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Diagnóstico gratuito
        </a>
      </nav>
    </header>
  )
}

