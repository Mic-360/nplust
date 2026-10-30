import React from 'react';
import { PageRoute } from '../data/studioData';

export type { PageRoute };

interface FooterProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetPage: PageRoute
  ) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    onNavigate(targetPage);
  };

  return (
    <footer className="w-full bg-black text-white pr-5 sm:pr-8 pl-3 md:pr-12 lg:pl-4 lg:pr-16 pt-8 sm:pt-10 md:pt-11 pb-7 sm:pb-9 md:pb-10 select-none">
      <div className="fluid-engine fe-6accd278af09507ebf98242b w-full flex flex-col justify-between md:min-h-[340px]">
        {/* Block 1: Top-Left N+T Logo (/logo.webp + /logo.png) */}
        <div
          id="block-yui_3_17_2_1_1791807978815_4356"
          className="fe-block fe-block-yui_3_17_2_1_1791807978815_4356"
        >
          <div className="sqs-block website-component-block sqs-block-website-component sqs-block-image image-block">
            <div className="sqs-block-content">
              <div className="fluid-image-component-root image-block-outer-wrapper design-layout-fluid image-position-center image-component-container-fit">
                <div className="fluid-image-animation-wrapper sqs-image sqs-block-alignment-wrapper">
                  <div className="fluid-image-container sqs-image-content js-image-container visitor-mode overflow-hidden">
                    <a
                      href="/"
                      onClick={(e) => handleLinkClick(e, 'home')}
                      className="sqs-block-image-link content-fit inline-block text-left text-white hover:opacity-85 transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
                      aria-label="N+T Home"
                    >
                      <picture>
                        <source type="image/webp" srcSet="/logo.webp" />
                        <img
                          src="/logo.png"
                          alt="N+T Creative Studio"
                          width={428}
                          height={168}
                          loading="lazy"
                          decoding="async"
                          style={{
                            display: 'block',
                            objectPosition: '50% 50%',
                            objectFit: 'contain',
                          }}
                          className="w-[210px] sm:w-[290px] md:w-[370px] lg:w-[420px] h-auto block"
                        />
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section matching Group 3 reference layout */}
        <div className="mt-24 sm:mt-32 md:mt-40 lg:mt-48 grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_auto] justify-between gap-y-10 lg:gap-y-0 lg:gap-x-12 items-stretch">
          {/* Block 2: Studio Description (studio-footer-summary) */}
          <div
            id="block-cbe912ee5bcc935c2809"
            className="fe-block fe-block-cbe912ee5bcc935c2809 max-w-[330px] sm:max-w-[375px] md:max-w-[410px] lg:col-start-1 lg:row-start-1"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <p
                      id="studio-footer-summary"
                      style={{ whiteSpace: 'pre-wrap' }}
                      className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.24] font-normal tracking-[-0.01em] text-white/95 select-text m-0"
                    >
                      <span className="sqsrte-text-color--lightAccent">
                        N+T is a creative studio bringing{'\n'}art, design and cultural perspective{'\n'}together to build identities with{'\n'}context, character and relevance.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation: About Us & Contact stack in column view (< lg) and row view on desktop (lg+) */}
          <nav
            aria-label="Studio Footer Navigation"
            className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-row items-start justify-between sm:justify-start gap-12 sm:gap-16 md:gap-20 lg:gap-16 xl:gap-20 lg:mr-10 xl:mr-20"
          >
            <div className="flex flex-col lg:flex-row items-start gap-y-5 sm:gap-y-6 lg:gap-y-0 lg:gap-x-16 xl:gap-x-20">
              {/* Column 1: Block 5 (About Us) */}
              <div
                id="block-497b9063b91d03b60fe2"
                className="fe-block fe-block-497b9063b91d03b60fe2 flex flex-col items-start"
              >
                <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
                  <div className="sqs-block-content">
                    <div className="sqs-text-block-container">
                      <div className="sqs-html-content">
                        <p
                          className="sqsrte-large m-0"
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          <a
                            href="/about"
                            onClick={(e) => handleLinkClick(e, 'about')}
                            aria-current={currentPage === 'about' ? 'page' : undefined}
                            className="inline-block text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.24] font-normal tracking-[-0.01em] text-white hover:text-[#949494] hover:italic focus:text-[#949494] transition-all duration-150 cursor-pointer focus:outline-none focus-visible:underline whitespace-nowrap shrink-0"
                          >
                            About Us
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Block 6 (Contact + hello@nplust.in + IG: @nplust.in + IN: @n-plus-t) */}
              <div
                id="block-b24d1e41373120bb7d9e"
                className="fe-block fe-block-b24d1e41373120bb7d9e flex flex-col items-start"
              >
                <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
                  <div className="sqs-block-content">
                    <div className="sqs-text-block-container">
                      <div className="sqs-html-content flex flex-col text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.24] font-normal tracking-[-0.01em] text-white select-text">
                        <p
                          className="sqsrte-large m-0"
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          <span className="text-white whitespace-nowrap shrink-0 select-text">
                            Contact
                          </span>
                        </p>

                        <p
                          className="sqsrte-large m-0 mt-5 sm:mt-6 md:mt-7"
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          <a
                            href="mailto:hello@nplust.in?body=%0A"
                            aria-label="Email N+T Creative Studio at hello@nplust.in"
                            className="inline-block text-white hover:text-[#949494] hover:italic hover:underline focus:text-[#949494] transition-all duration-150 whitespace-nowrap"
                          >
                            hello@nplust.in
                          </a>
                        </p>

                        <div className="mt-5 sm:mt-6 md:mt-7 flex flex-col leading-[1.26]">
                          <p
                            className="sqsrte-large m-0 whitespace-nowrap"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            <span className="text-white select-text">IG: </span>
                            <a
                              href="https://www.instagram.com/nplust.in/"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="N+T Creative Studio on Instagram (@nplust.in)"
                              className="inline-block text-white hover:text-[#949494] hover:italic hover:underline focus:text-[#949494] transition-all duration-150 whitespace-nowrap"
                            >
                              @nplust.in
                            </a>
                          </p>

                          <p
                            className="sqsrte-large m-0 whitespace-nowrap"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            <span className="text-white select-text">IN: </span>
                            <a
                              href="https://www.linkedin.com/company/n-plus-t"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="N+T Creative Studio on LinkedIn (@n-plus-t)"
                              className="inline-block text-white hover:text-[#949494] hover:italic hover:underline focus:text-[#949494] transition-all duration-150 whitespace-nowrap"
                            >
                              @n-plus-t
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Block 4 (India) aligned with About Us and Contact */}
            <div
              id="block-29ec5a5e166a83a74899"
              className="fe-block fe-block-29ec5a5e166a83a74899 flex flex-col items-start"
            >
              <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
                <div className="sqs-block-content">
                  <div className="sqs-text-block-container">
                    <div className="sqs-html-content">
                      <p
                        className="sqsrte-large text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.24] font-normal tracking-[-0.01em] text-white whitespace-nowrap shrink-0 select-text m-0"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        <span>India</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Block 3: Full website coming soon. & Copyright (sqs-html-content) */}
          <div
            id="block-c4af828de9e4d0c658a0"
            className="fe-block fe-block-c4af828de9e4d0c658a0 lg:col-start-1 lg:row-start-2 lg:self-end lg:mt-6"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <p
                      style={{ whiteSpace: 'pre-wrap' }}
                      className="sqsrte-small text-[10px] sm:text-[11px] leading-[1.35] text-[#949494] tracking-[0.01em] m-0"
                    >
                      Full website coming soon.{'\n'}© 2026 All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
