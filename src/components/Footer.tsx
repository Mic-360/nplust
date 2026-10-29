import React from 'react';

export type PageRoute = 'home' | 'about';

interface FooterProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  return (
    <footer
      className="w-full bg-black text-white pr-5 sm:pr-8 pl-3 md:pr-12 lg:pl-4 lg:pr-16 pt-8 sm:pt-10 md:pt-11 pb-7 sm:pb-9 md:pb-10 select-none"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div
        className="fluid-engine fe-6accd278af09507ebf98242b w-full flex flex-col justify-between md:min-h-[340px]"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="N+T Creative Studio" />
        <meta itemProp="url" content="https://nplust.in/" />

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
                      href="/home"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('home');
                      }}
                      className="sqs-block-image-link content-fit inline-block text-left text-white hover:opacity-85 transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
                      aria-label="N+T Home"
                    >
                      <picture>
                        <source type="image/webp" srcSet="/logo.webp" />
                        <img
                          src="/logo.png"
                          alt="N+T Creative Studio"
                          itemProp="logo"
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

        {/* Bottom Section matching Group 1 reference layout */}
        <div className="mt-24 sm:mt-32 md:mt-44 lg:mt-52 grid grid-cols-1 lg:grid-cols-[minmax(0,480px)_auto] justify-between gap-y-10 lg:gap-y-0 lg:gap-x-12 items-start">
          {/* Block 2: Studio Description (studio-footer-summary) */}
          <div
            id="block-cbe912ee5bcc935c2809"
            className="fe-block fe-block-cbe912ee5bcc935c2809 max-w-[390px] sm:max-w-[435px] md:max-w-[475px] lg:col-start-1 lg:row-start-1"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <p
                      id="studio-footer-summary"
                      itemProp="description"
                      style={{ whiteSpace: 'pre-wrap' }}
                      className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.24] font-normal tracking-[-0.01em] text-white/95 select-text m-0"
                    >
                      <span className="sqsrte-text-color--lightAccent">
                        N+T is a multi-disciplinary creative studio working across
                        branding, design, identity, creative communication through
                        multiple mediums for brands and individuals in architecture,
                        art, fashion, hospitality, and their cultural intersections.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center / Right Links: About Us, Contact Us, hello@nplust.in, IG: @nplust.in, and India */}
          <nav
            aria-label="Studio Footer Navigation"
            className="lg:col-start-2 lg:row-start-1 flex flex-row items-start gap-14 sm:gap-16 md:gap-20 lg:mr-10 xl:mr-20"
          >
            {/* Column 1: About Us + Contact Us + Email & IG */}
            <div className="flex flex-col items-start">
              {/* Block 5: About Us */}
              <div
                id="block-497b9063b91d03b60fe2"
                className="fe-block fe-block-497b9063b91d03b60fe2"
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
                            href="/aboutus"
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate('about');
                            }}
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

              {/* Block 6: Contact Us + hello@nplust.in + IG: @nplust.in */}
              <div
                id="block-b24d1e41373120bb7d9e"
                className="fe-block fe-block-b24d1e41373120bb7d9e mt-5 sm:mt-6 md:mt-7"
              >
                <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
                  <div className="sqs-block-content">
                    <div className="sqs-text-block-container">
                      <div className="sqs-html-content flex flex-col text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.26] font-normal tracking-[-0.01em] text-white select-text">
                        <p
                          className="sqsrte-large m-0"
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          <span className="text-white whitespace-nowrap shrink-0 select-text">
                            Contact Us
                          </span>
                        </p>

                        <div className="mt-3 sm:mt-3.5 md:mt-4 flex flex-col">
                          <p
                            className="sqsrte-large m-0"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            <a
                              href="mailto:hello@nplust.in?body=%0A"
                              itemProp="email"
                              className="inline-block text-white hover:text-[#949494] hover:italic hover:underline focus:text-[#949494] transition-all duration-150 whitespace-nowrap"
                            >
                              hello@nplust.in
                            </a>
                          </p>

                          <p
                            className="sqsrte-large m-0"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            <span className="text-white select-text">IG: </span>
                            <a
                              href="https://www.instagram.com/nplust.in/"
                              target="_blank"
                              rel="noopener noreferrer"
                              itemProp="sameAs"
                              className="inline-block text-white hover:text-[#949494] hover:italic hover:underline focus:text-[#949494] transition-all duration-150 whitespace-nowrap"
                            >
                              @nplust.in
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Block 4 (India) aligned with About Us */}
            <div
              id="block-29ec5a5e166a83a74899"
              className="fe-block fe-block-29ec5a5e166a83a74899 flex flex-col items-start"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
                <div className="sqs-block-content">
                  <div className="sqs-text-block-container">
                    <div className="sqs-html-content">
                      <p
                        className="sqsrte-large text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.24] font-normal tracking-[-0.01em] text-white whitespace-nowrap shrink-0 select-text m-0"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        <span itemProp="addressCountry">India</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Block 3: Copyright (sqs-html-content) */}
          <div
            id="block-c4af828de9e4d0c658a0"
            className="fe-block fe-block-c4af828de9e4d0c658a0 lg:col-start-1 lg:row-start-2 lg:mt-6"
          >
            <div className="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block">
              <div className="sqs-block-content">
                <div className="sqs-text-block-container">
                  <div className="sqs-html-content">
                    <p
                      style={{ whiteSpace: 'pre-wrap' }}
                      className="sqsrte-small text-[10px] sm:text-[11px] leading-none text-[#949494] tracking-[0.01em] m-0"
                    >
                      © 2026 All Rights Reserved
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
