import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  FileText,
  Link2,
  MapPin,
  ArrowRight,
  ArrowUp,
} from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&q=80";

const ACCENT = {
  orange: {
    text: "text-brand-orange",
    hoverText: "group-hover:text-brand-orange",
    border: "border-brand-orange",
    icon: "bg-brand-orange/10 border-brand-orange/25 text-brand-orange",
    tag: "section-tag-orange",
    gradient: "text-gradient-orange",
    watermark: "text-brand-orange/5",
    dot: "bg-brand-orange",
    rank: "bg-brand-orange/10 border-brand-orange/30 text-brand-orange",
    bar: "bg-gradient-to-r from-brand-orange to-transparent",
    hoverBorder: "",
  },
  blue: {
    text: "text-brand-blue",
    hoverText: "group-hover:text-brand-blue",
    border: "border-brand-blue",
    icon: "bg-brand-blue/[0.08] border-brand-blue/20 text-brand-blue",
    tag: "section-tag-blue",
    gradient: "text-gradient-blue",
    watermark: "text-brand-blue/5",
    dot: "bg-brand-blue",
    rank: "bg-brand-blue/[0.08] border-brand-blue/20 text-brand-blue",
    bar: "bg-gradient-to-r from-brand-blue to-transparent",
    hoverBorder: "hover:!border-brand-blue/25",
  },
  green: {
    text: "text-brand-green",
    hoverText: "group-hover:text-brand-green",
    border: "border-brand-green",
    icon: "bg-brand-green/10 border-brand-green/25 text-brand-green",
    tag: "section-tag-green",
    gradient: "text-gradient-green",
    watermark: "text-brand-green/5",
    dot: "bg-brand-green-light",
    rank: "bg-brand-green/10 border-brand-green/30 text-brand-green",
    bar: "bg-gradient-to-r from-brand-green to-transparent",
    hoverBorder: "hover:!border-brand-green/25",
  },
};

const STATS = [
  { val: "340%", label: "Average ROI", accent: "orange" },
  { val: "#1", label: "Page Rankings", accent: "blue" },
  { val: "12k+", label: "Leads Generated", accent: "green" },
  { val: "98%", label: "Client Retention", accent: "blue" },
];

