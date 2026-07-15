"use client";

import { motion , type Variants } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiHomeModern,
  HiUsers,
  HiMapPin,
  HiCurrencyRupee,
  HiTrophy,
  HiHeart,
  HiArrowRight
} from "react-icons/hi2";
import Link from "next/link";


interface Statistic {
  id: number;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: IconType;
  gradient: string;
}
const statistics: Statistic[] = [
  {
    id: 1,
    value: 25000,
    suffix: "+",
    label: "Properties Listed",
    description: "Verified premium residential and commercial listings.",
    icon: HiHomeModern,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: 2,
    value: 10000,
    suffix: "+",
    label: "Happy Clients",
    description: "Families and investors who trusted RedSand Homes.",
    icon: HiUsers,
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    id: 3,
    value: 150,
    suffix: "+",
    label: "Cities Covered",
    description: "Growing presence across India's leading cities.",
    icon: HiMapPin,
    gradient: "from-emerald-500 to-green-400",
  },
  {
    id: 4,
    value: 5000,
    prefix: "₹",
    suffix: " Cr+",
    label: "Transactions",
    description: "Total value of successful real estate transactions.",
    icon: HiCurrencyRupee,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 5,
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description: "Building trust through premium real estate services.",
    icon: HiTrophy,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: 6,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on verified customer feedback and reviews.",
    icon: HiHeart,
    gradient: "from-rose-500 to-pink-500",
  },
];

const containerVariant: Variants= {
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
    scale: 0.95,
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

const itemVariant: Variants= {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};


function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
    >
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
}


export default function StatisticsCounter() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-16 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
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
            OUR ACHIEVEMENTS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Numbers That Reflect
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Our Excellence
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Every milestone represents our commitment to delivering trusted,
            transparent, and premium real estate experiences across India.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {statistics.map((stat) => (
            <motion.article
              key={stat.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.02,
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
              {/* Glow */}

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}

              <motion.div
                whileHover={{
                  rotate: 10,
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
                  ${stat.gradient}
                  text-white
                  shadow-xl
                `}
              >
                <stat.icon size={30} />
              </motion.div>

              {/* Counter */}

              <div className="mt-8">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />

                <h3 className="mt-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                  {stat.label}
                </h3>

                <p className="mt-3 leading-7 text-white/70">
                  {stat.description}
                </p>
              </div>

              {/* Decorative Line */}

              <div className="mt-8 h-px w-full bg-gradient-to-r from-orange-500/60 via-white/20 to-transparent" />

              {/* Bottom Badge */}

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-xl">
                Trusted Since 2010
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
            overflow-hidden
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
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}

            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Join Our Success Story
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Become Our Next Happy Homeowner
              </h3>

              <p className="mt-4 text-lg leading-8 text-white/70">
                Join thousands of satisfied buyers, sellers, and investors who
                have trusted RedSand Homes to help them achieve their real
                estate goals with confidence and transparency.
              </p>
            </div>

            {/* CTA Button */}
          <Link href="/contact">
            <motion.button
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
                justify-center
                gap-3
                self-start
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
                hover:shadow-[0_20px_55px_rgba(249,115,22,0.45)]
                lg:self-center
              "
            >
              Start Your Journey

              <HiArrowRight size={20} />
            </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}