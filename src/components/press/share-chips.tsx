'use client'

import { useMemo, useState } from 'react'
import { Check, Facebook, Link2, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

const XIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={props.className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function ShareChips({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)
  const enc = useMemo(
    () => ({ t: encodeURIComponent(title), u: encodeURIComponent(url) }),
    [title, url]
  )

  const items = useMemo(
    () => [
      { label: 'X', href: `https://twitter.com/intent/tweet?text=${enc.t}&url=${enc.u}`, icon: XIcon },
      { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc.u}`, icon: Linkedin },
      { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc.u}`, icon: Facebook },
    ],
    [enc.t, enc.u]
  )

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#36064d]/15 bg-white',
            'text-[#36064d] transition hover:border-[#da4848]/40 hover:bg-[#da4848]/5 hover:text-[#da4848]'
          )}
          aria-label={`Share on ${label}`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#36064d]/15 bg-white text-[#36064d] transition hover:border-[#da4848]/40 hover:bg-[#da4848]/5 hover:text-[#da4848]"
        aria-label="Copy link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
          } catch {
            setCopied(false)
          }
        }}
      >
        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
