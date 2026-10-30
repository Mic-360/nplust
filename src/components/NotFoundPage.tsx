import React from 'react';
import { PageRoute } from '../data/studioData';

interface NotFoundPageProps {
  onNavigate?: (page: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      !onNavigate ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    onNavigate('home');
  };

  return (
    <main className="w-full min-h-[70svh] bg-white text-black pl-3 pr-5 sm:pr-8 md:pr-12 lg:pl-4 lg:pr-16 pt-12 sm:pt-16 md:pt-20 pb-20 flex flex-col justify-between">
      <div className="max-w-[780px]">
        <p className="text-[13px] sm:text-[14px] uppercase tracking-[0.06em] text-[#767676] m-0">
          404 — Page Not Found
        </p>
        <h1 className="mt-4 text-[28px] sm:text-[36px] md:text-[44px] leading-[1.16] font-normal tracking-[-0.018em] text-black m-0">
          The page you are looking for does not exist or has moved.
        </h1>
        <p className="mt-6 text-[18px] sm:text-[20px] md:text-[22px] leading-[1.35] font-normal text-[#666666] m-0">
          Return to the N+T Creative Studio homepage or explore our practice and founders.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6 text-[18px] sm:text-[20px]">
          <a
            href="/"
            onClick={handleHomeClick}
            className="inline-block text-black underline hover:text-[#666666] hover:italic transition-all duration-150"
          >
            Return to Home
          </a>
        </div>
      </div>
    </main>
  );
};
