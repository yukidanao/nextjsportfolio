"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import ProjectVideo from "@/components/ui/ProjectVideo";
import { assetPath } from "@/lib/assets";
import type { projects } from "@/data/portfolio";

type Project = (typeof projects)[number];

export default function ProjectCard({ project }: { project: Project }) {
  const links = [
    project.githubUrl && {
      href: project.githubUrl,
      label: "Source",
      aria: `View ${project.title} source code on GitHub`,
      icon: <GitHubIcon className="w-4 h-4" />,
      className:
        "text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-gray-100",
    },
    project.liveUrl && {
      href: project.liveUrl,
      label: "Live Demo",
      aria: `View ${project.title} live demo`,
      icon: <ExternalLink className="w-4 h-4" />,
      className: "text-accent hover:text-accent-secondary",
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    aria: string;
    icon: React.ReactNode;
    className: string;
  }[];

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
        {project.video ? (
          <ProjectVideo video={project.video} className="h-full w-full" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold font-mono text-gray-300 dark:text-gray-400 select-none">
              <img
                src={assetPath(project.image)}
                alt={project.title.charAt(0)}
                className="max-h-full max-w-full object-contain"
              />
            </span>
          </div>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
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

        {(links.length > 0 || project.slug) && (
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-border">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-sm transition-colors ${link.className}`}
                aria-label={link.aria}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
            {project.slug && (
              <Link
                href={`/projects/${project.slug}`}
                className="group/read inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-secondary transition-colors"
              >
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/read:translate-x-0.5" />
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
    </motion.article>
  );
}