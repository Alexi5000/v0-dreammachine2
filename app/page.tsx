import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BrandScroller } from "@/components/brand-scroller"
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
      <BrandScroller />
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
