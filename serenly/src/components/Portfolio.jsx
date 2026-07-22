import React from "react";
import p1 from "../assets/websites.png";
import p2 from "../assets/brand.png";
import p3 from "../assets/social.jfif";
import p4 from "../assets/seo.png";
import p5 from "../assets/wb.png";
import p6 from "../assets/br.png";
import p7 from "../assets/wb.jpg";
import p8 from "../assets/se.png";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-24 lg:py-32 px-6 lg:px-12 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-6">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6">
              Moments We're
              <br />
              Honoured to Share
            </h2>
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              A glimpse into the brands we've lovingly crafted — each one a
              unique expression of ambition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[250px]">
          <div className="row-span-2 group overflow-hidden relative">
            <img
              src={p1}
              alt="Website mockup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-1 group overflow-hidden relative">
            <img
              src={p2}
              alt="Brand identity"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-2 group overflow-hidden relative">
            <img
              src={p3}
              alt="Social media tiles"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-2 md:row-span-1 group overflow-hidden relative">
            <img
              src={p4}
              alt="SEO dashboard"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-2 group overflow-hidden relative">
            <img
              src={p5}
              alt="E-commerce website"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-1 group overflow-hidden relative">
            <img
              src={p6}
              alt="Photoshoot setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-2 group overflow-hidden relative">
            <img
              src={p7}
              alt="Mobile app UI"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
          <div className="row-span-1 group overflow-hidden relative">
            <img
              src={p8}
              alt="Corporate website"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
