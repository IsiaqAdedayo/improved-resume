export const PERSON = {
  name: "Adedayo Showande",
  initials: "A.S",
  role: "Senior Frontend Engineer",
  location: "Lagos, Nigeria",
  email: "hadedaryor@gmail.com",
  phone: "+234 810 460 2568",

  bio: "Senior Frontend Engineer and Frontend Team Lead with 4+ years of experience building and owning production web applications. I specialise in React, Next.js, and TypeScript, with hands-on experience leading frontend architecture, making technical decisions, collaborating across design and backend teams, and mentoring engineers. I've owned products from technical discovery and architecture through implementation, deployment, and long-term iteration across marketplace, e-commerce, and creator-platform products.",

  github: "https://github.com/IsiaqAdedayo",
  linkedin:
    "https://www.linkedin.com/in/showande-adedayo-789a42195/",
  twitter: "https://x.com/imdahdayo",
  resume:
    "https://drive.google.com/file/d/1BbR19EFCTn-ptzSGFXs0JNQXY0pzV5Bl/view?usp=sharing",
};

export const STATS = [
  { n: "4+", l: "Years Experience" },
  { n: "$2M+", l: "VC-Backed Product" },
  { n: "3+", l: "Production Platforms" },
  { n: "E2E", l: "Feature Ownership" },
];

export const TAB_ITEMS = [
  {
    label: "Architect",
    desc: "Designing maintainable frontend architecture, component systems, state management, and data flows for production applications.",
  },
  {
    label: "Build",
    desc: "Building scalable React and Next.js applications with TypeScript, reusable components, API integrations, and responsive interfaces.",
  },
  {
    label: "Lead",
    desc: "Driving frontend technical decisions, participating in architectural and design reviews, and working closely with backend and product teams.",
  },
  {
    label: "Mentor",
    desc: "Helping engineers understand complex codebases, improve engineering practices, and grow into stronger, more independent developers.",
  },
];

export const PROJECTS = [
  {
    index: "01",
    title: "ShowRepublic",
    tag: "Creator platform · Next.js · NestJS · TypeScript",
    tagline:
      "A subscription-based video platform enabling creators to build reality shows and monetize their audiences.",
    desc: "Contributing to the development of a creator-economy platform spanning frontend experiences and backend services. Focus areas include application architecture, authentication, protected routes, subscription access control, creator workflows, and API-driven product features.",
    tech: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Tailwind CSS",
      "REST APIs",
    ],
    link: "https://showrepublic.tv",
    github: "",
    badge: "Production · Live",
    tint: "rgba(17, 137, 244, 0.332)",
    glow: "rgb(17, 137, 244)",
    desktopImg: "/screenshots/showrepublic-desktop.png",
    mobileImg: "/screenshots/showrepublic-mobile.png",
    beforeImg: null as string | null, // Add a wireframe/early screenshot path here to enable the Before/After slider
  },

  {
    index: "02",
    title: "Filmmakers Mart",
    tag: "Marketplace · Next.js · TypeScript · GraphQL",
    tagline:
      "VC-backed marketplace connecting Nigeria's film professionals, businesses, and service providers.",
    desc: "Long-term frontend ownership of a production marketplace serving hundreds of active users. Led frontend architecture and technical direction while delivering core marketplace, provider dashboard, account, and e-commerce experiences in collaboration with product, design, and backend teams.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "GraphQL",
      "Zustand",
      "Ant Design",
      "Tailwind CSS",
    ],
    link: "https://filmmakersmart.com",
    github: null,
    badge: "Production · VC-Backed",
    tint: "rgba(194, 65, 12, 0.18)",
    glow: "rgba(194, 65, 12, 0.08)",
    desktopImg: "/screenshots/fmm-desktop.png",
    mobileImg: "/screenshots/fmm-mobile.png",
    beforeImg: null as string | null,
  },

  {
    index: "03",
    title: "The Mindful Care",
    tag: "Healthcare · Next.js · Framer Motion",
    tagline:
      "Responsive healthcare platform focused on accessibility, performance, and patient experience.",
    desc: "Built a responsive healthcare website with a strong focus on accessibility, SEO, performance, responsive behaviour, and clear patient journeys across devices.",
    tech: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
    ],
    link: "https://www.themindfulcare.com/",
    github: null,
    badge: "Production · Live",
    tint: "rgba(74, 124, 89, 0.18)",
    glow: "rgba(74, 124, 89, 0.08)",
    desktopImg: "/screenshots/mindful-desktop.png",
    mobileImg: "/screenshots/mindful-mobile.png",
    beforeImg: null as string | null,
  },
];

