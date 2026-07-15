"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

import adminService from "@/src/services/admin.service";

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "USER" | "ADMIN";
  created_at: string;
}

export default function AdminUserDetailsPage() {
  const { id } = useParams();

  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await adminService.getUser(
          id as string
        );

        setUser(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading User...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500">
        User not found.
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-white">
        User Details
      </h1>

      <div className="rounded-2xl border border-white/10 bg-[#111111] p-8">

        <div className="space-y-5">

          <div>
            <p className="text-gray-500">Full Name</p>
            <h2 className="text-xl text-white">
              {user.first_name} {user.last_name}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <h2 className="text-white">
              {user.email}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Role</p>

            <span className="rounded-full bg-orange-500/20 px-4 py-2 text-orange-400">
              {user.role}
            </span>
          </div>

          <div>
            <p className="text-gray-500">
              Joined
            </p>

            <h2 className="text-white">
              {new Date(
                user.created_at
              ).toLocaleDateString()}
            </h2>
          </div>

        </div>

      </div>

    </motion.main>
  );
}