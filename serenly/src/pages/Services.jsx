import React from "react";
import { Link } from "react-router-dom";
import webImg from "../assets/websites.png";
import brandImg from "../assets/brand.png";
import smmImg from "../assets/social.jfif";
import seoImg from "../assets/seo.png";
import eduImg from "../assets/wb.png";

const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    description:
      "Fast, secure, conversion-built websites and custom software that grow with your business — designed from first principles.",
    href: "/web-dev",
    img: webImg,
  },
  {
    id: "02",
    title: "Brand Identity",
    description:
      "Distinctive, memorable brand assets that communicate your value and resonate deeply with your target audience across Africa.",
    href: "/branding",
    img: brandImg,
  },
  {
    id: "03",
    title: "Social Media & Meta Ads",
    description:
      "Data-backed campaigns and compelling content that build community and drive direct response ROI.",
    href: "/smm",
    img: smmImg,
  },
  {
    id: "04",
    title: "SEO Optimisation",
    description:
      "Technical and content-driven search strategies to ensure you dominate local and regional search results.",
    href: "/seo",
    img: seoImg,
  },
  {
    id: "05",
    title: "School Management System",
    description:
      "Serenly EduCore — an enterprise platform for staff, students, fees, exams, and parent communication in one place.",
    href: "/our-system",
    img: eduImg,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 lg:px-12 border-b border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-6">
            What We Do
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-8 text-foreground">
            Everything your brand needs to grow
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
            From first impression to first sale — web, brand, social, search, and
            the systems that run behind the scenes.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.href}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12 border-t border-border last:border-b"
            >
              <span className="lg:col-span-1 font-mono text-sm text-foreground/40 group-hover:text-primary transition-colors">
                {service.id}
              </span>
              <div className="lg:col-span-6">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors mb-4">
                  {service.title}
                </h2>
                <p className="text-foreground/70 font-light leading-relaxed max-w-lg mb-6">
                  {service.description}
                </p>
                <span className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:gap-3 transition-all w-fit">
                  Explore {service.title} <span aria-hidden="true">→</span>
                </span>
              </div>
              <div className="lg:col-span-5 aspect-[4/3] overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[15%] contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-950 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Not sure where to start?
          </h2>
          <p className="text-white/70 font-light mb-10 leading-relaxed">
            Tell us about your business and we'll recommend the right mix of
            services for your goals — no obligation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm font-semibold tracking-wide transition-colors"
          >
            Talk to Us
          </Link>
        </div>
      </section>
    </div>
  );
}
