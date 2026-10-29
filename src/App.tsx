/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { AboutUsPage } from './components/AboutUsPage';
import { Footer, PageRoute } from './components/Footer';
import { HomePage } from './components/HomePage';
import { registerWebMcpTools, updatePageSeo } from './utils/seoAndAgentReady';

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  if (hash.includes('about') || path.includes('about')) {
    return 'about';
  }
  return 'home';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const topAnchorRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    updatePageSeo(page);

    if (typeof window !== 'undefined') {
      const targetHash = page === 'about' ? '#about-us' : '';
      if (window.location.hash !== targetHash) {
        window.history.pushState(
          { page },
          '',
          page === 'about' ? '#about-us' : window.location.pathname
        );
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
    updatePageSeo(currentPage);
  }, [currentPage]);

  useEffect(() => {
    registerWebMcpTools({
      onNavigate: (page) => handleNavigate(page),
    });
  }, [handleNavigate]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getInitialRoute());
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
      ) : (
        <AboutUsPage />
      )}

      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
