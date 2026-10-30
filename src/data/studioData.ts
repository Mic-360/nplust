export type PageRoute = 'home' | 'about' | 'not-found';

export const PRODUCTION_ORIGIN = 'https://nplust.in';

export const STUDIO_DATA = {
  name: 'N+T Creative Studio',
  shortName: 'N+T',
  url: PRODUCTION_ORIGIN,
  domain: PRODUCTION_ORIGIN,
  location: 'India',
  email: 'hello@nplust.in',
  instagram: '@nplust.in',
  instagramUrl: 'https://www.instagram.com/nplust.in/',
  linkedin: '@n-plus-t',
  linkedinUrl: 'https://www.linkedin.com/company/n-plus-t',
  founders: [
    {
      id: 'https://nplust.in/#navya-choyal',
      name: 'Navya Choyal',
      role: 'Co-Founder, Designer, Creative Strategist & Thinker',
      jobTitle: 'Co-Founder, Designer & Creative Strategist',
      portrait: '/n.png',
      image: '/n.png',
    },
    {
      id: 'https://nplust.in/#tripti-bhatter',
      name: 'Tripti Bhatter',
      role: 'Co-Founder, Designer, Creative Strategist & Thinker',
      jobTitle: 'Co-Founder, Designer & Creative Strategist',
      portrait: '/t.png',
      image: '/t.png',
    },
  ],
  topStatement:
    'N+T is an extension of Navya Choyal and Tripti Bhatter’s creative practice.',
  footerStatement:
    'N+T is a creative studio bringing art, design and cultural perspective together to build identities with context, character and relevance.',
  aboutStatement: [
    'We’re a multi-service studio with 6+ yrs of building brands across architecture, art, fashion, hospitality, beauty and the cultural intersections that exist between and beyond them.',
    'Led by intuition, we understand design as a part of life, with stories and dialogue at the core of everything we do.',
    'Our work is well-paced and intentional; each project starts with a deconstruction of the known, analysing cultural relevance, attending to feelings first, and then shifting our focus to form, informed by the multiple layers of meaning it holds.',
    'We believe in closely building relationships with individuals, founders and institutions. As designers, creative strategists and thinkers, we extend our practice across identities, websites, packaging, branding, design and creative communication, working across different mediums and shaping each project around its context and purpose.',
  ],
  aboutParagraphs: [
    'We’re a multi-service studio with 6+ yrs of building brands across architecture, art, fashion, hospitality, beauty and the cultural intersections that exist between and beyond them.',
    'Led by intuition, we understand design as a part of life, with stories and dialogue at the core of everything we do.',
    'Our work is well-paced and intentional; each project starts with a deconstruction of the known, analysing cultural relevance, attending to feelings first, and then shifting our focus to form, informed by the multiple layers of meaning it holds.',
    'We believe in closely building relationships with individuals, founders and institutions. As designers, creative strategists and thinkers, we extend our practice across identities, websites, packaging, branding, design and creative communication, working across different mediums and shaping each project around its context and purpose.',
  ],
  services: [
    'Identities',
    'Websites',
    'Packaging',
    'Branding',
    'Design',
    'Creative Communication',
    'Creative Strategy',
  ],
  disciplines: [
    'Branding',
    'Design',
    'Visual Identity',
    'Websites',
    'Packaging',
    'Creative Communication',
    'Creative Strategy',
  ],
  industries: [
    'Architecture',
    'Art',
    'Fashion',
    'Beauty',
    'Hospitality',
    'Cultural Intersections',
  ],
  sectors: [
    'Architecture',
    'Art',
    'Fashion',
    'Beauty',
    'Hospitality',
    'Cultural Intersections',
  ],
};

export const FEATURED_PROJECTS = [
  {
    id: 'transit-production',
    title: 'Transit Production',
    client: 'Transit Production',
    disciplines: ['Identity', 'Creative Direction', 'Moving Image'],
    heroImage: '/banner.png',
    badgeImage: '/banner-badge.png',
    summary:
      'Visual identity and production emblem crafted by N+T for Transit Production, exploring cultural narratives across cinema, coastal architecture, and lived stories.',
  },
];

