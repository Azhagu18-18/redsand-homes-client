"use client";
import { motion, type Variants } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiArrowTrendingUp,
  HiHomeModern,
  HiBanknotes,
  HiShieldCheck,
  HiMapPin,
  HiChartBar,
  HiArrowRight,
} from "react-icons/hi2";

import Link from "next/link";

interface Benefit {
  id: number;
  title: string;
  description: string;
  statistic: string;
  icon: IconType;
  gradient: string;
}


const benefits: Benefit[] = [
  {
    id: 1,
    title: "High Property Appreciation",
    description:
      "Premium residential and commercial properties have consistently delivered strong capital appreciation over the long term.",
    statistic: "18% Avg Annual Growth",
    icon: HiArrowTrendingUp,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: 2,
    title: "Passive Rental Income",
    description:
      "Generate recurring monthly income through professionally managed rental properties in prime locations.",
    statistic: "Up to 12% Rental Yield",
    icon: HiBanknotes,
    gradient: "from-emerald-500 to-green-400",
  },
  {
    id: 3,
    title: "Secure Long-Term Asset",
    description:
      "Real estate remains one of the most reliable and stable investment options with tangible asset ownership.",
    statistic: "95% Wealth Preservation",
    icon: HiShieldCheck,
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    id: 4,
    title: "Prime Growth Locations",
    description:
      "Invest in fast-growing cities with excellent infrastructure, employment opportunities and future appreciation.",
    statistic: "150+ Premium Locations",
    icon: HiMapPin,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 5,
    title: "Diversified Investment",
    description:
      "Balance your portfolio with residential, commercial and plotted developments for sustainable returns.",
    statistic: "Higher Portfolio Stability",
    icon: HiChartBar,
    gradient: "from-indigo-500 to-blue-500",
  },
];
;


const containerVariant: Variants= {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const itemVariant: Variants= {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function InvestmentBenefits() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-16 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-12 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-orange-300">
            INVEST SMART
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Why Real Estate is the
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Best Investment
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Build long-term wealth with carefully selected investment
            opportunities backed by strong appreciation, recurring rental income
            and trusted market expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Timeline Line */}

          <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-orange-500 via-amber-400 to-yellow-300 lg:block" />
                    <div className="space-y-10">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={cardVariant}
                className="relative lg:pl-20"
              >
                {/* Timeline Dot */}

                <motion.div
                  whileHover={{
                    scale: 1.15,
                  }}
                  className="
                    absolute
                    left-0
                    top-10
                    z-10
                    hidden
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-white/10
                    bg-gradient-to-br
                    from-orange-500
                    to-amber-400
                    shadow-[0_10px_35px_rgba(249,115,22,0.45)]
                    lg:flex
                  "
                >
                  <benefit.icon className="text-white" size={22} />
                </motion.div>

                {/* Glass Card */}

                <motion.article
                  whileHover={{
                    y: -8,
                    scale: 1.01,
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
                  {/* Background Glow */}

                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Mobile Icon */}

                  <div
                    className={`
                      inline-flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${benefit.gradient}
                      text-white
                      shadow-xl
                      lg:hidden
                    `}
                  >
                    <benefit.icon size={30} />
                  </div>

                  <div className="mt-6 lg:mt-0">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                          {benefit.title}
                        </h3>

                        <p className="mt-4 max-w-2xl leading-7 text-white/70">
                          {benefit.description}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 px-5 py-4 text-center backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-widest text-orange-300">
                          Key Metric
                        </p>

                        <p className="mt-2 text-lg font-bold text-white">
                          {benefit.statistic}
                        </p>
                      </div>
                    </div>
                                        {/* Action */}

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
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-5
                        py-3
                        font-semibold
                        text-orange-300
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-orange-400/30
                        hover:bg-orange-500/10
                        hover:text-orange-200
                      "
                    >
                      Explore Investment

                      <HiArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </motion.button>
                  </div>

                  {/* Hover Border */}

                  <div className="absolute inset-0 rounded-[30px] border border-orange-400/0 transition-all duration-500 group-hover:border-orange-400/30" />
                </motion.article>
              </motion.div>
            ))}
          </div>
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
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Start Building Wealth
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Secure Your Future with Real Estate
              </h3>

              <p className="mt-4 text-lg leading-8 text-white/70">
                Invest in verified premium properties with strong appreciation,
                attractive rental returns, and long-term value backed by expert
                guidance from RedSand Homes.
              </p>
            </div>

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
      group
      inline-flex
      items-center
      justify-center
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
      hover:shadow-[0_20px_55px_rgba(249,115,22,0.45)]
    "
  >
    Explore Investment Opportunities

    <HiArrowRight
      size={20}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </motion.button>
</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}