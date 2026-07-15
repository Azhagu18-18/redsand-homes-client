"use client";

import Image from "next/image";
import { motion , type Variants } from "framer-motion";
import {
  HiArrowRight,
  HiFire,
  HiMapPin,
  HiBuildingOffice2,
  HiStar,
} from "react-icons/hi2";

import Link from "next/link";

interface Location {
  id: number;
  city: string;
  state: string;
  image: string;
  properties: string;
  startingPrice: string;
  investmentScore: string;
  featured: boolean;
  size: "large" | "medium" | "small";
}

const locations: Location[] = [
  {
    id: 1,
    city: "Chennai",
    state: "Tamil Nadu",
    image: "/images/locations/chennai.png",
    properties: "1,248+",
    startingPrice: "₹68 Lakhs",
    investmentScore: "9.8",
    featured: true,
    size: "large",
  },
  {
    id: 2,
    city: "Bangalore",
    state: "Karnataka",
    image: "/images/locations/bangalore.png",
    properties: "982+",
    startingPrice: "₹82 Lakhs",
    investmentScore: "9.7",
    featured: true,
    size: "medium",
  },
  {
    id: 3,
    city: "Hyderabad",
    state: "Telangana",
    image: "/images/locations/hyderabad.png",
    properties: "865+",
    startingPrice: "₹74 Lakhs",
    investmentScore: "9.5",
    featured: false,
    size: "medium",
  },
  {
    id: 4,
    city: "Coimbatore",
    state: "Tamil Nadu",
    image: "/images/locations/coimbatore.png",
    properties: "640+",
    startingPrice: "₹56 Lakhs",
    investmentScore: "9.3",
    featured: false,
    size: "large",
  },
  {
    id: 5,
    city: "Mumbai",
    state: "Maharashtra",
    image: "/images/locations/mumbai.png",
    properties: "1,520+",
    startingPrice: "₹1.25 Cr",
    investmentScore: "9.9",
    featured: true,
    size: "medium",
  },
  {
    id: 6,
    city: "Delhi",
    state: "Delhi NCR",
    image: "/images/locations/delhi.png",
    properties: "1,135+",
    startingPrice: "₹96 Lakhs",
    investmentScore: "9.6",
    featured: false,
    size: "medium",
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

const itemVariant: Variants= {
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

export default function PopularLocations() {
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
            POPULAR LOCATIONS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Explore India's Most
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Premium Cities
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Browse luxury properties across India's fastest-growing cities with
            strong appreciation potential, premium amenities and excellent
            connectivity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid
gap-8
sm:grid-cols-2
xl:grid-cols-3"
        >
          {locations.map((location) => (
            <motion.article
              key={location.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.01,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                shadow-[0_25px_70px_rgba(0,0,0,0.20)]
              `}
            >
              {/* Background Image */}

              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src={location.image}
                  alt={location.city}
                  fill
                  className="
                    object-cover object-center
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Gradient Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                {/* Trending Badge */}

                {location.featured && (
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-xl">
                    <HiFire size={16} />
                    Trending
                  </div>
                )}

                {/* Investment Score */}

                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
                  <HiStar
                    className="fill-yellow-400 text-yellow-400"
                    size={18}
                  />

                  <span className="font-semibold text-white">
                    {location.investmentScore}
                  </span>
                </div>

                {/* Bottom Glass Panel */}

                <div
                  className="absolute
left-5
right-5
bottom-5 rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur-2xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white">
                        {location.city}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-white/70">
                        <HiMapPin className="text-orange-400" size={18} />

                        <span>{location.state}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{
                        x: 4,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    >
                      <HiArrowRight size={20} />
                    </motion.button>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center gap-2 text-orange-300">
                        <HiBuildingOffice2 size={18} />

                        <span className="text-sm font-medium">Properties</span>
                      </div>

                      <p className="mt-2 text-xl font-bold text-white">
                        {location.properties}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm font-medium text-orange-300">
                        Starting From
                      </p>

                      <p className="mt-2 text-xl font-bold text-white">
                        {location.startingPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                Discover More Destinations
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Can't Find Your Preferred Location?
              </h3>

              <p className="mt-4 text-lg leading-8 text-white/70">
                Explore hundreds of verified locations across India with
                exclusive listings, premium communities, and investment-ready
                opportunities tailored to your goals.
              </p>
            </div>

            {/* Right CTA */}

            <Link href="/properties">
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
                Explore All Cities
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
