import React from "react";
import { Link } from "react-router-dom";
import { LATEST_POSTS } from "../data/blogPosts";

/* Secondary accent rotation for the post cards — category label and hover
   states cycle orange → blue → green instead of a single fixed accent. */
const ACCENTS = [
  { text: "text-brand-orange", hoverText: "group-hover:text-brand-orange" },
  { text: "text-brand-blue", hoverText: "group-hover:text-brand-blue" },
  { text: "text-brand-green", hoverText: "group-hover:text-brand-green" },
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="py-24 lg:py-32 px-6 lg:px-12 bg-background border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50 mb-6">
              Our Latest Posts
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-foreground">
              Stories, Inspiration &<br />
              Tips From the Heart
            </h2>
          </div>
          <Link
            to="/blogs"
            className="text-foreground font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all shrink-0"
          >
            View all posts →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {LATEST_POSTS.map((post, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <Link
                key={post.id}
                to={`/blogs/${post.slug}`}
                className="group cursor-pointer block"
              >
                <div className="aspect-[3/2] bg-muted mb-6 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${accent.text}`}
                  >
                    {post.category}
                  </span>
                  <span className="w-1 h-1 bg-brand-periwinkle"></span>
                  <span className="text-xs text-foreground/50 font-medium">
                    {post.date}
                  </span>
                </div>
                <h3
                  className={`font-display text-2xl mb-3 text-foreground transition-colors ${accent.hoverText}`}
                >
                  {post.title}
                </h3>
                <p className="text-foreground/70 font-light leading-relaxed mb-5 text-sm">
                  {post.excerpt}
                </p>
                <span
                  className={`text-sm font-semibold text-foreground flex items-center gap-1 transition-colors ${accent.hoverText}`}
                >
                  Read more{" "}
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
