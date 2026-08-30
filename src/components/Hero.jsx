import { useState } from 'react'
import Simulator from './Simulator'

export default function Hero() {
  const [simStep, setSimStep] = useState(1)
  const isWideStep = simStep === 5

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="brand-glow pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full blur-3xl" />
      <img src="/hezus-mark.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-16 top-24 hidden h-[28rem] w-auto opacity-[0.06] lg:block" />
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-5 sm:gap-14 sm:px-6 ${
          isWideStep ? '' : 'lg:grid-cols-[1.05fr_0.95fr] lg:items-center'
        }`}
      >
        <div className={`reveal-init ${isWideStep ? 'lg:hidden' : ''}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs text-ice/60">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Inteligência tributária, financeira e estratégica
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.3rem]">
            Você paga tributos a mais e sente que esse dinheiro nunca volta?
          </h1>
          <p className="mt-5 max-w-lg text-base text-ice/70 sm:mt-6 sm:text-lg">
            Descubra se sua empresa está entre as que pagam mais do que
            deveria — com diagnóstico técnico gratuito, tecnologia própria e
            time multidisciplinar em Direito e Contabilidade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            <a href="#lead" className="rounded-full bg-blue px-7 py-3 text-center font-semibold text-white transition hover:brightness-110">Quero fazer meu diagnóstico</a>
            <a href="https://wa.me/5541995206026?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Hezus%20Capital%20%26%20Tributos." target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-7 py-3 text-center font-semibold text-ice/80 transition hover:border-ice/40 hover:text-ice">Entrar em contato agora</a>
          </div>
        </div>
        <div
          className={`reveal-init rounded-2xl border border-line bg-white/[0.03] p-5 shadow-2xl shadow-black/30 sm:p-8 ${
            isWideStep ? 'lg:max-w-none' : ''
          }`}
        >
          <Simulator onStepChange={setSimStep} />
        </div>
      </div>
    </section>
  )
}
