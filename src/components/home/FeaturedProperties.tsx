"use client";

import Image from "next/image";
import Link from "next/link";
import { motion , type Variants } from "framer-motion";
import propertyService from "@/src/app/services/property.service";
import { IconType } from "react-icons";
import { useState , useEffect } from "react";
import {
  HiHeart,
  HiMapPin,
  HiStar,
  HiArrowRight,
  HiHomeModern,
  HiBuildingOffice2,
  HiCheckBadge,
} from "react-icons/hi2";




interface Property {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  type: string;
  bhk: string;
  bathrooms: number;
  area: string;
  rating: number;
  reviews: number;
  featured: boolean;
  newLaunch: boolean;
  verified: boolean;
}



const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Sky Residency",
    location: "Anna Nagar, Chennai",
    image: "/images/properties/property-1.png",
    price: "₹1.25 Cr",
    type: "Apartment",
    bhk: "3 BHK",
    bathrooms: 3,
    area: "2,150 Sq.ft",
    rating: 4.9,
    reviews: 128,
    featured: true,
    newLaunch: true,
    verified: true,
  },
  {
    id: 2,
    title: "Palm Grove Villa",
    location: "Sarjapur Road, Bangalore",
    image: "/images/properties/property-2.png",
    price: "₹2.80 Cr",
    type: "Villa",
    bhk: "4 BHK",
    bathrooms: 4,
    area: "3,850 Sq.ft",
    rating: 4.8,
    reviews: 96,
    featured: true,
    newLaunch: false,
    verified: true,
  },
  {
    id: 3,
    title: "Emerald Heights",
    location: "Gachibowli, Hyderabad",
    image: "/images/properties/property-3.png",
    price: "₹98 Lakhs",
    type: "Apartment",
    bhk: "2 BHK",
    bathrooms: 2,
    area: "1,560 Sq.ft",
    rating: 4.7,
    reviews: 74,
    featured: true,
    newLaunch: true,
    verified: true,
  },
    {
    id: 4,
    title: "Ocean Breeze Villa",
    location: "ECR, Chennai",
    image: "/images/properties/property-4.png",
    price: "₹3.45 Cr",
    type: "Villa",
    bhk: "5 BHK",
    bathrooms: 5,
    area: "4,750 Sq.ft",
    rating: 5.0,
    reviews: 52,
    featured: true,
    newLaunch: false,
    verified: true,
  },
  {
    id: 5,
    title: "Urban Elite Towers",
    location: "Whitefield, Bangalore",
    image: "/images/properties/property-5.png",
    price: "₹1.65 Cr",
    type: "Apartment",
    bhk: "3 BHK",
    bathrooms: 3,
    area: "2,320 Sq.ft",
    rating: 4.8,
    reviews: 118,
    featured: false,
    newLaunch: true,
    verified: true,
  },
  {
    id: 6,
    title: "Royal Business Hub",
    location: "OMR, Chennai",
    image: "/images/properties/property-6.png",
    price: "₹4.25 Cr",
    type: "Commercial",
    bhk: "Office",
    bathrooms: 6,
    area: "6,200 Sq.ft",
    rating: 4.9,
    reviews: 41,
    featured: true,
    newLaunch: false,
    verified: true,
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



export default function FeaturedProperties() {

  const [properties, setProperties] = useState<Property[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchFeatured = async () => {
    try {
      const response = await propertyService.getAll();

      setProperties(response.data);
    } finally {
      setLoading(false);
    }
  };

  fetchFeatured();
}, []);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
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
            FEATURED PROPERTIES
          </span>
                    <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Handpicked
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Featured Properties
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Explore our exclusive collection of premium apartments, luxury
            villas and commercial properties carefully selected by RedSand
            Homes.
          </p>
        </motion.div>


        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {properties.map((property) => (
            <motion.article
              key={property.id}
              variants={cardVariant}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            >
              {/* Property Image */}

              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                {/* Top Badges */}

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {property.featured && (
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      Featured
                    </span>
                  )}

                  {property.newLaunch && (
                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      New Launch
                    </span>
                  )}
                </div>

                {/* Wishlist */}

                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-label="Add to wishlist"
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-colors duration-300 hover:bg-red-500"
                >
                  <HiHeart size={20} />
                </motion.button>

                {/* Verified */}

                {property.verified && (
                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
                    <HiCheckBadge className="text-emerald-400" size={18} />

                    <span className="text-sm font-medium text-white">
                      Verified Property
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium uppercase tracking-wide text-orange-300">
                      {property.type}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                      {property.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-orange-400">
                      {property.price}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-white/70">
                  <HiMapPin className="text-orange-400" size={18} />

                  <span>{property.location}</span>
                </div>
                                {/* Property Meta */}

                <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      Bedrooms
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {property.bhk}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      Bathrooms
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {property.bathrooms}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      Area
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {property.area}
                    </p>
                  </div>
                </div>

                {/* Rating */}

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HiStar
                      className="fill-yellow-400 text-yellow-400"
                      size={20}
                    />

                    <span className="font-semibold text-white">
                      {property.rating}
                    </span>

                    <span className="text-white/50">
                      ({property.reviews} Reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1">
                    <HiCheckBadge
                      className="text-emerald-400"
                      size={18}
                    />

                    <span className="text-sm font-medium text-emerald-300">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Footer */}

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 font-bold text-white">
                      RH
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        RedSand Homes
                      </p>

                      <p className="text-sm text-white/60">
                        Premium Verified Partner
                      </p>
                    </div>
                  </div>

                 <Link href={`/properties/${property.id}`}>
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.97 }}
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-gradient-to-r
      from-orange-500
      via-amber-500
      to-orange-600
      px-5
      py-3
      text-sm
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:shadow-orange-500/40
    "
  >
    View Details

    <HiArrowRight size={18} />
  </motion.button>
</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}

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
            p-10
            backdrop-blur-2xl
          "
        >
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <span className="rounded-full bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Luxury Collection
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Explore Thousands of Premium Properties
              </h3>

              <p className="mt-4 max-w-2xl text-white/70">
                Discover verified luxury apartments, villas, commercial spaces,
                and investment opportunities across India's fastest-growing
                cities.
              </p>
            </div>

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
    Browse All Properties
    <HiArrowRight size={20} />
  </motion.button>
</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}