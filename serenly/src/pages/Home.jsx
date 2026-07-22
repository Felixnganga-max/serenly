import React from 'react';
import Hero from '../components/Hero';
import ServicesIntro from '../components/ServicesIntro';
import ServicesList from '../components/ServicesList';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import ClosingCTA from '../components/ClosingCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main>
        <Hero />
        <ServicesIntro />
        <ServicesList />
        <About />
        <Portfolio />
        <Process />
        <Testimonials />
        <BlogSection />
        <ClosingCTA />
      </main>
    </div>
  );
}