"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/navigation";
import authService from "@/src/services/auth.service";

import AuthLayout from "@/src/components/auth/AuthLayout";
import Input from "@/src/components/auth/input";
import PasswordInput from "@/src/components/auth/PasswordInput";
import SubmitButton from "@/src/components/auth/SubmitButton";
import SocialButton from "@/src/components/auth/SocialButton";

import { registerSchema, RegisterFormData } from "@/src/lib/validations/auth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Split Full Name into First Name & Last Name
      const names = data.fullName.trim().split(/\s+/);

      const payload = {
        firstName: names[0],
        lastName: names.slice(1).join(" ") || "-",
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await authService.register(payload);

      alert(response.message);

      router.push("/login");
    } catch (error: any) {
      console.error("Register Error:", error);

      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join RedSand Homes and start your real estate journey."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          icon={HiOutlineUser}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          icon={HiOutlineEnvelope}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="Enter your phone number"
          icon={HiOutlinePhone}
          error={errors.phone?.message}
          {...register("phone")}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a password"
          icon={HiOutlineLockClosed}
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          icon={HiOutlineLockClosed}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <label className="flex items-start gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-orange-500"
            {...register("acceptTerms")}
          />

          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-orange-400 hover:text-orange-300"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-orange-400 hover:text-orange-300"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {errors.acceptTerms && (
          <p className="text-sm text-red-400">{errors.acceptTerms.message}</p>
        )}

        <SubmitButton isLoading={isSubmitting}>Create Account</SubmitButton>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-[#0b0b0b] px-4 text-sm text-gray-400">OR</span>
          </div>
        </div>

        <SocialButton icon={FcGoogle} provider="Google" />

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