export const OPEN_SOURCE = [
  {
    index: "04",
    title: "Invoice Builder API",
    tagline:
      "Production-style NestJS API for invoice workflows, customer management, calculations, and role-based operations.",
    tech: ["TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    github: "https://github.com/IsiaqAdedayo/invoice-builder-api",
    badge: "Open Source",
    stars: 4,
    language: "TypeScript",
    lastCommit: "2 months ago",
  },
  {
    index: "05",
    title: "Event App",
    tagline:
      "Full-stack event platform with event discovery, RSVP, bookmarking, media uploads, and state-driven user interactions.",
    tech: ["Next.js", "TypeScript", "NestJS", "Prisma"],
    github: "https://github.com/IsiaqAdedayo/Event-app",
    badge: "Open Source",
    stars: 0,
    language: "TypeScript",
    lastCommit: "Recent",
  },
  {
    index: "06",
    title: "Event App Mobile",
    tagline:
      "React Native mobile experience for discovering events, viewing event details, and managing RSVP interactions.",
    tech: ["React Native", "TypeScript", "Expo"],
    github: "https://github.com/IsiaqAdedayo/Event-app-mobile",
    badge: "Open Source",
    stars: 0,
    language: "TypeScript",
    lastCommit: "Recent",
  },
];

export const EXPERIENCE = [
  {
    period: "Jan 2026 - Present",
    role: "Fullstack Engineer",
    company: "ShowRepublic — United Kingdom",
    url: "https://showrepublic.tv",
    type: "Contract",

    bullets: [
      "Contributing to the architecture and development of a subscription-based creator platform using Next.js, TypeScript, and NestJS.",

      "Own frontend features across creator-facing experiences, authentication, protected routes, subscription access control, and API-driven workflows.",

      "Contribute to NestJS backend services for user management, media delivery, and payment-related workflows, working across the frontend/backend boundary.",

      "Work closely with product and design to translate product requirements into maintainable interfaces and consistent user experiences.",

      "Make frontend implementation decisions around component structure, data handling, rendering strategies, and reusable patterns as the product evolves.",

      "Improve application performance through rendering optimisation, efficient data handling, and reducing unnecessary client-side work.",

      "Participate in technical discussions around application architecture, implementation approaches, and trade-offs as new product capabilities are introduced.",

      "Use AI-assisted engineering tools including GitHub Copilot and Claude to accelerate implementation and reduce repetitive development work while maintaining code quality.",
    ],

    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "Tailwind CSS",
      "REST APIs",
      "Git",
    ],
  },

  {
    period: 'Dec 2021 — Dec 2025',
    role: "Senior Frontend Engineer / Frontend Team Lead",
    company: "Filmmakers Mart (Recce Solutions)",
    url: "https://filmmakersmart.com",
    type: "Full-time · 4+ years",

    bullets: [
      "Led frontend engineering for a production marketplace connecting professionals and businesses across Nigeria's film industry, serving hundreds of active users.",

      "Owned frontend technical direction, with frontend architectural and implementation decisions reviewed through me as the frontend team lead.",

      "Led architectural reviews and contributed to technical decisions around application structure, component architecture, state management, API integration, routing, performance, and maintainability.",

      "Designed and maintained scalable frontend architecture using React, Next.js App Router, and TypeScript, establishing reusable patterns across marketplace, provider, account, and e-commerce experiences.",

      "Participated in design reviews with product, UI/UX, and backend teams, evaluating proposed experiences and translating product requirements into technically sound, production-ready implementations.",

      "Collaborated closely with backend engineers on API contracts, GraphQL and REST integrations, data flows, and implementation trade-offs across complex marketplace workflows.",

      "Led development and continuous improvement of provider dashboards, marketplace experiences, and e-commerce flows, balancing product requirements with usability, responsiveness, performance, and maintainability.",

      "Mentored junior engineers by helping them understand the codebase, improve engineering practices, make better technical decisions, and grow into stronger, more independent developers.",

      "Reviewed and guided frontend implementations to maintain consistency with established architectural patterns, engineering standards, and product requirements.",

      "Owned frontend features throughout their lifecycle — from technical discovery and architectural decisions through implementation, review, deployment, maintenance, and iteration.",

      "Contributed to the technical foundation for a planned React Native mobile application, considering shared patterns and future web/mobile feature parity.",

      "Contributed to a VC-backed product that went on to raise over $2M in funding.",
    ],

    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Zustand",
      "Ant Design",
      "Tailwind CSS",
      "Git",
    ],
  },

  {
    period: "Jan 2021 — Nov 2021",
    role: "Frontend Developer",
    company: "OneBuddy Inc. (Credmart)",
    url: null,
    type: "Remote · 11 months",

    bullets: [
      "Built and maintained React and TypeScript interfaces for customer-facing web applications and e-commerce experiences.",

      "Redesigned client websites and improved UI consistency, responsive behaviour, and overall user experience.",

      "Maintained and enhanced e-commerce functionality, focusing on reliable user journeys and production stability.",

      "Worked with backend engineers to integrate GraphQL and Node.js services in a remote collaborative environment.",
    ],

    tech: ["React", "TypeScript", "Node.js", "GraphQL"],
  },
];

