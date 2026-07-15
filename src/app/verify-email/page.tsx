"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";

import AuthLayout from "@/src/components/auth/AuthLayout";

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="One more step before you can start exploring premium properties."
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            mb-8
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            border
            border-orange-500/30
            bg-orange-500/10
          "
        >
          <HiOutlineEnvelopeOpen
            className="h-12 w-12 text-orange-500"
            aria-hidden="true"
          />
        </motion.div>

        <h2 className="text-2xl font-bold text-white">
          Check your inbox
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
          We've sent a verification email to your registered email address.
          Click the verification link in that email to activate your RedSand
          Homes account.
        </p>

        <div
          className="
            mt-8
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-5
            text-left
          "
        >
          <h3 className="mb-3 font-semibold text-white">
            Didn't receive the email?
          </h3>

          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• Check your Spam or Junk folder.</li>
            <li>• Ensure you entered the correct email address.</li>
            <li>• Wait a few minutes before requesting another email.</li>
          </ul>
        </div>

        <button
          type="button"
          className="
            mt-8
            w-full
            rounded-xl
            bg-orange-500
            px-6
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-orange-600
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
            focus:ring-offset-2
            focus:ring-offset-black
          "
        >
          Resend Verification Email
        </button>

        <Link
          href="/login"
          className="
            mt-6
            text-sm
            font-medium
            text-orange-400
            transition-colors
            hover:text-orange-300
          "
        >
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}