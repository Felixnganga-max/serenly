import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import webImg from "../assets/websites.png";
import smmImg from "../assets/social.jfif";
import seoImg from "../assets/seo.png";
import brandImg from "../assets/brand.png";
import { Reveal, ParallaxLayer } from "../components/Parallax";

const ACCENT = {
  orange: {
    text: "text-brand-orange",
    hoverText: "group-hover:text-brand-orange",
    bar: "bg-brand-orange",
    tag: "section-tag-orange",
  },
  blue: {
    text: "text-brand-blue",
    hoverText: "group-hover:text-brand-blue",
    bar: "bg-brand-blue",
    tag: "section-tag-blue",
  },
  green: {
    text: "text-brand-green",
    hoverText: "group-hover:text-brand-green",
    bar: "bg-brand-green",
    tag: "section-tag-green",
  },
};

const SERVICES = [
  {
    id: "01",
    tag: "Foundation",
    title: "Website Development",
    description:
      "Fast, secure, conversion-built websites and custom software that grow with your business — designed from first principles.",
    href: "/web-dev",
    img: webImg,
    size: "large",
    accent: "orange",
  },
  {
    id: "02",
    tag: "Full Funnel",
    title: "Meta Ads Management",
    description:
      "Facebook & Instagram — strategy, creative, campaign setup, retargeting and reporting, handled end to end.",
    href: "/smm",
    img: smmImg,
    size: "small",
    accent: "blue",
  },
  {
    id: "03",
    tag: "Visibility",
    title: "SEO & System Management",
    description:
      "Technical SEO, on-page optimisation and ongoing system/infrastructure management to keep you ranking and running.",
    href: "/seo",
    img: seoImg,
    size: "small",
    accent: "green",
  },
  {
    id: "04",
    tag: "Identity",
    title: "Branding Services",
    description:
      "Distinctive, memorable brand identity systems that communicate your value and resonate with your audience.",
    href: "/branding",
    img: brandImg,
    size: "small",
    accent: "orange",
  },
];

