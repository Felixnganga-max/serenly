import React from 'react';

const steps = [
  { number: '01', title: 'Discovery', description: 'We start with a free consultation to understand your business, goals, and competition.' },
  { number: '02', title: 'Strategy', description: 'We build a tailored plan — which channels, what messaging, what timeline.' },
  { number: '03', title: 'Build', description: 'Our team gets to work — designing, writing, developing. You get regular updates.' },
  { number: '04', title: 'Launch', description: 'We go live, monitor performance, and hand over everything. Ongoing support always available.' }
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-background border-y border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-6">How We Work</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-foreground mb-6">From first call to live results</h2>
          <p className="text-lg text-foreground/70 font-light leading-relaxed">A clear, transparent process — so you always know exactly where things stand.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="border border-border p-8 flex flex-col h-full bg-background hover:bg-muted/30 transition-colors">
              <span className="text-primary font-mono text-xl mb-8">{step.number}</span>
              <h3 className="font-serif text-2xl mb-4 text-foreground">{step.title}</h3>
              <p className="text-foreground/70 font-light leading-relaxed flex-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}