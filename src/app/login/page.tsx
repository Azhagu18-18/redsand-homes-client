"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

import AuthLayout from "@/src/components/auth/AuthLayout";
import Input from "@/src/components/auth/input";
import PasswordInput from "@/src/components/auth/PasswordInput";
import SubmitButton from "@/src/components/auth/SubmitButton";
import SocialButton from "@/src/components/auth/SocialButton";

import {
  loginSchema,
  LoginFormData,
} from "@/src/lib/validations/auth";

import authService from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);

        if (!response.success) {
          throw new Error(response.message);
        }

        const { user, tokens } = response.data;

login(user, tokens.accessToken);

router.push("/profile");
    } catch (error: any) {
      setError("root", {
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again.",
      });
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your RedSand Homes account."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          icon={HiOutlineEnvelope}
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          icon={HiOutlineLockClosed}
          error={errors.password?.message}
          {...register("password")}
        />

        {errors.root && (
          <p className="text-sm text-red-500">
            {errors.root.message}
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded accent-orange-500"
            />
            Remember Me
          </label>

          <Link
            href="/forgot-password"
            className="text-orange-400 hover:text-orange-300"
          >
            Forgot Password?
          </Link>
        </div>

        <SubmitButton isLoading={isSubmitting}>
          Sign In
        </SubmitButton>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-[#0b0b0b] px-4 text-sm text-gray-400">
              OR
            </span>
          </div>
        </div>

        <SocialButton
          icon={FcGoogle}
          provider="Google"
        />

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}