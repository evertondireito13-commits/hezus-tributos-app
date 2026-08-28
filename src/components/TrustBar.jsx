const items = [
  'Dados protegidos (LGPD)',
  'Atendimento nos 3 regimes tributários',
  'Time multidisciplinar: Direito + Contabilidade',
]

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white/[0.02] py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 text-center text-sm text-ice/60 sm:gap-x-10 sm:px-6">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

/*
  Se quiser reativar a barra de logos de clientes (como no site antigo em
  framer: SE, YOUFE, PFX, DOW, Oasis), troque o array `items` acima por uma
  lista de { name, logoUrl } e renderize <img> em escala de cinza. Só inclua
  aqui os clientes que já autorizaram o uso da marca no site.
*/

