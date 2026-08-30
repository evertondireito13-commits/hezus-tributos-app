import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Numbers from './components/Numbers.jsx'
import QuemSomos from './components/QuemSomos.jsx'
import Method from './components/Method.jsx'
import MethodDeep from './components/MethodDeep.jsx'
import Metodologia from './components/Metodologia.jsx'
import Atuacao from './components/Atuacao.jsx'
import Services from './components/Services.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ClientPanel from './components/ClientPanel.jsx'
import Tecnologia from './components/Tecnologia.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Contato from './components/Contato.jsx'
import LeadForm from './components/LeadForm.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Numbers />
        <QuemSomos />
        <Method />
        <MethodDeep />
        <Metodologia />
        <Services />
        <Atuacao />
        <HowItWorks />
        <ClientPanel />
        <Tecnologia />
        <Testimonials />
        <FAQ />
        <Contato />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
