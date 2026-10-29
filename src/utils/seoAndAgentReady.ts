import { PageRoute } from '../components/Footer';

export const STUDIO_DATA = {
  name: 'N+T Creative Studio',
  shortName: 'N+T',
  domain: 'https://nplust.in',
  location: 'India',
  email: 'hello@nplust.in',
  instagram: '@nplust.in',
  instagramUrl: 'https://instagram.com/nplust.in',
  founders: [
    {
      name: 'Navya Choyal',
      role: 'Co-Founder, Designer, Creative Strategist & Thinker',
      image: '/n.png',
    },
    {
      name: 'Tripti Bhatter',
      role: 'Co-Founder, Designer, Creative Strategist & Thinker',
      image: '/t.png',
    },
  ],
  topStatement:
    'N+T is an extension of Navya Choyal and Tripti Bhatter’s creative practice.',
  footerStatement:
    'N+T is a multi-disciplinary creative studio working across branding, design, identity, creative communication through multiple mediums for brands and individuals in architecture, art, fashion, hospitality, and their cultural intersections.',
  aboutParagraphs: [
    'We’re a multi-service studio with 6+ yrs of building brands across art, fashion, beauty, architecture, hospitality, and the cultural intersections that exist between and beyond them.',
    'Led by intuition, we understand design as a part of life, with stories and dialogue at the core of everything we do.',
    'Our work is well-paced and intentional; each project starts with a deconstruction of the known, analysing cultural relevance, attending to feelings first, and then shifting our focus to form, informed by the multiple layers of meaning it holds.',
    'We believe in closely building relationships with individuals, founders and institutions. As designers, creative strategists and thinkers, we extend our practice across identities, websites, packaging, branding, design and creative communication, working across different mediums and shaping each project around its context and purpose.',
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
  sectors: [
    'Architecture',
    'Art',
    'Fashion',
    'Beauty',
    'Hospitality',
    'Cultural Intersections',
  ],
};

function setMetaContent(selector: string, content: string) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export function updatePageSeo(page: PageRoute) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const origin = window.location.origin || 'https://nplust.in';
  const isAbout = page === 'about';

  const title = isAbout
    ? 'About Us — Navya Choyal & Tripti Bhatter | N+T Creative Studio'
    : 'N+T — Multi-Disciplinary Creative Studio | Navya Choyal & Tripti Bhatter';

  const description = isAbout
    ? 'N+T is an extension of Navya Choyal and Tripti Bhatter’s creative practice. A multi-service studio with 6+ yrs of building brands across art, fashion, beauty, architecture, and hospitality.'
    : STUDIO_DATA.footerStatement;

  const canonicalUrl = isAbout ? `${origin}/#about-us` : `${origin}/`;
  const ogImage = isAbout ? `${origin}/n.png` : `${origin}/banner.png`;

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[property="og:image"]', ogImage);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', ogImage);

  const canonicalEl = document.getElementById('canonical-link') as HTMLLinkElement | null;
  if (canonicalEl) {
    canonicalEl.href = canonicalUrl;
  }
}

export function registerWebMcpTools(handlers: {
  onNavigate: (page: PageRoute) => void;
}) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const nav = navigator as Navigator & {
    modelContext?: {
      registerTool?: (tool: {
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        execute: (args: Record<string, unknown>) => Promise<unknown>;
      }) => void;
      provideContext?: (ctx: { tools: unknown[] }) => void;
    };
  };

  const tools = [
    {
      name: 'get_studio_profile',
      description:
        'Retrieve authoritative structured data about N+T Creative Studio, founders Navya Choyal and Tripti Bhatter, services, industries, and contact details.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute: async () => STUDIO_DATA,
    },
    {
      name: 'navigate_studio_page',
      description: 'Navigate between the N+T Studio Home page and About Us page.',
      inputSchema: {
        type: 'object',
        required: ['page'],
        properties: {
          page: {
            type: 'string',
            enum: ['home', 'about'],
            description: 'Target page route ("home" or "about")',
          },
        },
      },
      execute: async (args: Record<string, unknown>) => {
        const target = args.page === 'about' ? 'about' : 'home';
        handlers.onNavigate(target);
        return { status: 'navigated', page: target };
      },
    },
  ];

  try {
    if (nav.modelContext?.registerTool) {
      for (const tool of tools) {
        nav.modelContext.registerTool(tool);
      }
    } else if (nav.modelContext?.provideContext) {
      nav.modelContext.provideContext({ tools });
    }
  } catch {
    // Ignore if browser WebMCP is restricted
  }
}
