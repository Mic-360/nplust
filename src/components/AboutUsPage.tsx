import React, { useEffect, useState } from 'react';

export const AboutUsPage: React.FC = () => {
  const [hideUntilScroll, setHideUntilScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        setHideUntilScroll(false);
      } else {
        setHideUntilScroll(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full bg-white text-black pr-5 sm:pr-8 pl-3 md:pr-12 lg:pl-4 lg:pr-16 pt-8 sm:pt-11 md:pt-[48px] pb-20 sm:pb-28 md:pb-36">
      <article className="w-full">
        {/* Top Section: Full initial viewport with portraits + heading at top and single-line captions at bottom */}
        <div className="fluid-engine fe-6acce34c605d356c2444b49a min-h-[calc(100svh-2rem)] sm:min-h-[calc(100svh-2.75rem)] md:min-h-[calc(100svh-48px)] pb-6 sm:pb-8 md:pb-10 grid grid-cols-8 md:grid-cols-24 gap-x-2 sm:gap-x-2.5 md:gap-x-[9px] gap-y-6 md:gap-y-0 content-between items-start">
          {/* Block 1: Heading Block (Top on Mobile, Cols 10-24 on Desktop) */}
          <div
            id="block-06a7e644260775aa142a"
            className="fe-block fe-block-06a7e644260775aa142a col-span-8 md:col-start-10 md:col-end-25 md:row-start-1 md:pt-1"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <h1
                      id="studio-headline"
                      style={{ whiteSpace: 'pre-wrap' }}
                      className="text-[26px] sm:text-[32px] md:text-[34px] lg:text-[43px] xl:text-[51px] 2xl:text-[54px] leading-[1.16] font-normal tracking-[-0.018em] text-black m-0"
                    >
                      N+T is an extension of Navya Choyal <br className="hidden sm:inline" />
                      and Tripti Bhatter’s creative practice
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: First Portrait Image Block — Navya (/n.webp + /n.png) */}
          <div
            id="block-1c003f898c017a26f859"
            className="fe-block fe-block-1c003f898c017a26f859 col-span-4 md:col-start-1 md:col-end-5 md:row-start-1 mt-6 md:mt-0"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-image image-block">
              <div className="sqs-block-content">
                <div className="fluid-image-component-root image-block-outer-wrapper design-layout-fluid image-position-left">
                  <div className="fluid-image-animation-wrapper sqs-image sqs-block-alignment-wrapper">
                    <div className="fluid-image-container sqs-image-content js-image-container visitor-mode overflow-hidden aspect-[192/302] w-full bg-neutral-100">
                      <picture className="block w-full h-full">
                        <source type="image/webp" srcSet="/n.webp" />
                        <img
                          src="/n.png"
                          alt="Navya Choyal — Co-founder of N+T"
                          width={192}
                          height={302}
                          loading="eager"
                          decoding="auto"
                          style={{
                            display: 'block',
                            objectPosition: '50% 0%',
                            objectFit: 'cover',
                          }}
                          className="w-full h-full"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Second Portrait Image Block — Tripti (/t.webp + /t.png) */}
          <div
            id="block-4fbd433eeefa34350bb8"
            className="fe-block fe-block-4fbd433eeefa34350bb8 col-span-4 md:col-start-5 md:col-end-9 md:row-start-1 mt-6 md:mt-0"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-image image-block">
              <div className="sqs-block-content">
                <div className="fluid-image-component-root image-block-outer-wrapper design-layout-fluid image-position-left">
                  <div className="fluid-image-animation-wrapper sqs-image sqs-block-alignment-wrapper">
                    <div className="fluid-image-container sqs-image-content js-image-container visitor-mode overflow-hidden aspect-[192/302] w-full bg-neutral-100">
                      <picture className="block w-full h-full">
                        <source type="image/webp" srcSet="/t.webp" />
                        <img
                          src="/t.png"
                          alt="Tripti Bhatter — Co-founder of N+T"
                          width={189}
                          height={302}
                          loading="eager"
                          decoding="auto"
                          style={{
                            display: 'block',
                            objectPosition: '51.42253834185374% 24.803100387548447%',
                            objectFit: 'cover',
                          }}
                          className="w-full h-full"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Navya Choyal Caption Block (Single Line at Bottom) */}
          <div
            id="block-d45c1ec38162a5c36603"
            className="fe-block fe-block-d45c1ec38162a5c36603 col-span-4 md:col-start-1 md:col-end-5 md:row-start-2 self-end pt-12 md:pt-24"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[1.28] font-normal tracking-[-0.01em] text-black whitespace-nowrap m-0">
                      Navya Choyal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 5: Tripti Bhatter Caption Block (Single Line at Bottom) */}
          <div
            id="block-e759220309fdb2622bf5"
            className="fe-block fe-block-e759220309fdb2622bf5 col-span-4 md:col-start-5 md:col-end-9 md:row-start-2 self-end pt-12 md:pt-24"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[1.28] font-normal tracking-[-0.01em] text-black whitespace-nowrap m-0">
                      Tripti Bhatter
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section Page Text (4 Large Editorial Paragraphs) */}
        <section
          id="studio-manifesto"
          aria-label="About N+T Creative Studio"
          className={`mt-6 sm:mt-8 md:mt-10 max-w-[1160px] space-y-8 sm:space-y-10 md:space-y-12 text-[24px] sm:text-[30px] md:text-[38px] lg:text-[46px] xl:text-[51px] leading-[1.18] font-normal tracking-[-0.018em] text-[#949494] transition-all duration-500 ease-out ${
            hideUntilScroll
              ? 'opacity-0 translate-y-4 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <p>
            We’re a multi-service studio with 6+ yrs of building brands across
            architecture, art, fashion, hospitality, beauty and the cultural
            intersections that exist between and beyond them.
          </p>

          <p>
            Led by intuition, we understand design as a part of life, with stories and
            dialogue at the core of everything we do.
          </p>

          <p>
            Our work is well-paced and intentional; each project starts with a
            deconstruction of the known, analysing cultural relevance, attending to
            feelings first, and then shifting our focus to form, informed by the
            multiple layers of meaning it holds.
          </p>

          <p>
            We believe in closely building relationships with individuals, founders
            and institutions. As designers, creative strategists and thinkers, we
            extend our practice across identities, websites, packaging, branding,
            design and creative communication, working across different mediums and
            shaping each project around its context and purpose.
          </p>
        </section>
      </article>
    </main>
  );
};
