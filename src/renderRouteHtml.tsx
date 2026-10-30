import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getRouteMetadata, PageRoute } from './data/studioData';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderRouteHtml(templateHtml: string, route: PageRoute): string {
  const meta = getRouteMetadata(route);
  const appHtml = renderToString(<App initialRoute={route} />);
  const jsonLdString = JSON.stringify(meta.jsonLd, null, 2);

  let html = templateHtml;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // Replace robots, googlebot, bingbot
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`
  );
  html = html.replace(
    /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="googlebot" content="${escapeHtml(meta.robots)}" />`
  );
  html = html.replace(
    /<meta\s+name="bingbot"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="bingbot" content="${escapeHtml(meta.robots)}" />`
  );

  // Replace canonical link
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s+id="canonical-link"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" id="canonical-link" />`
  );

  // Conditionally keep or remove hero preload link (avoid preloading homepage hero on About or 404)
  if (!meta.preloadHeroImage) {
    html = html.replace(
      /\s*<!-- Preload LCP Hero Banner[\s\S]*?id="hero-preload-link"\s*\/>/i,
      ''
    );
  }

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`
  );

  // Replace JSON-LD script block
  html = html.replace(
    /<script\s+id="route-jsonld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="route-jsonld" type="application/ld+json">\n${jsonLdString}\n    </script>`
  );

  // Inject rendered React HTML into #root
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${appHtml}</div>`
  );

  return html;
}
