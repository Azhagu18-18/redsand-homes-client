"use client";

import Image from "next/image";
import { motion , type Variants} from "framer-motion";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import {
  HiArrowRight,
  HiHomeModern,
  HiBuildingOffice2,
  HiBuildingStorefront,
  HiMap,
  HiSparkles,
  HiHome,
} from "react-icons/hi2";

type CategoryPropertyType =
  | "Apartment"
  | "Villa"
  | "House"
  | "Plot"
  | "Commercial"
  | "Penthouse";

interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  count: string;
  icon: IconType;
  type: CategoryPropertyType;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Luxury Apartments",
    description:
      "Premium apartments with world-class amenities and breathtaking city views.",
    image: "/images/categories/luxury-apartment.png",
    count: "245+",
    icon: HiBuildingOffice2,
    type: "Apartment",
  },
  {
    id: 2,
    title: "Premium Villas",
    description:
      "Elegant villas crafted for luxury living with private gardens and pools.",
    image: "/images/categories/premium-villa.png",
    count: "120+",
    icon: HiHomeModern,
    type: "Villa",
  },
  {
    id: 3,
    title: "Independent Houses",
    description:
      "Modern independent homes designed for comfort, privacy and spacious living.",
    image: "/images/categories/independent-house.png",
    count: "186+",
    icon: HiHome,
    type: "House",
  },
  {
    id: 4,
    title: "Commercial Spaces",
    description:
      "High-end office spaces and commercial properties in prime business hubs.",
    image: "/images/categories/commercial-space.png",
    count: "92+",
    icon: HiBuildingStorefront,
    type: "Commercial",
  },
  {
    id: 5,
    title: "Residential Plots",
    description:
      "Investment-ready plots located in rapidly growing residential communities.",
    image: "/images/categories/residential-plots.png",
    count: "310+",
    icon: HiMap,
    type: "Plot",
  },
  {
    id: 6,
    title: "Beachfront Homes",
    description:
      "Exclusive beachfront residences offering unmatched luxury and scenic views.",
    image: "/images/categories/beachfront-home.png",
    count: "48+",
    icon: HiSparkles,
    type: "Villa",
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


export default function PropertyCategories() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}

        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wide text-orange-300">
            PROPERTY CATEGORIES
          </span>          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Explore Premium
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Property Categories
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            From luxury apartments and premium villas to commercial investments,
            discover carefully curated properties that match every lifestyle and
            investment goal.
          </p>
        </motion.div>


        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.article
              key={category.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-[0_25px_60px_rgba(0,0,0,0.18)]
              "
            >
              {/* Property Image */}

              <div className="relative h-[340px] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Gradient Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                {/* Property Count Badge */}

                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
                  <span className="text-xs font-semibold tracking-wide text-white">
                    {category.count} Properties
                  </span>
                </div>

                {/* Category Icon */}

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.08,
                  }}
                  className="
                    absolute
                    right-5
                    top-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/10
                    text-2xl
                    text-white
                    backdrop-blur-xl
                  "
                >
                  <category.icon />
                </motion.div>
                                {/* Card Content */}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/75">
                    {category.description}
                  </p>

                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                     onClick={() =>
                      router.push(
                        `/properties?propertyType=${encodeURIComponent(category.type)}`
                      )
                    }
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-orange-500
                      to-amber-500
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:shadow-orange-500/30
                    "
                  >
                    Explore Properties

                    <HiArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>
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
            rounded-[32px]
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
                Premium Collection
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Find Your Perfect Property Today
              </h3>

              <p className="mt-4 max-w-2xl text-white/70">
                Browse thousands of verified luxury homes, premium apartments,
                commercial spaces and investment opportunities across India's
                most desirable destinations.
              </p>
            </div>

            <motion.button
            onClick={() => router.push("/properties")}
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
              View All Properties

              <HiArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}