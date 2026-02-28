import React, { useState } from "react";

// ─── SERVICE DATA ──────────────────────────────────────────────────────────────
const servicesData = {
  "web-application": {
    title: "Web Application (Full-Stack System)",
    tagline: "Custom-Built Digital Systems That Power Your Business",
    heroImage:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=900&q=80",
    about: [
      "At Serenly, we design and develop full-stack web applications that go far beyond a simple website. A full-stack web application is a complete digital system — one that combines a powerful backend (servers, databases, APIs, authentication) with a polished, responsive frontend (user interface, navigation, dynamic components). When your business needs more than a landing page, a full-stack web application is the answer.",
      "Our team of senior engineers works across the entire technology stack. On the backend, we leverage frameworks like Django (Python), Node.js, and Laravel (PHP) to build fast, secure, and scalable server-side logic. On the frontend, we use React, Next.js, and Vue.js to create fluid, intuitive interfaces that users love. Every system we build is designed from the ground up with performance, security, and scalability at its core.",
      "We have built systems for startups, growing businesses, and enterprises across East Africa and beyond. Whether you need a multi-tenant SaaS platform, an internal operations dashboard, an e-commerce engine with custom workflows, or a client portal with role-based access — our full-stack development capability means we handle it all under one roof. You get one team, one point of accountability, and one cohesive product.",
    ],
    benefits: [
      "End-to-End Development: We handle everything from architecture design to deployment and post-launch support.",
      "Scalable Architecture: Built to handle thousands of users from day one without performance degradation.",
      "Secure by Design: Authentication, authorization, data encryption, and security audits are built into every project.",
      "API-First Approach: Every system we build exposes clean APIs, making future integrations seamless.",
      "Real-Time Capabilities: We build systems with live data updates using WebSockets and event-driven architecture.",
      "Cross-Platform Compatibility: Your web application works flawlessly across all modern browsers and devices.",
    ],
    faq: [
      {
        q: "What is the difference between a website and a full-stack web application?",
        a: "A website is primarily informational — it presents content to visitors. A full-stack web application is interactive and functional. It has user authentication, stores and processes data in a database, performs business logic on the server, and delivers dynamic, personalized experiences to users. Think of the difference between a brochure and a software product — both live on the web, but one is passive and the other is operational.",
      },
      {
        q: "How long does it take to build a full-stack web application?",
        a: "Timeline depends entirely on scope. A simple web application with authentication, a database, and a few core features can be built in 4–8 weeks. Mid-complexity platforms with multiple user roles, integrations, and custom workflows typically take 2–4 months. Enterprise-grade systems may take 4–8 months or more. At Serenly, we always start with a discovery phase to accurately scope the project before committing to a timeline.",
      },
      {
        q: "Can you build on top of an existing system or do you only start from scratch?",
        a: "We do both. We regularly work with existing codebases — auditing, refactoring, and extending them. However, if an existing system is poorly architected, we will be honest about that and recommend a rebuild. Our goal is always what is best for your long-term product — not just the easiest path forward.",
      },
      {
        q: "Do you provide hosting and deployment support?",
        a: "Yes. We help you choose the right hosting infrastructure — whether that's a cloud provider like AWS, Google Cloud, or DigitalOcean — and we handle deployment pipelines, CI/CD setup, environment configuration, SSL certificates, and domain management. We also offer ongoing maintenance retainers so your system stays up-to-date and performant.",
      },
      {
        q: "What technologies do you use for full-stack development?",
        a: "Our primary frontend technologies are React and Next.js. On the backend, we work with Django (Python), Node.js/Express, and Laravel. For databases, we use PostgreSQL, MySQL, and MongoDB depending on the project's needs. We deploy on AWS, DigitalOcean, Vercel, and Render. Every technology decision is made based on what best serves your specific project.",
      },
    ],
  },
  "mobile-applications": {
    title: "Mobile Applications",
    tagline: "Native & Cross-Platform Apps Built for Performance",
    heroImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
    about: [
      "Mobile is no longer optional — it is where your customers live. At Serenly, we build mobile applications that feel native, perform excellently, and deliver real business value. Whether you need a consumer-facing app on the App Store and Google Play, or an internal mobile tool for your team, we design and engineer mobile products that users actually enjoy using.",
      "We specialize in cross-platform development using React Native and Flutter, which allows us to build a single codebase that runs on both iOS and Android. This approach dramatically reduces development cost and time-to-market without sacrificing quality or performance. For projects that require platform-specific capabilities, we also build fully native iOS (Swift) and Android (Kotlin) applications.",
      "Every mobile app we build goes through rigorous UX design before a single line of code is written. We prototype, test with real users, iterate on feedback, and only then move into development. The result is a mobile product that solves real problems, feels intuitive from the first session, and retains users over the long term.",
    ],
    benefits: [
      "Cross-Platform Efficiency: One codebase, two platforms — iOS and Android — dramatically reducing cost and time.",
      "Offline-First Capability: Apps that work without an internet connection and sync when reconnected.",
      "Push Notifications: Targeted, personalized notifications that drive re-engagement and retention.",
      "App Store Submission: We handle the full submission process for both the Apple App Store and Google Play Store.",
      "Performance Optimized: Smooth 60fps animations, fast load times, and efficient battery usage.",
      "Post-Launch Support: Bug fixes, OS updates, and feature iterations after your app goes live.",
    ],
    faq: [
      {
        q: "Should I build a native app or a cross-platform app?",
        a: "For most businesses, cross-platform (React Native or Flutter) is the right choice. It gives you iOS and Android coverage at roughly 60–70% of the cost of building two separate native apps, with 90% of the performance. Native is only necessary when you need deep hardware integration — like advanced camera processing, AR, or Bluetooth peripherals. We'll advise you honestly on which approach suits your project.",
      },
      {
        q: "How much does a mobile app cost to develop?",
        a: "A simple mobile app with core functionality typically starts from $3,000–$8,000. Mid-complexity apps with backend integration, user authentication, and custom features range from $8,000–$25,000. Complex apps with real-time features, payments, maps, and multi-role systems can go higher. We provide detailed project estimates after a free discovery call.",
      },
      {
        q: "Can you integrate my mobile app with my existing website or backend?",
        a: "Absolutely. We build mobile apps as frontend clients that connect to your existing backend via APIs. If your current system doesn't have an API layer, we can build one. Serenly's full-stack capability means we can handle the backend integration ourselves rather than relying on a third-party team.",
      },
      {
        q: "What happens after my app launches?",
        a: "We offer post-launch maintenance retainers that cover bug fixes, iOS/Android OS updates, performance monitoring, and minor feature additions. We also analyze app store reviews and crash reports to proactively identify and fix issues. A mobile app is a living product — we treat it that way.",
      },
    ],
  },
  "upgrading-existing-website": {
    title: "Upgrading Existing Websites",
    tagline: "Modernize, Optimize, and Elevate Your Digital Presence",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    about: [
      "Not every business needs to start from scratch. If you already have a website but it's slow, outdated, difficult to manage, or failing to convert visitors, a strategic upgrade can deliver transformational results at a fraction of the cost of a full rebuild. At Serenly, we specialize in diagnosing exactly what is wrong with an existing digital presence and executing targeted improvements that move the needle.",
      "Our upgrade process begins with a comprehensive technical audit. We analyze your website's performance metrics (Core Web Vitals, load times, time-to-first-byte), security posture (SSL, headers, vulnerability scanning), SEO health (crawlability, meta structure, schema markup), and user experience (bounce rates, session recordings, heatmaps). This gives us a precise picture of where your current site is losing you traffic, leads, and revenue.",
      "Depending on what the audit reveals, upgrades can range from a design refresh and performance optimization to a full technology migration — moving from a legacy platform to a modern, maintainable stack. We have upgraded WordPress sites, migrated static HTML pages to React/Next.js, rebuilt slow PHP backends with high-performance Node.js APIs, and transformed outdated UIs into modern, conversion-optimized experiences. Whatever your site needs, we execute it with minimal downtime and zero data loss.",
    ],
    benefits: [
      "Performance Optimization: Faster load times, improved Core Web Vitals, and better Google search rankings.",
      "Security Hardening: Patch vulnerabilities, update dependencies, add SSL, and implement security headers.",
      "UI/UX Modernization: Fresh, contemporary design that improves user experience and conversion rates.",
      "SEO Improvement: Technical SEO fixes that improve crawlability, indexability, and search visibility.",
      "Mobile Responsiveness: Ensure your site works perfectly on all devices and screen sizes.",
      "CMS & Maintainability: Upgrade to a manageable content structure so your team can update content without developers.",
    ],
    faq: [
      {
        q: "How do you decide what needs to be upgraded versus rebuilt?",
        a: "We start with a technical audit. If the existing codebase is architecturally sound but needs surface-level improvements, we upgrade. If the foundation is too broken to build on efficiently — poorly written code, deprecated frameworks, no test coverage, unmanageable technical debt — a rebuild is more cost-effective long-term. We present both options honestly and let you decide.",
      },
      {
        q: "Will my website go offline during the upgrade?",
        a: "For most upgrades, no. We work on a staging environment (a private copy of your site) and only push changes to production during a planned maintenance window, typically less than 30 minutes. For major migrations, we plan zero-downtime deployment strategies so your business is never interrupted.",
      },
      {
        q: "Can you upgrade a WordPress site?",
        a: "Yes. WordPress upgrades are one of our most common requests. We handle plugin updates, PHP version migrations, theme overhauls, performance tuning (caching, CDN, image optimization), and security hardening. We can also migrate away from WordPress entirely if a different platform better serves your long-term needs.",
      },
      {
        q: "What if I want to add new features to my existing site?",
        a: "That falls squarely under what we do. We regularly extend existing websites with new functionality — e-commerce capabilities, booking systems, user portals, API integrations, multilingual support, and more. We first assess your current codebase to determine the most efficient way to add what you need.",
      },
    ],
  },
  "payment-systems-integration": {
    title: "Payment Systems Integration",
    tagline: "Secure, Seamless Payment Flows for Your Business",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    about: [
      "Revenue is the lifeblood of your business — and the payment experience is one of the most critical moments in your customer's journey. A complicated, slow, or untrustworthy checkout process costs you sales. At Serenly, we engineer payment systems that are fast, secure, and conversion-optimized, integrating them seamlessly into your web application, mobile app, or e-commerce platform.",
      "We work with all major payment gateways and local African payment solutions. Our integration portfolio includes Stripe (global cards, Apple Pay, Google Pay, SEPA, and more), M-Pesa (including Daraja API for Kenyan businesses), PayPal, Flutterwave (pan-African payments), Pesapal, and direct bank transfer orchestration. Whether your customers are paying from Nairobi, London, or New York, we ensure the transaction is smooth, secure, and successful.",
      "Beyond basic payment collection, we build comprehensive payment infrastructure. This includes subscription billing with automated recurring charges, refund management, multi-currency support, split payments for marketplace models, invoice generation, financial reporting dashboards, and webhook integrations that trigger post-payment workflows. We also handle the compliance side — PCI-DSS considerations, data handling, and secure credential management — so you can focus on your business.",
    ],
    benefits: [
      "Multi-Gateway Support: Stripe, M-Pesa, PayPal, Flutterwave, Pesapal — we integrate what your customers prefer.",
      "Subscription Billing: Automated recurring payments with trial periods, proration, and dunning management.",
      "Secure Transactions: PCI-DSS compliant implementation, encrypted data handling, and fraud detection.",
      "Multi-Currency: Accept payments in KES, USD, EUR, GBP, and 130+ currencies with real-time conversion.",
      "Webhook Automation: Post-payment triggers that automatically provision services, send receipts, and update records.",
      "Financial Reporting: Custom dashboards showing revenue, refunds, failed payments, and subscription metrics.",
    ],
    faq: [
      {
        q: "Which payment gateways do you support?",
        a: "We integrate with Stripe, M-Pesa (Daraja API), PayPal, Flutterwave, Pesapal, Paystack, Square, and direct bank APIs. For Kenyan and East African businesses, we strongly recommend M-Pesa and Flutterwave as primary options, supplemented by Stripe for international card payments. We'll recommend the best combination based on your customer base and business model.",
      },
      {
        q: "How do you handle payment security?",
        a: "We never store raw card data on your servers. All sensitive payment information is tokenized and handled directly by the payment gateway (Stripe, etc.), which holds PCI-DSS Level 1 certification. We implement HTTPS everywhere, CSRF protection, webhook signature verification, and rate limiting on payment endpoints. Security is not an afterthought — it is the foundation of everything we build.",
      },
      {
        q: "Can you integrate M-Pesa STK Push for my Kenyan business?",
        a: "Absolutely. M-Pesa STK Push (via Safaricom's Daraja API) is one of our core integration capabilities. We implement the full flow: business number setup, OAuth authentication, STK Push initiation, callback handling, and payment confirmation. We also build the reconciliation layer so your records always match Safaricom's records.",
      },
      {
        q: "What if a payment fails or needs to be refunded?",
        a: "We build complete payment lifecycle management, including failed payment handling (automatic retries, customer notifications, grace periods for subscriptions), refund workflows (full and partial), and dispute management. Every payment event is logged with full audit trails so your support team always has the context they need.",
      },
    ],
  },
  "dashboards-database-logic": {
    title: "Dashboards & Database Logic",
    tagline: "Turn Your Data Into a Competitive Advantage",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    about: [
      "Data is only valuable when you can see it, understand it, and act on it. At Serenly, we build custom analytics dashboards and admin interfaces that give you real-time visibility into the metrics that matter most to your business. We also architect the database systems and business logic that sit beneath those dashboards — ensuring your data is structured, performant, and reliable.",
      "Our dashboard development process starts with understanding your data model and your decision-making process. What questions do you need your data to answer? Who needs to see which data? How frequently does data change? What actions should users be able to take from the dashboard? These questions shape the architecture before we write a single line of code. We then design and build interactive dashboards with charts, tables, filters, date ranges, export capabilities, and drill-down views that make data intuitive for non-technical users.",
      "On the database side, we design schemas that are normalized, indexed, and optimized for your specific query patterns. We have worked with relational databases (PostgreSQL, MySQL), NoSQL databases (MongoDB, Firebase), and time-series databases (InfluxDB, TimescaleDB) for IoT and analytics workloads. We also build the business logic layer — the rules, calculations, validations, and workflows that sit between your raw data and your users. Complex pricing models, inventory rules, commission calculations, approval chains — we translate your business rules into reliable, testable code.",
    ],
    benefits: [
      "Real-Time Dashboards: Live data visualizations with charts, KPI cards, trend lines, and geographic maps.",
      "Role-Based Access: Different users see different data — executives, managers, staff, and clients all get tailored views.",
      "Database Performance: Optimized queries, proper indexing, and caching strategies that keep your system fast at scale.",
      "Custom Reports: Scheduled and on-demand reports exportable to PDF, Excel, and CSV formats.",
      "Audit Trails: Complete logs of who did what and when — essential for compliance and accountability.",
      "Data Integrity: Validation rules, constraints, and transaction management that keep your data clean and consistent.",
    ],
    faq: [
      {
        q: "What charting libraries do you use for dashboards?",
        a: "We primarily use Recharts, Chart.js, and ApexCharts for React-based dashboards. For more advanced data visualization needs, we use D3.js, which gives us complete control over every visual element. For geographic data, we use Mapbox and Leaflet. The choice of library depends on your specific visualization requirements and performance needs.",
      },
      {
        q: "Can you connect my dashboard to an existing database?",
        a: "Yes, connecting to existing data sources is a core part of what we do. We can connect to PostgreSQL, MySQL, MongoDB, SQLite, Google Sheets, REST APIs, GraphQL endpoints, and more. We build an API layer between your data source and the dashboard that handles querying, aggregation, caching, and access control.",
      },
      {
        q: "How do you handle large datasets in dashboards?",
        a: "Large datasets require careful architecture. We implement database-level aggregations (so the query does the heavy lifting, not the frontend), pagination and infinite scroll for tabular data, server-side filtering and sorting, time-series bucketing for historical data, and Redis caching for expensive queries. The goal is sub-second response times even with millions of records.",
      },
      {
        q: "Can you migrate our data from one database to another?",
        a: "Yes. Database migrations are complex but we handle them regularly. We write migration scripts, validate data integrity at each step, run parallel systems during the transition, and execute the final cutover with minimal downtime. We've migrated from MySQL to PostgreSQL, MongoDB to PostgreSQL, and legacy flat-file systems to relational databases.",
      },
    ],
  },
  "generative-ai-services": {
    title: "Generative AI Services",
    tagline: "Build Smarter Products with Embedded Artificial Intelligence",
    heroImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    about: [
      "Artificial intelligence is no longer a future technology — it is a present competitive advantage. At Serenly, we integrate generative AI capabilities directly into your web applications, mobile apps, and business workflows. We are not an AI research lab — we are engineers who know how to take the most powerful AI models in the world and make them work for your specific business problems.",
      "Our generative AI services span a wide range of use cases. We build AI-powered customer support chatbots that handle complex queries with contextual understanding, reducing support load by 40–70%. We develop content generation systems that produce product descriptions, blog posts, social media copy, and reports at scale. We implement AI-powered search systems that understand natural language queries rather than forcing users to guess the right keywords. We create recommendation engines that personalize the user experience based on behavior, preferences, and context.",
      "Behind every AI integration we build is a rigorous engineering process. We work primarily with OpenAI's GPT-4 and Claude (Anthropic) for language tasks, Stable Diffusion and DALL·E for image generation, and Whisper for speech-to-text. We design the prompt engineering strategy, build the retrieval-augmented generation (RAG) pipelines that give AI access to your business's private knowledge base, handle the API infrastructure, implement rate limiting and cost controls, and build the feedback loops that allow the system to improve over time.",
    ],
    benefits: [
      "Custom AI Chatbots: Context-aware assistants trained on your business knowledge that handle customer queries 24/7.",
      "RAG Pipelines: AI systems that can access and reason over your documents, databases, and internal knowledge bases.",
      "Content Generation: AI-powered tools that produce high-quality, on-brand content at scale.",
      "AI-Powered Search: Natural language search that understands intent, not just keywords.",
      "Automation Workflows: AI agents that execute multi-step business processes autonomously.",
      "Cost-Controlled Integration: Usage monitoring, rate limiting, and caching strategies that keep AI costs predictable.",
    ],
    faq: [
      {
        q: "Which AI models do you work with?",
        a: "We work with OpenAI (GPT-4o, GPT-4, GPT-3.5), Anthropic (Claude 3 Opus, Sonnet, Haiku), Google (Gemini Pro), and open-source models via Hugging Face and Ollama. Model selection depends on your use case, latency requirements, and budget. For most business applications, GPT-4o or Claude 3 Sonnet offer the best balance of capability and cost.",
      },
      {
        q: "What is RAG and why does it matter?",
        a: "RAG stands for Retrieval-Augmented Generation. It is the technique that allows an AI model to answer questions about your specific data — your documents, product catalog, knowledge base, or database — rather than only using its pre-trained knowledge. Without RAG, an AI chatbot is generic. With RAG, it becomes a domain expert on your business. We build production-grade RAG pipelines using vector databases (Pinecone, Weaviate, pgvector) and embedding models.",
      },
      {
        q: "How do you control AI costs?",
        a: "AI API calls are charged per token (roughly per word). Without proper controls, costs can escalate quickly. We implement several cost control strategies: intelligent caching (returning cached responses for similar queries), prompt compression (reducing token usage without losing meaning), model routing (using cheaper models for simple queries, powerful models for complex ones), and hard usage limits with alerting. We build you a cost monitoring dashboard so you always know what you're spending.",
      },
      {
        q: "Can you build an AI system that learns from our data over time?",
        a: "Yes. There are two approaches: fine-tuning (retraining a model on your specific data) and RAG (giving a model access to your data at inference time). For most business use cases, RAG is faster, cheaper, and more maintainable. Fine-tuning is appropriate when you need the model to adopt a very specific tone, format, or domain expertise that can't be achieved through prompting alone. We'll advise you on the right approach after understanding your use case.",
      },
      {
        q: "Is AI integration secure? Will my data be used to train public models?",
        a: "With OpenAI's API (not ChatGPT), Anthropic's API, and most enterprise AI providers, your data is NOT used to train their models. We use API access exclusively — never consumer products — for client work. We also implement data minimization (sending only what the AI needs, not your entire database), and for sensitive use cases, we can deploy open-source models on your own infrastructure with zero data leaving your servers.",
      },
    ],
  },
};

