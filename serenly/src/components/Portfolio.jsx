import React from "react";
import { ArrowUpRight } from "lucide-react";
import assets from "../assets/assets";

const PROJECTS = [
  {
    title: "SmartGlobal",
    role: "E-commerce · Premium food products",
    image: assets.smart,
    href: "https://www.smartglobal.co.ke/",
    accent: "orange",
  },
  {
    title: "Lebanon Technical Training College",
    role: "Education · Institutional site",
    href: "https://lebanonttc.co.ke/",
    accent: "green",
  },
  {
    title: "Catalystium Solutions",
    role: "Corporate · Coaching & leadership",
    image: assets.cata,
    href: "https://www.catalystiumsolutions.com/",
    accent: "blue",
  },
];

const ACCENT_HOVER_BG = {
  orange: "group-hover:bg-brand-orange",
  blue: "group-hover:bg-brand-blue",
  green: "group-hover:bg-brand-green",
};

const ACCENT_TINT = {
  orange: "from-brand-periwinkle to-brand-orange/25 text-brand-orange",
  blue: "from-brand-periwinkle to-brand-blue/25 text-brand-blue",
  green: "from-brand-periwinkle to-brand-green/25 text-brand-green",
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="container-site !px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-pill mb-5">
              Our Work
            </span>
            <h2>Stories we've helped tell</h2>
          </div>
          <p className="text-text-secondary max-w-sm">
            A glimpse into the brands we've built — each one a real business
            we've helped land more clients online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map(({ title, role, image, href, accent }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[4/5] rounded-soft overflow-hidden bg-brand-periwinkle/40 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${ACCENT_TINT[accent]}`}>
                    <span className="font-display text-2xl text-center px-8 leading-tight">
                      {title}
                    </span>
                  </div>
                )}
                <span
                  className={`absolute top-4 right-4 w-9 h-9 rounded-pill bg-neutral-0/90 flex items-center justify-center text-brand-black opacity-0 group-hover:opacity-100 group-hover:text-neutral-0 transition-all duration-300 group-hover:rotate-45 ${ACCENT_HOVER_BG[accent]}`}
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <p className="font-display text-lg mt-4 mb-0.5 text-foreground">
                {title}
              </p>
              <p className="text-xs text-text-tertiary">{role}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
