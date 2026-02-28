// src/pages/Blogs.jsx
// Serenly — Blog / Insights Page
// Design: Inch-perfect GutenVerse magazine layout in Serenly brand system
// SEO: 10 posts targeting high-intent Kenya digital marketing keywords
// Sections:
//   1. Hero banner (page header)
//   2. Featured post — GutenVerse dark card + image split hero
//   3. "Latest Insights" — 3-col post grid  (GutenVerse "Latest Stories")
//   4. Load More button
//   5. "Staff's Picks" editorial strip

import React, { useEffect, useRef, useState } from "react";

/* ─── Unsplash images ─── */
const IMGS = {
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=80",
  social:
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80",
  web: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80",
  branding:
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80",
  ecom: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
  ads: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=900&q=80",
  banner:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  growth:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  nairobi:
    "https://images.unsplash.com/photo-1569168713092-2aa02a9c97e2?w=900&q=80",
};

/* ─────────────────────────────────────────────────────────────
   10 SEO-CRAFTED BLOG POSTS
   Each post is written to rank for specific Kenya digital marketing
   keywords while delivering genuine value to readers.
───────────────────────────────────────────────────────────── */
const ALL_POSTS = [
  {
    id: 1,
    slug: "best-digital-marketing-companies-kenya",
    featured: true,
    img: IMGS.growth,
    category: "Digital Marketing",
    tags: ["Digital Marketing Kenya", "Marketing Agencies"],
    date: "February 14, 2026",
    readTime: "8 min read",
    title:
      "How to Choose the Best Digital Marketing Company in Kenya (2026 Guide)",
    excerpt:
      "With hundreds of digital marketing companies in Kenya competing for your budget, choosing the right one is the decision that determines whether your investment compounds into growth — or disappears. Here's the exact framework to use.",
    metaTitle: "Best Digital Marketing Companies in Kenya 2026 | Serenly",
    metaDesc:
      "Looking for the top digital marketing companies in Kenya? Our 2026 guide breaks down exactly what to look for, red flags to avoid, and why results-driven agencies win every time.",
    keywords: [
      "digital marketing companies in kenya",
      "top advertising agencies in kenya",
      "top 10 advertising agencies in kenya",
      "advertising agencies in kenya",
      "digital marketing agency nairobi",
    ],
    content: `
Finding the right digital marketing partner in Kenya isn't about picking the agency with the flashiest website or the longest client list. It's about finding a team that understands your market, your audience, and — most importantly — knows how to move real business metrics.

**What separates top digital marketing companies in Kenya from the rest?**

The best advertising agencies in Kenya share three things: they lead with strategy before execution, they measure results against business outcomes (not vanity metrics like likes and impressions), and they communicate transparently throughout every campaign.

When evaluating any of the top 10 advertising agencies in Kenya, ask these questions before signing anything:
- Can you show me before-and-after metrics for a client in my industry?
- What does your reporting look like, and how often will I see it?
- Who specifically will be working on my account — senior or junior staff?
- How do you handle underperforming campaigns?

**Red flags to watch for**

Be cautious of agencies that guarantee specific rankings or follower counts, refuse to share case studies, or bundle everything into one fixed "package" without tailoring it to your goals. Digital marketing that works is not one-size-fits-all.

Serenly operates differently. Every campaign starts with a deep discovery session, a competitive analysis, and a strategy built around your specific growth goals — not a templated service list.
    `.trim(),
  },
  {
    id: 2,
    slug: "social-media-marketing-agencies-kenya",
    featured: false,
    img: IMGS.social,
    category: "Social Media",
    tags: ["SMM Kenya", "Facebook Marketing", "Instagram"],
    date: "February 7, 2026",
    readTime: "6 min read",
    title:
      "Top Social Media Marketing Agencies in Kenya: What They Do Differently",
    excerpt:
      "Social media marketing in Kenya has matured — but most brands are still running it like it's 2018. Here's what the leading social media marketing agencies are doing right now that separates page-one brands from the rest.",
    metaTitle: "Top Social Media Marketing Agencies in Kenya 2026 | Serenly",
    metaDesc:
      "Discover what Kenya's top social media marketing agencies do differently. From Instagram Reels strategy to Facebook ad targeting — learn how to turn followers into paying customers.",
    keywords: [
      "social media marketing agencies in kenya",
      "social media marketing",
      "social media marketing nairobi",
      "facebook marketing kenya",
      "instagram marketing kenya",
    ],
    content: `
Social media marketing in Kenya is no longer optional — it's the primary channel through which most consumers discover, evaluate, and decide to buy from a brand. But there's a massive difference between brands that post consistently and brands that actually convert.

The social media marketing agencies worth hiring in Kenya in 2026 are doing five things most brands aren't:

**1. Content built for the algorithm, not just the audience**
Kenya's top agencies understand that Instagram Reels, Facebook short-form video, and carousel posts are prioritised by Meta's algorithm. They build content calendars that balance brand storytelling with format performance.

**2. Localised ad targeting**
Blanket Nairobi targeting wastes budget. Elite agencies segment by constituency, income bracket, language preference (English vs. Swahili), and behavioural signals to ensure every shilling reaches the right person.

**3. Community management as a conversion tool**
Responding to comments and DMs within 30 minutes increases purchase intent significantly. Top agencies treat the inbox as a sales channel, not a customer service afterthought.

**4. Monthly attribution reporting**
Every Serenly social media client receives a monthly report that tracks followers, reach, engagement rate, and — most importantly — how many leads and sales came from social. Vanity metrics are noted, but business outcomes drive every decision.
    `.trim(),
  },
  {
    id: 3,
    slug: "seo-services-kenya-rank-google-first-page",
    featured: false,
    img: IMGS.seo,
    category: "SEO",
    tags: ["SEO Kenya", "Google Ranking", "Organic Traffic"],
    date: "January 30, 2026",
    readTime: "10 min read",
    title:
      "SEO Services in Kenya: The Complete Guide to Ranking on Google's First Page",
    excerpt:
      "Want to rank on Google's first page in Kenya? This is the most complete, up-to-date guide to SEO services in Kenya — covering what actually works in 2026 for Kenyan businesses targeting local and national searches.",
    metaTitle:
      "SEO Services in Kenya 2026 — Rank on Google First Page | Serenly",
    metaDesc:
      "Everything you need to know about SEO services in Kenya. Learn how to rank on Google's first page with strategies built specifically for Kenyan search behaviour and local SEO in Nairobi.",
    keywords: [
      "seo services in kenya",
      "seo services",
      "rank on google first page",
      "seo company nairobi",
      "local seo kenya",
      "google first page kenya",
    ],
    content: `
If your business isn't on Google's first page, it effectively doesn't exist for the thousands of Kenyans searching for your product or service every day. SEO services in Kenya have become one of the highest-ROI investments a business can make — but only when done correctly.

**What does SEO actually involve?**

Good SEO services break into four pillars:

**Technical SEO** — Ensuring Google can crawl, index, and rank your website. This includes page speed, mobile-friendliness, structured data (schema markup), and Core Web Vitals. A slow, technically broken website cannot rank, regardless of how good the content is.

**On-Page SEO** — Optimising every page for the keywords your customers are actually searching. This means strategic keyword placement in titles, headings, meta descriptions, image alt tags, and body content — without keyword stuffing.

**Content SEO** — Publishing high-value content that answers real questions your target audience has. In Kenya, this means understanding both English and Swahili search intent, as well as hyper-local terms (e.g., "restaurants in Westlands" vs. "restaurants in Nairobi").

**Off-Page SEO & Link Building** — Earning backlinks from high-authority Kenyan and international publications to build your domain's trust in Google's eyes.

Serenly's SEO clients in Nairobi and across Kenya typically see page-one movement within 3–6 months, and measurable traffic growth from month two onwards.
    `.trim(),
  },
  {
    id: 4,
    slug: "website-development-companies-kenya",
    featured: false,
    img: IMGS.web,
    category: "Web Development",
    tags: ["Web Development Kenya", "Website Builders", "Nairobi Developers"],
    date: "January 22, 2026",
    readTime: "7 min read",
    title:
      "Website Development Companies in Kenya: What You Should Demand in 2026",
    excerpt:
      "Kenya has hundreds of website developers and website builders. But most sites built locally fail on speed, SEO, and conversion. Here's what to demand from any website development company in Kenya before you pay a cent.",
    metaTitle: "Website Development Companies in Kenya 2026 | Serenly",
    metaDesc:
      "Looking for website development companies in Kenya? Discover what separates great website developers in Nairobi from average ones — and the non-negotiables every business site must have.",
    keywords: [
      "website development companies in kenya",
      "website builders in kenya",
      "website developers in nairobi",
      "kenya website experts",
      "web design company nairobi",
      "website design kenya",
    ],
    content: `
The Kenyan web development market is crowded. From solo freelancers to full agencies, there are hundreds of people calling themselves website builders in Kenya. But the quality gap between the best and worst is enormous — and a bad website costs you far more than the upfront price you save.

**The 5 non-negotiables for any website built in Kenya**

**1. Mobile-first design** — Over 80% of Kenyan internet users access websites on mobile. A desktop-first design approach guarantees a broken experience for most of your visitors.

**2. Page speed under 3 seconds** — Google measures performance as a ranking signal. Most locally-built Kenyan websites score under 40 on Google PageSpeed Insights. Serenly targets 90+ on every build.

**3. SEO-ready from day one** — Your website should launch with proper meta tags, heading structure, schema markup, and sitemaps already in place. Many website developers in Nairobi skip this entirely, leaving you invisible on Google from launch.

**4. CMS-powered so you control it** — You should be able to update your own content without hiring a developer every time. We build with intuitive CMS platforms so your team has full control.

**5. Conversion-optimised** — A beautiful website that doesn't generate enquiries, leads, or sales is just an expensive brochure. Every Serenly website is designed with clear conversion paths, compelling CTAs, and user flows that guide visitors toward action.
    `.trim(),
  },
  {
    id: 5,
    slug: "ecommerce-website-developers-kenya-mpesa",
    featured: false,
    img: IMGS.ecom,
    category: "E-Commerce",
    tags: ["E-Commerce Kenya", "M-Pesa Integration", "Online Store"],
    date: "January 15, 2026",
    readTime: "9 min read",
    title:
      "E-Commerce Website Developers in Kenya: The M-Pesa Integration Guide",
    excerpt:
      "Building an online store in Kenya without M-Pesa integration is commercial suicide. This guide breaks down everything e-commerce website developers in Kenya need to get right — from Daraja API to checkout UX.",
    metaTitle:
      "E-Commerce Website Developers in Kenya — M-Pesa Integration | Serenly",
    metaDesc:
      "Find the best e-commerce website developers in Kenya. Learn how M-Pesa integration, product catalogues, and conversion-optimised checkout pages drive online sales for Kenyan businesses.",
    keywords: [
      "e-commerce website developers in kenya",
      "mpesa integration kenya",
      "online store kenya",
      "ecommerce website kenya",
      "kenya website experts",
    ],
    content: `
Kenyan e-commerce is growing at an extraordinary pace. But the majority of online stores launched locally fail not because of poor products — but because of poor execution: slow sites, broken payment flows, and checkout experiences that abandon mobile users.

**M-Pesa integration: the make-or-break feature**

Over 70% of Kenyan online transactions are completed via M-Pesa. Any e-commerce website developed in Kenya that doesn't offer seamless M-Pesa payment is losing the majority of would-be buyers at checkout.

The Safaricom Daraja API is the gateway — but integrating it correctly requires careful attention to the STK push flow, callback handling, timeout management, and user feedback during payment processing. Poor integration leads to failed transactions, frustrated customers, and lost sales.

**What else separates top e-commerce developers in Kenya**

Beyond M-Pesa, great e-commerce website developers in Kenya build for: product variant management, inventory tracking, abandoned cart recovery emails, SEO-optimised product pages, and Google Shopping integration. The best stores also integrate with local logistics providers like Sendy and Pickup Mtaani for seamless last-mile delivery.

Serenly has built and launched e-commerce stores for Kenyan brands across fashion, beauty, electronics, and food — all with M-Pesa, Stripe, and PayPal fully integrated from day one.
    `.trim(),
  },
  {
    id: 6,
    slug: "graphic-designers-kenya-business-branding",
    featured: false,
    img: IMGS.branding,
    category: "Branding & Design",
    tags: ["Graphic Design Kenya", "Logo Design", "Brand Identity"],
    date: "January 8, 2026",
    readTime: "6 min read",
    title:
      "Graphic Designers in Kenya: Why Your Brand Identity Is Worth Investing In",
    excerpt:
      "Kenya has thousands of graphic designers — but great brand identity design is rare. This is what business logo design, brand guidelines, and visual identity actually deliver for businesses that get them right.",
    metaTitle:
      "Graphic Designers in Kenya — Business Logo & Brand Identity | Serenly",
    metaDesc:
      "Looking for graphic designers in Kenya? Learn why business logo design, brand guidelines, and visual identity are the foundation of every successful brand — and what makes Serenly's design different.",
    keywords: [
      "graphic designers in kenya",
      "graphic design companies in kenya",
      "business logo design",
      "brand identity kenya",
      "logo design nairobi",
      "visual identity kenya",
    ],
    content: `
Your logo is not just a pretty image. It's the first signal your brand sends to every potential customer — before they read a word you've written. In Kenya's increasingly competitive market, businesses that invest in professional brand identity consistently outperform those that don't.

**What graphic design companies in Kenya should deliver**

A business logo design engagement should produce more than a logo file. A complete brand identity includes: the primary logo, logo variations (icon only, stacked, horizontal), a defined colour palette with hex codes, a typography system, brand usage guidelines, and at minimum, mockups showing how the brand looks in real-world contexts.

Many graphic designers in Kenya deliver a logo PNG and call it done. That's not a brand — that's a symbol with no system behind it.

**The ROI of professional brand identity**

Brands with consistent visual identities generate significantly higher recognition and trust signals across all channels. When your logo, website, social media, and marketing materials all feel like they belong to the same family, customers perceive your business as established and trustworthy — even if you've been operating for only six months.

Serenly's branding process starts with competitive research and audience analysis before a single design concept is produced. The result is a brand identity that communicates the right message to the right people — consistently, across every channel.
    `.trim(),
  },
  {
    id: 7,
    slug: "banner-design-services-nairobi-printing",
    featured: false,
    img: IMGS.banner,
    category: "Design & Print",
    tags: ["Banner Design", "Printing Nairobi", "Marketing Materials"],
    date: "December 30, 2025",
    readTime: "5 min read",
    title:
      "Banner Design Services in Nairobi: What Every Business Needs to Know",
    excerpt:
      "Whether it's outdoor branding, event banners, or trade show displays — banner design services in Nairobi vary wildly in quality. Here's how to brief a designer correctly and what printing services in Nairobi deliver the best results.",
    metaTitle:
      "Banner Design Services in Nairobi & Printing Services | Serenly",
    metaDesc:
      "Looking for banner design services in Nairobi? Learn how to brief designers, what file formats printing services in Nairobi need, and how professional banner design drives walk-in traffic and event ROI.",
    keywords: [
      "banner design services in nairobi",
      "banner printing services in nairobi",
      "printing services in nairobi",
      "banner design",
      "outdoor advertising kenya",
      "event branding nairobi",
    ],
    content: `
A well-designed banner in the right location is still one of the highest-impact marketing channels for Kenyan businesses — especially for retail, events, launches, and trade shows. But most businesses underinvest in banner design and overspend on printing, or vice versa.

**What to brief your designer**

Before approaching any banner design services in Nairobi, have these ready: the banner dimensions (standard pull-up banners are 85cm × 200cm; outdoor billboards vary), your brand files (logo in vector format, brand colours in CMYK), the primary message hierarchy (what readers see first, second, and third), and a clear call to action.

**File formats for printing services in Nairobi**

Printing services in Nairobi typically require print-ready PDF, AI, or EPS files at 300 DPI in CMYK colour mode. RGB files (used for screens) look different when printed — colours shift significantly. Always request a print proof before approving full production runs.

**Digital + print brand consistency**

The most effective businesses in Kenya maintain visual consistency between their digital assets (website, social media) and physical materials (banners, business cards, flyers). When a potential customer sees your Instagram ad and then your outdoor banner and they look like the same brand — trust compounds.

Serenly designs all print and digital materials from the same brand system, ensuring your marketing looks cohesive whether someone encounters your brand online or on Nairobi's streets.
    `.trim(),
  },
  {
    id: 8,
    slug: "business-card-design-kenya-first-impressions",
    featured: false,
    img: IMGS.logo,
    category: "Branding & Design",
    tags: ["Business Cards", "Brand Identity", "First Impressions"],
    date: "December 22, 2025",
    readTime: "5 min read",
    title:
      "Business Card Design in Kenya: Why Your Card Is Still Your Most Powerful First Impression",
    excerpt:
      "In an era of LinkedIn and WhatsApp, the physical business card is more powerful than ever — because so few businesses get it right. Here's what professional business card design actually communicates about your brand.",
    metaTitle:
      "Business Card Design Kenya — Professional Brand Identity | Serenly",
    metaDesc:
      "Professional business card design in Kenya says everything about your brand in 3 seconds. Learn what separates great cards from forgettable ones, and how Serenly designs cards that get kept.",
    keywords: [
      "business card design",
      "business card design kenya",
      "business card nairobi",
      "professional business cards kenya",
      "graphic design companies in kenya",
      "brand identity kenya",
    ],
    content: `
When you hand someone your business card in Kenya, you have approximately three seconds to make or break their impression of your business. A poorly designed card — cheap paper, cluttered layout, inconsistent branding — signals exactly the level of attention to detail your business brings to everything else.

**What a great business card design communicates**

Premium business card design communicates: that you're established, that you care about quality, and that your brand has a consistent identity worth trusting. Thick card stock (350–400gsm), clean typography, and a layout that breathes all contribute to a physical object that people keep rather than discard.

**The elements that separate great from average**

Great business card design in Kenya includes: your logo in its correct proportions (not stretched or squeezed to fill space), a clear hierarchy of information (name → title → contact), white space that makes the card feel premium, and a finish choice (matte, gloss, soft-touch laminate, or spot UV) that matches your brand's personality.

The back of the card is an underused real estate. A minimal brand pattern, a QR code linking to your portfolio, or a memorable brand tagline on the reverse side transforms a single card into a conversation starter.

Serenly designs business cards as part of a complete brand identity system — ensuring your card, letterhead, website, and social media all speak the same visual language.
    `.trim(),
  },
  {
    id: 9,
    slug: "facebook-instagram-ads-kenya-roi",
    featured: false,
    img: IMGS.ads,
    category: "Paid Advertising",
    tags: ["Facebook Ads Kenya", "Instagram Ads", "Paid Social ROI"],
    date: "December 15, 2025",
    readTime: "8 min read",
    title: "Facebook & Instagram Ads in Kenya: How to Get Real ROI in 2026",
    excerpt:
      "Most Kenyan businesses waste their Meta ad budget on boosted posts and broad targeting. Here's exactly how the top social media marketing agencies in Kenya structure Facebook and Instagram campaigns that actually return revenue.",
    metaTitle: "Facebook & Instagram Ads Kenya — ROI Guide 2026 | Serenly",
    metaDesc:
      "Stop wasting money on boosted posts. Learn how social media marketing agencies in Kenya structure Facebook and Instagram ad campaigns for real ROI — from targeting to creative to conversion tracking.",
    keywords: [
      "facebook ads kenya",
      "instagram ads kenya",
      "social media marketing agencies in kenya",
      "paid social kenya",
      "meta ads nairobi",
      "advertising agencies in kenya",
    ],
    content: `
Boosting posts is not running ads. This is the most important distinction any Kenyan business owner needs to understand before spending a single shilling on Facebook or Instagram advertising.

Boosted posts go to people who already like your page or loosely match a broad demographic. Actual Meta ad campaigns, built inside Ads Manager with campaign objectives, custom audiences, conversion events, and A/B-tested creatives — these are what drive real revenue.

**The structure of a high-performing Meta campaign for Kenya**

Every successful Facebook and Instagram campaign Serenly runs for Kenyan clients follows this structure:

**Campaign objective first.** Are you trying to build awareness, generate leads, or drive purchases? Each objective uses a different delivery algorithm and requires different creative.

**Audience segmentation.** For Nairobi-based businesses, we typically build three audience layers: a custom audience (website visitors + customer list), a lookalike audience (1–3% lookalike of your best customers), and a cold interest-based audience for scale.

**Creative that stops the scroll.** In Kenya's crowded feed, static images lose to short-form video almost every time. Reels and video ads consistently outperform image ads by 2–4× in reach and 3× in click-through rate.

**Conversion tracking done right.** The Meta Pixel must be correctly installed and the correct conversion events must be firing before you run a single ad. Without this, the algorithm has no signal to optimise toward — and your budget burns blind.
    `.trim(),
  },
  {
    id: 10,
    slug: "digital-marketing-nairobi-small-business",
    featured: false,
    img: IMGS.nairobi,
    category: "Digital Marketing",
    tags: ["Digital Marketing Nairobi", "Small Business", "Kenya Growth"],
    date: "December 8, 2025",
    readTime: "7 min read",
    title:
      "Digital Marketing for Small Businesses in Nairobi: Where to Start and What to Prioritise",
    excerpt:
      "You don't need a massive budget to win online in Nairobi. But you do need to know exactly where to invest first. This is the honest prioritisation guide for small businesses starting their digital marketing journey in Kenya.",
    metaTitle:
      "Digital Marketing for Small Businesses in Nairobi, Kenya | Serenly",
    metaDesc:
      "Starting digital marketing for your Nairobi small business? This honest guide tells you exactly where to invest first — from Google My Business to SEO to social media — based on real Kenya market data.",
    keywords: [
      "digital marketing nairobi",
      "digital marketing for small businesses kenya",
      "digital marketing companies in kenya",
      "online marketing nairobi",
      "grow business online kenya",
      "best digital marketing agency nairobi",
    ],
    content: `
If you're a small business owner in Nairobi and you've been told you need to "do everything" on digital — a website, SEO, social media, Google Ads, email marketing, WhatsApp Business — you've been given advice that's technically correct but practically useless.

The truth is, you should do less better. Here's how to prioritise.

**Step 1: Google My Business (free, high impact)**
If you serve local customers in Nairobi and you don't have a verified, fully optimised Google My Business profile, you're invisible in local search. This is free to set up, takes under an hour, and immediately makes you visible when people search for your service type in your area.

**Step 2: A fast, SEO-ready website**
Not a Facebook page. Not a WhatsApp link. A properly built website that Google can index. It needs to load fast, work on mobile, and have the basic SEO elements in place. This is your digital headquarters — every other channel points here.

**Step 3: One social platform done well**
Don't spread across Facebook, Instagram, TikTok, LinkedIn, and X simultaneously. Pick the one where your specific audience lives (for most B2C Nairobi businesses, that's Instagram or Facebook) and invest in it properly. Three great posts per week beat seven mediocre ones every time.

**Step 4: SEO for the long game**
Once your website is live, start building organic search presence. This takes 3–6 months to show significant results — but once it compounds, organic traffic is the lowest-cost, highest-intent channel in your marketing mix.

Start here. Stay consistent. Add channels only when your current ones are working. Serenly helps small businesses in Nairobi build this foundation correctly from day one.
    `.trim(),
  },
];

