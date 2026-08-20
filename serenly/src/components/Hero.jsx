import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RibbonBanner from "./RibbonBanner";
import assets from "../assets/assets";

const HERO_IMG = assets.heroo;

function useParallax(speed = 0.12) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      setOffset(window.scrollY * speed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return [ref, offset];
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [imgRef, imgOffset] = useParallax(0.08);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="pt-6 md:pt-8 pb-6 px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-[1800px] mx-auto">
        <div
          className="relative overflow-hidden rounded-soft md:rounded-[36px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,211,243,0.95) 0%, rgba(201,211,243,0.8) 100%)",
          }}
        >
          {/* Ribbon sweeps low under the copy, then climbs behind the image —
              deliberately routed clear of the text column for legibility. */}
          <RibbonBanner
            text="Brand Strategy · Content · SEO · Growth"
            bandColor="var(--color-brand-orange)"
            textColor="#F5F5F5"
            pathD="M -60,730 C 300,860 560,790 680,660 C 840,480 720,140 1400,60"
            viewBox="0 0 1320 870"
            bandWidth={70}
            fontSize={15}
            className="left-0 top-0 w-full h-full opacity-95"
          />

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-6 items-center px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
            {/* Copy */}
            <div
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(18px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <span className="inline-flex items-center gap-2 bg-neutral-0 text-brand-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-pill mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-pill bg-brand-orange" />
                Story-First Marketing
              </span>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-brand-black max-w-lg">
                Tell your <span className="text-brand-green">story</span>{" "}
                online, <span className="text-brand-blue">the right way</span>
              </h1>

              <p className="mt-5 font-body text-base md:text-lg text-brand-black/70 max-w-md leading-relaxed">
                We turn your business into a brand people remember — through
                content, SEO, and campaigns that tell the same story,
                consistently, to the right people.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-lg rounded-pill!"
                >
                  Let's Meet &amp; Talk
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:gap-3 transition-all"
                >
                  See Our Work
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image — capped height so the card row below stays in view */}
            <div className="relative" ref={imgRef}>
              <div
                className="relative w-full h-[34vh] sm:h-[38vh] lg:h-[42vh] rounded-soft overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${Math.min(imgOffset, 20)}px)`,
                  transition: "transform 0.1s linear",
                }}
              >
                <img
                  src={HERO_IMG}
                  alt="Serenly team building a client's brand story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2 bg-neutral-0 rounded-pill pl-2 pr-4 py-2 shadow-lg">
                <span className="text-brand-green text-base">★★★★★</span>
                <span className="text-xs font-bold text-brand-black">
                  100+ Happy Clients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
