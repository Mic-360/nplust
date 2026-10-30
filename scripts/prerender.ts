import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSitemapXml } from '../src/data/studioData';
import { renderRouteHtml } from '../src/renderRouteHtml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

function runPrerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found at ${templatePath}. Run vite build first.`);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  // 1. Prerender Home (/)
  const homeHtml = renderRouteHtml(templateHtml, 'home');
  fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml, 'utf-8');

  // 2. Prerender About (/about)
  const aboutHtml = renderRouteHtml(templateHtml, 'about');
  fs.writeFileSync(path.join(distDir, 'about.html'), aboutHtml, 'utf-8');
  const aboutDir = path.join(distDir, 'about');
  fs.mkdirSync(aboutDir, { recursive: true });
  fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutHtml, 'utf-8');

  // 3. Prerender 404 Not Found (/404.html)
  const notFoundHtml = renderRouteHtml(templateHtml, 'not-found');
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  // 4. Generate canonical sitemap.xml
  const sitemapXml = generateSitemapXml();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  console.log('Prerendered routes: /, /about, /404.html, and sitemap.xml');
}

runPrerender();
