import React from "react";
import { Link } from "react-router-dom";

const noiseSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ClosingCTA() {
  return (
    <section
      id="contact"
      className="py-32 px-6 lg:px-12 bg-neutral-950 text-white text-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: noiseSvg, backgroundSize: "200px 200px" }}
      ></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
          Let's build something extraordinary
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
          One free consultation. We'll scope your project, recommend the right
          services, and show you exactly what's possible.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm font-semibold tracking-wide transition-colors text-center"
          >
            Start a Free Consultation
          </Link>
          <a
            href="https://wa.me/254797743366"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-white/30 hover:bg-white hover:text-neutral-950 px-8 py-4 text-sm font-semibold tracking-wide transition-all text-center"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
