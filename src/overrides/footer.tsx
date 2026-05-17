import Link from 'next/link'
import { FileText, HelpCircle, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


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

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  const year = new Date().getFullYear()
  const primary = SITE_CONFIG.tasks[0]
  const primaryHref = primary?.route || '/updates'
  const primaryLabel = primary?.label || 'Press room'

  return (
    <footer className="border-t text-white" style={{ borderColor: 'rgba(218,72,72,0.15)', background: 'linear-gradient(180deg, #1a0f24 0%, #0d0818 100%)' }}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            {/* logo — matches header */}
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                style={{
                  background: 'linear-gradient(135deg, #da4848 0%, #a83030 100%)',
                  boxShadow: '0 0 0 2px rgba(218,72,72,0.25), 0 4px 12px rgba(218,72,72,0.3)',
                }}
              >
                P
              </span>
              <div>
                <p className="text-lg font-black leading-tight tracking-tight text-white" style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
                  {SITE_CONFIG.name}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/40" style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
                  Press wire
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {SITE_CONFIG.description}
            </p>
          </div>
          {cols(primaryHref, primaryLabel).map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D4C4DC]">{col.title}</h3>
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


        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

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
