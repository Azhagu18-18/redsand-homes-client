"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{
            opacity: 0,
            scale: 0.6,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.6,
            y: 40,
          }}
          transition={{
            duration: 0.3,
          }}
          whileHover={{
            scale: 1.1,
            y: -4,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="
            group
            fixed
            bottom-6
            right-6
            z-[999]
            flex
            h-14
            w-14
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-orange-400/30
            bg-white/10
            backdrop-blur-xl
            shadow-[0_10px_35px_rgba(249,115,22,0.35)]
            transition-all
            duration-300
            hover:border-orange-400
            hover:shadow-[0_15px_45px_rgba(249,115,22,0.45)]
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 via-transparent to-amber-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Pulse */}
          <motion.div
  animate={{
    scale: [1, 1.15, 1],
    opacity: [0.15, 0.35, 0.15],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute inset-0 rounded-full bg-orange-500/20"
/>

          {/* Icon */}
          <HiArrowUp className="relative z-10 text-2xl text-orange-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}