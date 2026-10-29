import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full bg-black">
      {/* Full-Width Hero Section using next-gen AVIF/WebP + /banner.png fallback */}
      <section
        className="relative w-full h-[100svh] md:h-auto bg-black overflow-hidden"
        aria-label="Transit Production — Featured Work by N+T Studio"
      >
        <h1 className="sr-only">
          N+T — Multi-Disciplinary Creative Studio | Navya Choyal &amp; Tripti Bhatter
        </h1>

        <picture className="block w-full h-full md:h-auto">
          <source
            type="image/avif"
            srcSet="/banner-mobile.avif 828w, /banner.avif 1512w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/banner-mobile.webp 828w, /banner.webp 1512w"
            sizes="100vw"
          />
          <img
            src="/banner.png"
            alt="Transit Production — Featured Work by N+T Studio"
            width={1512}
            height={824}
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="w-full h-full md:h-auto object-cover object-center block"
          />
        </picture>

        {/* Centered Banner Badge (/banner-badge.webp + /banner-badge.png) */}
        <div className="absolute inset-0 flex items-center justify-center px-6 -translate-y-[3.5%] pointer-events-none">
          <picture>
            <source type="image/webp" srcSet="/banner-badge.webp" />
            <img
              src="/banner-badge.png"
              alt="Transit Production"
              width={517}
              height={113}
              loading="eager"
              decoding="async"
              className="w-[300px] 2xl:w-[380px] min-[1800px]:w-[440px] h-auto object-contain select-none"
            />
          </picture>
        </div>
      </section>
    </main>
  );
};