// ─── INDIVIDUAL SERVICE PAGE ───────────────────────────────────────────────────
function ServiceDetailPage({ serviceId, onBack }) {
  const [openFaq, setOpenFaq] = useState(null);
  const service = servicesData[serviceId];

  if (!service) return <div>Service not found.</div>;

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        background: "#fff",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .detail-container { max-width: 780px; margin: 0 auto; padding: 0 24px 80px; }

        .hero-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 16px;
          margin: 32px 0;
          display: block;
        }

        .section-title {
          font-size: 24px;
          font-weight: 800;
          color: #111;
          margin: 48px 0 20px;
          letter-spacing: -0.5px;
        }

        .body-text {
          font-size: 15px;
          color: #555;
          line-height: 1.85;
          margin-bottom: 18px;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 14px;
        }
        .benefit-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1d6ef5;
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .benefit-dot svg { display: block; }
        .benefit-text {
          font-size: 14.5px;
          color: #444;
          line-height: 1.65;
        }
        .benefit-label {
          font-weight: 700;
          color: #111;
        }

        .faq-section-title {
          font-size: 28px;
          font-weight: 800;
          color: #111;
          margin: 56px 0 8px;
          letter-spacing: -0.5px;
        }
        .faq-section-sub {
          font-size: 14px;
          color: #888;
          margin-bottom: 28px;
        }

        .faq-item {
          border-bottom: 1px solid #eee;
          padding: 0;
        }
        .faq-question {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 20px 0;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          color: #111;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          transition: color 0.2s;
        }
        .faq-question.open { color: #1d6ef5; }
        .faq-answer {
          font-size: 14.5px;
          color: #666;
          line-height: 1.8;
          padding-bottom: 20px;
          max-width: 680px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          font-family: inherit;
          margin-top: 40px;
          transition: background 0.2s;
        }
        .back-btn:hover { background: #e5e7eb; }

        .cta-band {
          background: #1d6ef5;
          border-radius: 16px;
          padding: 48px 40px;
          text-align: center;
          margin-top: 64px;
        }
        .cta-band h3 { font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .cta-band p { font-size: 15px; color: rgba(255,255,255,0.85); margin-bottom: 28px; }
        .cta-band-btn {
          background: #fff;
          color: #1d6ef5;
          border: none;
          border-radius: 10px;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.15s;
        }
        .cta-band-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div className="detail-container">
        <button className="back-btn" onClick={onBack}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Solutions
        </button>

        {/* Page title */}
        <div style={{ marginTop: 40 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1d6ef5",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Serenly · Solutions
          </p>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            {service.title}
          </h1>
          <p style={{ fontSize: 17, color: "#888", fontStyle: "italic" }}>
            {service.tagline}
          </p>
        </div>

        {/* Hero image */}
        <img className="hero-img" src={service.heroImage} alt={service.title} />

        {/* About this service */}
        <h2 className="section-title">About This Service</h2>
        {service.about.map((para, i) => (
          <p className="body-text" key={i}>
            {para}
          </p>
        ))}

        {/* Customer Benefits */}
        <h2 className="section-title">What You Get</h2>
        <p className="body-text" style={{ marginBottom: 24 }}>
          When you work with Serenly on {service.title.toLowerCase()}, you are
          investing in a complete, professional engineering engagement — not
          just a deliverable. Here is exactly what that means in practice:
        </p>
        {service.benefits.map((b, i) => {
          const [label, ...rest] = b.split(":");
          return (
            <div className="benefit-item" key={i}>
              <div className="benefit-dot">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="benefit-text">
                <span className="benefit-label">{label}: </span>
                {rest.join(":")}
              </p>
            </div>
          );
        })}

        {/* Why Serenly */}
        <h2 className="section-title">Why Serenly?</h2>
        <p className="body-text">
          Serenly is a full-service digital agency based in Kenya, serving
          clients across East Africa and globally. We bring together expertise
          in development, design, marketing, and brand identity under one roof —
          which means you always have a single, accountable partner for your
          digital infrastructure.
        </p>
        <p className="body-text">
          Unlike freelancers, we operate as a structured agency with project
          management, code review processes, documentation standards, and
          quality assurance built into every engagement. Unlike large
          international agencies, we are close to our clients — accessible,
          responsive, and genuinely invested in your outcomes.
        </p>
        <p className="body-text">
          Every project at Serenly begins with a discovery session where we
          listen first and propose second. We do not sell solutions before we
          understand problems. Our proposals are detailed, our timelines are
          realistic, and our communication throughout a project is consistent
          and transparent. We build long-term relationships, not one-off
          transactions.
        </p>

        {/* FAQ */}
        <h2 className="faq-section-title">Discover Your Query Here</h2>
        <p className="faq-section-sub">
          Common questions about {service.title}
        </p>

        {service.faq.map((item, i) => (
          <div className="faq-item" key={i}>
            <button
              className={`faq-question${openFaq === i ? " open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{item.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            {openFaq === i && (
              <div className="faq-answer">
                {item.q === service.faq[0].q && (
                  <span style={{ color: "#1d6ef5", fontWeight: 600 }}></span>
                )}
                {item.a}
              </div>
            )}
          </div>
        ))}

        {/* CTA band */}
        <div className="cta-band">
          <h3>Ready to Get Started?</h3>
          <p>
            Book a free 30-minute discovery call. No sales pitch — just an
            honest conversation about your project.
          </p>
          <button className="cta-band-btn">Book a Free Consultation</button>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES GRID ─────────────────────────────────────────────────────────────
const servicesList = [
  {
    id: "web-application",
    title: "Web Application (Full-Stack System)",
    description:
      "We architect and build powerful, scalable full-stack web applications — from complex dashboards to enterprise-grade SaaS platforms.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    featured: true,
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description:
      "Cross-platform and native mobile apps built for speed, reliability, and a seamless experience on iOS and Android.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: "upgrading-existing-website",
    title: "Upgrading Existing Websites",
    description:
      "We audit, modernize, and optimize outdated websites — performance, security, UX, and SEO all included.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    id: "payment-systems-integration",
    title: "Payment Systems Integration",
    description:
      "Stripe, M-Pesa, Flutterwave, PayPal — we integrate secure payment gateways with subscription billing and financial reporting.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "dashboards-database-logic",
    title: "Dashboards & Database Logic",
    description:
      "Custom analytics dashboards, admin panels, and complex database architectures that turn raw data into actionable insights.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "generative-ai-services",
    title: "Generative AI Services",
    description:
      "AI chatbots, RAG pipelines, content generators, and intelligent automation — cutting-edge AI embedded into your product.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 8v4l3 3" />
        <circle cx="18" cy="5" r="3" />
      </svg>
    ),
  },
];

// ─── ROOT APP ──────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const [activeService, setActiveService] = useState(null);

  if (activeService) {
    return (
      <ServiceDetailPage
        serviceId={activeService}
        onBack={() => setActiveService(null)}
      />
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        background: "#fff",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }

        .card {
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 30px 26px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover { transform: translateY(-5px); box-shadow: 0 14px 40px rgba(0,0,0,0.10); }
        .card.featured {
          background: #1d6ef5;
          border-color: #1d6ef5;
        }

        .icon-circle {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: #1d6ef5;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          margin-bottom: 18px;
        }
        .card.featured .icon-circle { background: rgba(255,255,255,0.22); }

        .card-title { font-size: 16px; font-weight: 700; color: #111; margin-bottom: 10px; line-height: 1.35; }
        .card.featured .card-title { color: #fff; }
        .card-desc { font-size: 13px; color: #777; line-height: 1.7; }
        .card.featured .card-desc { color: rgba(255,255,255,0.82); }

        .read-more-link {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 18px; font-size: 13px; font-weight: 600;
          color: #1d6ef5; background: none; border: none;
          font-family: inherit; cursor: pointer; padding: 0;
          transition: gap 0.15s;
        }
        .read-more-link:hover { gap: 9px; }
        .card.featured .read-more-link { color: #fff; }
      `}</style>

      {/* Section header */}
      <div style={{ textAlign: "center", padding: "70px 32px 50px" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1d6ef5",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          What We Build
        </p>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#111",
            letterSpacing: "-1.5px",
            marginBottom: 16,
          }}
        >
          Our Solutions
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#888",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          From full-stack web systems to AI-powered products — Serenly builds
          the digital infrastructure your business needs to grow, scale, and
          compete.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid">
        {servicesList.map((s) => (
          <div
            key={s.id}
            className={`card${s.featured ? " featured" : ""}`}
            onClick={() => setActiveService(s.id)}
          >
            <div className="icon-circle">{s.icon}</div>
            <div className="card-title">{s.title}</div>
            <div className="card-desc">{s.description}</div>
            <button className="read-more-link">
              Read More
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
