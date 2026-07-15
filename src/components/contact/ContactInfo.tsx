"use client";

import { motion } from "framer-motion";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from "react-icons/hi2";

const contactDetails = [
  {
    icon: HiOutlineMapPin,
    title: "Office Address",
    value: "Coimbatore, Tamil Nadu, India",
  },
  {
    icon: HiOutlinePhone,
    title: "Phone",
    value: "+91 9999999999",
  },
  {
    icon: HiOutlineEnvelope,
    title: "Email",
    value: "azhagumalaikrishnanplus@gmail.com",
  },
  {
    icon: HiOutlineClock,
    title: "Business Hours",
    value: "Mon - Sat • 9:00 AM - 7:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-white">
          Get in Touch
        </h2>

        <p className="mt-3 text-gray-400 leading-7">
          Whether you're buying, selling, or investing, our experienced team is
          ready to guide you through every step of your real estate journey.
        </p>

        <div className="mt-10 space-y-6">
          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-orange-500/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15">
                  <Icon
                    size={22}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-gray-400">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Response Card */}
      <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-8">
        <h3 className="text-2xl font-bold text-white">
          Quick Response
        </h3>

        <p className="mt-3 text-gray-300">
          Our property consultants usually respond within{" "}
          <span className="font-semibold text-orange-400">
            24 hours
          </span>
          .
        </p>
      </div>
    </motion.div>
  );
}