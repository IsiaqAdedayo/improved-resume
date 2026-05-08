export const PERSON = {
  name: "Adedayo Showande",
  initials: "A.S",
  role: "Senior Frontend Engineer",
  location: "Lagos, Nigeria",
  email: "hadedaryor@gmail.com",
  phone: "+234 810 460 2568",
  bio: "Senior Frontend Engineer with 4+ years building production-grade web applications. I own features end-to-end — from architecture decisions to pixel-perfect delivery — across marketplace and e-commerce platforms used by hundreds of active users.",
  github: "https://github.com/IsiaqAdedayo",
  linkedin: "https://www.linkedin.com/in/showande-adedayo-789a42195/",
  twitter: "https://x.com/imdahdayo",
  resume:
    "https://drive.google.com/file/d/1BbR19EFCTn-ptzSGFXs0JNQXY0pzV5Bl/view?usp=sharing",
};

export const STATS = [
  { n: "4+", l: "Years Experience" },
  { n: "$2M+", l: "VC-Backed Product" },
  { n: "3+", l: "Production Apps" },
  { n: "100%", l: "Client Satisfaction" },
];

export const TAB_ITEMS = [
  {
    label: "Design",
    desc: "Translating Figma to pixel-perfect, accessible interfaces with obsessive attention to detail.",
  },
  {
    label: "Build",
    desc: "Architecting scalable React & Next.js applications with clean, maintainable TypeScript.",
  },
  {
    label: "Ship",
    desc: "Deploying production-ready features fast — from local to live with CI/CD and Vercel.",
  },
  {
    label: "Maintain",
    desc: "Owning features long-term — performance monitoring, refactoring, and iterating on feedback.",
  },
];

export const PROJECTS = [
  {
    index: "01",
    title: "ShowRepublic",
    tag: "Video platform · Next.js · TypeScript",
    tagline:
      "Create your own reality show and get paid directly by your fans through subscriptions.",
    desc: "Showrepublic is a video platform that allows creators to create their own reality shows and get paid directly by their fans through subscriptions.",
    tech: ["Next.js", "TypeScript", "NestJS", "Tailwind CSS", "REST APIs"],
    link: "https://showrepublic.tv",
    github: "",
    badge: "Production · Live",
    tint: "rgba(17, 137, 244, 0.332)",
    glow: "rgb(17, 137, 244)",
    desktopImg: "/screenshots/showrepublic-desktop.png",
    mobileImg: "/screenshots/showrepublic-mobile.png",
  },
  {
    index: "02",
    title: "Filmmakers Mart",
    tag: "Marketplace · Next.js · TypeScript",
    tagline:
      "Nigeria's film industry marketplace — VC-backed, hundreds of active users.",
    desc: "Led frontend architecture for a VC-backed marketplace platform connecting Nigeria's film professionals. Built scalable Next.js App Router application with provider dashboards, e-commerce flows, and GraphQL API integration.",
    tech: [
      "Next.js",
      "TypeScript",
      "Ant Design",
      "Zustand",
      "Tailwind CSS",
      "GraphQL",
    ],
    link: "https://filmmakersmart.com",
    github: null,
    badge: "Production · Live",
    tint: "rgba(194, 65, 12, 0.18)",
    glow: "rgba(194, 65, 12, 0.08)",
    desktopImg: "/screenshots/fmm-desktop.png",
    mobileImg: "/screenshots/fmm-mobile.png",
  },
  {
    index: "03",
    title: "The Mindful Care",
    tag: "Healthcare · Next.js · Framer Motion",
    tagline: "Award-winning rehabilitation center website.",
    desc: "Comprehensive mental health services website featuring responsive design, SEO optimisation, and a seamless patient journey — built with Next.js and Framer Motion.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://www.themindfulcare.com/",
    github: null,
    badge: "Production · Live",
    tint: "rgba(74, 124, 89, 0.18)",
    glow: "rgba(74, 124, 89, 0.08)",
    desktopImg: "/screenshots/mindful-desktop.png",
    mobileImg: "/screenshots/mindful-mobile.png",
  },
  // {
  //   index: "04",
  //   title: "CashBuddy",
  //   tag: "Fintech · React · TypeScript",
  //   tagline:
  //     "Financial web platform with clean UI and reliable user interactions.",
  //   desc: "Financial platform built with a focus on clean UI design, accessibility, and trustworthy UX patterns essential for fintech products.",
  //   tech: ["React", "TypeScript", "Styled Components"],
  //   link: "https://cashbuddy.ng",
  //   github: null,
  //   badge: "Production · Live",
  //   tint: "rgba(6, 95, 70, 0.18)",
  //   glow: "rgba(6, 95, 70, 0.08)",
  //   desktopImg: null,
  //   mobileImg: null,
  // },
];

