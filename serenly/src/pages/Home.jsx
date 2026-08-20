import React from "react";
import Hero from "../components/Hero";
import ProblemsSolutions from "../components/ProblemsSolutions";
import Testimonials from "../components/Testimonials";
import Portfolio from "../components/Portfolio";
import ServiceSpotlight from "../components/ServiceSpotlight";
import FAQ from "../components/FAQ";
import ClosingCTA from "../components/ClosingCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main>
        <Hero />
        <ProblemsSolutions />
        <Testimonials />
        <Portfolio />
        <ServiceSpotlight />
        <FAQ />
        <ClosingCTA />
      </main>
    </div>
  );
}
