import assert from 'node:assert/strict';
import http from 'node:http';
import { createApp } from '../server';

async function fetchRaw(
  baseUrl: string,
  reqPath: string,
  headers?: Record<string, string>
): Promise<{
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
}> {
  return new Promise((resolve, reject) => {
    const url = new URL(reqPath, baseUrl);
    const req = http.request(
      url,
      {
        method: 'GET',
        headers: headers || {},
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        res.on('end', () => {
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf-8'),
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

function extractSingleMatch(html: string, regex: RegExp, label: string): string {
  const matches = [...html.matchAll(regex)];
  assert.equal(
    matches.length,
    1,
    `Expected exactly 1 match for ${label}, found ${matches.length}`
  );
  return matches[0][1];
}

async function runSmokeTests() {
  const app = await createApp({ isProduction: true });
  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to bind test server');
  }
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    // 1. Canonical Home Page (/)
    const homeRes = await fetchRaw(baseUrl, '/');
    assert.equal(homeRes.status, 200, 'GET / should return 200');
    const homeTitle = extractSingleMatch(
      homeRes.body,
      /<title>([\s\S]*?)<\/title>/gi,
      'Home <title>'
    );
    assert.equal(
      homeTitle,
      'N+T Creative Studio | Branding, Identity &amp; Design'
    );
    const homeCanonical = extractSingleMatch(
      homeRes.body,
      /<link\s+rel="canonical"\s+href="([^"]+)"[^>]*>/gi,
      'Home canonical link'
    );
    assert.equal(homeCanonical, 'https://nplust.in/');
    assert.ok(
      !homeRes.body.includes('noindex'),
      'Home page must not contain noindex'
    );
    assert.ok(
      homeRes.body.includes('id="hero-preload-link"'),
      'Home page should preload hero image'
    );
    assert.ok(
      homeRes.body.includes('N+T is a creative studio bringing'),
      'Home page HTML must contain rendered footer summary without JS'
    );
    assert.ok(
      homeRes.body.includes('https://www.instagram.com/nplust.in/'),
      'Home page HTML must contain standardized Instagram link'
    );
    assert.ok(
      homeRes.body.includes('https://www.linkedin.com/company/n-plus-t'),
      'Home page HTML must contain LinkedIn link'
    );

    const homeJsonLdRaw = extractSingleMatch(
      homeRes.body,
      /<script\s+id="route-jsonld"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
      'Home JSON-LD'
    );
    const homeJsonLd = JSON.parse(homeJsonLdRaw);
    const homeOrg = homeJsonLd['@graph'].find(
      (n: Record<string, unknown>) => n['@type'] === 'Organization'
    );
    assert.ok(homeOrg, 'Home JSON-LD must include Organization entity');
    assert.deepEqual(homeOrg.sameAs, [
      'https://www.instagram.com/nplust.in/',
      'https://www.linkedin.com/company/n-plus-t',
    ]);
    assert.ok(
      !homeJsonLd['@graph'].some(
        (n: Record<string, unknown>) => n['@type'] === 'FAQPage'
      ),
      'Home JSON-LD must not include unverified FAQPage'
    );

    // 2. Canonical About Page (/about)
    const aboutRes = await fetchRaw(baseUrl, '/about');
    assert.equal(aboutRes.status, 200, 'GET /about should return 200');
    const aboutTitle = extractSingleMatch(
      aboutRes.body,
      /<title>([\s\S]*?)<\/title>/gi,
      'About <title>'
    );
    assert.equal(aboutTitle, 'About N+T | Navya Choyal &amp; Tripti Bhatter');
    const aboutCanonical = extractSingleMatch(
      aboutRes.body,
      /<link\s+rel="canonical"\s+href="([^"]+)"[^>]*>/gi,
      'About canonical link'
    );
    assert.equal(aboutCanonical, 'https://nplust.in/about');
    assert.ok(
      !aboutRes.body.includes('noindex'),
      'About page must not contain noindex'
    );
    assert.ok(
      !aboutRes.body.includes('id="hero-preload-link"'),
      'About page must not preload homepage hero banner'
    );
    assert.ok(
      aboutRes.body.includes(
        'We’re a multi-service studio with 6+ yrs of building brands'
      ),
      'About page HTML must contain prerendered manifesto text without JS'
    );
    const aboutJsonLdRaw = extractSingleMatch(
      aboutRes.body,
      /<script\s+id="route-jsonld"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
      'About JSON-LD'
    );
    const aboutJsonLd = JSON.parse(aboutJsonLdRaw);
    const aboutPageNode = aboutJsonLd['@graph'].find(
      (n: Record<string, unknown>) => n['@type'] === 'AboutPage'
    );
    assert.ok(aboutPageNode, 'About JSON-LD must include AboutPage entity');
    assert.equal(aboutPageNode.url, 'https://nplust.in/about');

    // 3. One-Hop 301 Redirects for Legacy URLs
    const redirectCases: Array<[string, string]> = [
      ['/home', '/'],
      ['/home/', '/'],
      ['/index.html', '/'],
      ['/aboutus', '/about'],
      ['/aboutus/', '/about'],
      ['/about-us', '/about'],
      ['/about-us/', '/about'],
      ['/about/', '/about'],
      ['/about.html', '/about'],
    ];

    for (const [fromPath, expectedLocation] of redirectCases) {
      const res = await fetchRaw(baseUrl, fromPath);
      assert.equal(
        res.status,
        301,
        `GET ${fromPath} should return 301 redirect`
      );
      assert.equal(
        res.headers.location,
        expectedLocation,
        `GET ${fromPath} should redirect to ${expectedLocation}`
      );
    }

    // 4. Unknown Page Route -> Real 404 with HTML linking home
    const unknownPageRes = await fetchRaw(baseUrl, '/nonexistent-page');
    assert.equal(
      unknownPageRes.status,
      404,
      'Unknown route should return HTTP 404'
    );
    assert.ok(
      unknownPageRes.body.includes('404 — Page Not Found'),
      '404 page should display helpful 404 heading'
    );
    assert.ok(
      unknownPageRes.body.includes('href="/"'),
      '404 page should include link back to home (/)'
    );
    assert.ok(
      unknownPageRes.body.includes('noindex, nofollow'),
      '404 page should have noindex, nofollow robots meta'
    );

    // 5. Missing Asset and Unknown API -> Real 404 (not 200 HTML)
    const missingAssetRes = await fetchRaw(baseUrl, '/missing-asset.png');
    assert.equal(
      missingAssetRes.status,
      404,
      'Missing image asset must return 404'
    );
    assert.ok(
      !missingAssetRes.body.includes('<!doctype html>'),
      'Missing image asset must not return HTML'
    );

    const missingApiRes = await fetchRaw(baseUrl, '/api/unknown-endpoint');
    assert.equal(
      missingApiRes.status,
      404,
      'Unknown API endpoint must return 404'
    );

    // 6. robots.txt and sitemap.xml validation
    const robotsRes = await fetchRaw(baseUrl, '/robots.txt');
    assert.equal(robotsRes.status, 200, 'GET /robots.txt should return 200');
    assert.ok(
      robotsRes.body.includes('Sitemap: https://nplust.in/sitemap.xml'),
      'robots.txt must declare absolute Sitemap URL'
    );

    const sitemapRes = await fetchRaw(baseUrl, '/sitemap.xml');
    assert.equal(sitemapRes.status, 200, 'GET /sitemap.xml should return 200');
    assert.ok(
      sitemapRes.body.includes('<loc>https://nplust.in/</loc>'),
      'sitemap.xml must include https://nplust.in/'
    );
    assert.ok(
      sitemapRes.body.includes('<loc>https://nplust.in/about</loc>'),
      'sitemap.xml must include https://nplust.in/about'
    );
    assert.ok(
      !sitemapRes.body.includes('llms.txt'),
      'sitemap.xml must not include llms.txt'
    );

    console.log('All SEO, routing, redirect, 404, and JSON-LD smoke tests passed.');
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

runSmokeTests().catch((err) => {
  console.error('SEO smoke test failed:', err);
  process.exit(1);
});
