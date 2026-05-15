import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BarChart2, Globe, Radio, Shield, TrendingUp, Zap } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { NewsletterCta } from '@/components/press/newsletter-cta'
import { buildPostUrl } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const heroImage =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2000&q=80'
const editorialImage =
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80'

const solutions = [
  {
    title: 'Multichannel distribution',
    body: 'Package releases for web, email digests, and partner surfaces with consistent structure.',
    icon: Radio,
  },
  {
    title: 'Analytics-ready pages',
    body: 'Each URL is a stable asset for monitoring pickup, referrers, and engagement over time.',
    icon: BarChart2,
  },
  {
    title: 'Trust & compliance tone',
    body: 'Layout choices prioritize clarity and sourcing—ideal for regulated industries and IR teams.',
    icon: Shield,
  },
  {
    title: 'Global reach',
    body: 'Structured metadata and open formats ensure your releases are indexed and discoverable worldwide.',
    icon: Globe,
  },
  {
    title: 'Instant publishing',
    body: 'From draft to live in seconds. No queues, no delays—your news moves at the speed of the market.',
    icon: Zap,
  },
  {
    title: 'Wire-native format',
    body: 'Datelines, quotes, and long bodies formatted exactly as journalists and analysts expect.',
    icon: TrendingUp,
  },
]

const trendingSlugs = ['technology', 'finance', 'health', 'energy', 'news', 'business', 'law-legal', 'digital']

function getPostImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const m = media.find((i) => typeof i?.url === 'string' && i.url)
  if (m?.url) return m.url
  const c = post.content && typeof post.content === 'object' ? (post.content as { images?: string[] }) : null
  if (c?.images?.[0]) return c.images[0]
  return '/placeholder.svg?height=600&width=900'
}

