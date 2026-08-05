"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  display?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  display,
  duration = 2,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  if (display) {
    return (
      <span ref={ref} className="tabular-nums">
        {isInView ? display : "0"}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}
