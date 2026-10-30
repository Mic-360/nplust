import {
  getRouteMetadata,
  PageRoute,
  resolveRouteFromPathname,
  STUDIO_DATA,
} from '../data/studioData';

export { STUDIO_DATA, resolveRouteFromPathname };

function setMetaContent(selector: string, content: string) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export function migrateLegacyHashAndResolveRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';

  const rawHash = window.location.hash.toLowerCase();
  if (rawHash === '#about-us' || rawHash === '#about' || rawHash === '#/about') {
    try {
      window.history.replaceState({ page: 'about' }, '', '/about');
    } catch {
      // Ignore if history API is restricted
    }
    return 'about';
  }

  return resolveRouteFromPathname(window.location.pathname);
}

export function updatePageSeo(page: PageRoute) {
  if (typeof document === 'undefined') return;

  const meta = getRouteMetadata(page);

  document.title = meta.title;

  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[name="robots"]', meta.robots);
  setMetaContent('meta[name="googlebot"]', meta.robots);
  setMetaContent('meta[name="bingbot"]', meta.robots);
  setMetaContent('meta[property="og:title"]', meta.title);
  setMetaContent('meta[property="og:description"]', meta.description);
  setMetaContent('meta[property="og:url"]', meta.canonicalUrl);
  setMetaContent('meta[property="og:image"]', meta.ogImage);
  setMetaContent('meta[property="og:image:alt"]', meta.ogImageAlt);
  setMetaContent('meta[name="twitter:title"]', meta.title);
  setMetaContent('meta[name="twitter:description"]', meta.description);
  setMetaContent('meta[name="twitter:image"]', meta.ogImage);
  setMetaContent('meta[name="twitter:image:alt"]', meta.ogImageAlt);

  const canonicalEl = document.getElementById('canonical-link') as HTMLLinkElement | null;
  if (canonicalEl) {
    canonicalEl.href = meta.canonicalUrl;
  }

  const jsonLdEl = document.getElementById('route-jsonld');
  if (jsonLdEl) {
    jsonLdEl.textContent = JSON.stringify(meta.jsonLd);
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
      description: 'Navigate between the N+T Studio Home page (/) and About Us page (/about).',
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
        return { status: 'navigated', page: target, path: target === 'about' ? '/about' : '/' };
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
