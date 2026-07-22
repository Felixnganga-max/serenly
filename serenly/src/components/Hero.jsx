import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import assets from "../assets/assets";

const SLIDES = [
  { src: assets.hero, alt: "Serenly — building digital brands that dominate" },
  { src: assets.hero1, alt: "Websites Serenly has built for clients" },
  { src: assets.hero2, alt: "SEO and local search results Serenly delivers" },
  { src: assets.hero3, alt: "Social media growth Serenly drives for brands" },
  { src: assets.hero4, alt: "Brand identity work by Serenly" },
];

const SLIDE_DURATION = 5000;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[100dvh] bg-neutral-950 text-white flex flex-col justify-end pb-20 pt-32 px-6 lg:px-12 overflow-hidden">
      {/* Image carousel background — always dark, independent of light/dark theme toggle */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1.06)" : "scale(1)",
              transitionProperty: "opacity, transform",
              transitionDuration: `1000ms, ${SLIDE_DURATION}ms`,
            }}
          />
        ))}
      </div>

      {/* Glassy overlay — tones down the mockup whites, lifts text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/20 backdrop-blur-[3px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row justify-between items-end gap-16">
        {/* Left Content */}
        <div className="w-full lg:w-2/3 max-w-3xl [text-shadow:0_2px_20px_rgb(0_0_0_/_65%)]">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight mb-8">
            We start with a cup of coffee as we talk about your business
          </h1>
          <p className="text-lg md:text-xl font-light text-white/80 mb-10 max-w-xl leading-relaxed">
            Are you losing customers because you either lack a website, a system
            or social media presence?
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a>
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm font-semibold tracking-wide transition-colors"
              >
                Let’s Meet & Talk
              </Link>
            </a>
          </div>
        </div>

        {/* Right Stats */}
        <div className="hidden lg:flex flex-col items-end gap-4 w-1/3 pb-4">
          <div className="border border-white/20 px-6 py-3 backdrop-blur-sm bg-white/5 text-sm font-medium flex items-center gap-2">
            <span className="text-primary text-lg">★★★★★</span> 100+ Happy
            Clients
          </div>
        </div>
      </div>
    </section>
  );
}
