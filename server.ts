import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STUDIO_PROFILE = {
  name: 'N+T Creative Studio',
  shortName: 'N+T',
  url: 'https://nplust.in',
  location: 'India',
  email: 'hello@nplust.in',
  instagram: '@nplust.in',
  instagramUrl: 'https://instagram.com/nplust.in',
  founders: [
    {
      name: 'Navya Choyal',
      role: 'Co-Founder, Designer, Creative Strategist & Thinker',
      portrait: '/n.png',
    },
    {
      name: 'Tripti Bhatter',
      role: 'Co-Founder, Designer, Creative Strategist & Thinker',
      portrait: '/t.png',
    },
  ],
  topStatement:
    'N+T is an extension of Navya Choyal and Tripti Bhatter’s creative practice.',
  footerStatement:
    'N+T is a multi-disciplinary creative studio working across branding, design, identity, creative communication through multiple mediums for brands and individuals in architecture, art, fashion, hospitality, and their cultural intersections.',
  aboutStatement: [
    'We’re a multi-service studio with 6+ yrs of building brands across art, fashion, beauty, architecture, hospitality, and the cultural intersections that exist between and beyond them.',
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
  industries: [
    'Architecture',
    'Art',
    'Fashion',
    'Beauty',
    'Hospitality',
    'Cultural Intersections',
  ],
};

const FEATURED_PROJECTS = [
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

const inquiriesLog: Array<{
  id: string;
  name: string;
  email: string;
  scope: string;
  message: string;
  createdAt: string;
}> = [];

const AGENT_DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</llms-full.txt>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="alternate"; type="text/markdown"; title="LLM Summary"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
  '</.well-known/agent.json>; rel="agent"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Attach RFC 8288 Link headers, Cache-Control, & Content-Signal headers
  app.use((req, res, next) => {
    res.setHeader('Link', AGENT_DISCOVERY_LINKS);
    res.setHeader('Vary', 'Accept');
    res.setHeader('X-Content-Signal', 'search=yes, ai-input=yes, ai-train=yes');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    if (/\.(webp|avif|png|jpg|jpeg|ico|svg|woff2?)$/i.test(req.path)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  // Health Check endpoint (referenced in /.well-known/api-catalog)
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      studio: STUDIO_PROFILE.name,
      agentReady: true,
      timestamp: new Date().toISOString(),
    });
  });

  // Studio Profile API
  app.get('/api/studio', (_req, res) => {
    res.json(STUDIO_PROFILE);
  });

  // Featured Projects API
  app.get('/api/projects', (_req, res) => {
    res.json({ projects: FEATURED_PROJECTS });
  });

  // Commission Inquiries API
  app.post('/api/inquiries', (req, res) => {
    const { name, email, scope = 'Branding & Identity', message = '' } = req.body || {};
    if (!name || !email) {
      res.status(400).json({
        error: 'Both name and email are required to submit an inquiry.',
      });
      return;
    }
    const record = {
      id: `inq_${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      scope: String(scope).trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };
    inquiriesLog.push(record);
    res.json({
      status: 'received',
      studio: 'N+T Creative Studio',
      contactEmail: STUDIO_PROFILE.email,
      inquiry: record,
    });
  });

  // Model Context Protocol (MCP) HTTP Endpoint
  app.get('/api/mcp', (_req, res) => {
    const mcpCardPath = path.join(__dirname, 'public', '.well-known', 'mcp', 'server-card.json');
    if (fs.existsSync(mcpCardPath)) {
      res.type('application/json').send(fs.readFileSync(mcpCardPath, 'utf-8'));
      return;
    }
    res.json({ name: 'nt-creative-studio-mcp', version: '1.0.0' });
  });

  app.post('/api/mcp', (req, res) => {
    const { id = 1, method, params = {} } = req.body || {};

    if (method === 'initialize') {
      res.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: {
            name: 'nt-creative-studio-mcp',
            version: '1.0.0',
          },
          capabilities: {
            tools: {},
            resources: {},
          },
        },
      });
      return;
    }

    if (method === 'tools/list') {
      res.json({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'get_studio_profile',
              description:
                'Get complete N+T Creative Studio profile, founders (Navya Choyal & Tripti Bhatter), philosophy, and contact info.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'get_featured_projects',
              description: 'Get featured creative works by N+T Studio including Transit Production.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'submit_studio_inquiry',
              description: 'Submit a project commission inquiry to N+T Creative Studio.',
              inputSchema: {
                type: 'object',
                required: ['name', 'email'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  scope: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          ],
        },
      });
      return;
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};

      if (toolName === 'get_studio_profile') {
        res.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(STUDIO_PROFILE, null, 2) }],
          },
        });
        return;
      }

      if (toolName === 'get_featured_projects') {
        res.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(FEATURED_PROJECTS, null, 2) }],
          },
        });
        return;
      }

      if (toolName === 'submit_studio_inquiry') {
        const record = {
          id: `inq_${Date.now()}`,
          name: String(toolArgs.name || 'Anonymous'),
          email: String(toolArgs.email || ''),
          scope: String(toolArgs.scope || 'Branding & Identity'),
          message: String(toolArgs.message || ''),
          createdAt: new Date().toISOString(),
        };
        inquiriesLog.push(record);
        res.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Inquiry recorded for N+T Studio (${STUDIO_PROFILE.email}): ${JSON.stringify(record)}`,
              },
            ],
          },
        });
        return;
      }
    }

    res.json({
      jsonrpc: '2.0',
      id,
      result: {
        studio: STUDIO_PROFILE.name,
        documentation: '/llms-full.txt',
      },
    });
  });

  // Explicit MIME types for .well-known discovery routes
  app.get('/.well-known/api-catalog', (_req, res) => {
    const filePath = path.join(__dirname, 'public', '.well-known', 'api-catalog');
    if (fs.existsSync(filePath)) {
      res.type('application/linkset+json; charset=utf-8').send(fs.readFileSync(filePath, 'utf-8'));
      return;
    }
    res.status(404).end();
  });

  app.get(['/llms.txt', '/llms-full.txt', '/.well-known/agent-skills/nt-studio/SKILL.md'], (req, res, next) => {
    const filePath = path.join(__dirname, 'public', req.path);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      res.setHeader('X-Markdown-Tokens', String(Math.ceil(content.length / 4)));
      res.type('text/markdown; charset=utf-8').send(content);
      return;
    }
    next();
  });

  // Markdown Content Negotiation for `/` and `/about` (isitagentready.com Content Accessibility check)
  app.use((req, res, next) => {
    if (req.method === 'GET' && (req.path === '/' || req.path === '/about')) {
      const acceptHeader = (req.headers.accept || '').toLowerCase();
      const formatQuery = String(req.query.format || '').toLowerCase();
      const wantsMarkdown =
        formatQuery === 'markdown' ||
        formatQuery === 'md' ||
        (acceptHeader.includes('text/markdown') && !acceptHeader.includes('text/html'));

      if (wantsMarkdown) {
        const mdPath = path.join(__dirname, 'public', 'llms-full.txt');
        if (fs.existsSync(mdPath)) {
          const mdContent = fs.readFileSync(mdPath, 'utf-8');
          res.setHeader('X-Markdown-Tokens', String(Math.ceil(mdContent.length / 4)));
          res.type('text/markdown; charset=utf-8').send(mdContent);
          return;
        }
      }
    }
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`N+T Creative Studio server listening on http://localhost:${PORT}`);
  });
}

startServer();
