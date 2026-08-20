import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white/80 pt-24 pb-8 px-6 lg:px-12 border-t border-white/10 text-sm font-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-3 mb-6 w-fit">
              <img src={assets.logo} alt="Serenly" className="h-8 w-8 object-contain" />
              <h3 className="font-display text-3xl font-bold text-white tracking-tight">
                Serenly
              </h3>
            </Link>
            <p className="leading-relaxed mb-8 max-w-md">
              A results-driven digital marketing agency helping ambitious
              businesses across Kenya and Africa grow their brand and dominate
              search.
            </p>
            <div className="flex flex-col space-y-2 mt-auto">
              <a
                href="mailto:contact@serenlydm.com"
                className="hover:text-brand-periwinkle transition-colors w-fit"
              >
                contact@serenlydm.com
              </a>
              <a
                href="tel:+254797743366"
                className="hover:text-primary transition-colors w-fit"
              >
                +254 797 743 366
              </a>
              <span>Nairobi, Kenya</span>
              <a
                href="https://wa.me/254797743366"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green-light font-semibold mt-4 w-fit hover:underline"
              >
                WhatsApp us →
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="font-semibold text-white tracking-wider uppercase text-xs mb-8">
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/web-dev" className="hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/seo" className="hover:text-white transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/smm" className="hover:text-white transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link to="/branding" className="hover:text-white transition-colors">
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link to="/our-system" className="hover:text-white transition-colors">
                  School Management System
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-12">
            <div>
              <h4 className="font-semibold text-white tracking-wider uppercase text-xs mb-8">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/#portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white tracking-wider uppercase text-xs mb-8">
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Serenly Digital Marketing Agency. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
