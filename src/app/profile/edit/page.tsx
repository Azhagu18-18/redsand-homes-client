"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineArrowLeft, HiOutlinePencilSquare } from "react-icons/hi2";

import authService from "@/src/services/auth.service";

import { useAuth } from "@/src/context/AuthContext";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();

  const { user , refreshProfile } = useAuth();
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      /**
       * TODO:
       * Replace this with your existing profile update service.
       *
       * Example:
       * await authService.updateProfile(data);
       * or
       * await userService.updateProfile(data);
       */

      await authService.updateProfile(data);

            await refreshProfile();

            router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/profile"
          className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-orange-500"
        >
          <HiOutlineArrowLeft className="h-5 w-5" />
          Back to Profile
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="mb-8 flex items-center gap-3">
            <HiOutlinePencilSquare className="h-7 w-7 text-orange-500" />
            <div>
              <h1 className="text-3xl font-bold">
                Edit Profile
              </h1>

              <p className="mt-1 text-gray-400">
                Update your personal information.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  First Name
                </label>

                <input
                  {...register("firstName")}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-orange-500"
                />

                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Last Name
                </label>

                <input
                  {...register("lastName")}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-orange-500"
                />

                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-orange-500"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Phone
              </label>

              <input
                {...register("phone")}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-orange-500"
              />

              {errors.phone && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href="/profile"
                className="rounded-xl border border-white/10 px-6 py-3 transition hover:border-orange-500"
              >
                Cancel
              </Link>

            </div>

          </form>

        </div>
      </div>
    </main>
  );
}