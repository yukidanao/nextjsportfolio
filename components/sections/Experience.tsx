"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <span className="text-xs font-mono text-accent tracking-wider uppercase mb-4 block">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-200 dark:bg-border hidden sm:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-0 sm:pl-14"
              >
                <div className="hidden sm:flex absolute left-0 top-1.5 w-[39px] items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-white dark:ring-[#0d1117]" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-9 w-9 flex-shrink-0 rounded-lg border border-gray-200 dark:border-border bg-white p-1 object-contain"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {exp.role}
                  </h3>
                  <span className="text-accent font-mono text-sm">
                    @ {exp.company}
                  </span>
                  {exp.location && (
                    <span className="text-xs font-mono text-gray-400 dark:text-text-tertiary">
                      {exp.location}
                    </span>
                  )}
                  <span className="text-xs font-mono text-gray-400 dark:text-text-tertiary sm:ml-auto">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                      className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-text-secondary"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
