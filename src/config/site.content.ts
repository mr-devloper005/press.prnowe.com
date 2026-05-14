import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press intelligence desk',
  },
  footer: {
    tagline: 'Distribution, clarity, and measurable media reach',
  },
  hero: {
    badge: 'Professional press distribution',
    title: ['Announcements that reach journalists, investors, and markets.'],
    description:
      'A modern press release platform built for communications teams: structured distribution, premium editorial presentation, and tools for tracking media coverage—without generic blog templates or clutter.',
    primaryCta: {
      label: 'Access newsroom',
      href: '/press',
    },
    secondaryCta: {
      label: 'Plans & pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search press releases, topics, and announcements',
    focusLabel: 'Featured',
    featureCardBadge: 'Why PR teams choose us',
    featureCardTitle: 'Wire-service quality distribution for modern corporate communications.',
    featureCardDescription:
      'Professionally formatted release pages, verified contact metadata, and a distribution rhythm designed for professional newsrooms and investor relations teams.',
  },
  home: {
    metadata: {
      title: 'Media Press Center — Corporate announcements and news',
      description:
        'Distribute press releases, earnings updates, and corporate news through a professional newsroom platform with editorial layouts and media discovery.',
      openGraphTitle: 'Professional press release distribution',
      openGraphDescription:
        'Corporate communications platform with professional wire service formatting, journalist outreach tools, and announcement tracking.',
      keywords: [
        'press release',
        'media distribution',
        'corporate announcements',
        'investor relations',
        'company news',
        'PR platform',
        'newsroom',
        'press wire',
      ],
    },
    introBadge: 'Press center',
    introTitle: 'Professional announcement distribution for corporate communications.',
    introParagraphs: [
      'Press center is built for corporate announcements: earnings updates, product launches, executive appointments, mergers, and strategic news that requires professional presentation and broad media reach.',
      'Every release gets wire-service formatting with verified datelines, media contacts, and searchable metadata—so journalists, analysts, and industry observers can find and quote your news accurately.',
    ],
    sideBadge: 'Built for professionals',
    sidePoints: [
      'Wire-service quality formatting and distribution.',
      'Full-text search with category and topic filtering.',
      'One-click journalist contact and media outreach.',
    ],
    primaryLink: {
      label: 'Browse newsroom',
      href: '/press',
    },
    secondaryLink: {
      label: 'Contact communications',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to launch',
    title: 'When your announcement moves the story forward, the platform should work like a newsroom.',
    description: 'From headline pages to full press releases, press center ensures your news is readable, discoverable, and professionally presented across every screen.',
    primaryCta: {
      label: 'Start distributing',
      href: '/contact',
    },
    secondaryCta: {
      label: 'View latest releases',
      href: '/press',
    },
  },
  taskSectionHeading: 'Latest announcements',
  taskSectionDescriptionSuffix: 'Updated as news and corporate announcements are released.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press room',
    description: 'Filter by topic, search headlines, and open full press wire.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Newsroom archive',
    paragraphs: [
      'Browse corporate announcements by category, search by keyword, and open full releases when you need executive quotes, financial figures, and media contact information.',
      'Datelines, publication dates, categories, and media tags remain visible so journalists and analysts can identify and verify relevant announcements in seconds.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact PR', href: '/contact' },
    ],
  },
}
