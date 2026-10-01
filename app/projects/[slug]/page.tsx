import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ProjectVideo from "@/components/ui/ProjectVideo";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import {
  getProjectBySlug,
  projectsWithDetail,
  type DetailSection,
} from "@/data/portfolio";

export function generateStaticParams() {
  return projectsWithDetail.map((project) => ({ slug: project.slug as string }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Showcase`,
    description: project.detail?.lead ?? project.description,
  };
}

function Section({ section }: { section: DetailSection }) {
  const heading = (
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-balance">
      {section.heading}
    </h2>
  );

  if (section.kind === "prose") {
    return (
      <section>
        {heading}
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-text-secondary">
          {section.body}
        </p>
      </section>
    );
  }

  if (section.kind === "list") {
    return (
      <section>
        {heading}
        <ul className="mt-4 space-y-2.5">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base text-gray-600 dark:text-text-secondary leading-relaxed"
            >
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (section.kind === "features") {
    return (
      <section>
        {heading}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {section.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b1116] p-5"
            >
              <span aria-hidden className="text-2xl">
                {item.marker}
              </span>
              <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-text-secondary">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      {heading}
      <ol className="mt-6 space-y-3">
        {section.items.map((item, i) => (
          <li
            key={item.text}
            className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b1116] p-4"
          >
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#0c1418] text-base"
            >
              {item.marker}
            </span>
            <span className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 pt-1.5">
              <span className="font-mono text-xs text-gray-400 dark:text-text-tertiary mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.text}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project?.detail) notFound();

  const others = projectsWithDetail.filter((p) => p.slug !== project.slug);

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <header className="mt-8">
          <span className="text-xs font-mono text-accent tracking-wider uppercase mb-4 block">
            Project
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-balance">
            {project.title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-text-secondary text-balance">
            {project.detail.lead}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono rounded-md bg-gray-100 dark:bg-[#0c1418] text-gray-600 dark:text-text-secondary border border-gray-200 dark:border-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-6 flex flex-wrap items-center gap-5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>Source</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-secondary transition-colors"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}
        </header>

        {project.video && (
          <div className="mt-10">
            <ProjectVideo
              video={project.video}
              className="aspect-video w-full rounded-xl border border-gray-200 dark:border-gray-800"
            />
            <p className="mt-3 text-xs font-mono text-gray-400 dark:text-text-tertiary">
              Click play to load the player — nothing is downloaded until you do.
            </p>
          </div>
        )}

        <div className="mt-16 space-y-14">
          {project.detail.sections.map((section) => (
            <Section key={section.heading} section={section} />
          ))}
        </div>

        {others.length > 0 && (
          <aside className="mt-20 pt-8 border-t border-gray-200 dark:border-border">
            <span className="text-xs font-mono text-accent tracking-wider uppercase">
              More showcases
            </span>
            <ul className="mt-4 space-y-2">
              {others.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/projects/${other.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 transition-colors hover:border-accent/50 hover:bg-gray-50 dark:hover:bg-[#0f1724]"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {other.title}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}