export interface RouteMetadata {
  route: PageRoute;
  path: string;
  canonicalUrl: string;
  title: string;
  description: string;
  robots: string;
  ogType: string;
  ogImage: string;
  ogImageAlt: string;
  preloadHeroImage: boolean;
  jsonLd: Record<string, unknown>;
}

const ORGANIZATION_ENTITY = {
  '@type': 'Organization',
  '@id': `${PRODUCTION_ORIGIN}/#organization`,
  name: STUDIO_DATA.name,
  alternateName: ['N+T', 'nplust.in'],
  url: `${PRODUCTION_ORIGIN}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${PRODUCTION_ORIGIN}/logo.png`,
    caption: 'N+T Creative Studio Wordmark',
  },
  description: STUDIO_DATA.footerStatement,
  email: STUDIO_DATA.email,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: [STUDIO_DATA.instagramUrl, STUDIO_DATA.linkedinUrl],
  founder: [
    { '@id': `${PRODUCTION_ORIGIN}/#navya-choyal` },
    { '@id': `${PRODUCTION_ORIGIN}/#tripti-bhatter` },
  ],
};

const FOUNDER_ENTITIES = [
  {
    '@type': 'Person',
    '@id': `${PRODUCTION_ORIGIN}/#navya-choyal`,
    name: 'Navya Choyal',
    jobTitle: 'Co-Founder, Designer & Creative Strategist',
    image: `${PRODUCTION_ORIGIN}/n.png`,
    worksFor: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
  },
  {
    '@type': 'Person',
    '@id': `${PRODUCTION_ORIGIN}/#tripti-bhatter`,
    name: 'Tripti Bhatter',
    jobTitle: 'Co-Founder, Designer & Creative Strategist',
    image: `${PRODUCTION_ORIGIN}/t.png`,
    worksFor: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
  },
];

const WEBSITE_ENTITY = {
  '@type': 'WebSite',
  '@id': `${PRODUCTION_ORIGIN}/#website`,
  url: `${PRODUCTION_ORIGIN}/`,
  name: STUDIO_DATA.name,
  publisher: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
  inLanguage: 'en',
};

