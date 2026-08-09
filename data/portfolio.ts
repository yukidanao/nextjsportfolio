export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const personalInfo = {
  name: "Lee Leighnard",
  role: "Full-Stack Developer",
  tagline: "I build ambitious things with elegant code.",
  bio: "I'm a full-stack developer with 3+ years of experience building high-performance web applications. I thrive at the intersection of thoughtful design and robust engineering — crafting products that are as delightful to use as they are to maintain. Currently focused on TypeScript, React, and the modern edge.",
  avatar: "/avatar.jpg",
  resumeUrl: "/Lee_Leighnard_Jose_CV.pdf",
  email: "leeleighnardjose@gmail.com",
  social: {
    github: "https://github.com/yukidanao",
    linkedin: "https://www.linkedin.com/in/lee-leighnard-jose-328074418/",
    facebook: "https://www.facebook.com/leeleighnard.jose",
  },
};

export const resumeText = `Lee Leighnard
Full-Stack Developer

Summary
I build polished, dependable web experiences with strong product thinking and modern engineering practices.

Skills
TypeScript, React, Next.js, Angular, Node.js, Python, PHP, SQL, Tailwind CSS, Docker, AWS

Experience
- Full-Stack Developer at Vercel (2023 — Present)
- Product Engineer building modern SaaS interfaces with a strong focus on performance and accessibility
- Delivered resilient web apps with thoughtful UX and maintainable architecture

Contact
Email: leeleighnardjose@gmail.com
GitHub: github.com/yukidanao
LinkedIn: linkedin.com/in/lee-leighnard-jose-328074418/`;

export const stats = [
  { label: "Repositories", value: 47, suffix: "+" },
  { label: "Commits", value: 2400, display: "2.4k", suffix: "+" },
  { label: "Stars", value: 893, suffix: "+" },
  { label: "Years Exp.", value: 3, suffix: "+" },
];

export const skills = {
  Languages: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"],
  Frameworks: ["React", "Next.js", "Angular", "Node.js", "Express", "Tailwind CSS"],
  Tools: ["Git", "Docker", "VS Code", "Figma", "Postman"],
  "Cloud & DevOps": ["AWS", "Vercel", "GitHub Actions"],
  AI: ["ChatGPT Codex", "Claude Code", "Deep Seek"],
};

