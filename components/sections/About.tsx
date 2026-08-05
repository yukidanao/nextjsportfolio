"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Code2, Layers, Rocket, Sparkles } from "lucide-react";

const focusAreas = [
  {
    title: "Frontend precision",
    description: "Crafting polished interfaces with thoughtful motion, strong accessibility, and responsive design.",
    icon: Layers,
  },
  {
    title: "Full-stack delivery",
    description: "Shipping reliable APIs, scalable data flows, and clean systems that keep teams moving fast.",
    icon: Rocket,
  },
  {
    title: "Product focus",
    description: "Aligning engineering with product outcomes to build tools that feel intuitive and drive adoption.",
    icon: Sparkles,
  },
];

export default function About() {
  const { bio, role, tagline } = personalInfo;

  return (
    <section id="about" className="py-20 sm:py-24 bg-slate-50/80 dark:bg-[#020409]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-xs font-mono text-accent tracking-wider uppercase mb-4 block">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
            Get to know me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-5 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="group relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white p-4 sm:p-6 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-[#070e1d] dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-5">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-[14px] bg-accent text-white shadow-lg shadow-accent/25 p-1 ring-1 ring-white/5 dark:ring-white/10">
                    <Code2 className="h-7 w-7 sm:h-10 sm:w-10" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-accent">{role}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{tagline}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">A balanced mix of design, code, and product thinking.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200/80 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-[#070e1d]">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-slate-300">Experience</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">3+ years</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Building dependable web products across teams and users.</p>
                  </div>
                  <div className="rounded-3xl border border-gray-200/80 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-[#070e1d]">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-slate-300">Projects</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">2+</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Solutions shipped from open-source tools to polished dashboards.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="rounded-[2rem] border border-gray-200/80 bg-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-[#070e1d] dark:shadow-none">
              <p className="text-base sm:text-lg leading-8 text-slate-800 dark:text-slate-100">{bio}</p>
              <div className="mt-6 rounded-3xl border border-gray-200/80 bg-slate-100 p-4 sm:p-6 dark:border-slate-800 dark:bg-[#090f1b]">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Engineer’s note</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-200">
                  I love turning complex requirements into delightful experiences with clean code, smooth interactions, and an eye toward long-term maintainability.
                </p>
                <pre className="mt-5 overflow-x-auto rounded-3xl border border-slate-200 bg-[#0f1115] px-4 py-4 text-sm text-slate-100 dark:border-border">
                  <code>{"const product = build({ team: 'cross-functional', quality: 'high', scale: 'global' });"}</code>
                </pre>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="rounded-3xl border border-gray-200/80 bg-slate-100 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg dark:border-slate-800 dark:bg-[#0f172a] dark:hover:border-accent/20"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{area.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-200">{area.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-accent/10 bg-accent/5 px-3 py-1 sm:px-4 sm:py-2 text-xs font-medium uppercase tracking-[0.2em] text-accent dark:border-accent/20 dark:bg-accent/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
