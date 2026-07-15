"use client";

import { motion , type Variants } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiArrowRight,
  HiHomeModern,
  HiBuildingStorefront,
  HiKey,
  HiBuildingLibrary,
  HiScale,
  HiSparkles,
} from "react-icons/hi2";
import { useRouter } from "next/navigation";



interface Service {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  gradient: string;
}


const services: Service[] = [
  {
    id: 1,
    title: "Buy Property",
    description:
      "Discover premium apartments, villas, plots and commercial spaces across India's most desirable locations.",
    icon: HiHomeModern,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: 2,
    title: "Sell Property",
    description:
      "Reach genuine buyers, maximize your property's value and close deals with confidence.",
    icon: HiBuildingStorefront,
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    id: 3,
    title: "Rent Property",
    description:
      "Explore verified rental homes and commercial spaces with flexible leasing options.",
    icon: HiKey,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 4,
    title: "Home Loans",
    description:
      "Get quick approvals through our trusted banking partners with competitive interest rates.",
    icon: HiBuildingLibrary,
    gradient: "from-emerald-500 to-green-400",
  },
  {
    id: 5,
    title: "Legal Assistance",
    description:
      "Professional legal guidance covering documentation, agreements and registrations.",
    icon: HiScale,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: 6,
    title: "Interior Design",
    description:
      "Transform your property with bespoke interiors tailored to your lifestyle and vision.",
    icon: HiSparkles,
    gradient: "from-indigo-500 to-blue-500",
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



export default function PropertyServices() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
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
            OUR PREMIUM SERVICES
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Everything You Need
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Under One Roof
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            From buying and selling to financing, legal assistance and interior
            design, RedSand Homes provides a complete real estate experience
            through one trusted platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="
grid
gap-8
sm:grid-cols-2
lg:grid-cols-3
"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.01,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-8
                h-[380px]
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              `}
            >
              {/* Background Glow */}

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            {/* Service Icon */}

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
                  ${service.gradient}
                  text-white
                  shadow-xl
                `}
              >
                <service.icon size={30} />
              </motion.div>

              {/* Content */}

              <div className="mt-8 flex flex-1 flex-col">
                <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                  {service.title}
                </h3>

               <p className="mt-4 h-[112px] leading-7 text-white/70">
                  {service.description}
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    mt-auto
                    inline-flex
                    w-fit
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
                  Explore Service

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
            h-[380px]
            backdrop-blur-2xl
            md:p-10
          "
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Expert Guidance
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Need Professional Property Assistance?
              </h3>

              <p className="mt-4 max-w-2xl text-white/70">
                Whether you're buying your first home, selling an investment, or
                looking for legal and financial support, our experts are ready
                to help you every step of the way.
              </p>
            </div>

            <motion.button
  whileHover={{
    scale: 1.05,
    y: -3,
  }}
  whileTap={{
    scale: 0.97,
  }}
  onClick={() => router.push("/contact")}
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
  Book Free Consultation
  <HiArrowRight size={20} />
</motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}