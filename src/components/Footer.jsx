export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto max-w-6xl px-5 text-sm text-ice/45 sm:px-6">
        <p className="font-display text-ice/70">HEZUS Capital e Tributos</p>
        <p className="mt-2">CNPJ: 00.000.000/0001-00 (placeholder — atualizar)</p>
        <p className="mt-1">contato@hezustributos.com.br · (00) 00000-0000</p>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ice/40">
          Conteúdo institucional e informativo. Serviços de natureza contábil,
          fiscal e administrativa — não constitui consultoria jurídica. Quando
          a demanda exigir atuação de advogado, indicamos escritório de
          advocacia parceiro.
        </p>
        <p className="mt-4 text-xs text-ice/30">
          © {new Date().getFullYear()} HEZUS Capital e Tributos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
