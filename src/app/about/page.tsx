import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Globe2, LineChart, Shield } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

const values = [
  {
    title: 'Clarity over noise',
    body: 'We design for release-heavy communication: what happened, who said it, and where to go next.',
    icon: BookOpen,
  },
  {
    title: 'Built for reach',
    body: 'Listings, detail pages, and search are aligned so your story is findable the day it goes live.',
    icon: Globe2,
  },
  {
    title: 'Measurable stories',
    body: 'The platform keeps structure consistent so teams can track performance without rebuilding pages.',
    icon: LineChart,
  },
  {
    title: 'Trust in presentation',
    body: 'Headlines, datelines, and body copy are treated with the same care you expect from top wires.',
    icon: Shield,
  },
] as const

const heroImg =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: 'About us',
    description: `How ${SITE_CONFIG.name} helps communications teams ship credible press and industry coverage.`,
    image: SITE_CONFIG.defaultOgImage,
  })
}

export default function AboutPage() {
  return (
    <PageShell
      title="About us"
      description="24x7newspress.com is a media distribution and reading experience designed for public announcements—not generic marketing sites."
      actions={
        <Button asChild className="rounded-full bg-[#da4848] px-5 hover:bg-[#c23d3d]">
          <Link href="/contact">Contact the desk</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="prose max-w-none">
          <p className="text-base leading-relaxed text-[#2d2438]">
            {SITE_CONFIG.name} began as a simple idea: the surface where press lives should feel as serious as the news inside it.
            We combine editorial layout discipline with distribution-minded metadata so readers trust what they are seeing.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#2d2438]">
            Whether you publish quarterly or every week, the same system keeps your archive coherent—no mismatched
            sidebars, no recycled directory chrome.
          </p>

        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e8dff0]">
          <Image
            src={heroImg}
            alt="Communications and editorial team collaboration"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold text-[#1a0f24] sm:text-2xl">Principles we ship with</h2>
        <p className="mt-1 text-sm text-[#5c4d6a]">How we make decisions in layout, rhythm, and discovery.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <li
              key={v.title}
              className="flex gap-4 rounded-2xl border border-[#e8dff0] bg-gradient-to-b from-white to-[#fbf7fd] p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#36064d] text-white">
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1a0f24]">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5c4d6a]">{v.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
