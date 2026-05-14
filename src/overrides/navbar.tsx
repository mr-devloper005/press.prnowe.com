'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const mainNav = [
  { label: 'Press room', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled) || SITE_CONFIG.tasks[0]

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* top utility bar */}
      <div style={{ background: 'linear-gradient(90deg, #0d0818 0%, #1a0f24 50%, #0d0818 100%)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <p className="text-[11px] font-medium tracking-wide text-white/50">{siteContent.navbar.tagline}</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/search" className="inline-flex items-center gap-1.5 text-[11px] text-white/60 transition hover:text-white">
              <Search className="h-3 w-3" />
              Search
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" className="text-[11px] font-semibold text-white/80 hover:text-white">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="text-[11px] text-white/60 transition hover:text-white">Sign in</Link>
                <Link href="/register" className="text-[11px] font-semibold text-[#da4848] transition hover:text-[#f26b6b]">Create account</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* main nav bar */}
      <div
        className="border-b shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #1a0f24 0%, #2d1a3a 40%, #36064d 100%)',
          borderColor: 'rgba(218,72,72,0.15)',
          boxShadow: '0 4px 24px rgba(26,15,36,0.5)',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          {/* logo */}
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
              style={{
                background: 'linear-gradient(135deg, #da4848 0%, #a83030 100%)',
                boxShadow: '0 0 0 2px rgba(218,72,72,0.25), 0 4px 12px rgba(218,72,72,0.3)',
              }}
            >
              P
            </span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-lg font-black leading-tight tracking-tight text-white sm:text-xl" style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-white/40" style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>Press wire</span>
            </span>
          </Link>

          {/* nav links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {mainNav.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/8 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              className="rounded-full border-0 px-5 text-sm font-bold text-white shadow-lg transition"
              style={{
                background: 'linear-gradient(135deg, #da4848 0%, #b83030 100%)',
                boxShadow: '0 4px 14px rgba(218,72,72,0.4)',
              }}
            >
              <Link href="/contact">Submit news</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white/70 hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {open ? (
        <div
          className="border-t md:hidden"
          style={{
            background: 'linear-gradient(180deg, #2d1a3a 0%, #1a0f24 100%)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-xl px-4 py-3 text-sm text-white/60 hover:text-white" onClick={() => setOpen(false)}>
              Search
            </Link>
            <Button
              asChild
              className="mt-2 w-full rounded-full border-0 font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #da4848 0%, #b83030 100%)' }}
            >
              <Link href="/contact" onClick={() => setOpen(false)}>Submit news</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
