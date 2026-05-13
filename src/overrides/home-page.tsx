import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart3, Check, Radio, Shield, Sparkles, TrendingUp } from 'lucide-react'
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
const solutionsImage =
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80'
const storiesBand =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80'

const apartItems = [
  {
    title: 'Wire-native presentation',
    body: 'Releases are formatted for datelines, quotes, and long bodies—so readers get the same confidence they expect from major wires.',
  },
  {
    title: 'Distribution-minded metadata',
    body: 'Tags, categories, and summaries stay visible in list views to help journalists and analysts triage fast.',
  },
  {
    title: 'Search that respects context',
    body: 'Headline and body search is tuned for corporate language, not social noise—so results stay on mission.',
  },
  {
    title: 'A brand frame that is yours',
    body: 'Deep purple foundations and crimson actions create a distinct press identity instead of a recycled blog skin.',
  },
]

const solutions = [
  {
    title: 'Multichannel distribution',
    body: 'Package releases for web, email digests, and partner surfaces with consistent structure.',
    icon: Radio,
  },
  {
    title: 'Analytics-ready pages',
    body: 'Each URL is a stable asset for monitoring pickup, referrers, and engagement over time.',
    icon: BarChart3,
  },
  {
    title: 'Trust & compliance tone',
    body: 'Layout choices prioritize clarity and sourcing—ideal for regulated industries and IR teams.',
    icon: Shield,
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
  const posts = await fetchTaskPosts('mediaDistribution', 18, { allowMockFallback: false, fresh: true, revalidate: 120 })
  const featured = posts[0]
  const featuredStories = posts.slice(0, 5)
  const browse = posts.slice(0, 8)
  const taskRoute = SITE_CONFIG.tasks[0]?.route || '/updates'

  return (
    <div className="min-h-screen text-[#1a0f24]">
      <NavbarShell />
      <main className="bg-gradient-to-b from-[#f5f1f8] via-white to-[#f3ebf5] text-[#1a0f24]">
        <section className="relative overflow-hidden border-b border-[#36064d]/10 bg-[#1a0f24] text-white">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#36064d]/95 via-[#36064d]/80 to-[#1a0f24]/25" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <p className="pr-motion-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
              <Sparkles className="h-3.5 w-3.5" />
              {siteContent.hero.badge}
            </p>
            <h1 className="pr-motion-rise pr-motion-delay-1 mt-6 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.15rem]">
              {siteContent.hero.title[0]}
            </h1>
            <p className="pr-motion-rise pr-motion-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {siteContent.hero.description}
            </p>
            <div className="pr-motion-rise pr-motion-delay-3 mt-10 flex flex-wrap gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#da4848] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#da4848]/20 transition hover:bg-[#c23d3d]"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="pr-motion-rise pr-motion-delay-4 mt-12 grid max-w-lg gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Primary desk</p>
                <p className="mt-1 text-lg font-semibold">{SITE_CONFIG.tasks[0]?.label}</p>
                <p className="mt-1 text-sm text-white/70">{SITE_CONFIG.tasks[0]?.description}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Also explore</p>
                <p className="mt-1 text-sm text-white/80">Company and help stay one click away in the main navigation.</p>
                <Link href="/search" className="mt-3 inline-flex text-sm font-semibold text-[#fecdd3] hover:text-white">
                  Open search
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-b border-[#e8dff0]/80 bg-white/95">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#1a0f24] sm:text-4xl">
                What sets {SITE_CONFIG.name} apart
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#5c4d6a]">
                A press portal should feel like infrastructure—not a marketing theme. We designed spacing, type, and section rhythm for release-heavy teams.
              </p>
              <ul className="mt-8 space-y-4">
                {apartItems.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#da4848]/12 text-[#da4848]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="font-semibold text-[#1a0f24]">{item.title}</p>
                      <p className="mt-1 text-sm text-[#5c4d6a]">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#36064d]/15 shadow-[0_20px_50px_rgba(54,6,77,0.08)]">
              <Image src={solutionsImage} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f24]/80 via-[#36064d]/20 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white drop-shadow">Editorial control rooms still matter—tools should match the seriousness of the announcement.</p>
            </div>
          </div>
          </div>
        </section>

        <section className="w-full border-y border-[#e8dff0] bg-gradient-to-b from-[#f8f4fc] to-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#1a0f24]">Featured solutions</h2>
                <p className="mt-2 max-w-2xl text-sm text-[#5c4d6a]">How teams use {SITE_CONFIG.name} to structure outbound communications and on-site reading.</p>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {solutions.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-[#e0d5e8] bg-white p-6 shadow-[0_8px_30px_rgba(54,6,77,0.06)] transition hover:-translate-y-0.5 hover:border-[#da4848]/25 hover:shadow-[0_12px_36px_rgba(54,6,77,0.1)]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#36064d] text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#1a0f24]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4d6a]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#36064d]/15 text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src={storiesBand}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#1a0f24]/95 via-[#36064d]/88 to-[#2d0542]/80"
              aria-hidden
            />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="text-3xl font-semibold">Featured stories</h2>
            <p className="mt-2 text-sm text-white/75">Latest items from the wire—updated from your live feed when connected.</p>
            {featuredStories.length === 0 ? (
              <p className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 text-sm text-white/80">
                Releases will appear here when they are published to your press room.
                <Link href={taskRoute} className="ml-2 font-semibold text-[#fecdd3] underline-offset-2 hover:underline">
                  Open the archive
                </Link>
              </p>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredStories.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={buildPostUrl('mediaDistribution', post.slug)}
                    className="group overflow-hidden rounded-2xl border border-white/20 bg-white/8 backdrop-blur-sm transition hover:border-[#f87171]/50 hover:bg-white/12"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image src={getPostImage(post)} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{getCategory(post)}</p>
                      <p className="mt-1 font-medium leading-snug text-white group-hover:text-[#fecaca]">{post.title}</p>
                    </div>
                  </Link>
                ))}
                {featuredStories.length > 3
                  ? featuredStories.slice(3, 5).map((post) => (
                    <Link
                      key={post.id}
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
                    >
                      <p className="text-[11px] text-white/55">{getCategory(post)}</p>
                      <p className="mt-1 font-medium text-white">{post.title}</p>
                      {post.summary ? <p className="mt-2 line-clamp-3 text-sm text-white/65">{post.summary}</p> : null}
                    </Link>
                  ))
                  : null}
              </div>
            )}
            {featured ? (
              <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-black/20 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#fecdd3]">Spotlight</p>
                <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{featured.title}</h3>
                {featured.summary ? <p className="mt-3 text-sm leading-relaxed text-white/80">{featured.summary}</p> : null}
                <Link
                  href={buildPostUrl('mediaDistribution', featured.slug)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#fecaca]"
                >
                  Read the full release <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-6xl border-b border-[#e8dff0]/60 px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#B83838]" />
            <h2 className="text-2xl font-semibold text-[#1a0f24]">Trending topics</h2>
          </div>
          <p className="mt-1 text-sm text-[#5c4d6a]">Jump into categories that are active across the wire.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {trendingSlugs.map((slug) => {
              const name = CATEGORY_OPTIONS.find((c) => c.slug === slug)?.name || slug
              return (
                <Link
                  key={slug}
                  href={`${taskRoute}?category=${encodeURIComponent(slug)}`}
                  className="rounded-full border border-[#dcd3e4] bg-white px-4 py-2 text-sm font-medium text-[#36064d] shadow-sm transition hover:border-[#da4848]/35 hover:bg-[#fff5f5]"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </section>

        <section className="w-full border-t border-[#e8dff0] bg-white/90">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-3xl font-semibold text-[#1a0f24]">Browse news</h2>
              <Link href={taskRoute} className="text-sm font-semibold text-[#b83838] hover:underline">
                See all releases →
              </Link>
            </div>
            {browse.length === 0 ? (
              <p className="mt-8 text-sm text-[#5c4d6a]">The archive is ready for your first release—publish to populate this section.</p>
            ) : (
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {browse.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="block rounded-xl border border-[#e0d5e8] bg-white p-4 shadow-sm transition hover:border-[#da4848]/30 hover:shadow-md"
                    >
                      <p className="text-[11px] text-[#5c4d6a]">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : '—'}
                      </p>
                      <p className="mt-1 line-clamp-2 font-medium leading-snug text-[#1a0f24]">{post.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="border-t border-[#1a0f24]/20 bg-gradient-to-r from-[#36064d] via-[#3a0a55] to-[#4a1266] text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold sm:text-3xl">Receive monthly trending press wire and industry news</h2>
                <p className="mt-3 text-sm text-white/75">No clutter—one concise digest with what moved markets and why it matters. Unsubscribe any time.</p>
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
