import React, { useState } from "react";
import { Link } from "react-router-dom";
import servicesHeroImg from "../assets/websites.png";

const services = [
  {
    id: "01",
    title: "Web Development",
    description:
      "Fast, secure, conversion-built websites and custom software that grow with your business — designed from first principles.",
    link: "/web-dev",
  },
  {
    id: "02",
    title: "Brand Identity",
    description:
      "Distinctive, memorable brand assets that communicate your value and resonate deeply with your target audience across Africa.",
    link: "/branding",
  },
  {
    id: "03",
    title: "Social Media & Meta Ads",
    description:
      "Data-backed campaigns and compelling content that build community and drive direct response ROI.",
    link: "/smm",
  },
  {
    id: "04",
    title: "SEO Optimisation",
    description:
      "Technical and content-driven search strategies to ensure you dominate local and regional search results.",
    link: "/seo",
  },
];

export default function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="py-24 lg:py-32 px-6 lg:px-12 bg-background"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left: Accordion */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="border-t border-border w-full mb-12 hidden lg:block"></div>
          <div className="flex flex-col space-y-2">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.id}
                  className={`group border-b border-border/50 overflow-hidden transition-all duration-500 cursor-pointer ${isActive ? "pb-8 pt-4" : "py-6"}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center gap-6">
                    {isActive && (
                      <div className="w-8 h-px bg-primary shrink-0 transition-all duration-300"></div>
                    )}
                    <span
                      className={`font-mono text-sm tracking-wider ${isActive ? "text-primary" : "text-foreground/40"}`}
                    >
                      {service.id}
                    </span>
                    <h3
                      className={`font-display text-3xl md:text-4xl transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/70"}`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden pl-0 lg:pl-14">
                      <p className="text-foreground/70 text-lg leading-relaxed mb-6 font-light">
                        {service.description}
                      </p>
                      <Link
                        to={service.link}
                        className="text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 h-[600px] lg:h-auto min-h-[600px] relative">
          <div className="absolute inset-0 bg-border/20 m-4 lg:m-8 translate-x-4 translate-y-4 -z-10"></div>
          <img
            src={servicesHeroImg}
            alt="Creative workspace"
            className="w-full h-full object-cover grayscale-[20%] contrast-125 transition-all duration-700 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}
