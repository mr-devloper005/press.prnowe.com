import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ShareChips } from '@/components/press/share-chips'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isUrl = (value?: string | null) => typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getImageUrls = (post: SitePost) => {
  const content = post.content && typeof post.content === 'object' ? (post.content as { images?: string[]; logo?: string }) : {}
  const media = Array.isArray(post.media) ? post.media : []
  const fromMedia = media.map((m) => m?.url).filter((u): u is string => isUrl(u))
  const fromContent = Array.isArray(content.images) ? content.images.filter((u): u is string => isUrl(u)) : []
  const merged = [...fromMedia, ...fromContent]
  if (merged.length) return merged
  if (isUrl(content.logo)) return [content.logo!]
  return [] as string[]
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const related = (await fetchTaskPosts(task, 12, { revalidate: 60 }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml(
    (typeof content.body === 'string' && content.body.trim() ? content.body : '') || post.summary || '',
    'Full release text will appear here once published in your CMS.'
  )
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()
      ? content.excerpt
      : post.summary) || null
  const base = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const pageUrl = `${base}/updates/${post.slug}`
  const images = getImageUrls(post)
  const leadImage = images[0]
  const imageForSchema = leadImage
    ? [leadImage.startsWith('http') ? leadImage : `${base}${leadImage}`]
    : [`${base}${SITE_CONFIG.defaultOgImage}`]
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: imageForSchema,
    datePublished: post.publishedAt || undefined,
    author: { '@type': 'Person', name: post.authorName || 'Editorial desk' },
  }

  return (
    <div className="min-h-screen text-[#1a0f24]">
      <SchemaJsonLd data={articleSchema} />
      <NavbarShell />
      <div className="border-b border-[#36064d]/10 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 text-xs text-[#5c4d6a] sm:px-6">
          <nav className="flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#da4848]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <Link href="/updates" className="hover:text-[#da4848]">Press room</Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="line-clamp-1 text-[#1a0f24]">Release</span>
          </nav>
        </div>
      </div>

      <article>
        <header className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-12">
          <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.4rem]">{post.title}</h1>
          {subtitle ? <p className="mt-4 text-lg text-[#5c4d6a] sm:text-xl">{subtitle}</p> : null}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#5c4d6a]">
            <span>By {post.authorName || 'Editorial desk'}</span>
          </div>
          <div className="mt-6 border-t border-[#e8dff0] pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5c4d6a]">Share</p>
            <div className="mt-2">
              <ShareChips title={post.title} url={pageUrl} />
            </div>
          </div>
        </header>

        {leadImage ? (
          <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#e8dff0] bg-[#f3eff8] shadow-sm">
              {leadImage.startsWith('http') ? (
                <Image
                  src={leadImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 896px"
                  priority
                />
              ) : (
                <ContentImage src={leadImage} alt="" fill className="object-cover" />
              )}
            </div>
          </div>
        ) : null}

        <div className="article-content mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <RichContent
            html={html}
            className="prose-p:text-[#2d2438] leading-[1.75] prose-p:mb-4 prose-p:mt-0 prose-p:first:mt-0"
          />
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-[#e8dff0] bg-gradient-to-b from-white to-[#f6f1fa]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="text-xl font-semibold sm:text-2xl">Related releases</h2>
            <p className="mt-1 text-sm text-[#5c4d6a]">More from the same wire, excluding this story.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const img = getImageUrls(item)[0] || '/placeholder.svg?height=400&width=600'
                return (
                  <li key={item.id}>
                    <Link
                      href={buildPostUrl(task, item.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8dff0] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                    >
                      <div className="relative aspect-[3/2] w-full">
                        {img.startsWith('http') ? (
                          <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                        ) : (
                          <ContentImage src={img} alt="" fill className="object-cover" />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="line-clamp-2 font-medium leading-snug text-[#1a0f24] group-hover:text-[#da4848]">
                          {item.title}
                        </p>
                        {item.summary ? (
                          <p className="mt-2 line-clamp-2 text-sm text-[#5c4d6a]">{item.summary}</p>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 text-sm">
              <Link href="/updates" className="font-semibold text-[#da4848] hover:underline">
                View the full archive
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  )
}
