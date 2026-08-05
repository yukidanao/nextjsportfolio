"use client";

import { useEffect, useState, startTransition } from "react";
import { motion } from "framer-motion";
import { stats as defaultStats } from "@/data/portfolio";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const WEEKS = 26;
const DAYS = 7;

function generateData() {
  return Array.from({ length: WEEKS * DAYS }, () => Math.floor(Math.random() * 5));
}

function ContributionHeatmap({ calendarDays }: { calendarDays?: { date: string; contributionCount: number }[] | null }) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    if (calendarDays && calendarDays.length) return; // prefer server data
  }, [calendarDays]);

  useEffect(() => {
    startTransition(() => {
      setData(generateData());
    });
  }, []);

  // hover-fetch logic removed to avoid per-hover network requests

  if (data.length === 0 && !(calendarDays && calendarDays.length)) {
    return <div className="hidden sm:block h-[91px]" />;
  }

  const levels = [
    "bg-heatmap-0",
    "bg-heatmap-1",
    "bg-heatmap-2",
    "bg-heatmap-3",
    "bg-heatmap-4",
  ];

  const days = calendarDays && calendarDays.length
    ? calendarDays
    : Array.from({ length: WEEKS * DAYS }, (_, i) => ({ date: null, contributionCount: data[i] || 0 }));

  // arrange into weeks of DAYS
  const totalWeeks = calendarDays && calendarDays.length ? Math.ceil(days.length / DAYS) : WEEKS;
  const weeksArr: { date: string | null; contributionCount: number }[][] = [];
  for (let w = 0; w < totalWeeks; w++) {
    weeksArr[w] = [];
    for (let d = 0; d < DAYS; d++) {
      const idx = w * DAYS + d;
      weeksArr[w].push(days[idx] || { date: null, contributionCount: 0 });
    }
  }

  // hover handlers removed

  return (
    <div className="hidden sm:flex flex-wrap gap-[3px]">
      {weeksArr.map((week, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {week.map((day, d) => {
            const level = Math.min(4, day.contributionCount || 0);
            const date = day.date;
            return (
              <div
                key={d}
                title={date || ""}
                className={`w-[10px] h-[10px] rounded-[2px] ${levels[level]} border border-[#1a1f2e]`}
              />
            );
          })}
        </div>
      ))}
      
    </div>
  );
}

export default function Stats() {
  const [remote, setRemote] = useState<{
    totalStars?: number;
    totalRepos?: number;
    totalCommits?: number;
    totalContributions?: number;
    calendarDays?: { date: string; contributionCount: number }[];
  }>({});
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState<number | null>(thisYear);

  useEffect(() => {
    let mounted = true;
    const url = year ? `/api/github-stats?year=${year}` : "/api/github-stats";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (!data || data.error) return;
        setRemote({
          totalStars: data.totalStars,
          totalRepos: data.totalRepos,
          totalCommits: data.totalCommits || data.totalContributions,
          totalContributions: data.totalContributions,
          calendarDays: data.calendarDays,
        });
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [year]);

  return (
    <section className="py-16 border-y border-gray-200 dark:border-border bg-gray-50/50 dark:bg-[#0d1117]/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {[
            { label: "Repositories", value: remote.totalRepos ?? defaultStats[0].value, suffix: defaultStats[0].suffix },
            { label: "Commits", value: remote.totalCommits ?? defaultStats[1].value, display: defaultStats[1].display, suffix: defaultStats[1].suffix },
            { label: "Stars", value: remote.totalStars ?? defaultStats[2].value, suffix: defaultStats[2].suffix },
            { label: "Years Exp.", value: defaultStats[3].value, suffix: defaultStats[3].suffix },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 dark:text-gray-100">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                />
              </div>
              <div className="text-xs font-mono text-gray-400 dark:text-text-tertiary mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400 dark:text-text-tertiary">
              {remote.totalContributions ?? defaultStats[0].value}+ contributions in the selected year
            </span>
            <select
              value={year ?? undefined}
              onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
              className="ml-3 text-sm rounded border px-2 py-1 bg-white text-gray-900 border-gray-200 dark:bg-[#0b1220] dark:text-gray-100 dark:border-gray-700"
              aria-label="Select year"
            >
              {Array.from({ length: 6 }, (_, i) => thisYear - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <ContributionHeatmap calendarDays={remote.calendarDays} />
        </motion.div>
      </div>
    </section>
  );
}
