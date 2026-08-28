import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Method from './components/Method.jsx'
import Team from './components/Team.jsx'
import Services from './components/Services.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ClientPanel from './components/ClientPanel.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import LeadForm from './components/LeadForm.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Method />
        <Team />
        <Services />
        <HowItWorks />
        <ClientPanel />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  )
}
