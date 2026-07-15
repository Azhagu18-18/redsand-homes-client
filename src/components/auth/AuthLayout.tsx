"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiShieldCheck,
  HiHomeModern,
} from "react-icons/hi2";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <section className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-black" />

          <Image
            src="/images/auth/auth-banner.jpg"
            alt="Luxury Property"
            fill
            priority
            className="object-cover opacity-30"
          />

          <div className="relative z-10 flex flex-col justify-between p-12">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:border-orange-500 hover:text-orange-400"
            >
              <HiArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
                <HiShieldCheck className="h-5 w-5" />
                Secure Authentication
              </span>

              <h2 className="text-5xl font-bold leading-tight">
                Welcome to
                <span className="block text-orange-500">
                  RedSand Homes
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Buy, sell and rent premium properties with confidence.
                Experience enterprise-grade security, verified listings,
                and seamless property management.
              </p>

              <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/20">
                  <HiHomeModern className="h-7 w-7 text-orange-400" />
                </div>

                <div>
                  <p className="font-semibold">
                    Trusted Real Estate Platform
                  </p>
                  <p className="text-sm text-gray-400">
                    Luxury • Secure • Verified
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-md"
          >
            <div className="mb-10">
              <h1 className="text-4xl font-bold">{title}</h1>

              <p className="mt-3 text-gray-400">
                {subtitle}
              </p>
            </div>

            {children}
          </motion.div>
        </section>
      </div>
    </main>
  );
}