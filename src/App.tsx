/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { AboutUsPage } from './components/AboutUsPage';
import { Footer, PageRoute } from './components/Footer';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import {
  migrateLegacyHashAndResolveRoute,
  registerWebMcpTools,
  updatePageSeo,
} from './utils/seoAndAgentReady';

export interface AppProps {
  initialRoute?: PageRoute;
}

function smoothScrollToTop(topAnchor?: HTMLElement | null) {
  if (typeof window === 'undefined') return;

  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  } catch {
    window.scrollTo(0, 0);
  }

  if (topAnchor) {
    try {
      topAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      // Ignore fallback
    }
  }
}

export default function App({ initialRoute }: AppProps) {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    if (initialRoute) return initialRoute;
    return migrateLegacyHashAndResolveRoute();
  });
  const topAnchorRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    updatePageSeo(page);

    if (typeof window !== 'undefined') {
      const targetPath = page === 'about' ? '/about' : '/';
      if (window.location.pathname !== targetPath || window.location.hash) {
        try {
          window.history.pushState({ page }, '', targetPath);
        } catch {
          // Ignore if history API is restricted
        }
      }

      smoothScrollToTop(topAnchorRef.current);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          smoothScrollToTop(topAnchorRef.current);
        });
      });
    }
  }, []);

  useEffect(() => {
    const resolved = migrateLegacyHashAndResolveRoute();
    if (resolved !== currentPage) {
      setCurrentPage(resolved);
    }
    updatePageSeo(resolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    registerWebMcpTools({
      onNavigate: (page) => handleNavigate(page),
    });
  }, [handleNavigate]);

  useEffect(() => {
    const onPopState = () => {
      const nextRoute = migrateLegacyHashAndResolveRoute();
      setCurrentPage(nextRoute);
      updatePageSeo(nextRoute);
      smoothScrollToTop(topAnchorRef.current);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div
      ref={topAnchorRef}
      className="min-h-screen flex flex-col bg-black font-editorial antialiased selection:bg-black selection:text-white"
    >
      {currentPage === 'home' ? (
        <HomePage />
      ) : currentPage === 'about' ? (
        <AboutUsPage />
      ) : (
        <NotFoundPage onNavigate={handleNavigate} />
      )}

      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
