"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  siAngular,
  siClaudecode,
  siDeepseek,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithubactions,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { skills } from "@/data/portfolio";

const categories = Object.keys(skills) as (keyof typeof skills)[];

const skillLogos: Record<string, { mark: string; color: string; textColor?: string }> = {
  SQL: { mark: "SQL", color: "#005b96", textColor: "#fff" },
  "VS Code": { mark: "VS", color: "#0078d7", textColor: "#fff" },
  AWS: { mark: "AWS", color: "#ff9900", textColor: "#000" },
  "ChatGPT Codex": { mark: "CX", color: "#10a37f", textColor: "#fff" },
};

const simpleIconLogos: Record<string, { path: string; hex: string }> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  PHP: siPhp,
  React: siReact,
  "Next.js": siNextdotjs,
  Angular: siAngular,
  "Node.js": siNodedotjs,
  Express: siExpress,
  "Tailwind CSS": siTailwindcss,
  Git: siGit,
  Docker: siDocker,
  Figma: siFigma,
  Postman: siPostman,
  Vercel: siVercel,
  "GitHub Actions": siGithubactions,
  "Claude Code": siClaudecode,
  "Deep Seek": siDeepseek,
};

function SkillLogo({ skill }: { skill: string }) {
  const icon = simpleIconLogos[skill];
  const fallback = skillLogos[skill];

  if (icon) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          role="img"
          aria-label={skill}
          fill={icon.hex}
        >
          <path d={icon.path} />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold uppercase shadow-sm"
      style={{ backgroundColor: fallback?.color || "#0f1724", color: fallback?.textColor || "#fff" }}
    >
      {fallback?.mark || skill.charAt(0)}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<keyof typeof skills>("Languages");

  return (
    <section id="skills" className="py-24 sm:py-32 bg-gray-50/50 dark:bg-[#0d1117]/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-xs font-mono text-accent tracking-wider uppercase mb-4 block">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-10">
            Tools &amp; Technologies
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 ${
                active === cat
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-gray-500 dark:text-text-secondary border-gray-200 dark:border-border hover:border-gray-400 dark:hover:border-border-hover hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skills[active].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-[#1f2937] bg-white/80 dark:bg-white/5 p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <SkillLogo skill={skill} />
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {skill}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-text-secondary">{active}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}