/* ── Skill depth scale ─────────────────────────────────────
   Lead  — architected and owned in production
   Build — shipped production features with this
   Use   — integrates confidently
   Learn — used in real projects
──────────────────────────────────────────────────────────── */
export type SkillDepth = "Lead" | "Build" | "Use" | "Learn";

export interface SkillEntry {
  name: string;
  depth: SkillDepth;
  years?: string;
}

export const SKILLS: Record<string, SkillEntry[]> = {
  Languages: [
    { name: "TypeScript", depth: "Lead", years: "4yr" },
    { name: "JavaScript (ES6+)", depth: "Lead", years: "5yr" },
    { name: "HTML5", depth: "Lead", years: "5yr" },
    { name: "CSS3", depth: "Lead", years: "5yr" },
  ],

  "Frontend Engineering": [
    { name: "React", depth: "Lead", years: "4yr" },
    { name: "Next.js (App Router)", depth: "Lead", years: "4yr" },
    { name: "React Native", depth: "Use", years: "1yr" },
    { name: "Component Architecture", depth: "Lead", years: "4yr" },
    { name: "Responsive UI", depth: "Lead", years: "4yr" },
    { name: "Frontend Performance", depth: "Build", years: "4yr" },
  ],

  "Backend & APIs": [
    { name: "Node.js", depth: "Use", years: "2yr" },
    { name: "NestJS", depth: "Build", years: "1yr" },
    { name: "GraphQL", depth: "Build", years: "2yr" },
    { name: "REST APIs", depth: "Lead", years: "4yr" },
    { name: "Apollo Client", depth: "Build", years: "2yr" },
  ],

  "State & Styling": [
    { name: "Zustand", depth: "Build", years: "3yr" },
    { name: "Redux Toolkit", depth: "Use", years: "2yr" },
    { name: "Tailwind CSS", depth: "Lead", years: "4yr" },
    { name: "Ant Design", depth: "Lead", years: "4yr" },
    { name: "Styled Components", depth: "Lead", years: "4yr" },
    { name: "Chakra UI", depth: "Use", years: "1yr" },
  ],

  "Testing & Quality": [
    { name: "Jest", depth: "Use", years: "2yr" },
    { name: "Playwright", depth: "Use", years: "2yr" },
    { name: "API Testing", depth: "Use", years: "2yr" },
    { name: "Code Maintainability", depth: "Lead", years: "4yr" },
  ],

  "Tools & Workflow": [
    { name: "Git", depth: "Lead", years: "4yr" },
    { name: "GitHub", depth: "Lead", years: "4yr" },
    { name: "Figma", depth: "Use", years: "2yr" },
    { name: "Vercel", depth: "Build", years: "4yr" },
    { name: "Postman", depth: "Build", years: "3yr" },
    { name: "AI-Assisted Dev", depth: "Build", years: "2yr" },
  ],
};

export const SKILL_MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "NestJS",
  "GraphQL",
  "REST APIs",
  "Zustand",
  "React Native",
  "Tailwind CSS",
  "Redux Toolkit",
  "Ant Design",
  "Apollo Client",
  "Jest",
  "Playwright",
  "PostgreSQL",
  "Docker",
  "Git",
  "GitHub",
  "Vercel",
];

/* ── Social proof ────────────────────────────────────────── */
// PLACEHOLDER: Replace these with real testimonials from LinkedIn recommendations,
// colleagues, or clients. The component is ready — just swap the quotes.
export const TESTIMONIALS = [
  {
    name: "Kingsley Asoegwu · Product Manager",
    title: "Product Manager",
    company: "Filmmakers Mart",
    quote:
      "Adedayo is a frontend developer with an exceptional eye for design and a deep understanding of user experience. His ability to translate complex requirements into elegant, intuitive interfaces is second to none. He is a pleasure to work with and a valuable asset to any team.",
    initials: "PM",
    linkedinUrl: "https://www.linkedin.com/in/asoegwu/",
  },
  {
    name: "Philemon Eniola · Colleague",
    title: "Frontend Engineer",
    company: "Filmmakers Mart",
    quote: "Adedayo is a strong problem-solver. He takes the time to fully understand a problem before diving into implementation, and he's always willing to put in the extra effort to ensure that the solution is both robust and maintainable. He's also a great team player and a pleasure to work with.",
    initials: "FE",
    linkedinUrl: "https://www.linkedin.com/in/philemon-eniola/",
  },
];

export const EDUCATION = [
  {
    year: "2020",
    title: "Certificate in Web Programming (React)",
    org: "HIIT PLC",
  },

  {
    year: "2019",
    title: "Certificate in Web Design & Development",
    org: "HIIT PLC",
  },

  {
    year: "2012–2016",
    title: "BSc Physics",
    org: "University of Lagos",
  },
];
