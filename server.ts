import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  FEATURED_PROJECTS,
  generateSitemapXml,
  PageRoute,
  STUDIO_DATA,
} from './src/data/studioData';
import { renderRouteHtml } from './src/renderRouteHtml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  '<https://nplust.in/sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ');

const ASSET_EXTENSION_REGEX =
  /\.(webp|avif|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot|css|js|mjs|map|json|xml|txt|md)$/i;

export async function createApp(options?: { isProduction?: boolean }) {
  const app = express();
  const isProd =
    options?.isProduction ?? process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Attach RFC 8288 Link headers, Cache-Control, & Content-Signal headers
  app.use((req, res, next) => {
    res.setHeader('Link', AGENT_DISCOVERY_LINKS);
    res.setHeader('Vary', 'Accept');
    res.setHeader('X-Content-Signal', 'search=yes, ai-input=yes, ai-train=yes');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');

    // Protect preview domains from indexing while allowing production and local verification
    const host = (req.hostname || '').toLowerCase();
    if (host.endsWith('.run.app')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }

    // Cache hashed Vite assets immutably; use revalidation for mutable unhashed public images
    if (req.path.startsWith('/assets/') || req.url.includes('?v=')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (/\.(webp|avif|png|jpg|jpeg|ico|svg|woff2?)$/i.test(req.path)) {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    }

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  // One-hop 301 canonical redirects for legacy routes and trailing slashes
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }

    const rawPath = req.path;
    const querySuffix = req.url.includes('?')
      ? req.url.slice(req.url.indexOf('?'))
      : '';

    if (
      rawPath === '/home' ||
      rawPath === '/home/' ||
      rawPath === '/index.html'
    ) {
      res.redirect(301, `/${querySuffix}`);
      return;
    }

    if (
      rawPath === '/aboutus' ||
      rawPath === '/aboutus/' ||
      rawPath === '/about-us' ||
      rawPath === '/about-us/' ||
      rawPath === '/about/' ||
      rawPath === '/about.html'
    ) {
      res.redirect(301, `/about${querySuffix}`);
      return;
    }

    next();
  });

  // Health Check endpoint (referenced in /.well-known/api-catalog)
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      studio: STUDIO_DATA.name,
      agentReady: true,
      timestamp: new Date().toISOString(),
    });
  });

  // Studio Profile API
  app.get('/api/studio', (_req, res) => {
    res.json(STUDIO_DATA);
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
      studio: STUDIO_DATA.name,
      contactEmail: STUDIO_DATA.email,
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
            content: [{ type: 'text', text: JSON.stringify(STUDIO_DATA, null, 2) }],
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
                text: `Inquiry recorded for N+T Studio (${STUDIO_DATA.email}): ${JSON.stringify(record)}`,
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
        studio: STUDIO_DATA.name,
        documentation: '/llms-full.txt',
      },
    });
  });

  // Unknown /api/* endpoints must return 404 JSON, never 200 HTML
  app.all('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Explicit MIME types for .well-known discovery routes and sitemap
  app.get('/.well-known/api-catalog', (_req, res) => {
    const filePath = path.join(__dirname, 'public', '.well-known', 'api-catalog');
    if (fs.existsSync(filePath)) {
      res.type('application/linkset+json; charset=utf-8').send(fs.readFileSync(filePath, 'utf-8'));
      return;
    }
    res.status(404).end();
  });

  app.get('/sitemap.xml', (_req, res) => {
    res.type('application/xml; charset=utf-8').send(generateSitemapXml());
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

  // Markdown Content Negotiation for `/` and `/about`
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

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    const serveDevRoute = async (
      req: express.Request,
      res: express.Response,
      route: PageRoute,
      statusCode: number
    ) => {
      try {
        const rawTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
        const transformed = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
        const html = renderRouteHtml(transformed, route);
        res.status(statusCode).type('text/html; charset=utf-8').send(html);
      } catch (err) {
        res.status(500).send(String(err));
      }
    };

    app.get('/', (req, res) => serveDevRoute(req, res, 'home', 200));
    app.get('/about', (req, res) => serveDevRoute(req, res, 'about', 200));

    app.get('*', (req, res) => {
      if (ASSET_EXTENSION_REGEX.test(req.path)) {
        res.status(404).type('text/plain; charset=utf-8').send('Not Found');
        return;
      }
      serveDevRoute(req, res, 'not-found', 404);
    });
  } else {
    const distPath = path.join(__dirname, 'dist');
    const publicPath = path.join(__dirname, 'public');

    const sendPrerenderedOrFallback = (
      res: express.Response,
      route: PageRoute,
      prerenderedFile: string,
      statusCode: number
    ) => {
      const targetFile = path.join(distPath, prerenderedFile);
      if (fs.existsSync(targetFile)) {
        res.status(statusCode).type('text/html; charset=utf-8').send(fs.readFileSync(targetFile, 'utf-8'));
        return;
      }
      const fallbackTemplatePath = fs.existsSync(path.join(distPath, 'index.html'))
        ? path.join(distPath, 'index.html')
        : path.join(__dirname, 'index.html');
      const rawTemplate = fs.readFileSync(fallbackTemplatePath, 'utf-8');
      const html = renderRouteHtml(rawTemplate, route);
      res.status(statusCode).type('text/html; charset=utf-8').send(html);
    };

    app.get('/', (_req, res) => {
      sendPrerenderedOrFallback(res, 'home', 'index.html', 200);
    });

    app.get('/about', (_req, res) => {
      sendPrerenderedOrFallback(res, 'about', 'about.html', 200);
    });

    // Serve static files with redirect: false so /about never redirects to /about/
    app.use(express.static(distPath, { index: false, redirect: false }));
    app.use(express.static(publicPath, { index: false, redirect: false }));

    app.get('*', (req, res) => {
      if (ASSET_EXTENSION_REGEX.test(req.path)) {
        res.status(404).type('text/plain; charset=utf-8').send('Not Found');
        return;
      }
      sendPrerenderedOrFallback(res, 'not-found', '404.html', 404);
    });
  }

  return app;
}

const isMainModule =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMainModule) {
  const PORT = Number(process.env.PORT) || 3000;
  createApp().then((app) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`N+T Creative Studio server listening on http://localhost:${PORT}`);
    });
  });
}
