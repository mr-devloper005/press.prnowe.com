'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { buildPostUrl } from '@/lib/task-data'
import { normalizeCategory, isValidCategory, CATEGORY_OPTIONS } from '@/lib/categories'
import { cn } from '@/lib/utils'
import { ContentImage } from '@/components/shared/content-image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

const getCategory = (post: SitePost) => {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : ''
  return typeof c === 'string' && c.trim() ? c.trim() : 'Release'
}

const getImage = (post: SitePost) => {
  const media = Array.isArray(post.media) ? post.media : []
  const m = media.find((i) => typeof i?.url === 'string' && i.url)
  if (m?.url) return m.url
  const c = post.content && typeof post.content === 'object' ? (post.content as { images?: string[] }) : null
  if (c?.images?.[0]) return c.images[0]
  return '/placeholder.svg?height=600&width=900'
}

const sameMonth = (a: string | undefined, m: string) => {
  if (!a || m === 'all') return true
  const d = new Date(a)
  if (Number.isNaN(d.getTime())) return true
  return `${d.getFullYear()}-${d.getMonth() + 1}` === m
}

type Props = {
  posts: SitePost[]
  task: TaskKey
  initialCategory: string
}

function filterByCategory(posts: SitePost[], category: string) {
  const normalized = category ? normalizeCategory(category) : 'all'
  if (normalized === 'all') {
    return posts.filter((post) => {
      const content = post.content && typeof post.content === 'object' ? post.content : {}
      const value = typeof (content as { category?: string }).category === 'string' ? (content as { category?: string }).category! : ''
      return !value || isValidCategory(value)
    })
  }
  return posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const value =
      typeof (content as { category?: string }).category === 'string' ? normalizeCategory((content as { category?: string }).category!) : ''
    return value === normalized
  })
}

export function PressReleaseGridClient({ posts, task, initialCategory }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [q, setQ] = useState('')
  const [month, setMonth] = useState<string>(() => sp.get('m') || 'all')

  const category = initialCategory || 'all'
  const categoryScoped = useMemo(() => filterByCategory(posts, category), [posts, category])

  const onCategory = (v: string) => {
    const p = new URLSearchParams(sp.toString())
    if (v && v !== 'all') p.set('category', v)
    else p.delete('category')
    router.push(`${pathname}?${p.toString()}`)
  }

  const filtered = useMemo(() => {
    const normQ = q.trim().toLowerCase()
    return categoryScoped.filter((post) => {
      if (!sameMonth(post.publishedAt, month)) return false
      if (!normQ) return true
      const t = (post.title || '').toLowerCase()
      const s = (post.summary || '').toLowerCase()
      return t.includes(normQ) || s.includes(normQ)
    })
  }, [categoryScoped, q, month])

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-[#36064d]/10 bg-white/90 p-4 shadow-sm backdrop-blur-sm md:flex-row md:flex-wrap md:items-end">
        <div className="min-w-0 flex-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#36064d]/70" htmlFor="pr-search">Search</label>
          <div className="relative mt-1.5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#36064d]/45" />
            <Input
              id="pr-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search headlines, keywords…"
              className="h-11 border-[#36064d]/15 pl-9"
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#36064d]/70" htmlFor="pr-cat">Category</label>
          <Select
            value={category === 'all' ? 'all' : category}
            onValueChange={onCategory}
          >
            <SelectTrigger id="pr-cat" className="mt-1.5 h-11 border-[#36064d]/15">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORY_OPTIONS.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#36064d]/70" htmlFor="pr-m">Month</label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger id="pr-m" className="mt-1.5 h-11 border-[#36064d]/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any time</SelectItem>
              {Array.from({ length: 12 }, (_, i) => {
                const d = new Date()
                d.setMonth(d.getMonth() - i)
                const v = `${d.getFullYear()}-${d.getMonth() + 1}`
                return (
                  <SelectItem key={v} value={v}>
                    {d.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 border-[#36064d]/20"
          onClick={() => {
            setQ('')
            setMonth('all')
            onCategory('all')
          }}
        >
          Clear
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#36064d]/20 bg-white/60 p-10 text-center text-sm text-[#5c4d6a]">
          No releases match your filters. Try a shorter search or different month.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post) => {
            const href = buildPostUrl(task, post.slug)
            return (
              <li key={post.id}>
                <Link
                  href={href}
                  className={cn(
                    'group flex h-full flex-col overflow-hidden rounded-2xl border border-[#36064d]/8 bg-white shadow-sm transition',
                    'hover:-translate-y-0.5 hover:border-[#da4848]/30 hover:shadow-md'
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f0e8f4]">
                    <ContentImage
                      src={getImage(post)}
                      alt=""
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      fill
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-md bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#36064d]">
                        {getCategory(post)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#1a0f24] group-hover:text-[#da4848]">
                      {post.title}
                    </h2>
                    {post.summary ? (
                      <p className="mt-2 line-clamp-3 text-sm text-[#5c4d6a]">{post.summary}</p>
                    ) : null}
                    <span className="mt-auto pt-4 text-xs font-semibold text-[#da4848]">Read release →</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