/* ─── Staff picks = best 3 posts by editorial choice ─── */
const STAFF_PICKS = [ALL_POSTS[0], ALL_POSTS[2], ALL_POSTS[5]];

/* ─── Categories for filter ─── */
const CATEGORIES = [
  "All",
  "Digital Marketing",
  "SEO",
  "Social Media",
  "Web Development",
  "E-Commerce",
  "Branding & Design",
  "Design & Print",
  "Paid Advertising",
];

/* ─── Utilities ─── */
function useFadeIn(threshold = 0.1) {
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

function SectionTag({ label, color = "orange" }) {
  return (
    <span className={`section-tag section-tag-${color}`}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          display: "inline-block",
          background:
            color === "orange"
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
        }}
      />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [activePost, setActivePost] = useState(null);

  const nonFeatured = ALL_POSTS.filter((p) => !p.featured);
  const filtered =
    activeCategory === "All"
      ? nonFeatured
      : nonFeatured.filter((p) => p.category === activeCategory);
  const shown = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  if (activePost) {
    return <PostView post={activePost} onBack={() => setActivePost(null)} />;
  }

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      <HeroBanner />
      <FeaturedPost
        post={ALL_POSTS[0]}
        onOpen={() => setActivePost(ALL_POSTS[0])}
      />
      <LatestInsights
        posts={shown}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        hasMore={hasMore}
        loadMore={() => setVisibleCount((v) => v + 3)}
        onOpen={setActivePost}
      />
      <StaffPicks posts={STAFF_PICKS} onOpen={setActivePost} />
    </div>
  );
}

