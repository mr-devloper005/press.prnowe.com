'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterCta() {
  const [ok, setOk] = useState(false)
  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={(e) => {
        e.preventDefault()
        setOk(true)
        window.setTimeout(() => setOk(false), 4000)
      }}
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="nl-email" className="sr-only">Email</label>
        <Input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Work email"
          className="h-12 border-white/25 bg-white/10 text-white placeholder:text-white/50"
        />
      </div>
      <Button
        type="submit"
        className="h-12 shrink-0 bg-[#da4848] px-8 text-white hover:bg-[#c23d3d]"
        disabled={ok}
      >
        {ok ? 'You’re on the list' : 'Subscribe'}
      </Button>
    </form>
  )
}
