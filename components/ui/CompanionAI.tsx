"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CompanionAI() {
  const [eyeFollow, setEyeFollow] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const companion = document.getElementById("companion-container");
      if (!companion) return;

      const rect = companion.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle from companion to mouse
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      const distance = 8;

      setEyeFollow({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <motion.div
      id="companion-container"
      initial={{ opacity: 0, x: -40, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute left-4 top-1/2 hidden lg:flex -translate-y-1/2 z-20"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-48 h-48 sm:w-56 sm:h-56"
      >
        {/* Main companion image */}
        <Image
          src="/companion.png"
          alt="AI Companion"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />

        {/* Left eye tracking overlay */}
        <div
          className="absolute top-[35%] left-[28%] w-6 h-6"
          style={{
            transform: `translate(${eyeFollow.x * 0.3}px, ${eyeFollow.y * 0.3}px)`,
          }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-70" />
        </div>

        {/* Right eye tracking overlay */}
        <div
          className="absolute top-[35%] right-[28%] w-6 h-6"
          style={{
            transform: `translate(${eyeFollow.x * 0.3}px, ${eyeFollow.y * 0.3}px)`,
          }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-70" />
        </div>

        {/* Waving hand animation - targets the upper right area */}
        <motion.div
          animate={{
            rotate: [0, 15, -10, 15, 0],
            transformOrigin: "bottom center",
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] right-[5%] w-8 h-12 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
