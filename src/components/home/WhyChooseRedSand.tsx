"use client";

import { motion , type Variants } from "framer-motion";
import Link from "next/link";
import {
  HiCheckBadge,
  HiCurrencyRupee,
  HiScale,
  HiUserGroup,
  HiBuildingLibrary,
  HiShieldCheck,
  HiArrowRight,
} from "react-icons/hi2";
import { IconType } from "react-icons";



interface Feature {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  gradient: string;
}



const features: Feature[] = [
  {
    id: 1,
    title: "Verified Properties",
    description:
      "Every property is carefully verified with complete legal documentation and ownership validation.",
    icon: HiCheckBadge,
    gradient: "from-emerald-500 to-green-400",
  },
  {
    id: 2,
    title: "Best Price Guarantee",
    description:
      "We negotiate directly with builders and owners to ensure you always receive the best value.",
    icon: HiCurrencyRupee,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: 3,
    title: "Legal Assistance",
    description:
      "Professional legal experts guide you through every agreement, approval, and registration process.",
    icon: HiScale,
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    id: 4,
    title: "Expert Consultants",
    description:
      "Experienced real estate consultants help you choose the perfect investment with confidence.",
    icon: HiUserGroup,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 5,
    title: "Home Loan Support",
    description:
      "Fast loan approvals through trusted banking partners with attractive interest rates.",
    icon: HiBuildingLibrary,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: 6,
    title: "End-to-End Assistance",
    description:
      "From your first property search to registration, we stay with you throughout the journey.",
    icon: HiShieldCheck,
    gradient: "from-rose-500 to-pink-500",
  },
];



const containerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
    visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

  const MotionLink = motion(Link);


export default function WhyChooseRedSand() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">


        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-orange-300">
            WHY CHOOSE REDSAND HOMES
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Your Trusted Partner in
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Premium Real Estate
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            We combine verified properties, transparent pricing, expert
            guidance and end-to-end support to make every property journey
            simple, secure and rewarding.
          </p>
        </motion.div>


        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.article
              key={feature.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              "
            >
              {/* Glow Effect */}

              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                            {/* Gradient Icon */}

              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                className={`
                  inline-flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${feature.gradient}
                  text-white
                  shadow-xl
                `}
              >
                <feature.icon size={30} />
              </motion.div>

              {/* Content */}

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-white/70">
                  {feature.description}
                </p>

                <motion.button
                  whileHover={{
                    x: 5,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-orange-300
                    transition-colors
                    duration-300
                    hover:text-orange-200
                  "
                >
                  Learn More

                  <HiArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </div>

              {/* Hover Border */}

              <div className="absolute inset-0 rounded-[30px] border border-orange-400/0 transition-all duration-500 group-hover:border-orange-400/30" />
            </motion.article>
          ))}
        </motion.div>


        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mt-20
            rounded-[36px]
            border
            border-white/10
            bg-gradient-to-r
            from-orange-500/10
            via-white/5
            to-amber-500/10
            p-8
            backdrop-blur-2xl
            md:p-10
          "
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Trusted Since Day One
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Ready to Find Your Dream Home?
              </h3>

              <p className="mt-4 max-w-2xl text-white/70">
                Let our experienced property consultants help you discover
                verified homes, premium investments and luxury residences that
                perfectly match your lifestyle and budget.
              </p>
            </div>

           <MotionLink
  href="/contact?type=consultation"
  whileHover={{
    scale: 1.05,
    y: -3,
  }}
  whileTap={{
    scale: 0.97,
  }}
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
  <span>Schedule Free Consultation</span>
  <HiArrowRight size={20} />
</MotionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}