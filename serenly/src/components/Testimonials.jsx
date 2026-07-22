import React from "react";

const testimonials = [
  {
    quote:
      "Serenly completely transformed our online presence. Within three months, we saw a 218% increase in organic traffic and our leads nearly tripled.",
    author: "James Kariuki",
    role: "CEO TechNairobi Solutions",
    rating: "★★★★★",
  },
  {
    quote:
      "The Meta Ads team just gets it. Our Instagram went from 400 followers to over 12,000 in 8 months — and our DMs are full of genuine enquiries every week.",
    author: "Amina Hassan",
    role: "Founder Amirah Beauty Kenya",
    rating: "★★★★★",
  },
  {
    quote:
      "We hired Serenly to build our school management system and the result exceeded everything we expected. The admin portal, grading module, and parent portal all work flawlessly.",
    author: "David Mwangi",
    role: "Principal Sunrise Academy",
    rating: "★★★★★",
  },
  {
    quote:
      "Our e-commerce store was built and launched in under 6 weeks with M-Pesa integration working perfectly from day one. Sales are up 4x.",
    author: "Cynthia Ouma",
    role: "Director StyleHub Kenya",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-6">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground mb-6">
            Trusted by 500+ clients
          </h2>
          <p className="text-lg text-foreground/70 font-light leading-relaxed">
            Here's what businesses across Kenya and Africa say about working
            with Serenly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border border-border p-8 md:p-10 flex flex-col justify-between bg-background"
            >
              <div className="mb-8">
                <div className="text-primary text-sm mb-6 tracking-widest">
                  {t.rating}
                </div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-border/50 pt-6 mt-auto">
                <p className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  {t.author}
                </p>
                <p className="text-foreground/60 text-sm mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
