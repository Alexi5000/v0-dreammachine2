import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Pricing } from "@/components/pricing"
import { Work } from "@/components/work"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