const STATS = [
  { value: "4", label: "Core Services", accent: "orange" },
  { value: "340%", label: "Avg. ROI", accent: "blue" },
  { value: "98%", label: "Client Retention", accent: "green", tint: true },
  { value: "14 Days", label: "To Launch", accent: "blue" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <section className="relative overflow-hidden pt-36 pb-20 px-6 lg:px-12 text-center">
        <ParallaxLayer
          speed={-45}
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(239,105,5,0.12) 0%, transparent 70%)", filter: "blur(30px)" }}
        />
        <ParallaxLayer
          speed={55}
          className="absolute -bottom-24 -right-20 w-[440px] h-[440px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,85,218,0.1) 0%, transparent 70%)", filter: "blur(30px)" }}
        />
        <Reveal type="up" className="relative max-w-3xl mx-auto">
          <span className="section-tag section-tag-orange mb-6">What We Do</span>
          <h1 className="mb-6">
            Services built to make you{" "}
            <span className="text-brand-green">stand out</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            Four disciplines, one integrated team — everything a growing brand
            needs to be found, trusted, and chosen.
          </p>
        </Reveal>
      </section>

      {/* Bento grid */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Reveal type="left">
              <ServiceCardCompact service={SERVICES[1]} />
            </Reveal>
            <Reveal type="left" delay={0.1}>
              <ServiceCardCompact service={SERVICES[2]} tall />
            </Reveal>
          </div>

          <Reveal type="up" className="lg:col-span-1">
            <ServiceCardHero service={SERVICES[0]} />
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-1">
            <Reveal type="right">
              <ServiceCardCompact service={SERVICES[3]} tall />
            </Reveal>
            <Reveal type="right" delay={0.1}>
              <Link
                to="/contact"
                className="group relative flex flex-col justify-between rounded-soft bg-brand-black text-neutral-0 p-8 min-h-[210px] overflow-hidden"
              >
                <div
                  className="absolute -right-10 -top-10 w-36 h-36 rounded-pill opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #F5F5F5 0%, transparent 70%)" }}
                />
                <span className="relative text-xs uppercase tracking-[0.2em] text-neutral-0/50">
                  Get Started
                </span>
                <div className="relative">
                  <h3 className="font-display text-2xl mb-4 leading-tight">
                    Ready to grow with the right mix?
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange group-hover:gap-3 transition-all">
                    Let's Talk <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="bg-brand-orange text-neutral-0 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-sm font-bold uppercase tracking-widest">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              Web Development <span aria-hidden="true">✳</span> Meta Ads{" "}
              <span aria-hidden="true">✳</span> SEO{" "}
              <span aria-hidden="true">✳</span> Branding
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 22s linear infinite;
            width: max-content;
          }
        `}</style>
      </section>

      {/* Stats row */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} type="up" delay={i * 0.07}>
              <div className={`text-center md:text-left ${stat.tint ? "bg-brand-periwinkle/15 rounded-soft p-5 -m-5" : ""}`}>
                <p className={`font-display text-4xl md:text-5xl mb-2 ${ACCENT[stat.accent].text}`}>
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-wide text-text-tertiary">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Detailed services list */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col">
          {SERVICES.map((service, i) => {
            const a = ACCENT[service.accent];
            return (
              <Reveal key={service.id} type="up" delay={(i % 2) * 0.06}>
                <Link
                  to={service.href}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12 border-t border-border last:border-b"
                >
                  <span className={`lg:col-span-1 font-mono text-sm text-text-tertiary transition-colors ${a.hoverText}`}>
                    {service.id}
                  </span>
                  <div className="lg:col-span-6">
                    <span className={`section-tag ${a.tag} mb-4`}>{service.tag}</span>
                    <h2 className={`font-display text-3xl md:text-4xl text-foreground transition-colors mb-4 ${a.hoverText}`}>
                      {service.title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed max-w-lg mb-6">
                      {service.description}
                    </p>
                    <span className={`text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all w-fit ${a.text}`}>
                      Explore {service.title} <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="lg:col-span-5 aspect-[4/3] rounded-soft overflow-hidden">
                    <ParallaxLayer speed={i % 2 === 0 ? 26 : -18}>
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </ParallaxLayer>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12">
        <Reveal
          type="scale"
          className="max-w-5xl mx-auto rounded-soft md:rounded-[36px] bg-brand-black text-neutral-0 text-center px-6 py-16 md:py-20 relative overflow-hidden"
        >
          <div
            className="absolute -left-16 -bottom-16 w-72 h-72 rounded-pill pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(91,126,60,0.18) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="mb-6">Not sure where to start?</h2>
            <p className="text-neutral-0/70 mb-10 leading-relaxed">
              Tell us about your business and we'll recommend the right mix of
              services for your goals — no obligation.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg rounded-pill!">
              Talk to Us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ---------- Card subcomponents ---------- */

function ServiceCardHero({ service }) {
  const a = ACCENT[service.accent];
  return (
    <Link
      to={service.href}
      className="group relative flex flex-col justify-end rounded-soft overflow-hidden min-h-[460px] lg:min-h-[664px] h-full"
    >
      <span className={`absolute top-0 left-0 right-0 h-[4px] z-10 ${a.bar}`} />
      <ParallaxLayer speed={24} className="absolute inset-0">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </ParallaxLayer>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent" />
      <div className="relative p-8 text-neutral-0">
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-0/60 mb-2 block">
          {service.tag}
        </span>
        <h3 className="font-display text-2xl md:text-3xl mb-2 leading-tight">
          {service.title}
        </h3>
        <span className={`inline-flex items-center gap-2 text-sm font-semibold ${a.text} group-hover:gap-3 transition-all`}>
          Learn more <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}

function ServiceCardCompact({ service, tall = false }) {
  const a = ACCENT[service.accent];
  return (
    <Link
      to={service.href}
      className={`group relative flex flex-col justify-end rounded-soft overflow-hidden ${
        tall ? "min-h-[320px]" : "min-h-[210px]"
      }`}
    >
      <span className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${a.bar}`} />
      <img
        src={service.img}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/10 to-transparent" />
      <div className="relative p-6 text-neutral-0">
        <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-0/60 mb-1 block">
          {service.tag}
        </span>
        <h3 className="font-display text-xl mb-1 leading-tight">
          {service.title}
        </h3>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${a.text} group-hover:gap-2.5 transition-all`}>
          Learn more <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
