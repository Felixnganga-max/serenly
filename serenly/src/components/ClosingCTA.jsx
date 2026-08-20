import React from "react";
import { Link } from "react-router-dom";
import RibbonBanner from "./RibbonBanner";

export default function ClosingCTA() {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div
        className="container-site !px-0 relative overflow-hidden rounded-soft md:rounded-[36px] text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,211,243,0.95) 0%, rgba(201,211,243,0.8) 100%)",
        }}
      >
        <RibbonBanner
          text="Tell Your Story · Every Day · The Right Way"
          bandColor="var(--color-brand-orange)"
          textColor="#F5F5F5"
          pathD="M -60,90 C 220,-60 380,180 560,40 C 760,-80 940,150 1150,10 C 1260,-60 1320,40 1380,-40"
          viewBox="0 0 1320 490"
          bandWidth={62}
          fontSize={13}
          className="left-0 top-0 w-full h-full opacity-90"
        />

        <div className="relative max-w-2xl mx-auto px-6 py-20 md:py-28">
          <h2 className="text-brand-black mb-6">
            Tell your <span className="text-brand-green">story</span>. Grow your{" "}
            <span className="text-brand-blue">brand.</span>
          </h2>
          <p className="text-brand-black/70 mb-10 leading-relaxed max-w-xl mx-auto">
            One free consultation. We'll scope your project, recommend the
            right services, and show you exactly what's possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn btn-primary btn-lg rounded-pill!"
            >
              Get Started
            </Link>
            <a
              href="https://wa.me/254797743366"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-pill border-2 border-brand-green text-brand-green text-sm font-bold hover:bg-brand-green hover:text-neutral-0 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
