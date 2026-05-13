import { Suspense } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { taskIntroCopy } from '@/config/site.content'
import { PressReleaseGridClient } from '@/components/press/press-release-grid-client'
import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts(task, 60, { fresh: false, revalidate: 60 })
  const intro = taskIntroCopy[task]
  const base = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const taskConfig = SITE_CONFIG.tasks.find((t) => t.key === task)
  const cat = category || ''

  return (
    <div className="min-h-screen text-[#1a0f24]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#36064d]/8 bg-gradient-to-b from-white to-[#f6f1fa]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#da4848]">Archive</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{taskConfig?.label || 'Press room'}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5c4d6a]">
              {taskConfig?.description}
            </p>
            {intro ? (
              <div className="mt-6 max-w-2xl text-sm text-[#5c4d6a]">
                {intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="mt-2 first:mt-0">
                    {p}
                  </p>
                ))}
                <div className="mt-4 flex flex-wrap gap-4">
                  {intro.links.map((l) => (
                    <Link key={l.href} href={l.href} className="font-semibold text-[#da4848] hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-2 text-sm">
              <Link
                href={`${base}/updates`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#36064d]/15 bg-white px-3 py-2 text-[#36064d]"
              >
                <FileText className="h-4 w-4" />
                All releases
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <Suspense
            fallback={
              <p className="text-sm text-[#5c4d6a]">Loading the release grid…</p>
            }
          >
            <PressReleaseGridClient task={task} posts={posts} initialCategory={cat} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
