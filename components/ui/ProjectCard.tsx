"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { projects } from "@/data/portfolio";

type Project = (typeof projects)[number];

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b1116] overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-[0_0_24px_rgba(88,166,255,0.12)]"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-[#0f1724]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/10 dark:from-accent/5 dark:to-accent-secondary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold font-mono text-gray-300 dark:text-gray-400 select-none">
            <img src={project.image} alt={project.title.charAt(0)} />
          </span>
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-text-secondary leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded-md bg-gray-100 dark:bg-[#0c1418] text-gray-600 dark:text-text-secondary border border-gray-200 dark:border-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label={`View ${project.title} source code on GitHub`}
          >
              <GitHubIcon className="w-4 h-4" />
            <span>Source</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-secondary transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
    </motion.article>
  );
}
