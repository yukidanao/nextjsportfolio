import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've built — from real-time collaboration tools to open-source libraries.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-xs font-mono text-accent tracking-wider uppercase mb-4 block">
            Projects
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            All Projects
          </h1>
          <p className="text-gray-500 dark:text-text-secondary max-w-xl">
            A collection of things I&apos;ve built over the years — from real-time
            collaboration tools to open-source libraries and everything in between.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
