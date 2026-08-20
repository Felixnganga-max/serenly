import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const SPOTLIGHTS = [
  {
    tag: "Meta Ads Management",
    heading:
      "We help you grow your followers, likes, engagement, which with no doubts, is what you want",
    image: assets.smm,
    href: "/branding",
    accent: "orange",
  },
  {
    tag: "Search & Growth",
    heading: "SEO & Growth Systems",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80",
    href: "/seo",
    accent: "green",
  },
];

const ACCENT_BORDER = {
  orange: "border-brand-orange",
  green: "border-brand-green",
  blue: "border-brand-blue",
};

export default function ServiceSpotlight() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="container-site !px-0 rounded-soft bg-brand-black overflow-hidden">
        <div className="px-6 sm:px-10 lg:px-14 pt-14 pb-4 md:pt-16">
          <span className="inline-flex items-center gap-2 bg-neutral-0/10 text-neutral-0 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-pill mb-5">
            Who are your customers?
          </span>
          <h2 className="text-neutral-0 max-w-lg">
            We want to target your specific clients, using social media
            platforms, and also, using Google
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 px-6 sm:px-10 lg:px-14 pb-14 md:pb-16">
          {SPOTLIGHTS.map(({ tag, heading, image, href, accent }) => (
            <Link
              key={heading}
              to={href}
              className="group relative aspect-[4/3] rounded-soft overflow-hidden"
            >
              <img
                src={image}
                alt={heading}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent" />
              <span className="absolute top-4 left-4 text-neutral-0/70 text-xs font-bold uppercase tracking-wider">
                {tag}
              </span>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <span className="font-display text-xl sm:text-2xl text-neutral-0 leading-tight">
                  {heading}
                </span>
                <span
                  className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-neutral-0 border-b pb-0.5 transition-all group-hover:gap-2.5 ${ACCENT_BORDER[accent]}`}
                >
                  Explore
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
