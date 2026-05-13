import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press intelligence desk',
  },
  footer: {
    tagline: 'Distribution, clarity, and measurable media reach',
  },
  hero: {
    badge: 'Press release wire',
    title: ['Stories that move markets, industries, and search results.'],
    description:
      '24x7newspress.com is built for professional announcements: multichannel distribution, editorial presentation, and discovery tools for journalists and investors—without the clutter of generic content templates.',
    primaryCta: {
      label: 'Open press room',
      href: '/press',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search releases and topics',
    focusLabel: 'Newsworthy',
    featureCardBadge: 'Why teams choose us',
    featureCardTitle: 'A distribution surface that reads like a premium wire, not a blog theme.',
    featureCardDescription:
      'Structured release pages, stronger metadata, and a homepage rhythm modeled on leading press portals—tuned to your media workflow.',
  },
  home: {
    metadata: {
      title: '24x7newspress.com — press wire and industry news',
      description:
        'Read and distribute company announcements, earnings notes, and sector updates through a clean press-room experience.',
      openGraphTitle: '24x7newspress.com — press wire and industry news',
      openGraphDescription:
        'Professional press distribution with editorial layouts, search, and topic discovery.',
      keywords: [
        'press wire',
        'media distribution',
        'earnings',
        'public relations',
        'company news',
        'PRnews18',
      ],
    },
    introBadge: 'What we are',
    introTitle: 'Media-grade publishing for modern communications teams.',
    introParagraphs: [
      '24x7newspress.com focuses on press content: announcements, statements, and updates that need discoverability, attribution, and a credible reading experience.',
      'The interface separates promotion from information—so audiences see clear headlines, datelines, and source context first.',
    ],
    sideBadge: 'On every page',
    sidePoints: [
      'Wire-style detail pages for each release.',
      'Topic and category tools for quick scanning.',
      'Newsletter-ready summaries without rebuilding layouts.',
    ],
    primaryLink: {
      label: 'Browse releases',
      href: '/press',
    },
    secondaryLink: {
      label: 'Talk to editorial',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready when you are',
    title: 'When your next announcement matters, the presentation should match the moment.',
    description: 'From listing pages to long-form body copy, 24x7newspress.com keeps the story readable on every screen.',
    primaryCta: {
      label: 'Contact the desk',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Read latest',
      href: '/press',
    },
  },
  taskSectionHeading: 'Latest from the wire',
  taskSectionDescriptionSuffix: 'Updated as new releases are published.',
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
    title: 'Press room archive',
    paragraphs: [
      'Scan releases by category, search by keyword, and open the full text when you need quotes, figures, and contacts.',
      'Datelines, summaries, and tags stay visible so you can triage what matters in seconds.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
