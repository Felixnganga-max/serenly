import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import assets from "../assets/assets";

const CASE_CARDS = [
  {
    tag: "Tell your story",
    caption: "Grow with Facebook & Instagram",
    image: assets.fb,

    accent: "orange",
  },
  {
    tag: "Get a Website",
    caption: "It's time, that's why you are here!",
    image: assets.wbs,

    href: "/seo",
    accent: "blue",
  },
];

const ACCENT_HOVER = {
  orange: "group-hover:bg-brand-orange",
  blue: "group-hover:bg-brand-blue",
};

export default function ProblemsSolutions() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="pt-6 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-[1800px] mx-auto grid md:grid-cols-3 gap-5">
        {CASE_CARDS.map(({ tag, caption, image, href, accent }) => (
          <Link
            key={caption}
            to={href}
            className="group relative aspect-[4/5] sm:aspect-square rounded-soft overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
          >
            <img
              src={image}
              alt={caption}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/10 to-transparent" />
            <span className="absolute top-4 left-4 bg-neutral-0 text-brand-black text-xs font-bold px-3 py-1.5 rounded-pill">
              {tag}
            </span>
            <span
              className={`absolute top-4 right-4 w-9 h-9 rounded-pill bg-neutral-0/90 flex items-center justify-center text-brand-black transition-all duration-300 group-hover:text-neutral-0 group-hover:rotate-45 ${ACCENT_HOVER[accent]}`}
            >
              <ArrowUpRight size={16} />
            </span>
            <span className="absolute bottom-5 left-5 right-5 font-display text-xl sm:text-2xl text-neutral-0 leading-tight">
              {caption}
            </span>
          </Link>
        ))}

        {/* Signup card */}
        <div className="relative aspect-[4/5] sm:aspect-square rounded-soft overflow-hidden bg-brand-green px-7 py-8 flex flex-col justify-between">
          <div
            className="absolute -right-10 -top-10 w-40 h-40 rounded-pill opacity-20"
            style={{
              background:
                "radial-gradient(circle, #F5F5F5 0%, transparent 70%)",
            }}
          />
          <span className="relative text-xs font-bold uppercase tracking-wider text-neutral-0/70">
            Get Started
          </span>
          <div className="relative">
            <h3 className="font-display text-2xl text-neutral-0 leading-tight mb-5">
              Start Your Growth Story Today!
            </h3>
            {submitted ? (
              <p className="text-sm font-bold text-neutral-0">
                Thanks — we'll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-pill bg-neutral-0 text-brand-black text-sm placeholder:text-brand-black/40 outline-none focus:ring-2 focus:ring-brand-orange"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-pill bg-brand-orange text-neutral-0 text-sm font-bold hover:brightness-110 transition-all"
                >
                  Get Started
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