/* ══════ 1. HERO BANNER ══════ */
function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "clamp(260px, 35vh, 380px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-bg-inverse)",
      }}
    >
      <div
        className="bg-line-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
      />
      <div
        className="glow-orange"
        style={{
          position: "absolute",
          width: 500,
          height: 300,
          top: "-20%",
          left: "5%",
          opacity: 0.3,
        }}
      />
      <div
        className="glow-blue"
        style={{
          position: "absolute",
          width: 400,
          height: 300,
          bottom: "-20%",
          right: "8%",
          opacity: 0.25,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-brand-orange)",
            marginBottom: "0.875rem",
          }}
        >
          Insights & Strategies
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "var(--color-neutral-0)",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}
        >
          The Serenly <span className="text-gradient-orange">Blog</span>
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "rgba(245,245,245,0.45)",
          }}
        >
          <a
            href="/"
            style={{ color: "rgba(245,245,245,0.45)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-brand-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,245,245,0.45)")
            }
          >
            Serenly
          </a>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ color: "var(--color-brand-orange)" }}>Blog</span>
        </div>
      </div>
    </section>
  );
}

/* ══════ 2. FEATURED POST — GutenVerse dark card + image split ══════ */
function FeaturedPost({ post, onOpen }) {
  const [ref, visible] = useFadeIn(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{ padding: "4rem 0", background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        {/* GutenVerse: dark background card with white text card LEFT + image RIGHT */}
        <div
          onClick={onOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: hovered ? "var(--shadow-xl)" : "var(--shadow-lg)",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
            transition: "all 0.35s var(--ease-spring)",
            opacity: visible ? 1 : 0,
            transitionDelay: "0ms",
          }}
          className="featured-grid"
        >
          {/* LEFT — white card (GutenVerse style) */}
          <div
            style={{
              background: "var(--color-surface)",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              borderLeft: "4px solid var(--color-brand-orange)",
            }}
          >
            {/* Meta row — GutenVerse: date · tag · comments */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.72rem",
                color: "var(--color-text-tertiary)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <span>{post.date}</span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span style={{ color: "var(--color-brand-orange)" }}>
                Featured
              </span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
                marginBottom: "1.1rem",
                transition: "color 0.2s ease",
                ...(hovered ? { color: "var(--color-brand-orange)" } : {}),
              }}
            >
              {post.title}
            </h2>

            {/* Divider — GutenVerse red line under title */}
            <div
              style={{
                width: 40,
                height: 3,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-blue))",
                marginBottom: "1.25rem",
              }}
            />

            <p
              style={{
                fontSize: "0.975rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
              }}
            >
              {post.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--color-brand-orange)",
              }}
            >
              Read More
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  animation: hovered
                    ? "bounce-x 1.4s ease-in-out infinite"
                    : "none",
                }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Category tag */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
              }}
            >
              <span
                className="section-tag section-tag-orange"
                style={{ fontSize: "0.6rem" }}
              >
                {post.category}
              </span>
            </div>
          </div>

          {/* RIGHT — image */}
          <div
            style={{ position: "relative", overflow: "hidden", minHeight: 320 }}
          >
            <img
              src={post.img}
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.2), transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .featured-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 3. LATEST INSIGHTS — GutenVerse 3-col grid ══════ */
function LatestInsights({
  posts,
  categories,
  activeCategory,
  setActiveCategory,
  hasMore,
  loadMore,
  onOpen,
}) {
  const [ref, visible] = useFadeIn(0.05);

  return (
    <section ref={ref} style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container-site">
        {/* GutenVerse section header: eyebrow + large serif heading */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "0.6rem",
            }}
          >
            Browse and read the latest stuff
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
              }}
            >
              Latest <span className="text-gradient-orange">Insights</span>
            </h2>

            {/* Category filter pills */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
              className="cat-filters"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "var(--radius-full)",
                    border: "1.5px solid",
                    borderColor:
                      activeCategory === cat
                        ? "var(--color-brand-orange)"
                        : "var(--color-border)",
                    background:
                      activeCategory === cat
                        ? "rgba(254,122,54,0.1)"
                        : "transparent",
                    color:
                      activeCategory === cat
                        ? "var(--color-brand-orange)"
                        : "var(--color-text-tertiary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-col post grid — GutenVerse style */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
          className="posts-grid"
        >
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              visible={visible}
              onOpen={onOpen}
            />
          ))}
        </div>

        {/* GutenVerse "More Posts" centred pill button */}
        {hasMore && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={loadMore}
              className="btn btn-primary btn-lg"
              style={{ borderRadius: "var(--radius-full)" }}
            >
              More Posts
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:900px){ .posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:580px){ .posts-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:768px){ .cat-filters { display: none; } }
      `}</style>
    </section>
  );
}

/* ─── Single Post Card — GutenVerse card ─── */
function PostCard({ post, index, visible, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={() => onOpen(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.55s ease ${index * 0.08}s`,
        ...(hovered
          ? {
              borderColor: "rgba(254,122,54,0.35)",
              boxShadow: "var(--shadow-orange)",
              transform: "translateY(-5px)",
            }
          : {}),
      }}
    >
      {/* Image — GutenVerse full-width top image */}
      <div
        style={{
          overflow: "hidden",
          aspectRatio: "16/10",
          position: "relative",
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Category badge overlay */}
        <div
          style={{
            position: "absolute",
            top: "0.875rem",
            left: "0.875rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              color: "var(--color-brand-orange)",
              border: "1px solid rgba(254,122,54,0.3)",
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        {/* GutenVerse: date · tags meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-text-tertiary)",
            marginBottom: "0.875rem",
            flexWrap: "wrap",
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          {post.tags.slice(0, 2).map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 && <span>,</span>}
              <span style={{ color: "var(--color-brand-orange)" }}>{tag}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            lineHeight: 1.3,
            marginBottom: "0.5rem",
            color: hovered
              ? "var(--color-brand-orange)"
              : "var(--color-text-primary)",
            transition: "color 0.2s ease",
          }}
        >
          {post.title}
        </h3>

        {/* GutenVerse: small orange underline after title */}
        <div
          style={{
            width: 32,
            height: 2,
            borderRadius: 1,
            background: "var(--color-brand-orange)",
            marginBottom: "0.875rem",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.2s ease, width 0.3s ease",
            ...(hovered ? { width: 48 } : {}),
          }}
        />

        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.72,
            color: "var(--color-text-secondary)",
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* GutenVerse: "READ MORE →" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: hovered ? "0.75rem" : "0.4rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--color-brand-orange)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "gap 0.2s ease",
          }}
        >
          Read More
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  );
}

