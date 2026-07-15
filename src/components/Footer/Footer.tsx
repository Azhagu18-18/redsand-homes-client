"use client";

import Link from "next/link";
import { HiArrowRight, HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  subscribeNewsletterSchema,
  type SubscribeNewsletterInput,
} from "@/src/validators/newsletter.validation"


import newsletterService from "@/src/services/newsletter.service";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

/* Data */

const quickLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Properties",
    href: "/properties",
  },
  {
    title: "Locations",
    href: "/locations",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const services = [
  "Buy Property",
  "Sell Property",
  "Rent Property",
  "Home Loans",
  "Legal Assistance",
  "Interior Design",
];

const socials = [
  {
    icon: FaFacebookF,
    href: "#",
  },
  {
    icon: FaInstagram,
    href: "#",
  },
  {
    icon: FaXTwitter,
    href: "#",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
  },
  {
    icon: FaYoutube,
    href: "#",
  },
];
export default function Footer() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeNewsletterInput>({
    resolver: zodResolver(subscribeNewsletterSchema),
  });

  const onSubmit = async (data: SubscribeNewsletterInput) => {
    try {
      setLoading(true);

      const res = await newsletterService.subscribe(data);

      toast.success(res.message || "Thank you for subscribing!");

      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "You are already subscribed."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808] pt-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

       {/*  Top NewsPaper Card */}

        <div
          className="
            mb-20
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
              <span className="inline-flex rounded-full bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Stay Updated
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Get Exclusive Property Updates
              </h2>

              <p className="mt-4 leading-8 text-white/70">
                Subscribe to receive premium property launches, investment
                opportunities, market insights, and exclusive offers directly to
                your inbox.
              </p>
            </div>

            {/* Newsletter */}

            <div className="w-full max-w-xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <div className="relative flex-1">
                  <HiEnvelope
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-300"
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="
                          h-14
                          w-full
                          rounded-full
                          border
                          border-white/10
                          bg-white/5
                          pl-14
                          pr-5
                          text-white
                          placeholder:text-white/40
                          outline-none
                          transition-all
                          duration-300
                          focus:border-orange-400/40
                        "
                  />

                  {errors.email && (
                    <p className="mt-2 ml-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-full
                          bg-gradient-to-r
                          from-orange-500
                          via-amber-500
                          to-orange-600
                          px-8
                          font-semibold
                          text-white
                          shadow-lg
                          transition-all
                          duration-300
                          hover:scale-105
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                        "
                >
                  {loading ? "Subscribing..." : "Subscribe"}

                  {!loading && <HiArrowRight size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {" "}
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-3xl font-extrabold text-transparent">
                RedSand Homes
              </h2>
            </Link>

            <p className="mt-6 leading-8 text-white/70">
              RedSand Homes is your trusted real estate partner for premium
              residential and commercial properties across India's fastest
              growing cities. We help buyers, sellers and investors make
              confident property decisions.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/70
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-orange-400/40
                    hover:bg-orange-500
                    hover:text-white
                  "
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white">Quick Links</h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="
                      text-white/70
                      transition-all
                      duration-300
                      hover:translate-x-2
                      hover:text-orange-300
                    "
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white">Our Services</h3>

            <ul className="mt-6 space-y-4">
              {services.map((service) => (
                <li
                  key={service}
                  className="
                    cursor-pointer
                    text-white/70
                    transition-all
                    duration-300
                    hover:translate-x-2
                    hover:text-orange-300
                  "
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-white">Contact Us</h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <HiMapPin className="mt-1 text-orange-400" size={20} />

                <p className="text-white/70">
                  Coimbatore,
                  <br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <HiPhone className="text-orange-400" size={20} />

                <a
                  href="tel:+919999999999"
                  className="text-white/70 transition hover:text-orange-300"
                >
                  +91 9999999999
                </a>
              </div>

              <div className="flex items-center gap-3">
                <HiEnvelope className="text-orange-400" size={20} />

                <a
                  href="mailto:hello@redsandhomes.com"
                  className="text-white/70 transition hover:text-orange-300"
                >
                  hello@redsandhomes.com
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-20 border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} RedSand Homes. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-white/60 transition hover:text-orange-300"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-white/60 transition hover:text-orange-300"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/cookies"
                className="text-white/60 transition hover:text-orange-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
