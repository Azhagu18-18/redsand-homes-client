"use client";

import Image from "next/image";
import { motion , type Variants } from "framer-motion";
import {
  HiStar,
  HiChatBubbleLeftRight,
  HiHomeModern,
  HiMapPin,
  HiArrowRight
} from "react-icons/hi2";



interface Testimonial {
  id: number;
  name: string;
  role: string;
  city: string;
  property: string;
  image: string;
  rating: number;
  review: string;
}



const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "Software Engineer",
    city: "Chennai",
    property: "Luxury Apartment",
    image: "/images/testimonials/client-1.png",
    rating: 5,
    review:
      "RedSand Homes made our home-buying journey effortless. Their team guided us through every step, from property visits to registration. We found our dream apartment within two weeks.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Business Owner",
    city: "Bangalore",
    property: "Premium Villa",
    image: "/images/testimonials/client-2.png",
    rating: 5,
    review:
      "The transparency, professionalism, and premium service exceeded every expectation. We confidently invested in a luxury villa with complete peace of mind.",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Investor",
    city: "Hyderabad",
    property: "Commercial Space",
    image: "/images/testimonials/client-3.png",
    rating: 5,
    review:
      "Excellent investment advice, verified properties, and outstanding customer support. RedSand Homes is now my first choice for every real estate investment.",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    role: "Doctor",
    city: "Coimbatore",
    property: "Independent House",
    image: "/images/testimonials/client-4.png",
    rating: 5,
    review:
      "From legal verification to loan assistance, everything was handled professionally. The experience was smooth, transparent, and stress-free.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Entrepreneur",
    city: "Mumbai",
    property: "Beachfront Villa",
    image: "/images/testimonials/client-5.png",
    rating: 5,
    review:
      "The property recommendations perfectly matched our requirements. The attention to detail and customer care truly sets RedSand Homes apart.",
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

const cardVariant:Variants = {
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



export default function Testimonials() {
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
            CLIENT TESTIMONIALS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Trusted by
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Thousands of Families
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Discover why homebuyers and investors choose RedSand Homes for
            transparent guidance, verified properties, and an exceptional real
            estate experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
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
                            {/* Quote Icon */}

              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-xl">
                <HiChatBubbleLeftRight size={28} />
              </div>

              {/* Rating */}

              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <HiStar
                    key={index}
                    className="fill-yellow-400 text-yellow-400"
                    size={18}
                  />
                ))}
              </div>

              {/* Review */}

              <p className="mt-6 leading-8 text-white/70">
                "{testimonial.review}"
              </p>

              {/* Divider */}

              <div className="my-8 h-px bg-gradient-to-r from-orange-500/60 via-white/20 to-transparent" />

              {/* Customer */}

              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-orange-400/30">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-white/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Bottom Info */}

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
                  <HiMapPin
                    className="text-orange-400"
                    size={16}
                  />

                  {testimonial.city}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
                  <HiHomeModern
                    className="text-orange-400"
                    size={16}
                  />

                  {testimonial.property}
                </div>
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
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Trusted by Thousands
              </span>

              <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Your Dream Home Could Be Next
              </h3>

              <p className="mt-4 text-lg leading-8 text-white/70">
                Join thousands of satisfied families who found their perfect
                property through RedSand Homes. Experience transparent guidance,
                verified listings, and exceptional customer support.
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
              Find Your Dream Home

              <HiArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}