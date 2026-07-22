import React from "react";
import { Link } from "react-router-dom";

export default function ServicesIntro() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-background border-b border-border/40">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-8">
          Our Services
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-foreground">
          Born from a passion for digital growth & results
        </h2>
        <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          We offer full-service digital marketing, web development, and strategy
          that transforms your vision into measurable revenue.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center justify-center border border-border hover:border-foreground px-8 py-4 text-sm font-semibold tracking-wide transition-all bg-transparent text-foreground hover:bg-foreground hover:text-background"
        >
          View all services
        </Link>
      </div>
    </section>
  );
}
