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

export type ProjectVideo = {
  /** Direct MP4 URL. Rendered with a native <video> element. */
  src?: string;
  /** External player embed URL (MEGA, YouTube, Vimeo). Rendered in an <iframe>. */
  embedUrl?: string;
  /** Where to send people if the embed is blocked or fails. */
  fallbackUrl?: string;
  /** Label for the fallback link, e.g. "MEGA". */
  fallbackLabel?: string;
  /** Still frame shown before playback is requested. */
  poster?: string;
  /** Accessible name for the player. */
  label: string;
};

export type DetailSection =
  | { kind: "steps"; heading: string; items: { marker: string; text: string }[] }
  | { kind: "prose"; heading: string; body: string }
  | {
      kind: "features";
      heading: string;
      items: { marker: string; title: string; body: string }[];
    }
  | { kind: "list"; heading: string; items: string[] };

export type ProjectDetail = {
  lead: string;
  sections: DetailSection[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug?: string;
  video?: ProjectVideo;
  detail?: ProjectDetail;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "LeeClip",
    description:
      "A fully local pipeline that turns a 90-minute podcast into ready-to-post vertical clips. No cloud, no subscription — the footage never leaves the machine.",
    image: "leeclip.png",
    tags: ["Next.js", "TypeScript", "Whisper", "Ollama", "FFmpeg", "SQLite"],
    slug: "leeclip",
    video: {
      poster: "leeclip.png",
      // MEGA embeds are /embed/<file-handle>#<decryption-key> — the handle in
      // the path, the key in the fragment. The /file/ variant sets
      // X-Frame-Options: SAMEORIGIN and cannot be iframed.
      embedUrl:
        "https://mega.nz/embed/pEdXTDBJ#2S-m-aCMNhO2UsMD0DBkzxytYB1O6-fnR6gKe610MZM",
      fallbackUrl:
        "https://mega.nz/file/pEdXTDBJ#2S-m-aCMNhO2UsMD0DBkzxytYB1O6-fnR6gKe610MZM",
      fallbackLabel: "MEGA",
      label: "LeeClip showcase",
    },
    detail: {
      lead: "Turns a 90-minute podcast into ready-to-post vertical clips, entirely on my own PC. No cloud. No subscription. My footage never leaves the machine.",
      sections: [
        {
          kind: "steps",
          heading: "The clipping pipeline",
          items: [
            {
              marker: "🎬",
              text: "Drop in a long video (podcast, interview, stream, YouTube)",
            },
            {
              marker: "🗣️",
              text: "It transcribes the whole thing locally, word by word",
            },
            {
              marker: "✨",
              text: "It finds the moments worth clipping on its own",
            },
            {
              marker: "🔥",
              text: "Each one gets scored — how strong the hook is, whether it makes sense without the rest of the video, whether the payoff actually lands, and whether the speaker gets genuinely animated",
            },
            {
              marker: "🛠️",
              text: "I review, nudge the start/end points, approve what I like",
            },
            { marker: "📐", text: "It reframes to 9:16 and follows whoever is talking" },
            {
              marker: "✍️",
              text: "Captions burned in, plus a title I drag into place myself",
            },
            { marker: "📤", text: "Export the MP4" },
          ],
        },
        {
          kind: "prose",
          heading: "The part I'm happiest with",
          body: "The crop follows the speaker. Not a lazy centre crop that frames the middle of the screen while the interesting person talks off to the side. It listens to who's talking and glides the frame onto their face.",
        },
        {
          kind: "features",
          heading:
            "Three things in here aren't really about clipping at all",
          items: [
            {
              marker: "💬",
              title: "Caption burn",
              body: "Pick any stretch, or the whole video, and burn word-by-word captions into it at the original resolution and aspect ratio, with my own colour palette. Same transcript the clips use. This is what made my own uploads watchable with the sound off.",
            },
            {
              marker: "🎙️",
              title: "Voice cloning",
              body: "Record half a minute of yourself once, and LeeClip can then speak new lines in your voice, with dials for emotion and delivery so it doesn't come out flat and robotic.",
            },
            {
              marker: "📺",
              title: "Publishing",
              body: "Connect a YouTube channel and push a finished export straight up with title, description, privacy and a schedule.",
            },
          ],
        },
        {
          kind: "list",
          heading: "What's under the hood",
          items: [
            "FFmpeg for the video processing",
            "Whisper for transcription — runs fine on CPU, uses the GPU if there is one",
            "A small local model via Ollama (Qwen / Llama / Gemma) to judge and rank the clips, with an option to plug in any OpenAI-compatible API instead",
            "OpenCV's YuNet for face detection, pyannote for telling speakers apart",
            "Chatterbox Turbo for the voice cloning",
            "Next.js, React, TypeScript and Tailwind for the interface, Node/Express and SQLite behind it",
          ],
        },
      ],
    },
    featured: true,
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
    title: "New Ilalim School LMS",
    description:
      "Comprehensive Learning Management System with tailored role-based dashboards for instructors, students, and administrators. Deployed on VPS with Cloudflare DNS management and cloud-hosted accessibility.",
    image: "newilalim.png",
    tags: ["Angular", "Node.js", "MySQL", "Cloudflare"],
    liveUrl: 'https://lms-26v.pages.dev/',
    featured: false,
  },
  {
    id: "7",
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
    id: "8",
    title: "LiteraSEE",
    description:
      "IoT application using ESP32 smart eyeglasses to assist dyslexic individuals. Integrates Gemini AI for text correction, OCR Space API for real-world text parsing, and Voice RSS API for text-to-speech output with live camera feed display.",
    image: "literasee.png",
    tags: ["ESP32", "Arduino", "IoT", "Gemini AI"],
    featured: false,
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectsWithDetail = projects.filter((p) => p.slug && p.detail);

export function getProjectBySlug(slug: string) {
  return projectsWithDetail.find((p) => p.slug === slug);
}

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
