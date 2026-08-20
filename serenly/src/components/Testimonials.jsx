import React, { useId, useState } from "react";

const RING_COLORS = [
  "var(--color-brand-orange)",
  "var(--color-brand-blue)",
  "var(--color-brand-green)",
];

const AVATARS = [
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70", x: 40, y: 210, r: 26 },
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=70", x: 175, y: 70, r: 34 },
  { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=70", x: 330, y: 240, r: 30 },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=70", x: 505, y: 90, r: 26 },
  { src: "https://images.unsplash.com/photo-1560250056-07ba64664864?auto=format&fit=crop&w=200&q=70", x: 655, y: 220, r: 34 },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70", x: 810, y: 80, r: 30 },
];

const TESTIMONIALS = [
  {
    quote:
      "Serenly completely transformed our online presence. Within three months, we saw a 218% increase in organic traffic and our leads nearly tripled.",
    author: "James Kariuki",
    role: "CEO, TechNairobi Solutions",
  },
  {
    quote:
      "The Meta Ads team just gets it. Our Instagram went from 400 followers to over 12,000 in 8 months — and our DMs are full of genuine enquiries every week.",
    author: "Amina Hassan",
    role: "Founder, Amirah Beauty Kenya",
  },
  {
    quote:
      "We hired Serenly to build our school management system and the result exceeded everything we expected — the story of our brand finally matches the quality of our work.",
    author: "David Mwangi",
    role: "Principal, Sunrise Academy",
  },
];

export default function Testimonials() {
  const pathId = useId().replace(/[:]/g, "");
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="container-site !px-0">
        <div className="max-w-xl mx-auto text-center mb-4">
          <span className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-pill mb-5">
            Testimonial
          </span>
          <h2 className="mb-4">Real stories, real growth</h2>
          <p className="text-text-secondary leading-relaxed">
            See how brands across Kenya and Africa have grown their story
            with Serenly.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto" style={{ aspectRatio: "1000 / 320" }}>
          <svg
            viewBox="0 0 1000 320"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <path
                id={`tpath-${pathId}`}
                d="M -20,220 C 150,40 300,300 480,140 C 620,20 750,260 900,100"
                fill="none"
              />
              {AVATARS.map((a, i) => (
                <clipPath id={`tclip-${pathId}-${i}`} key={i}>
                  <circle cx={a.x} cy={a.y} r={a.r} />
                </clipPath>
              ))}
            </defs>
            <use
              href={`#tpath-${pathId}`}
              stroke="var(--color-brand-orange)"
              strokeWidth="3"
              strokeDasharray="1 10"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {AVATARS.map((a, i) => (
              <g key={i}>
                <circle
                  cx={a.x}
                  cy={a.y}
                  r={a.r + 4}
                  fill="var(--color-bg-primary)"
                  stroke={RING_COLORS[i % RING_COLORS.length]}
                  strokeWidth="2"
                />
                <image
                  href={a.src}
                  x={a.x - a.r}
                  y={a.y - a.r}
                  width={a.r * 2}
                  height={a.r * 2}
                  clipPath={`url(#tclip-${pathId}-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            ))}
          </svg>

          {/* Featured quote card, anchored over the path */}
          <div className="absolute right-0 sm:right-4 bottom-0 sm:bottom-2 w-[min(320px,78vw)] card bg-surface-raised rounded-soft p-6 shadow-xl">
            <p className="font-display text-base italic text-foreground leading-snug mb-4">
              "{t.quote.length > 130 ? t.quote.slice(0, 128) + "…" : t.quote}"
            </p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground">{t.author}</p>
                <p className="text-xs text-text-tertiary">{t.role}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="w-2 h-2 rounded-pill transition-colors"
                    style={{
                      background:
                        i === active
                          ? "var(--color-brand-green)"
                          : "var(--color-border-strong)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