export const OPEN_SOURCE = [
  {
    index: "04",
    title: "Invoice Builder API",
    tagline: "An API for building and managing invoices.",
    tech: ["TypeScript", "Nest.js", "PostgreSQL"],
    github: "https://github.com/IsiaqAdedayo/invoice-builder-api",
    badge: "Open Source",
  },
  {
    index: "05",
    title: "GitHub Repo Clone",
    tagline: "Pixel-perfect GitHub repository interface via GraphQL API.",
    tech: ["React", "GraphQL", "Apollo Client", "CSS3"],
    github: "https://github.com/IsiaqAdedayo/GitHubRepoClone",
    badge: "Open Source",
  },
  {
    index: "06",
    title: "Crypto Tracker",
    tagline: "Real-time cryptocurrency tracking with live market data.",
    tech: ["React", "Chart.js", "REST API", "JavaScript"],
    github: "https://github.com/IsiaqAdedayo/Crypto_Tracker",
    badge: "Open Source",
  },
];

export const EXPERIENCE = [
  {
    period: "April 2026 - Present",
    role: "Fullstack Engineer",
    company: "ShowRepublic — United Kingdom",
    url: "https://showrepublic.tv",
    type: "Contract",
    bullets: [
      "Building a subscription-based video platform (creator economy product) using Next.js and NestJS",
      "Designed scalable frontend architecture to support rapid feature development and creator-facing flows",
      "Implemented authentication, protected routes, and subscription-based access control",
			"Collaborating on backend services (NestJS) for user management, media delivery, and payment handling",
			"Improved performance through rendering optimisation and efficient data handling across web interfaces",
			"Integrated AI-assisted development workflows (Copilot, Claude) into day-to-day engineering, cutting boilerplate time by ~30%",
			"Collaborated with product and design to define subscription UX patterns, balancing creator flexibility with platform consistency"
    ],
    tech: ["React", "Next.js", "TypeScript", "NestJS", "Tailwind CSS", "Git"],
  },
  {
    period: "Dec 2021 — Present",
    role: "Senior Frontend Engineer",
    company: "Filmmakers Mart (Recce Solutions)",
    url: "https://filmmakersmart.com",
    type: "Full-time · 4+ years",
    bullets: [
      "Own and develop core frontend features for a production marketplace serving hundreds of active users in Nigeria's film industry.",
      "Build and maintain a Next.js (App Router) application with TypeScript — scalable, clean component architecture throughout.",
      "Collaborate closely with UI/UX designers and backend engineers to deliver complex marketplace and provider-facing dashboards.",
      "Lead e-commerce improvements: usability, responsiveness, and frontend performance across customer and provider portals.",
      "Integrate GraphQL and REST APIs for reliable, data-driven user flows.",
      "Architect React Native foundations for a planned mobile application — enabling future shared web/mobile feature parity.",
      "Contributed to a VC-backed product that secured ~$1M in external investment.",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Ant Design",
      "Tailwind CSS",
      "Zustand",
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
      "Redesigned client websites, improving UI consistency and overall user experience.",
      "Maintained and enhanced e-commerce features, ensuring stability and smooth customer journeys.",
      "Worked with React, TypeScript, Node.js, and GraphQL in a remote collaborative environment.",
    ],
    tech: ["React", "TypeScript", "Node.js", "GraphQL"],
  },
];

export const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  Frameworks: ["React", "Next.js (App Router)", "React Native", "Nest.js"],
  Styling: ["Tailwind CSS", "Styled Components", "Chakra UI", "Ant Design"],
  "APIs & Data": ["GraphQL", "REST APIs", "Apollo Client", "Redux Toolkit"],
  Tooling: ["Git", "GitHub", "Postman", "Swagger", "Figma", "Vercel"],
  Testing: ["Jest", "Playwright"],
};

export const SKILL_MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "GraphQL",
  "Node.js",
  "Zustand",
  "Nest.js",
  "Tailwind CSS",
  "React Native",
  "Redux Toolkit",
  "REST APIs",
  "Styled Components",
  "Ant Design",
  "Jest",
  "Figma",
  "Vercel",
  "Apollo Client",
  "Git",
  "Chakra UI",
  "Postman",
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
  { year: "2012–2016", title: "BSc Physics", org: "University of Lagos" },
];