function getCategory(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : ''
  return typeof c === 'string' && c.trim() ? c.trim() : 'Press wire'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 18, { allowMockFallback: true, fresh: true, revalidate: 120 })
  const featured = posts[0]
  const featuredStories = posts.slice(1, 4)
  const browse = posts.slice(0, 8)
  const taskRoute = SITE_CONFIG.tasks[0]?.route || '/updates'

  return (
    <div className="min-h-screen text-[#1a0f24]">
      <NavbarShell />
      <main>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#1a0f24' }}>
          <div className="absolute inset-0 z-0" style={{ backgroundColor: '#1a0f24' }} />
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
            style={{ zIndex: 1 }}
          />
          <div className="absolute inset-0" style={{ zIndex: 2, background: 'linear-gradient(135deg, #1a0f24 0%, rgba(45,26,58,0.97) 60%, rgba(54,6,77,0.85) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#da4848]/60 to-transparent" style={{ zIndex: 3 }} />

          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pb-32 lg:pt-28" style={{ zIndex: 4 }}>
            {/* live badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#da4848]/40 bg-[#da4848]/10 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#da4848]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#da4848]">
                {siteContent.hero.badge}
              </span>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-end">
              <div>
                <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4rem]">
                  {siteContent.hero.title[0]}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                  {siteContent.hero.description}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href={siteContent.hero.primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[#da4848] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#da4848]/25 transition hover:bg-[#c23d3d]"
                  >
                    {siteContent.hero.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
                  >
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* wire desk card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Wire desk</p>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#da4848]">Primary desk</p>
                    <p className="mt-1 text-base font-bold text-white">{SITE_CONFIG.tasks[0]?.label}</p>
                    <p className="mt-1 text-sm text-white/55">{SITE_CONFIG.tasks[0]?.description}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Quick access</p>
                    <div className="mt-3 flex flex-col gap-2">
                      <Link href={taskRoute} className="flex items-center justify-between text-sm text-white/70 transition hover:text-white">
                        <span>Latest releases</span><ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link href="/search" className="flex items-center justify-between text-sm text-white/70 transition hover:text-white">
                        <span>Search archive</span><ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link href="/contact" className="flex items-center justify-between text-sm text-white/70 transition hover:text-white">
                        <span>Media contact</span><ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER BAR ── */}
        <div className="border-b border-[#36064d]/15 bg-[#36064d]">
          <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-6 py-2.5">
            <span className="shrink-0 rounded-full bg-[#da4848] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Live
            </span>
            <div className="flex gap-8 overflow-x-auto">
              {trendingSlugs.map((slug) => {
                const name = CATEGORY_OPTIONS.find((c) => c.slug === slug)?.name || slug
                return (
                  <Link
                    key={slug}
                    href={`${taskRoute}?category=${encodeURIComponent(slug)}`}
                    className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-white/50 transition hover:text-white"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── FEATURED STORIES ── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mb-10 flex items-end justify-between border-b-2 border-[#1a0f24] pb-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a0f24]">Featured stories</h2>
              <Link href={taskRoute} className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#da4848] hover:underline">
                All releases <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {!featured && featuredStories.length === 0 ? (
              <p className="py-12 text-center text-sm text-[#5c4d6a]">
                Releases will appear here once published.{' '}
                <Link href={taskRoute} className="font-semibold text-[#da4848] hover:underline">Open the archive</Link>
              </p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                {/* main featured */}
                {featured && (
                  <Link
                    href={buildPostUrl('mediaDistribution', featured.slug)}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                      <Image
                        src={getPostImage(featured)}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f24]/90 via-[#1a0f24]/30 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block rounded-full bg-[#da4848] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {getCategory(featured)}
                      </span>
                      <h3 className="mt-2 text-xl font-black leading-tight text-white transition group-hover:text-[#f2c9c6] sm:text-2xl">
                        {featured.title}
                      </h3>
                      {featured.summary && (
                        <p className="mt-2 line-clamp-2 text-sm text-white/70">{featured.summary}</p>
                      )}
                    </div>
                  </Link>
                )}

                {/* side stories */}
                <div className="flex flex-col gap-4">
                  {featuredStories.map((post) => (
                    <Link
                      key={post.id}
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="group flex gap-4 border-b border-[#dcd3e4] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[#ede8f2]">
                        <Image
                          src={getPostImage(post)}
                          alt=""
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="112px"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#da4848]">
                          {getCategory(post)}
                        </span>
                        <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#1a0f24] transition group-hover:text-[#da4848]">
                          {post.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={taskRoute}
                    className="mt-auto inline-flex items-center gap-2 rounded-full border-2 border-[#1a0f24] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a0f24] transition hover:bg-[#1a0f24] hover:text-white"
                  >
                    View all releases <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── SOLUTIONS GRID ── */}
        <section className="bg-[#f6f3f8]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mb-10 border-b-2 border-[#1a0f24] pb-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#da4848]">Platform</p>
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a0f24]">
                Built for press professionals
              </h2>
            </div>
            <div className="grid gap-px bg-[#dcd3e4] sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="group bg-[#f6f3f8] p-6 transition hover:bg-white"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#36064d] text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-[#1a0f24]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4d6a]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BROWSE NEWS ── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mb-10 flex items-end justify-between border-b-2 border-[#1a0f24] pb-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a0f24]">Browse news</h2>
              <Link href={taskRoute} className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#da4848] hover:underline">
                See all releases <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {browse.length === 0 ? (
              <p className="py-12 text-center text-sm text-[#5c4d6a]">
                The archive is ready for your first release—publish to populate this section.
              </p>
            ) : (
              <ul className="grid gap-px bg-[#dcd3e4] sm:grid-cols-2 lg:grid-cols-4">
                {browse.map((post) => (
                  <li key={post.id} className="bg-white">
                    <Link
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="group flex h-full flex-col p-5 transition hover:bg-[#f6f3f8]"
                    >
                      <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#da4848]">
                        {getCategory(post)}
                      </span>
                      <p className="line-clamp-3 text-sm font-bold leading-snug text-[#1a0f24] transition group-hover:text-[#da4848]">
                        {post.title}
                      </p>
                      <span className="mt-auto flex items-center gap-1 pt-4 text-[11px] font-semibold text-[#1a0f24]/40 transition group-hover:text-[#da4848]">
                        Read <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ── EDITORIAL STRIP ── */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#1a0f24' }}>
          <div className="absolute inset-0 z-0" style={{ backgroundColor: '#1a0f24' }} />
          <Image
            src={editorialImage}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            style={{ zIndex: 1 }}
          />
          <div className="absolute inset-0" style={{ zIndex: 2, background: 'linear-gradient(90deg, #1a0f24 0%, rgba(45,26,58,0.97) 60%, rgba(54,6,77,0.85) 100%)' }} />
          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20" style={{ zIndex: 3 }}>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#da4848]">Why {SITE_CONFIG.name}</p>
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  Editorial control rooms still matter.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  A press portal should feel like infrastructure—not a marketing theme. We designed spacing, type, and section rhythm for release-heavy teams who need clarity over decoration.
                </p>
                <Link
                  href={taskRoute}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#da4848] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#da4848]/25 transition hover:bg-[#c23d3d]"
                >
                  Enter the newsroom <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10">
                {[
                  { label: 'Wire-native format', desc: 'Datelines, quotes, and structured bodies.' },
                  { label: 'Distribution metadata', desc: 'Tags and categories visible in every list view.' },
                  { label: 'Context-aware search', desc: 'Tuned for corporate language, not social noise.' },
                  { label: 'Your brand frame', desc: 'A distinct press identity, not a recycled blog.' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-white">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="border-t border-[#dcd3e4] bg-[#f6f3f8]">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#da4848]">Newsletter</p>
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a0f24]">
                  Receive monthly trending press wire and industry news
                </h2>
                <p className="mt-3 text-sm text-[#5c4d6a]">
                  No clutter—one concise digest with what moved markets and why it matters. Unsubscribe any time.
                </p>
              </div>
              <NewsletterCta />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
