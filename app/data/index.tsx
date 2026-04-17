export const PERSON = {
  name:     "Adedayo Showande",
  initials: "A.S",
  role:     "Senior Frontend Engineer",
  sub:      "React · Next.js · TypeScript",
  location: "Lagos, Nigeria",
  email:    "hadedaryor@gmail.com",
  phone:    "+234 810 460 2568",
  bio:      "Senior Frontend Engineer with 4+ years building production-grade web applications. I own features end-to-end — from architecture decisions to pixel-perfect delivery — across marketplace and e-commerce platforms used by hundreds of active users.",
  github:   "https://github.com/IsiaqAdedayo",
  linkedin: "https://www.linkedin.com/in/showande-adedayo-789a42195/",
  twitter:  "https://x.com/imdahdayo",
  portfolio:"https://adedayo-portfolio-website.vercel.app",
};

export const STATS = [
  { n: "4+",   l: "Years Experience" },
  { n: "$1M+", l: "VC-Backed Product" },
  { n: "3+",   l: "Production Apps" },
  { n: "100%", l: "Client Satisfaction" },
];

export const EXPERIENCE = [
  {
    period:  "Dec 2021 — Present",
    role:    "Senior Frontend Engineer",
    company: "Filmmakers Mart (Recce Solutions)",
    url:     "https://filmmakersmart.com",
    type:    "Full-time · 3+ years",
    bullets: [
      "Own and develop core frontend features for a production marketplace serving hundreds of active users in Nigeria's film industry.",
      "Build and maintain a Next.js (App Router) application with TypeScript — scalable, clean component architecture throughout.",
      "Collaborate closely with UI/UX designers and backend engineers to deliver complex marketplace and provider-facing dashboards.",
      "Lead e-commerce improvements: usability, responsiveness, and frontend performance across customer and provider portals.",
      "Integrate GraphQL and REST APIs for reliable, data-driven user flows.",
      "Architect React Native foundations for a planned mobile application — enabling future shared web/mobile feature parity.",
      "Contributed to a VC-backed product that secured ~$1M in external investment.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Ant Design", "Tailwind CSS", "Zustand", "Git"],
  },
  {
    period:  "Jan 2021 — Nov 2021",
    role:    "Frontend Developer",
    company: "OneBuddy Inc. (Credmart)",
    url:     null,
    type:    "Remote · 11 months",
    bullets: [
      "Redesigned client websites, improving UI consistency and overall user experience.",
      "Maintained and enhanced e-commerce features, ensuring stability and smooth customer journeys.",
      "Worked with React, TypeScript, Node.js, and GraphQL in a remote collaborative environment.",
    ],
    tech: ["React", "TypeScript", "Node.js", "GraphQL"],
  },
  {
    period:  "May 2019 — Dec 2020",
    role:    "Website Developer Intern",
    company: "HIIT PLC",
    url:     null,
    type:    "Internship · 1.5 years",
    bullets: [
      "Built and maintained client websites, developing a strong foundation in web development practices.",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

export const PROJECTS = [
  {
    index: "01",
    title: "Filmmakers Mart",
    tagline:
      "Nigeria's film industry marketplace — production platform serving hundreds of active users.",
    desc: "Led frontend architecture for a VC-backed marketplace platform connecting Nigeria's film professionals. Built scalable Next.js (App Router) application with provider dashboards, e-commerce flows, and GraphQL API integration.",
    tech: ["Next.js", "TypeScript", "Ant Design", "Zustand", "Tailwind CSS"],
    link: "https://filmmakersmart.com",
    github: null,
    highlight: true,
    badge: "Production · Live",
  },
  {
    index: "02",
    title: "CashBuddy",
    tagline:
      "Financial web platform with clean UI and reliable user interactions.",
    desc: "Financial platform built with a focus on clean UI design, accessibility, and trustworthy UX patterns essential for fintech products.",
    tech: ["React", "TypeScript", "Styled Components"],
    link: "https://cashbuddy.ng",
    github: null,
    highlight: true,
    badge: "Production · Live",
  },
  {
    index: "03",
    title: "The Mindful Care",
    tagline: "Award-winning rehabilitation center website.",
    desc: "Comprehensive mental health services website featuring responsive design, SEO optimization, and a seamless patient journey — built with Next.js and Framer Motion.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://www.themindfulcare.com/",
    github: null,
    highlight: false,
    badge: "Production Live",
  },
  {
    index: "04",
    title: "Invoice Builder API",
    tagline: "An API for building invoices.",
    desc: "An API for building invoices. It provides a simple and efficient way to create and manage invoices.",
    tech: ["Typescript", "Nest.js", "PostgreSQL"],
    link: null,
    github: "https://github.com/IsiaqAdedayo/invoice-builder-api",
    highlight: false,
    badge: "Open Source",
  },
  {
    index: "05",
    title: "GitHub Repo Clone",
    tagline: "Pixel-perfect GitHub repository interface via GraphQL API.",
    desc: "Demonstrates advanced API integration with Apollo Client, precise UI replication, and modern state management patterns.",
    tech: ["React", "GraphQL", "Apollo Client", "CSS3"],
    link: null,
    github: "https://github.com/IsiaqAdedayo/GitHubRepoClone",
    highlight: false,
    badge: "Open Source",
  },
  {
    index: "06",
    title: "Crypto Tracker",
    tagline: "Real-time cryptocurrency tracking with live market data.",
    desc: "Live crypto market tracker with interactive price charts, portfolio management, and multi-currency support.",
    tech: ["React", "Chart.js", "REST API", "JavaScript"],
    link: null,
    github: "https://github.com/IsiaqAdedayo/Crypto_Tracker",
    highlight: false,
    badge: "Open Source",
  },
];

export const SKILLS = {
  "Languages":      ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  "Frameworks":     ["React", "Next.js (App Router)", "React Native", "Nest.js"],
  "Styling":        ["Tailwind CSS", "Styled Components", "Chakra UI", "Ant Design"],
  "APIs & Data":    ["GraphQL", "REST APIs", "Apollo Client", "Redux Toolkit"],
  "Tooling":        ["Git", "GitHub", "Postman", "Swagger", "Figma", "Vercel"],
  "Testing":        ["Jest, Playwright"],
};

export const SKILL_MARQUEE = [
  "React", "Next.js", "TypeScript", "GraphQL", "Node.js", "Zustand", "Nest.js",
  "Tailwind CSS", "React Native", "Redux Toolkit", "REST APIs",
  "Styled Components", "Ant Design", "Jest", "Figma", "Vercel",
  "Apollo Client", "Git", "Chakra UI", "Postman",
];

export const EDUCATION = [
  { year: "2020", title: "Certificate in Web Programming (React)", org: "HIIT PLC" },
  { year: "2019", title: "Certificate in Web Design & Development", org: "HIIT PLC" },
  { year: "2012–2016", title: "BSc Physics", org: "University of Lagos" },
];
