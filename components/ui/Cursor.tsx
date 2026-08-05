"use client";

import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "hover";
type ThemeMode = "light" | "dark";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";

const isInteractive = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && !!target.closest(INTERACTIVE_SELECTOR);

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const handlePointerMove = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const handlePointerDown = () => {
      setVariant("hover");
    };

    const handlePointerUp = () => {
      setVariant("default");
    };

    const handleMouseOver = (event: MouseEvent) => {
      setVariant(isInteractive(event.target) ? "hover" : "default");
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!isInteractive(event.relatedTarget)) {
        setVariant("default");
      }
    };

    const handleBlur = () => {
      setVariant("default");
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", handleBlur);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 font-mono text-lg leading-none will-change-transform ${
        theme === "dark" ? "text-accent-secondary" : "text-accent"
      }`}
      style={{
        textShadow: "0 0 12px rgba(88, 166, 255, 0.55)",
      }}
    >
      <span>
        &gt;
        <span className={variant === "hover" ? "opacity-100" : "cursor-blink"}>_</span>
      </span>
    </div>
  );
}