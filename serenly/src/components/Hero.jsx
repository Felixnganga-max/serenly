import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const SLIDES = [
  { src: assets.hero, alt: "Serenly — building digital brands that dominate" },
  { src: assets.hero1, alt: "Websites Serenly has built for clients" },
  { src: assets.hero2, alt: "SEO and local search results Serenly delivers" },
  { src: assets.hero3, alt: "Social media growth Serenly drives for brands" },
  { src: assets.hero4, alt: "Brand identity work by Serenly" },
];

const TICKER_ITEMS = [
  "Web Development",
  "SEO Optimisation",
  "Social Media & Meta Ads",
  "Brand Identity",
  "School Management Systems",
];

const SLIDE_DURATION = 6000;
const NAV_HEIGHT = 72; // px — must match the Navbar's h-[72px]

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % SLIDES.length),
      SLIDE_DURATION,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* -mt-[72px] pulls this section up so it starts at the true top of the
          page (y=0), underneath the sticky navbar's reserved space. The navbar
          is transparent in this state (see Navbar.jsx), so the photo shows
          through. This only affects the home route — every other page's
          navbar stays in normal flow, untouched. */}
      <section
        className="relative min-h-[100dvh] bg-neutral-950 text-neutral-0 overflow-hidden"
        style={{ marginTop: `-${NAV_HEIGHT}px` }}
      >
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover grayscale-[35%] brightness-[0.55] transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}

        {/* Dark gradient for text legibility — neutral, no color tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-neutral-950/10" />

        {/* Headline content, anchored to the bottom of the viewport */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-site pb-16 md:pb-20">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              Building{" "}
              <span className="font-display inline-block bg-brand-orange text-neutral-950 px-3">
                digital brands
              </span>{" "}
              that{" "}
              <span className="font-display inline-block bg-neutral-0 text-neutral-950 px-3">
                dominate
              </span>
            </h1>
            <p className="mt-6 font-body font-light text-base md:text-lg text-neutral-0/75 max-w-md">
              We start with a cup of coffee as we talk about your business. Are
              you losing customers because you lack a website, a system, or a
              social media presence?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Let's Meet & Talk
              </Link>
              <div className="flex items-center gap-2 text-sm font-body font-medium text-neutral-0/85">
                <span className="text-brand-orange text-base">★★★★★</span>
                100+ Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker, flush against the hero — no gap */}
      <div className="marquee-wrapper bg-brand-orange text-neutral-950 py-3">
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, i) => (
              <span
                key={i}
                className="mx-6 text-sm font-body font-bold tracking-wide flex items-center gap-6 shrink-0"
              >
                {item}
                <span className="text-neutral-950/50">✳</span>
              </span>
            ),
          )}
        </div>
      </div>
    </>
  );
}
