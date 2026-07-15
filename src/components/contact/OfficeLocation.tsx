"use client";

import { motion } from "framer-motion";
import { HiOutlineMapPin } from "react-icons/hi2";

export default function OfficeLocation() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
              <HiOutlineMapPin size={18} />
              Our Office
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white">
              Visit RedSand Homes
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              We'd love to meet you in person. Visit our office to discuss your
              property requirements with our experienced consultants.
            </p>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <iframe
              title="RedSand Homes Location"
              src="https://www.google.com/maps?q=Coimbatore,Tamil+Nadu&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              className="border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-2xl font-semibold text-white">
              RedSand Homes
            </h3>

            <p className="mt-3 text-gray-400">
              Coimbatore, Tamil Nadu, India
            </p>

            <p className="mt-2 text-gray-500">
              Premium Real Estate Services • Buy • Sell • Rent
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}