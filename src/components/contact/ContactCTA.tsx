"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const MotionLink = motion.create(Link);

export default function ContactCTA() {
  return (
    <section className="px-6 pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-orange-500/20
            bg-gradient-to-r
            from-[#1A0D06]
            via-[#120905]
            to-black
            px-8
            py-16
            text-center
          "
        >
          {/* Glow */}
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[120px]" />

          <div className="relative">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-orange-400">
              Ready to Get Started?
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Let's Find Your
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                {" "}
                Dream Property
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              Browse our latest verified properties or connect with our expert
              consultants to receive personalized guidance for your next real
              estate investment.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <MotionLink
                href="/properties"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-orange-500
                  via-amber-500
                  to-orange-600
                  px-8
                  py-4
                  font-semibold
                  text-white
                  shadow-[0_15px_40px_rgba(249,115,22,0.35)]
                  transition-all
                  duration-300
                  hover:shadow-[0_20px_50px_rgba(249,115,22,0.45)]
                "
              >
                Browse Properties
                <HiArrowRight size={20} />
              </MotionLink>

              <MotionLink
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="
                  rounded-full
                  border
                  border-white/10
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition
                  hover:border-orange-400
                  hover:text-orange-400
                "
              >
                Back to Home
              </MotionLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}