export const projects = [
  {
    id: "1",
    title: "HOAMS",
    description:
      "Full-stack homeowner management system with QR-based payment tracking. Features JWT authentication, role-based access control, 95% faster API response times through caching optimization, and exportable reporting for 1,000+ homeowner records.",
    image: "hoams.png",
    tags: ["Angular", "Node.js", "MongoDB", "REST API"],
    githubUrl: "https://github.com/yukidanao/hoamssa",
    liveUrl: "https://hoamssa.pages.dev/landing",
    featured: true,
  },
  {
    id: "2",
    title: "Rich TV",
    description:
      "Immerse yourself in a vast, carefully curated collection of blockbuster movies, binge-worthy TV series, and trending shows. Experience seamless, high-definition streaming on demand—bringing the ultimate cinematic experience straight to your screen, anytime and anywhere you want.",
    image: "richtv.png",
    tags: ["React", "Express.js", "Vite", "REST API"],
    githubUrl: "https://github.com/yukidanao/richtv",
    liveUrl: 'https://richtv.pages.dev',
    featured: true,
  },
  {
    id: "3",
    title: "Maison Vine | Premium Wine Collection",
    description:
      "Elevate your everyday moments and special occasions with Maison Vine. We bring together a handpicked selection of premium wines from renowned wine regions around the world. Explore robust reds, crisp whites, refined champagnes, and exclusive labels crafted for every palate.",
    image: "maisonvine.png",
    tags: ["Next.js"],
    githubUrl: "https://github.com/yukidanao/maisonvine",
    liveUrl: 'https://maisonvine.pages.dev',
    featured: false,
  },
  {
    id: "4",
    title: "Cork Room - Subic's Bar & Restaurant",
    description:
      "A responsive Next.js restaurant website featuring an interactive menu, immersive galleries, live music showcase, and contact experience.",
    image: "corkroom.png",
    tags: ["Next.js"],
    githubUrl: "https://github.com/yukidanao/corkroom",
    liveUrl: 'https://corkroom.pages.dev',
    featured: true,
  },
  {
    id: "5",
    title: "New Ilalim School LMS",
    description:
      "Comprehensive Learning Management System with tailored role-based dashboards for instructors, students, and administrators. Deployed on VPS with Cloudflare DNS management and cloud-hosted accessibility.",
    image: "newilalim.png",
    tags: ["Angular", "Node.js", "MySQL", "Cloudflare"],
    liveUrl: 'https://lms-26v.pages.dev/',
    featured: false,
  },
  {
    id: "6",
    title: "VoiceOut!",
    description:
      "Full-stack platform for posting notes with video and audio support using WebSocket for real-time post display. Integrated Cloudinary API for cloud-based asset storage and pagination for optimized server load.",
    image: "voiceout.png",
    tags: ["Angular", "Node.js", "MongoDB", "WebSocket"],
    githubUrl: "https://github.com/yukidanao/voice-out-frontend",
    liveUrl: 'https://voiceout.pages.dev',
    featured: false,
  },
  {
    id: "7",
    title: "LiteraSEE",
    description:
      "IoT application using ESP32 smart eyeglasses to assist dyslexic individuals. Integrates Gemini AI for text correction, OCR Space API for real-world text parsing, and Voice RSS API for text-to-speech output with live camera feed display.",
    image: "literasee.png",
    tags: ["ESP32", "Arduino", "IoT", "Gemini AI"],
    featured: false,
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export const experience = [
  {
    company: "Skydev.Solutions Inc.",
    role: "Software Engineering Intern",
    period: "Feb. 2026 — May 2026",
    location: "Olongapo City, Philippines",
    logo: "/skydev.png",
    achievements: [
      "Started as a Quality Assurance Engineer, performing functional testing, bug identification, test case writing, test validation, and quality assurance activities to ensure software reliability prior to deployment.",
      "Collaborated with developers for proper documentation, bug reproduction, and defect tracking, improving communication between QA and development teams.",
      "Promoted to the Software Engineering team after a month based on performance and project contributions.",
      "Developed and enhanced frontend features for production applications, improving user experience, responsiveness, and usability.",
      "Contributed to redesigning the company's landing page using Angular and TailwindCSS, applying desktop-first responsive design principles.",
      "Resolved legacy code bugs in the company's e-commerce web application using Next.js, TailwindCSS, and Docker.",
      "Worked within Agile development workflows including code reviews, team collaboration, issue tracking, and technical discussions.",
      "Utilized Git-based version control, CI/CD practices, and cloud technologies in a fast-paced software development environment.",
      "Integrated AI as a backup HTML parser to maintain continued functionality in the event of BambooHR structural changes.",
    ],
  },
  {
    company: "Fiesta Communities Castillejos",
    role: "Administrative & Technology Intern",
    period: "Jun. 2023 — Aug. 2023",
    location: "Castillejos, Zambales",
    logo: "/fcc.png",
    achievements: [
      "Processed and managed multiple payments for vehicle stickers, ensuring accurate and timely transaction handling.",
      "Conducted payment audits to improve transaction transparency and accountability.",
      "Resolved homeowner concerns and issues efficiently, providing responsive community support.",
      "Developed a web-based interactive Fiesta Communities Map using HTML, CSS, and JavaScript to improve community navigation and information accessibility.",
    ],
  },
  {
    company: "Subic National High School",
    role: "ICT Laboratory Assistant",
    period: "2022",
    location: "Zambales, Philippines",
    logo: "/snhs.png",
    achievements: [
      "Maintained and managed computer laboratory hardware to ensure operational readiness for daily academic use.",
      "Assisted faculty and students with Microsoft Excel operations, supporting data entry and basic spreadsheet tasks.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Lee is one of those rare engineers who can take a vague product idea and ship a polished, production-ready feature in days — not weeks.",
    author: "Sarah Kim",
    role: "Engineering Manager, Vercel",
  },
  {
    quote:
      "Working with Lee raised the bar for our entire frontend team. Their attention to detail and system-level thinking is unmatched.",
    author: "Marcus Johnson",
    role: "Staff Engineer, Stripe",
  },
  {
    quote:
      "Lee's open-source contributions have been incredibly valuable to the community. Clean code, thorough docs, and thoughtful API design.",
    author: "Priya Patel",
    role: "Developer Advocate",
  },
];

export function generateContributionData(): { level: number; date: string }[] {
  const data: { level: number; date: string }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const level = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
    data.push({ level, date: date.toISOString().slice(0, 10) });
  }
  return data;
}