const SEO_SERVICES = [
  {
    id: "audit",
    num: "01",
    icon: Search,
    title: "SEO Audit & Strategy",
    accent: "orange",
    badge: "Foundation",
    short:
      "Deep technical and content audit that maps every gap between you and page one.",
    features: [
      "Full technical SEO crawl & health report",
      "Keyword gap analysis vs. top competitors",
      "Content opportunity mapping",
      "Core Web Vitals & page speed audit",
    ],
  },
  {
    id: "onpage",
    num: "02",
    icon: FileText,
    title: "On-Page Optimisation",
    accent: "blue",
    badge: "Core SEO",
    short:
      "Every page tuned for search engines and humans — rankings rise, bounce rates fall.",
    features: [
      "Title tags, meta descriptions & heading hierarchy",
      "Schema markup & structured data",
      "Image compression, alt text & lazy loading",
      "Internal linking architecture overhaul",
    ],
  },
  {
    id: "linkbuilding",
    num: "03",
    icon: Link2,
    title: "Link Building & Off-Page",
    accent: "green",
    badge: "Authority",
    short:
      "High-authority backlinks that signal trust and move you past stalled competitors.",
    features: [
      "Manual outreach to DA 40+ publications",
      "Guest posting on relevant industry sites",
      "Digital PR & brand mention campaigns",
      "Competitor backlink gap exploitation",
    ],
  },
  {
    id: "local",
    num: "04",
    icon: MapPin,
    title: "Local SEO",
    accent: "blue",
    badge: "Local Domination",
    short:
      "Dominate Nairobi and East African searches — nearby customers find you first.",
    features: [
      "Google Business Profile setup & optimisation",
      "NAP consistency across all directories",
      "Review generation & reputation management",
      "Local citation building (500+ directories)",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Free SEO Audit",
    accent: "orange",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
    desc: "A full crawl of your site — technical health, keyword gaps, backlinks, competitors — as one clear action report.",
  },
  {
    num: "2",
    title: "Strategy & Roadmap",
    accent: "blue",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
    desc: "A prioritised 12-month roadmap targeting the keywords and gaps with the fastest ranking gains.",
  },
  {
    num: "3",
    title: "Execution & Optimisation",
    accent: "green",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",
    desc: "On-page fixes, content, technical work, and link acquisition — on a tight monthly sprint schedule.",
  },
  {
    num: "4",
    title: "Report & Refine",
    accent: "blue",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
    desc: "A clear monthly report — rankings, traffic, leads, conversions — and where we push next.",
  },
];

const BENTO_REASONS = [
  {
    id: "results",
    title: "Results, Not Vanity Metrics",
    accent: "orange",
    icon: "📈",
    size: "wide",
    desc: "We track rankings, traffic, leads, and revenue — every report ties back to a business outcome.",
  },
  {
    id: "local",
    title: "Kenya & Africa Specialists",
    accent: "blue",
    icon: "🌍",
    size: "normal",
    desc: "We know the local search landscape and what Kenyan consumers actually type into Google.",
  },
  {
    id: "transparent",
    title: "Full Transparency",
    accent: "green",
    icon: "🔍",
    size: "normal",
    desc: "Live dashboard access, monthly reports, and a direct line to your strategist.",
  },
  {
    id: "technical",
    title: "Technical + Content Combined",
    accent: "blue",
    icon: "⚙️",
    size: "normal",
    desc: "Most agencies do one or the other. We do both, so nothing is left on the table.",
  },
  {
    id: "speed",
    title: "Fast Onboarding",
    accent: "orange",
    icon: "⚡",
    size: "normal",
    desc: "From audit to live execution in 14 days — no endless onboarding calls.",
  },
  {
    id: "proven",
    title: "340% Average ROI",
    accent: "green",
    icon: "✦",
    size: "wide",
    desc: "Across our SEO clients, the average 12-month return is 340%, backed by tracked data.",
  },
];

const KEYWORDS = [
  { kw: "digital marketing agency nairobi", pos: 1 },
  { kw: "seo services kenya", pos: 2 },
  { kw: "social media marketing nairobi", pos: 1 },
  { kw: "web design company kenya", pos: 3 },
  { kw: "branding agency nairobi", pos: 1 },
  { kw: "google ads management kenya", pos: 2 },
  { kw: "content marketing africa", pos: 4 },
  { kw: "ecommerce website kenya", pos: 2 },
];

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const reveal = (visible, anim = "animate-fade-up", extra = "") =>
  visible ? `${anim} ${extra}` : "opacity-0";

export default function SEO() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Stats />
      <ServicesIntro />
      <Process />
      <Bento />
      <Results />
      <Cta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden">
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover brightness-[0.28]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/70 to-brand-blue/10" />
      <div className="bg-dot-grid absolute inset-0 opacity-30" />
      <div className="glow-orange w-[700px] h-[700px] -top-24 -right-24 opacity-40" />
      <div className="glow-blue w-[500px] h-[500px] bottom-10 -left-24 opacity-30" />

      <div className="container-site relative z-10 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <h1
              className={`font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-neutral-0 mb-7 ${reveal(true)}`}
            >
              Rank Higher.
              <br />
              Get Found.
              <br />
              <span className="text-gradient-orange">Grow Faster.</span>
            </h1>
            <p
              className={`text-neutral-0/65 max-w-lg leading-relaxed mb-10 ${reveal(true, "animate-fade-up", "delay-100")}`}
            >
              What good is a great website if no one finds it? Serenly builds
              search strategies that get you ranking on page one — driving
              organic traffic that converts into real revenue.
            </p>
            <div
              className={`flex flex-wrap gap-4 mb-12 ${reveal(true, "animate-fade-up", "delay-200")}`}
            >
              <a href="/contact" className="btn btn-primary btn-lg">
                Get Free SEO Audit <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="btn btn-ghost btn-lg !border-neutral-0/25 !text-neutral-0"
              >
                See Our Services
              </a>
            </div>
            <div
              className={`flex flex-wrap gap-7 border-t border-neutral-0/10 pt-6 ${reveal(true, "animate-fade-up", "delay-300")}`}
            >
              {["SEO Audit", "On-Page", "Link Building", "Local SEO"].map(
                (s, i) => (
                  <a
                    key={s}
                    href={`#${s.toLowerCase().replace(" ", "")}`}
                    className="text-xs font-bold tracking-widest uppercase text-neutral-0/45 hover:text-brand-orange transition-colors flex items-center gap-2"
                  >
                    {i > 0 && <span className="opacity-30">·</span>}
                    {s}
                  </a>
                ),
              )}
            </div>
          </div>

          <div
            className={`flex flex-col gap-4 ${reveal(true, "animate-slide-right", "delay-200")}`}
          >
            <SerpCard />
            <div className="flex gap-3">
              <MiniStat
                label="Organic Traffic"
                val="+218%"
                sub="this quarter"
                orange
              />
              <MiniStat label="Avg. Position" val="3.2" sub="from 31.4" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function SerpCard() {
  const results = [
    {
      rank: 1,
      domain: "serenly.agency",
      title: "Serenly | Top Digital Marketing Agency in Kenya",
      you: true,
    },
    {
      rank: 2,
      domain: "competitor-a.co.ke",
      title: "Digital Marketing Services Kenya",
    },
    {
      rank: 3,
      domain: "competitor-b.com",
      title: "Best Marketing Agency Nairobi",
    },
  ];
  return (
    <div className="glass !bg-neutral-950/75 !border-brand-orange/20 p-6 w-full max-w-sm">
      <div className="flex items-center gap-2 h-9 px-4 bg-neutral-0/[0.06] border border-neutral-0/10 mb-5">
        <Search size={12} className="text-neutral-0/40 shrink-0" />
        <span className="text-xs text-neutral-0/50 truncate">
          digital marketing agency nairobi
        </span>
      </div>
      {results.map((r) => (
        <div
          key={r.rank}
          className={`p-3 mb-2 border ${r.you ? "bg-brand-orange/[0.08] border-brand-orange/25" : "border-transparent"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${r.you ? "bg-brand-orange text-neutral-0" : "bg-neutral-0/10 text-neutral-0/40"}`}
            >
              {r.rank}
            </span>
            <span
              className={`text-[11px] font-semibold ${r.you ? "text-brand-orange/90" : "text-neutral-0/35"}`}
            >
              {r.domain}
            </span>
            {r.you && (
              <span className="text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-brand-orange/15 text-brand-orange">
                You
              </span>
            )}
          </div>
          <div
            className={`text-xs pl-[26px] ${r.you ? "text-neutral-0/90 font-semibold" : "text-neutral-0/40"}`}
          >
            {r.title}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-neutral-0/[0.07]">
        <span className="text-xs text-neutral-0/35">Keyword rank</span>
        <span className="text-sm font-bold text-brand-green-light flex items-center gap-1">
          <ArrowUp size={12} strokeWidth={2.5} /> 24 positions
        </span>
      </div>
    </div>
  );
}

function MiniStat({ label, val, sub, orange }) {
  return (
    <div
      className={`glass !bg-neutral-950/70 p-4 flex-1 ${orange ? "!border-brand-orange/20" : "!border-brand-blue/20"}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wide text-neutral-0/40 mb-1.5">
        {label}
      </div>
      <div
        className={`font-display text-2xl leading-none ${orange ? "text-brand-orange" : "text-brand-blue-light"}`}
      >
        {val}
      </div>
      <div className="text-[11px] text-neutral-0/35 mt-1">{sub}</div>
    </div>
  );
}

function Stats() {
  const [ref, visible] = useReveal(0.15);
  return (
    <div ref={ref} className="bg-surface-raised">
      <div className="container-site grid grid-cols-2 md:grid-cols-4 border-l border-t border-border">
        {STATS.map((s, i) => {
          const a = ACCENT[s.accent];
          return (
            <div
              key={s.label}
              className={`relative p-8 md:p-10 border-r border-b border-border ${i === 3 ? "bg-brand-periwinkle/15" : ""} ${reveal(visible, "animate-fade-up", `delay-${i * 100}`)}`}
            >
              <div
                className={`font-display text-4xl md:text-5xl mb-2 ${a.text}`}
              >
                {s.val}
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-text-tertiary">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServicesIntro() {
  const [ref, visible] = useReveal();
  return (
    <section
      id="services"
      ref={ref}
      className="section-padding bg-bg-secondary"
    >
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-end mb-16">
          <div className={reveal(visible, "animate-slide-left")}>
            <span className="section-tag section-tag-orange">Our Services</span>
            <h2 className="mt-5 max-w-xl">
              We're here to make your{" "}
              <span className="text-gradient-orange">website</span> rank higher{" "}
              <span className="text-gradient-blue">and convert better.</span>
            </h2>
            <div className="w-12 h-[3px] my-7 bg-gradient-to-r from-brand-orange to-brand-blue" />
            <a href="#services" className="btn btn-primary btn-md">
              View All Services <ArrowRight size={16} />
            </a>
          </div>
          <div
            className={`space-y-4 text-text-secondary leading-relaxed ${reveal(visible, "animate-slide-right", "delay-100")}`}
          >
            <p>
              SEO isn't a one-time fix — it's a compound strategy. The
              businesses that dominate search invest consistently across four
              pillars: technical health, on-page relevance, authority, and local
              presence.
            </p>
            <p>
              Serenly handles every pillar, so you rank for what customers
              actually type into Google — and stay there.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SEO_SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, index, visible }) {
  const a = ACCENT[svc.accent];
  const Icon = svc.icon;
  return (
    <a
      href={`#${svc.id}`}
      className={`card group block relative overflow-hidden p-8 ${a.hoverBorder} ${reveal(visible, "animate-fade-up", `delay-${index * 100}`)}`}
    >
      <span
        className={`font-display text-8xl leading-none absolute -bottom-4 right-4 select-none pointer-events-none ${a.watermark}`}
      >
        {svc.num}
      </span>

      <div
        className={`w-14 h-14 flex items-center justify-center border mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${a.icon}`}
      >
        <Icon size={26} strokeWidth={1.6} />
      </div>
      <span className={`section-tag ${a.tag} mb-3`}>{svc.badge}</span>
      <h4 className={`mb-2 transition-colors ${a.hoverText}`}>{svc.title}</h4>
      <p className="text-sm text-text-secondary leading-relaxed mb-5">
        {svc.short}
      </p>

      <ul className="space-y-2 mb-5">
        {svc.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm text-text-secondary">
            <span
              className={`w-4 h-4 border shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold ${a.icon}`}
            >
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div
        className={`flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3 ${a.text}`}
      >
        Learn more <ArrowRight size={15} strokeWidth={2.5} />
      </div>
    </a>
  );
}

function Process() {
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active];
  const a = ACCENT[step.accent];

  return (
    <section ref={ref} id="process" className="section-padding">
      <div className="container-site">
        <div className="mb-16">
          <span className="section-tag section-tag-blue">How It Works</span>
          <h2 className="mt-5 max-w-md">
            How We <span className="text-gradient-blue">Simplify</span> Your SEO
            Journey
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            {PROCESS_STEPS.map((s, i) => {
              const isActive = active === i;
              const sa = ACCENT[s.accent];
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full text-left pl-8 py-7 border-l-[3px] transition-colors duration-300 ${isActive ? `${sa.border} bg-bg-secondary` : "border-border"}`}
                >
                  <div
                    className={`font-display text-5xl leading-none mb-2 transition-opacity ${isActive ? `${sa.text} opacity-100` : "text-text-tertiary opacity-40"}`}
                  >
                    {s.num}
                  </div>
                  <h4
                    className={
                      isActive ? "text-foreground" : "text-text-secondary"
                    }
                  >
                    {s.title}
                  </h4>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-500 ${isActive ? "max-h-32 mt-2" : "max-h-0"}`}
                  >
                    <p className="text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className={`lg:sticky lg:top-24 ${reveal(visible, "animate-slide-right", "delay-200")}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {PROCESS_STEPS.map((s, i) => (
                <img
                  key={s.num}
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className={`text-xs font-bold tracking-widest uppercase mb-1 ${a.text}`}
                >
                  Step {step.num}
                </div>
                <div className="font-display text-2xl text-neutral-0">
                  {step.title}
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-5">
              {PROCESS_STEPS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show step ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${active === i ? `w-7 ${ACCENT[s.accent].dot}` : "w-2 bg-border-strong"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bento() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="section-padding bg-bg-secondary">
      <div className="container-site">
        <div className="mb-14">
          <span className="section-tag section-tag-orange">Why Serenly</span>
          <h2 className="mt-5">
            Why Choose <span className="text-gradient-orange">Serenly</span> for
            SEO
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {BENTO_REASONS.map((item, i) => {
            const a = ACCENT[item.accent];
            return (
              <div
                key={item.id}
                className={`card relative overflow-hidden p-8 ${item.size === "wide" ? "md:col-span-2" : ""} ${item.id === "transparent" ? "bg-brand-periwinkle/10" : ""} ${a.hoverBorder} ${reveal(visible, "animate-fade-up", `delay-${i * 100}`)}`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] opacity-50 ${a.bar}`}
                />
                <span
                  className={`font-display text-8xl leading-none absolute -bottom-6 right-6 select-none pointer-events-none ${a.watermark}`}
                >
                  0{i + 1}
                </span>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="mb-3">{item.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const [ref, visible] = useReveal();
  const rankClass = (pos) =>
    pos === 1
      ? ACCENT.orange.rank
      : pos === 2
        ? ACCENT.green.rank
        : pos === 3
          ? ACCENT.blue.rank
          : "bg-bg-tertiary border-border text-text-tertiary";

  return (
    <section ref={ref} className="section-padding">
      <div className="container-site grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
        <div className={reveal(visible, "animate-slide-left")}>
          <span className="section-tag section-tag-blue">Real Results</span>
          <h2 className="mt-5 mb-5">
            Rankings We've <span className="text-gradient-blue">Earned</span>{" "}
            for Clients
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            Every position here is a real keyword our clients rank for today —
            not projections. Just consistent, compounding organic results.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="font-display text-4xl text-brand-blue leading-none">
                +218%
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-text-tertiary mt-1">
                Organic traffic
              </div>
            </div>
            <div>
              <div className="font-display text-4xl text-brand-green leading-none">
                6mo
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-text-tertiary mt-1">
                Avg. to page one
              </div>
            </div>
          </div>
        </div>

        <div
          className={`card overflow-hidden ${reveal(visible, "animate-slide-right", "delay-100")}`}
        >
          <div className="flex items-center gap-2.5 px-6 py-4 bg-surface-raised border-b border-border">
            <span className="w-2 h-2 rounded-full bg-brand-green-light" />
            <span className="text-xs font-bold uppercase tracking-wide text-text-tertiary">
              Live Keyword Rankings — Serenly Clients
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] px-6 py-3 border-b border-border-subtle text-[11px] font-bold uppercase tracking-wide text-text-tertiary">
            <span>Keyword</span>
            <span>Position</span>
          </div>
          {KEYWORDS.map((k, i) => (
            <div
              key={k.kw}
              className={`grid grid-cols-[1fr_auto] items-center px-6 py-3.5 ${i < KEYWORDS.length - 1 ? "border-b border-border-subtle" : ""}`}
            >
              <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                <Search size={12} className="text-brand-orange/50 shrink-0" />
                {k.kw}
              </div>
              <div
                className={`w-7 h-7 flex items-center justify-center border font-bold text-sm ${rankClass(k.pos)}`}
              >
                #{k.pos}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  const [ref, visible] = useReveal(0.2);
  return (
    <section ref={ref} className="section-padding bg-bg-secondary">
      <div className="container-site">
        <div
          className={`relative overflow-hidden bg-gradient-to-br from-neutral-950 via-[#111116] to-neutral-950 border border-brand-blue/15 ${reveal(visible, "animate-scale-in")}`}
        >
          <div className="bg-line-grid absolute inset-0 opacity-20" />
          <div className="glow-blue w-[600px] h-[600px] -top-40 -right-10 opacity-50" />
          <div className="glow-orange w-[450px] h-[450px] -bottom-40 left-10 opacity-40" />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center p-10 md:p-16">
            <div>
              <span className="section-tag section-tag-blue">
                Free SEO Audit
              </span>
              <h2 className="text-neutral-0 mt-5 mb-4">
                Ready to rank <span className="text-gradient-blue">#1</span> on
                Google?
              </h2>
              <p className="text-neutral-0/55 max-w-lg leading-relaxed">
                Get your free SEO audit today — we'll show you exactly where
                you're losing rankings, traffic, and revenue, and how to take it
                back.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a href="/contact" className="btn btn-secondary btn-lg">
                Get Free Audit <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="btn btn-ghost btn-lg !border-neutral-0/20 !text-neutral-0"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
