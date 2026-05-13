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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#36064d] text-white shadow-md shadow-[#1a0f24]/20">
      <div className="border-b border-white/5 bg-[#2d0550]/80 text-[12px]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <p className="text-white/75">{siteContent.navbar.tagline}</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/search" className="inline-flex items-center gap-1.5 text-white/90 hover:text-white">
              <Search className="h-3.5 w-3.5" />
              Search
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" className="font-medium text-white hover:underline">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="text-white/80 hover:text-white">Sign in</Link>
                <Link href="/register" className="font-semibold text-[#fecaca] hover:text-white">Create account</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-bold tracking-tight text-white">
            24
          </span>
          <span className="min-w-0 text-left">
            <span className="block truncate text-lg font-semibold leading-tight tracking-tight sm:text-xl">{SITE_CONFIG.name}</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Press wire</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  active ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            className="rounded-full border-0 bg-[#da4848] px-5 text-white shadow-sm hover:bg-[#c23d3d]"
          >
            <Link href="/contact">Submit news</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#2d0550] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-lg px-3 py-3 text-sm" onClick={() => setOpen(false)}>Search</Link>
            <Button asChild className="mt-2 w-full rounded-full bg-[#da4848] text-white">
              <Link href="/contact" onClick={() => setOpen(false)}>Submit news</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
