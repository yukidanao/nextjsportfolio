"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/lib/theme";
import { navLinks } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

// `navLinks` stores bare fragments ("#about") because the sections only exist
// on the home page. Prefixing with "/" turns them into real cross-route
// links ("/#about") that Next.js resolves and scrolls to on arrival.
const sections = navLinks.map((l) => ({
  label: l.label,
  id: l.href.slice(1),
  href: `/${l.href}`,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sections.map((s) => s.id));
  const pathname = usePathname();
  const onProjectsPage = pathname.startsWith("/projects");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isCurrent = (id: string) => {
    if (id === "projects" && onProjectsPage) return true;
    return !onProjectsPage && activeSection === id;
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled &&
          "bg-white/75 dark:bg-[#0d1117]/75 backdrop-blur-xl border-b border-gray-200/50 dark:border-border/50"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
          >
            <span className="text-accent">.</span>leeleighnard
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((link) => {
              const isActive = isCurrent(link.id);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 inset-x-3 h-0.5 bg-accent rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-2 pl-2 border-l border-gray-200 dark:border-border">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-hover transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-200/50 dark:border-border/50 bg-white dark:bg-[#0d1117] overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {sections.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isCurrent(link.id)
                      ? "text-accent bg-accent/5"
                      : "text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-surface-hover"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}