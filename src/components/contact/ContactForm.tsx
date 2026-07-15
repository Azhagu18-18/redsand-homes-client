"use client";

import { useState } from "react";
import { motion , type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

import {
  contactSchema,
  ContactFormValues,
} from "@/src/lib/validations/contact.schema";

import { contactService } from "@/src/services/contact.service";

const fieldVariants: Variants= {
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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setLoading(true);

      const response =
        await contactService.sendMessage(data);

      toast.success(
        response.message ||
          "Your enquiry has been sent successfully."
      );

      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative overflow-hidden rounded-[32px]"
    >
      {/* Floating Background Orbs */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-amber-400/15 blur-[140px]"
      />

      {/* Animated Border */}

      <div className="rounded-[32px] bg-gradient-to-br from-orange-500/80 via-orange-300/20 to-orange-600/80 p-[1px]">
        <div className="relative overflow-hidden rounded-[31px] border border-white/10 bg-black/55 backdrop-blur-3xl">

          {/* Noise Layer */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle,#ffffff 1px,transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          {/* Glow */}

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_45%)]" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            className="relative z-10 p-8 md:p-12"
          >
            <motion.div
              variants={fieldVariants}
              className="mb-10"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-xl">
                <HiOutlineSparkles className="text-lg" />
                Premium Property Enquiry
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Let's Talk About
                <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  Your Dream Property
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400">
                Fill out the enquiry form and our real estate
                experts will contact you shortly with premium
                property recommendations tailored to your
                requirements.
              </p>
            </motion.div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-7"
            >
                            {/* ===================== */}
              {/* Name */}
              {/* ===================== */}

              <motion.div
                variants={fieldVariants}
                className="group"
              >
                <label className="mb-3 block text-sm font-medium tracking-wide text-gray-300">
                  Full Name
                </label>

                <div className="relative overflow-hidden rounded-2xl">

                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-orange-400/40 group-focus-within:border-orange-500" />

                  <HiOutlineUser
                    className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-xl text-orange-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-orange-300"
                  />

                  <input
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="
                      peer
                      w-full
                      rounded-2xl
                      border
                      border-transparent
                      bg-white/[0.04]
                      py-5
                      pl-14
                      pr-5
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_35px_rgba(249,115,22,0.18)]
                    "
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                </div>

                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-400"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              {/* ===================== */}
              {/* Email */}
              {/* ===================== */}

              <motion.div
                variants={fieldVariants}
                className="group"
              >
                <label className="mb-3 block text-sm font-medium tracking-wide text-gray-300">
                  Email Address
                </label>

                <div className="relative overflow-hidden rounded-2xl">

                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-orange-400/40 group-focus-within:border-orange-500" />

                  <HiOutlineEnvelope
                    className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-xl text-orange-400 transition-all duration-300 group-focus-within:scale-110"
                  />

                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email address"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-transparent
                      bg-white/[0.04]
                      py-5
                      pl-14
                      pr-5
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_35px_rgba(249,115,22,0.18)]
                    "
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                </div>

                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-400"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              {/* ===================== */}
              {/* Phone */}
              {/* ===================== */}

              <motion.div
                variants={fieldVariants}
                className="group"
              >
                <label className="mb-3 block text-sm font-medium tracking-wide text-gray-300">
                  Phone Number
                </label>

                <div className="relative overflow-hidden rounded-2xl">

                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-orange-400/40 group-focus-within:border-orange-500" />

                  <HiOutlinePhone
                    className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-xl text-orange-400 transition-all duration-300 group-focus-within:scale-110"
                  />

                  <input
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-transparent
                      bg-white/[0.04]
                      py-5
                      pl-14
                      pr-5
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_35px_rgba(249,115,22,0.18)]
                    "
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                </div>

                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-400"
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </motion.div>
                            {/* ===================== */}
              {/* Subject */}
              {/* ===================== */}

              <motion.div
                variants={fieldVariants}
                className="group"
              >
                <label className="mb-3 block text-sm font-medium tracking-wide text-gray-300">
                  Subject
                </label>

                <div className="relative overflow-hidden rounded-2xl">

                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-orange-400/40 group-focus-within:border-orange-500" />

                  <input
                    {...register("subject")}
                    placeholder="Tell us what this enquiry is about"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-transparent
                      bg-white/[0.04]
                      px-5
                      py-5
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_35px_rgba(249,115,22,0.18)]
                    "
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                </div>

                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-400"
                  >
                    {errors.subject.message}
                  </motion.p>
                )}
              </motion.div>

              {/* ===================== */}
              {/* Message */}
              {/* ===================== */}

              <motion.div
                variants={fieldVariants}
                className="group"
              >
                <label className="mb-3 block text-sm font-medium tracking-wide text-gray-300">
                  Message
                </label>

                <div className="relative overflow-hidden rounded-2xl">

                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-orange-400/40 group-focus-within:border-orange-500" />

                  <HiOutlineChatBubbleLeftRight
                    className="absolute left-5 top-6 z-10 text-xl text-orange-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-orange-300"
                  />

                  <textarea
                    {...register("message")}
                    rows={7}
                    placeholder="Tell us more about your dream property, preferred location, budget, or any questions you have..."
                    className="
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-transparent
                      bg-white/[0.04]
                      py-5
                      pl-14
                      pr-5
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_40px_rgba(249,115,22,0.18)]
                    "
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                </div>

                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-400"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </motion.div>
                            {/* ===================== */}
              {/* Submit Button */}
              {/* ===================== */}

              <motion.div
                variants={fieldVariants}
                className="pt-3"
              >
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  disabled={loading}
                  type="submit"
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    via-amber-500
                    to-orange-600
                    px-8
                    py-5
                    font-semibold
                    tracking-wide
                    text-white
                    shadow-[0_20px_60px_rgba(249,115,22,0.35)]
                    transition-all
                    duration-300
                    hover:shadow-[0_25px_80px_rgba(249,115,22,0.45)]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {/* Shine Effect */}
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      skew-x-12
                      bg-gradient-to-r
                      from-transparent
                      via-white/30
                      to-transparent
                      transition-transform
                      duration-1000
                      group-hover:translate-x-[220%]
                    "
                  />

                  {loading ? (
                    <span className="flex items-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      />
                      Sending Your Enquiry...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <HiOutlineSparkles className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      Send Premium Enquiry
                    </span>
                  )}
                </motion.button>

                <p className="mt-5 text-center text-sm leading-7 text-gray-500">
                  By submitting this enquiry, you agree to be contacted
                  by our property consultants regarding your real estate
                  requirements.
                </p>
              </motion.div>

            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}