import React, { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What does Serenly actually do?",
    a: "We help businesses tell their story online — through branding, content, SEO, Meta Ads, and web development — so the right people find you and remember you.",
  },
  {
    q: "How long before I see results?",
    a: "Brand and web projects typically launch in 2–6 weeks. SEO and content compound over time — most clients see meaningful movement within 60–90 days of consistent execution.",
  },
  {
    q: "Do you work with businesses outside Kenya?",
    a: "Yes. While we're based in Nairobi, we work with clients across East Africa and beyond — everything is delivered remotely with regular check-ins.",
  },
  {
    q: "What if I don't know which service I need?",
    a: "That's normal. Tell us about your business on a free call, and we'll recommend the right mix — you're never locked into a package that doesn't fit.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Every engagement includes a handover and support window, and most clients continue with us on a retainer for content, ads, or SEO to keep the story going.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="container-site !px-0 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-pill mb-5">
            Questions &amp; Answers
          </span>
          <h2 className="mb-4">Frequently Asked Questions</h2>
          <p className="text-text-secondary leading-relaxed max-w-sm">
            Answers to what most people ask us before we start telling their
            story. Still curious?{" "}
            <a href="/contact" className="text-brand-blue font-semibold underline underline-offset-2">
              Reach out
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg sm:text-xl text-foreground">
                    {q}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-pill flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "var(--color-brand-green)" : "var(--color-bg-tertiary)",
                      color: isOpen ? "#F5F5F5" : "var(--color-text-secondary)",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-text-secondary leading-relaxed pb-5 pr-10">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
