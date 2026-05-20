import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { Marquee } from '@/components/site/marquee'
import { Services } from '@/components/site/services'
import { Process } from '@/components/site/process'
import { Work } from '@/components/site/work'
import { Testimonials } from '@/components/site/testimonials'
import { Pricing } from '@/components/site/pricing'
import { FinalCta } from '@/components/site/cta'
import { BiteChat } from '@/components/bite-chat'

export const metadata: Metadata = {
  title: { absolute: 'Nexus AI — AI-Native Design Studio' },
  description:
    'Nexus AI is an AI-native design studio crafting brand systems, generative interfaces, and motion experiences for ambitious teams. Pair frontier models with human craft to ship work that compounds.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
      <BiteChat onboardingComplete={true} />
    </>
  )
}
