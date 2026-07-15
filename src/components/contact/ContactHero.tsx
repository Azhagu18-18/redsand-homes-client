"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const MotionLink = motion.create(Link);

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#120905] via-black to-black">
      {/* Background Glow */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Contact RedSand Homes
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          Let's Find Your
          <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            {" "}
            Dream Property
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-3xl text-lg leading-8 text-gray-400"
        >
          Have questions about buying, selling, or investing in real estate?
          Our experienced property consultants are here to help you every step
          of the way.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <MotionLink
            href="/properties"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-8 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(249,115,22,0.35)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.45)]"
          >
            Browse Properties
            <HiArrowRight size={20} />
          </MotionLink>

          <MotionLink
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/10 px-8 py-4 font-semibold text-white transition hover:border-orange-400 hover:text-orange-400"
          >
            Back to Home
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}