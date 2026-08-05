"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, X } from "lucide-react";
import { personalInfo, resumeText } from "@/data/portfolio";

const RESUME_LINES = resumeText.split("\n");

function formatTerminalLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed) return <div className="h-3" />;

  if (
    trimmed.startsWith("Summary") ||
    trimmed.startsWith("Skills") ||
    trimmed.startsWith("Experience") ||
    trimmed.startsWith("Contact")
  ) {
    return (
      <div className="mt-4 border-t border-cyan-400/20 pt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
        {trimmed}
      </div>
    );
  }

  if (trimmed.startsWith("- ")) {
    return <div className="ml-5 text-slate-200">{trimmed}</div>;
  }

  if (trimmed.includes(":")) {
    return <div className="text-slate-200">{trimmed}</div>;
  }

  if (trimmed === "Lee Leighnard") {
    return <div className="text-xl font-semibold text-white">{trimmed}</div>;
  }

  if (trimmed === "Full-Stack Developer") {
    return <div className="text-sm text-slate-400">{trimmed}</div>;
  }

  return <div className="text-slate-200">{trimmed}</div>;
}

const TYPING_WORDS = [
  "Full-Stack Developer",
  "UI Engineer",
  "Open Source Enthusiast",
  "Problem Solver",
];

const BACKGROUND_PROJECTS = [
  { src: "/hoams.png", alt: "HOAMS", rotate: 3, offset: "mt-4" },
  { src: "/richtv.png", alt: "Rich TV", rotate: 6, offset: "mt-16" },
  { src: "/newilalim.png", alt: "New Ilalim School LMS", rotate: 8, offset: "mt-8" },
  { src: "/voiceout.png", alt: "VoiceOut!", rotate: 5, offset: "mt-20" },
  { src: "/literasee.png", alt: "LiteraSEE", rotate: 2, offset: "mt-12" },
];

function TypeWriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = TYPING_WORDS[wordIndex];
    const timeout = deleting ? 40 : Math.max(60, 120 - charIndex * 2);

    if (!deleting && charIndex === current.length) {
      setTimeout(() => {
        setDeleting(true);
      }, 1800);
      return;
    }

    if (deleting && charIndex === 0) {
      setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
      }, 0);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((i) => (deleting ? i - 1 : i + 1));
    }, timeout);

    return timer;
  }, [charIndex, deleting, wordIndex]);

  useEffect(() => {
    const timer = tick();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [tick]);

  return (
    <span className="text-accent">
      {TYPING_WORDS[wordIndex].slice(0, charIndex)}
      <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 animate-pulse" />
    </span>
  );
}

export default function Hero() {
  const { name, tagline, resumeUrl, role } = personalInfo;
  const [showTerminal, setShowTerminal] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const downloadLockRef = useRef(false);

  useEffect(() => {
    if (!showTerminal) return;

    const introLines = [
      `Last login: ${new Date().toLocaleString()}`,
      "",
      "┌─ resume@portfolio",
      "│  shell session initialized",
      "└─ type 'help' to view commands",
      "",
      `${name}`,
      role,
      "",
      "Resume loaded into terminal.",
      "",
      "[Tip] Type 'download' to get the full PDF resume.",
      "",
      ...RESUME_LINES,
      "",
      'Type "help" to see available commands.',
    ];

    const frame = window.requestAnimationFrame(() => {
      setOutput(introLines);
      setInput("");
      inputRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowTerminal(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showTerminal, name, role]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;

    const command = value.toLowerCase();
    const promptLine = `$ ${value}`;

    setOutput((prev) => [...prev, promptLine]);

    if (command === "exit") {
      setShowTerminal(false);
      setInput("");
      return;
    }

    if (command === "download") {
      if (downloadLockRef.current) {
        setOutput((prev) => [...prev, "Download already in progress."]);
        setInput("");
        return;
      }

      downloadLockRef.current = true;

      fetch(resumeUrl)
        .then((response) => {
          if (!response.ok) throw new Error("Unable to fetch the resume PDF.");
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "Lee_Leighnard_Jose_CV.pdf";
          link.rel = "noopener";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setOutput((prev) => [...prev, "✓ Download started — full PDF resume will be saved."]);
        })
        .catch(() => {
          setOutput((prev) => [...prev, "✗ Download failed. Please try again."]);
        })
        .finally(() => {
          downloadLockRef.current = false;
        });

      setInput("");
      return;
    }

    if (command === "help") {
      setOutput((prev) => [
        ...prev,
        "Available commands:",
        "  help        Show available commands",
        "  cat resume  Show resume content",
        "  download    Download the full PDF resume",
        "  exit        Leave the terminal",
      ]);
      setInput("");
      return;
    }

    if (command === "cat resume" || command === "cat") {
      setOutput((prev) => [...prev, ...resumeText.split("\n")]);
      setInput("");
      return;
    }

    if (command === "clear") {
      setOutput([]);
      setInput("");
      return;
    }

    setOutput((prev) => [...prev, `command not found: ${value}`]);
    setInput("");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex gap-5 overflow-hidden px-14 sm:px-24 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        {BACKGROUND_PROJECTS.map((project) => (
          <div
            key={project.src}
            className={`flex-1 ${project.offset}`}
            style={{ transform: `rotate(${project.rotate}deg)` }}
          >
            <div
              className="h-[70vh] rounded-2xl border border-white/15 shadow-2xl opacity-40 dark:opacity-30"
              style={{
                backgroundImage: `url(${project.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/55 to-white dark:via-[#0d1117]/55 dark:to-[#0d1117]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm font-mono text-accent mb-4 tracking-wider uppercase"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4"
          >
            {name}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 dark:text-text-secondary mb-6 h-9 sm:h-10"
          >
            <TypeWriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-base sm:text-lg text-gray-500 dark:text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-secondary transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.02]"
            >
              View My Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setShowTerminal(true)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-border text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-100 dark:hover:bg-surface-hover transition-all duration-200 hover:border-gray-400 dark:hover:border-border-hover"
            >
              <FileText className="w-4 h-4" />
              Resume
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showTerminal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowTerminal(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] text-slate-100 shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
                  resume@portfolio
                </div>
                <button
                  type="button"
                  onClick={() => setShowTerminal(false)}
                  className="rounded-full p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close terminal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[80vh] overflow-auto p-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 font-mono text-sm leading-7">
                  {output.map((line, index) => (
                    <div key={`${line}-${index}`} className="whitespace-pre-wrap">
                      {line.startsWith("$ ") ? (
                        <div className="text-emerald-400">{line}</div>
                      ) : line.startsWith("┌") || line.startsWith("│") || line.startsWith("└") ? (
                        <div className="text-slate-400">{line}</div>
                      ) : line.includes("[Tip]") ? (
                        <div className="mt-2 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-amber-300">
                          {line}
                        </div>
                      ) : (
                        formatTerminalLine(line)
                      )}
                    </div>
                  ))}

                  <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
                      placeholder="Type a command..."
                      autoComplete="off"
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-text-tertiary hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
