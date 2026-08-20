import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 px-6 lg:px-12 bg-background border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20">
          <div className="w-full lg:w-1/2">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground">
              Where your brand becomes unstoppable
            </h2>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-start pt-2">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-6">
              About Us
            </p>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light mb-8">
              We are your confidantes, creatives, and calm in the centre of it
              all. Serenly was founded in 2024 in Nairobi, Kenya — built to
              close the gap between the digital strategies East African
              businesses deserve, and what most agencies were actually
              delivering.
            </p>
            <Link
              to="/about"
              className="text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all w-fit"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
          <div className="aspect-[3/4] relative overflow-hidden group">
            <img
              src={assets.heroo}
              alt="Professional at laptop"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden group md:mt-24">
            <img
              src={assets.hero1}
              alt="Strategy session"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="md:absolute top-0 right-0 md:w-1/3 bg-background border border-border p-8 mt-8 md:mt-0 z-10">
            <p className="text-lg font-display italic text-foreground/80 leading-relaxed">
              "Our team brings strategy-first thinking with world-class creative
              execution to every client."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
