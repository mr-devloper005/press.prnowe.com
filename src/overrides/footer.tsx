import Link from 'next/link'
import { FileText, HelpCircle, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const cols = (primaryHref: string, primaryLabel: string) => [
  {
    title: 'Press distribution',
    links: [
      { label: 'Press room', href: primaryHref },
      { label: 'Search stories', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press kit', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help', href: '/help' },
      { label: 'Status', href: '/status' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export function FooterOverride() {
  const year = new Date().getFullYear()
  const primary = SITE_CONFIG.tasks[0]
  const primaryHref = primary?.route || '/updates'
  const primaryLabel = primary?.label || 'Press room'

  return (
    <footer className="border-t border-white/5 bg-[#1a0f24] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-bold">24</span>
              <div>
                <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-xs text-white/55">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              {SITE_CONFIG.description}
            </p>

          </div>
          {cols(primaryHref, primaryLabel).map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c4b0d4]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <Link href="/search" className="inline-flex items-center gap-1.5 hover:text-white">
              <Search className="h-4 w-4" />
              Find a release
            </Link>
            <Link href="/help" className="inline-flex items-center gap-1.5 hover:text-white">
              <HelpCircle className="h-4 w-4" />
              Help
            </Link>
            <Link href={primaryHref} className="inline-flex items-center gap-1.5 hover:text-white">
              <FileText className="h-4 w-4" />
              {primaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
