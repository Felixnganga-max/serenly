import React from "react";
import { Link } from "react-router-dom";
import { Globe, Search, Share2, Palette } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    items: ["Website Development", "Custom Software", "UI/UX Design"],
    href: "/web-dev",
    highlight: false,
  },
  {
    icon: Search,
    title: "SEO Optimisation",
    items: ["Local SEO", "Technical SEO", "Content Strategy"],
    href: "/seo",
    highlight: false,
  },
  {
    icon: Share2,
    title: "Social Media & Meta Ads",
    items: ["Content Calendars", "Paid Meta Ads", "Community Growth"],
    href: "/smm",
    highlight: true,
  },
  {
    icon: Palette,
    title: "Brand Identity",
    items: ["Logo & Guidelines", "Visual Assets", "Brand Strategy"],
    href: "/branding",
    highlight: false,
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-10 mb-10 items-end">
          <div>
            <span className="section-tag section-tag-blue mb-5">
              What We Do
            </span>
            <h2>
              Explore unique digital
              <br />
              agency service
            </h2>
          </div>
          <p className="text-text-secondary max-w-md lg:justify-self-end lg:text-right">
            We combine strategy, design, and development to help ambitious
            businesses across Kenya and Africa dominate search and grow their
            brand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, items, href, highlight }) => (
            <Link
              key={title}
              to={href}
              className={`card p-7 flex flex-col gap-5 ${
                highlight
                  ? "bg-neutral-950 text-neutral-0 border-neutral-950"
                  : "bg-surface-raised"
              }`}
            >
              <div
                className={`w-11 h-11 flex items-center justify-center ${
                  highlight
                    ? "bg-brand-orange text-neutral-950"
                    : "bg-brand-orange/10 text-brand-orange"
                }`}
              >
                <Icon size={20} />
              </div>
              <h4 className={highlight ? "text-neutral-0" : "text-foreground"}>
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className={`text-sm flex items-center gap-2 ${
                      highlight ? "text-neutral-0/70" : "text-text-secondary"
                    }`}
                  >
                    <span
                      className={
                        highlight ? "text-brand-orange" : "text-brand-blue"
                      }
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
