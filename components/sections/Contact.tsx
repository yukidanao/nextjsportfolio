"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { personalInfo } from "@/data/portfolio";

const socialLinks = [
  { label: "GitHub", href: personalInfo.social.github, icon: GitHubIcon },
  { label: "LinkedIn", href: personalInfo.social.linkedin, icon: LinkedInIcon },
  { label: "Facebook", href: personalInfo.social.facebook, icon: FacebookIcon },
];

export default function Contact() {
  const { email } = personalInfo;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-gray-50/50 dark:bg-[#0d1117]/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono text-accent tracking-wider uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-gray-500 dark:text-text-secondary max-w-lg mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-white font-medium hover:bg-accent-secondary transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.02]"
          >
            <Mail className="w-5 h-5" />
            <span>{email}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-gray-200 dark:border-border text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-border-hover hover:bg-gray-100 dark:hover:bg-surface-hover transition-all duration-200"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
