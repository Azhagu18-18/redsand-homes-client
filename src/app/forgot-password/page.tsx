"use client";

import AuthLayout from "@/src/components/auth/AuthLayout";
import Input from "@/src/components/auth/input";
import SubmitButton from "@/src/components/auth/SubmitButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HiOutlineEnvelope } from "react-icons/hi2";
import Link from "next/link";


const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (_data: ForgotPasswordForm) => {
    // API integration will be added in the backend phase.
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you password reset instructions."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
       <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={HiOutlineEnvelope}
          error={errors.email?.message}
          {...register("email")}
        />

        <SubmitButton
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Send Reset Link
        </SubmitButton>

        <div className="text-center">
          <Link
            href="/login"
            className="
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
      </form>
    </AuthLayout>
  );
}