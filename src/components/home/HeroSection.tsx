"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import {
  HiArrowRight,
  HiCheckBadge,
  HiPlayCircle,
} from "react-icons/hi2";

const containerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroSection() {

  const [showVideo, setShowVideo] = useState(false);
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]
        pt-36
        pb-40
        lg:pt-40
        lg:pb-52
      "
    >

      <div className="absolute inset-0">

        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Luxury Property"
          fill
          priority
          className="object-cover object-center opacity-25"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#090909]/95 to-[#1a1208]/70" />

        {/* Orange Glow */}

        <div className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-[140px]" />

        {/* Amber Glow */}

        <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-amber-500/20 blur-[150px]" />

      </div>


      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          lg:px-8
        "
      >

        <div
          className="
            grid
            items-center
            gap-20
            lg:grid-cols-2
          "
        >

          <motion.div variants={itemVariant} className="max-w-2xl">

            {/* Premium Badge */}

            <motion.div
              variants={itemVariant}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-orange-400/20
                bg-white/5
                px-5
                py-2.5
                backdrop-blur-xl
              "
            >
              <HiCheckBadge
                className="text-orange-400"
                size={20}
              />

              <span className="text-sm font-medium tracking-wide text-white/90">
                India's Most Trusted Premium Real Estate Platform
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={itemVariant}
              className="
                mt-8
                text-5xl
                font-black
                leading-[1.05]
                text-white
                md:text-6xl
                xl:text-7xl
              "
            >
              Find Your

              <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                Dream Property
              </span>

              With Confidence
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={itemVariant}
              className="
                mt-8
                max-w-xl
                text-lg
                leading-8
                text-white/65
              "
            >
              Explore verified luxury villas, premium apartments,
              gated communities and commercial properties across
              India's fastest-growing cities with complete
              transparency and expert guidance.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={itemVariant}
              className="mt-10 flex flex-wrap gap-5"
            >
              <Link
                href="/properties"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  via-orange-500
                  to-amber-500
                  px-8
                  py-4
                  font-semibold
                  text-white
                  shadow-[0_20px_50px_rgba(249,115,22,.35)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_25px_70px_rgba(249,115,22,.45)]
                "
              >
                Explore Properties

                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

             <button
  onClick={() => setShowVideo(true)}
  className="
    inline-flex
    items-center
    gap-3
    rounded-2xl
    border
    border-white/10
    bg-white/5
    px-8
    py-4
    font-semibold
    text-white
    backdrop-blur-xl
    transition-all
    duration-300
    hover:bg-white/10
  "
>
  <HiPlayCircle
    className="text-orange-300"
    size={24}
  />

  Watch Video
</button>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="
                mt-16
                grid
                grid-cols-3
                gap-5
              "
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/30">
                <h3 className="text-4xl font-black text-white">
                  25K+
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Verified Properties
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/30">
                <h3 className="text-4xl font-black text-white">
                  12K+
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Happy Families
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/30">
                <h3 className="text-4xl font-black text-white">
                  150+
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Prime Locations
                </p>
              </div>
            </motion.div>

          </motion.div>

          <motion.div
            variants={itemVariant}
            className="
              relative
              flex
              justify-center
              lg:justify-end
            "
          >

            {/* Background Glow */}

            <div className="absolute h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-[140px]" />

            {/* Main Glass Card */}

            <div
              className="
                relative
                w-full
                max-w-[500px]
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
                bg-white/5
                shadow-[0_35px_100px_rgba(0,0,0,.45)]
                backdrop-blur-3xl
              "
            >

              {/* Property Image */}

              <div className="relative h-[560px]">
                                <Image
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop"
                  alt="Luxury Villa"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Featured Badge */}

                <div className="absolute left-6 top-6">

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-orange-500
                      to-amber-500
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      shadow-xl
                    "
                  >
                    ⭐ Featured Property
                  </div>

                </div>

                {/* Property Details */}

                <div className="absolute bottom-0 w-full p-10">

                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">

                    Luxury Villa

                  </span>

                  <h2 className="mt-3 text-4xl font-black text-white">

                    Ocean View Residence

                  </h2>

                  <p className="mt-3 text-lg text-white/70">

                    Bangalore, Karnataka

                  </p>

                  <div className="mt-8 flex items-center justify-between">

                    <div>

                      <p className="text-sm text-white/60">
                        Starting From
                      </p>

                      <h3 className="mt-1 text-5xl font-black text-white">

                        ₹3.85 Cr

                      </h3>

                    </div>

                    <div
                      className="
                        rounded-2xl
                        border
                        border-orange-400/20
                        bg-orange-500/15
                        px-5
                        py-3
                        backdrop-blur-xl
                      "
                    >
                      <span className="text-sm font-semibold text-white">

                        Ready to Move

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Review Card */}

            <div
              className="
                absolute
                -left-8
                top-20
                hidden
                rounded-3xl
                border
                border-white/10
                bg-white/10
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,.35)]
                backdrop-blur-2xl
                lg:block
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-yellow-400
                    to-orange-500
                    text-2xl
                  "
                >
                  ⭐
                </div>

                <div>

                  <h4 className="text-lg font-bold text-white">

                    4.9 / 5 Rating

                  </h4>

                  <p className="text-sm text-white/60">

                    Trusted by 12K+ Buyers

                  </p>

                </div>

              </div>

            </div>
                        {/* Available Properties Card */}

            <div
              className="
                absolute
                -right-10
                top-36
                hidden
                rounded-3xl
                border
                border-white/10
                bg-white/10
                px-7
                py-6
                shadow-[0_20px_60px_rgba(0,0,0,.35)]
                backdrop-blur-2xl
                lg:block
              "
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-300">
                Available
              </p>

              <h3 className="mt-2 text-5xl font-black text-white">
                25K+
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Premium Properties
              </p>
            </div>

            {/* Happy Families Card */}

            <div
              className="
                absolute
                -bottom-16
                left-6
                hidden
                rounded-3xl
                border
                border-white/10
                bg-white/10
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,.35)]
                backdrop-blur-2xl
                lg:block
              "
            >
              <div className="flex items-center gap-4">

                <div className="flex -space-x-3">

                  <div className="h-11 w-11 rounded-full border-2 border-white bg-orange-200" />

                  <div className="h-11 w-11 rounded-full border-2 border-white bg-orange-300" />

                  <div className="h-11 w-11 rounded-full border-2 border-white bg-orange-400" />

                </div>

                <div>

                  <h4 className="font-bold text-white">
                    10K+ Families
                  </h4>

                  <p className="text-sm text-white/60">
                    Found Their Dream Home
                  </p>

                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </motion.div>

      {/* Hero Bottom Fade */}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />

      {showVideo && (
  <div
    className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-black/80
      backdrop-blur-sm
      p-4
    "
  >
    <div className="relative w-full max-w-5xl">
      <button
        onClick={() => setShowVideo(false)}
        className="
          absolute
          -top-12
          right-0
          text-4xl
          text-white
          hover:text-orange-400
        "
      >
        ✕
      </button>

      <iframe
        className="aspect-video w-full rounded-2xl"
        src="https://www.youtube.com/embed/fq4N0hgOWzU"
        title="RedSand Homes"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  </div>
)}

    </section>
  );
}