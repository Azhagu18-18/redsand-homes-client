"use client";

import { useAuth } from "@/src/context/AuthContext";
import { HiOutlineBell, HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function AdminTopbar() {
  const { user } = useAuth();

  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-[#111111] px-6 py-5">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Welcome back, {user?.firstName ?? "Admin"} 👋
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button
          className="
            rounded-xl
            border
            border-white/10
            bg-black/40
            p-3
            text-gray-400
            transition
            hover:border-orange-500
            hover:text-orange-500
          "
        >
          <HiOutlineMagnifyingGlass className="text-xl" />
        </button>

        <button
          className="
            rounded-xl
            border
            border-white/10
            bg-black/40
            p-3
            text-gray-400
            transition
            hover:border-orange-500
            hover:text-orange-500
          "
        >
          <HiOutlineBell className="text-xl" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
            {user?.firstName?.charAt(0) ?? "A"}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {user?.firstName} {user?.lastName}
            </h3>

            <p className="text-xs uppercase tracking-wide text-orange-400">
              {user?.role}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}