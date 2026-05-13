import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, HelpCircle, Plus, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { siteContent } from '@/config/site.content'
import { SITE_CONFIG } from '@/lib/site-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

export const revalidate = 3600

const plans = [
  {
    name: 'Basic',
    price: '$199',
    cadence: '/ month',
    blurb: 'Solid reach for product updates and private-company news.',
    features: [
      { label: 'Distribution: regional and trade verticals' },
      { label: 'Analytics: core engagement snapshot' },
      { label: 'Media reach: standard newswire syndication' },
    ],
    cta: 'Get started',
    href: '/contact',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$499',
    cadence: '/ month',
    blurb: 'Built for public-facing teams that publish frequently.',
    features: [
      { label: 'Distribution: national + priority routing' },
      { label: 'Analytics: 90-day performance dashboard' },
      { label: 'Media reach: expanded journalist targeting' },
    ],
    cta: 'Start Pro',
    href: '/contact',
    popular: true,
  },
  {
    name: 'Premium',
    price: 'Custom',
    cadence: 'volume-based',
    blurb: 'For firms that need custom routing, data feeds, and SLA support.',
    features: [
      { label: 'Distribution: global, bespoke partner map' },
      { label: 'Analytics: full funnel + export' },
      { label: 'Media reach: account-led outreach' },
    ],
    cta: 'Contact sales',
    href: '/contact',
    popular: false,
  },
] as const

const comparison = [
  { k: 'Distribution', basic: 'Regional + trade', pro: 'National + priority', prem: 'Global, tailored' },
  { k: 'Analytics', basic: 'Snapshot', pro: '90-day dashboard', prem: 'Custom / export' },
  { k: 'Media reach', basic: 'Standard', pro: 'Expanded targeting', prem: 'Account-led' },
] as const

const addons = [
  { title: 'Embargo & timing windows', body: 'Coordinate simultaneous publishing across regions and languages.' },
  { title: 'Multimedia kits', body: 'Hero imagery, b-roll, and key quotes packaged for social channels.' },
  { title: 'Industry desk review', body: 'Optional read for sensitive sectors and regulatory language.' },
] as const

const faq = [
  { q: 'Is pricing tied to number of releases?', a: 'Plans are tiered by features and support level. Heavier volume is quoted on custom Premium.' },
  { q: 'Can we upgrade mid-cycle?', a: 'Yes. Upgrades can be prorated; we align effective dates in writing.' },
  { q: 'What analytics are included in Basic?', a: 'A concise snapshot of page views, referrers, and engagement signals. Pro unlocks a longer history.' },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing & plans',
    description: '24x7newspress.com distribution and analytics plans for media teams.',
    openGraphTitle: 'Pricing & plans | 24x7newspress.com',
    openGraphDescription: 'Basic, Pro, and Premium options with clear distribution and analytics tiers.',
    image: SITE_CONFIG.defaultOgImage,
    keywords: ['PR pricing', 'press release cost', 'distribution plans', 'media analytics'],
  })
}

export default function PricingPage() {
  return (
    <div className="min-h-screen text-[#1a0f24]">
      <NavbarShell />
      <div className="border-b border-[#36064d]/10 bg-gradient-to-br from-[#36064d] via-[#4a0b6a] to-[#1a0f24] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Clear plans</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Pricing for serious announcements</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {siteContent.home.metadata.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.popular
                  ? 'relative flex flex-col rounded-2xl border-2 border-[#da4848] bg-white p-6 shadow-xl sm:p-7'
                  : 'flex flex-col rounded-2xl border border-[#e8dff0] bg-white/90 p-6 sm:p-7'
              }
            >
              {plan.popular ? (
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#da4848] px-3 py-0.5 text-xs font-semibold text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Most popular
                </div>
              ) : null}
              <h2 className="text-lg font-semibold text-[#36064d]">{plan.name}</h2>
              <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {plan.price}
                {plan.cadence === '/ month' ? (
                  <span className="text-sm font-medium text-[#5c4d6a]"> {plan.cadence}</span>
                ) : null}
              </p>
              {plan.cadence === 'volume-based' ? <p className="text-sm text-[#5c4d6a]">{plan.cadence}</p> : null}
              <p className="mt-2 text-sm text-[#5c4d6a]">{plan.blurb}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex gap-2 text-sm text-[#2d2438]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" />
                    <span className="text-[#1a0f24]">{f.label}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={plan.popular ? 'mt-6 h-11 w-full bg-[#da4848] hover:bg-[#c23d3d]' : 'mt-6 h-11 w-full bg-[#36064d] hover:bg-[#4a0b6a]'}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <section className="border-t border-[#e8dff0] bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-2xl font-semibold">Feature comparison</h2>
          <p className="mt-1 text-sm text-[#5c4d6a]">At-a-glance trade-offs across {plans.map((p) => p.name).join(', ')}.</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8dff0] text-[#5c4d6a]">
                  <th className="py-3 pr-4 font-medium"> </th>
                  <th className="py-3 px-2 font-semibold">Basic</th>
                  <th className="py-3 px-2 font-semibold">Pro</th>
                  <th className="py-3 pl-2 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.k} className="border-b border-[#e8dff0]">
                    <th className="py-3 pr-4 font-medium text-[#1a0f24]">{row.k}</th>
                    <td className="py-3 px-2 text-[#5c4d6a]">{row.basic}</td>
                    <td className="py-3 px-2 text-[#1a0f24] font-medium">{row.pro}</td>
                    <td className="py-3 pl-2 text-[#5c4d6a]">{row.prem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f6f1fa] to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-2xl font-semibold">Add-ons</h2>
          <p className="mt-1 text-sm text-[#5c4d6a]">Extend any tier with the modules your story needs.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {addons.map((a) => (
              <div key={a.title} className="rounded-2xl border border-[#e8dff0] bg-white/90 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#36064d] text-white">
                  <Plus className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-[#5c4d6a]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8dff0]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-2xl font-semibold">Frequently asked</h2>
              <p className="mt-1 text-sm text-[#5c4d6a]">The essentials teams ask before moving from draft to live.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-[#e8dff0]">
                  <AccordionTrigger className="text-left text-[#1a0f24] hover:text-[#da4848] hover:no-underline">
                    <span className="flex items-start gap-2 pr-2">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#9d7cb8]" />
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#5c4d6a]">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