/* ══════ 4. STAFF'S PICKS — GutenVerse editorial strip ══════ */
function StaffPicks({ posts, onOpen }) {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site">
        {/* GutenVerse section header */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "0.6rem",
            }}
          >
            You have to read this!
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            Editor's <span className="text-gradient-blue">Picks</span>
          </h2>
        </div>

        {/* Horizontal editorial cards — GutenVerse large landscape cards */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {posts.map((post, i) => (
            <EditorCard
              key={post.id}
              post={post}
              index={i}
              visible={visible}
              onOpen={onOpen}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorCard({ post, index, visible, onOpen, reverse }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onOpen(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "1fr 1.6fr" : "1.6fr 1fr",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.55s ease ${index * 0.12}s, border-color 0.25s, box-shadow 0.25s`,
        ...(hovered
          ? {
              borderColor: "rgba(0,70,255,0.3)",
              boxShadow: "var(--shadow-blue)",
            }
          : {}),
        minHeight: 200,
      }}
      className="editor-card"
    >
      {/* Image side */}
      <div
        style={{
          order: reverse ? 2 : 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: reverse
              ? "linear-gradient(to left, rgba(0,0,0,0.2), transparent 60%)"
              : "linear-gradient(to right, rgba(0,0,0,0.2), transparent 60%)",
          }}
        />
      </div>

      {/* Content side */}
      <div
        style={{
          order: reverse ? 1 : 2,
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: reverse ? "none" : "3px solid var(--color-brand-blue)",
          borderRight: reverse ? "3px solid var(--color-brand-blue)" : "none",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-brand-blue)",
            marginBottom: "0.75rem",
            display: "block",
          }}
        >
          {post.category} · {post.readTime}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            lineHeight: 1.25,
            marginBottom: "0.875rem",
            color: hovered
              ? "var(--color-brand-blue)"
              : "var(--color-text-primary)",
            transition: "color 0.2s ease",
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "var(--color-text-secondary)",
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: hovered ? "0.75rem" : "0.4rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-brand-blue)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "gap 0.2s ease",
          }}
        >
          Read More
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ══════ 5. POST VIEW — full article reader ══════ */
function PostView({ post, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary)", minHeight: "100vh" }}>
      {/* Post hero */}
      <div
        style={{
          position: "relative",
          height: "clamp(320px, 45vh, 480px)",
          overflow: "hidden",
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,12,14,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: 0,
            right: 0,
          }}
        >
          <div className="container-site">
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "rgba(245,245,245,0.6)",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "1rem",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-brand-orange)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.6)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Blog
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                background: "rgba(254,122,54,0.15)",
                border: "1px solid rgba(254,122,54,0.3)",
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-full)",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              {post.category}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "#fff",
                lineHeight: 1.15,
                maxWidth: 720,
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.875rem",
                fontSize: "0.78rem",
                color: "rgba(245,245,245,0.5)",
                fontWeight: 600,
              }}
            >
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div
        className="container-site"
        style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
      >
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {/* Lead */}
          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
              marginBottom: "2rem",
              borderLeft: "3px solid var(--color-brand-orange)",
              paddingLeft: "1.5rem",
              fontStyle: "italic",
            }}
          >
            {post.excerpt}
          </p>

          {/* Body content */}
          <div
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h3
                    key={i}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      color: "var(--color-text-primary)",
                      marginTop: "2.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {para.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              if (para.includes("**")) {
                const parts = para.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} style={{ marginBottom: "1.25rem" }}>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong
                          key={j}
                          style={{
                            color: "var(--color-text-primary)",
                            fontWeight: 700,
                          }}
                        >
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                );
              }
              return (
                <p key={i} style={{ marginBottom: "1.25rem" }}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
                marginRight: "0.5rem",
              }}
            >
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-bg-tertiary)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: "3rem",
              background:
                "linear-gradient(135deg, rgba(254,122,54,0.08), rgba(0,70,255,0.06))",
              border: "1px solid rgba(254,122,54,0.2)",
              borderRadius: "var(--radius-xl)",
              padding: "2rem 2.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-primary)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Ready to put this into action for your business?
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              Serenly helps businesses across Kenya grow with strategy-first
              digital marketing.
            </p>
            <a href="/contact" className="btn btn-primary btn-md">
              Get a Free Consultation
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "2.5rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--color-text-tertiary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-brand-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-tertiary)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to all posts
          </button>
        </div>
      </div>
    </div>
  );
}