export function getRouteMetadata(route: PageRoute): RouteMetadata {
  if (route === 'about') {
    const canonicalUrl = `${PRODUCTION_ORIGIN}/about`;
    const title = 'About N+T | Navya Choyal & Tripti Bhatter';
    const description =
      'N+T is an extension of Navya Choyal and Tripti Bhatter’s creative practice—a multi-service studio with 6+ years of building brands across architecture, art, fashion, hospitality, and beauty.';

    return {
      route: 'about',
      path: '/about',
      canonicalUrl,
      title,
      description,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      ogType: 'website',
      ogImage: `${PRODUCTION_ORIGIN}/n.png`,
      ogImageAlt: 'Navya Choyal and Tripti Bhatter — Co-Founders of N+T Creative Studio',
      preloadHeroImage: false,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORGANIZATION_ENTITY,
          ...FOUNDER_ENTITIES,
          WEBSITE_ENTITY,
          {
            '@type': 'AboutPage',
            '@id': `${PRODUCTION_ORIGIN}/about#webpage`,
            url: canonicalUrl,
            name: title,
            description,
            isPartOf: { '@id': `${PRODUCTION_ORIGIN}/#website` },
            about: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
            mainEntity: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
            inLanguage: 'en',
          },
        ],
      },
    };
  }

  if (route === 'not-found') {
    const canonicalUrl = `${PRODUCTION_ORIGIN}/404`;
    const title = 'Page Not Found | N+T Creative Studio';
    const description =
      'The requested page could not be found on N+T Creative Studio.';

    return {
      route: 'not-found',
      path: '/404',
      canonicalUrl,
      title,
      description,
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogImage: `${PRODUCTION_ORIGIN}/logo.png`,
      ogImageAlt: 'N+T Creative Studio Wordmark',
      preloadHeroImage: false,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [ORGANIZATION_ENTITY, WEBSITE_ENTITY],
      },
    };
  }

  // Default: 'home'
  const canonicalUrl = `${PRODUCTION_ORIGIN}/`;
  const title = 'N+T Creative Studio | Branding, Identity & Design';
  const description =
    'N+T is a creative studio by Navya Choyal and Tripti Bhatter in India, bringing art, design and cultural perspective together to build identities, websites, and packaging with context, character and relevance.';

  return {
    route: 'home',
    path: '/',
    canonicalUrl,
    title,
    description,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogType: 'website',
    ogImage: `${PRODUCTION_ORIGIN}/logo.png`,
    ogImageAlt: 'N+T Creative Studio Wordmark',
    preloadHeroImage: true,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_ENTITY,
        ...FOUNDER_ENTITIES,
        WEBSITE_ENTITY,
        {
          '@type': 'WebPage',
          '@id': `${PRODUCTION_ORIGIN}/#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          isPartOf: { '@id': `${PRODUCTION_ORIGIN}/#website` },
          about: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
          inLanguage: 'en',
        },
        {
          '@type': 'CreativeWork',
          '@id': `${PRODUCTION_ORIGIN}/#transit-production`,
          name: 'Transit Production',
          creator: { '@id': `${PRODUCTION_ORIGIN}/#organization` },
          image: [
            `${PRODUCTION_ORIGIN}/banner.png`,
            `${PRODUCTION_ORIGIN}/banner-badge.png`,
          ],
          description:
            'Visual identity and production emblem crafted by N+T for Transit Production.',
        },
      ],
    },
  };
}

export const PUBLISHED_CANONICAL_ROUTES: Array<{
  route: 'home' | 'about';
  path: string;
  loc: string;
  images: Array<{ loc: string; title: string; caption?: string }>;
}> = [
  {
    route: 'home',
    path: '/',
    loc: `${PRODUCTION_ORIGIN}/`,
    images: [
      {
        loc: `${PRODUCTION_ORIGIN}/banner.png`,
        title: 'Transit Production — Featured Work by N+T Creative Studio',
        caption: 'Documentary coastal scene and brand identity for Transit Production by N+T Studio.',
      },
      {
        loc: `${PRODUCTION_ORIGIN}/banner-badge.png`,
        title: 'Transit Production Emblem',
      },
      {
        loc: `${PRODUCTION_ORIGIN}/logo.png`,
        title: 'N+T Creative Studio Logo',
      },
    ],
  },
  {
    route: 'about',
    path: '/about',
    loc: `${PRODUCTION_ORIGIN}/about`,
    images: [
      {
        loc: `${PRODUCTION_ORIGIN}/n.png`,
        title: 'Navya Choyal — Co-Founder of N+T Creative Studio',
      },
      {
        loc: `${PRODUCTION_ORIGIN}/t.png`,
        title: 'Tripti Bhatter — Co-Founder of N+T Creative Studio',
      },
    ],
  },
];

export function resolveRouteFromPathname(pathname: string): PageRoute {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (normalized === '/' || normalized === '') {
    return 'home';
  }
  if (normalized === '/about') {
    return 'about';
  }
  return 'not-found';
}

export function generateSitemapXml(): string {
  const urlEntries = PUBLISHED_CANONICAL_ROUTES.map((item) => {
    const imagesXml = item.images
      .map((img) => {
        const captionXml = img.caption
          ? `\n      <image:caption>${img.caption}</image:caption>`
          : '';
        return `    <image:image>\n      <image:loc>${img.loc}</image:loc>\n      <image:title>${img.title}</image:title>${captionXml}\n    </image:image>`;
      })
      .join('\n');

    return `  <url>\n    <loc>${item.loc}</loc>\n${imagesXml}\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n>\n${urlEntries}\n</urlset>\n`;
}
