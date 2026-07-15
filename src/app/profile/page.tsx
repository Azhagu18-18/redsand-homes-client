"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlinePencilSquare,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import favoriteService from "@/src/services/favorite.service";
import propertyService from "../services/property.service";

import { useAuth } from "@/src/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();

  const { user, logout, isLoading } = useAuth();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);


const loadCounts = async () => {
  if (!user) return;

  const favorites = await favoriteService.getMyFavorites();
  const properties = await propertyService.getMyProperties();

  setFavoriteCount(favorites.length);
  setPropertyCount(properties.data.pagination.total);
};

useEffect(() => {
  loadCounts();
}, [user]);


  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-lg">Loading profile...</p>
      </main>
    );
  }



  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-lg">User not found.</p>
      </main>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };


  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-4xl font-bold">
          My Profile
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-orange-500">
                <Image
                  src="https://i.pravatar.cc/300?img=12"
                  alt={fullName}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              <h2 className="mt-5 text-2xl font-semibold">
                {fullName}
              </h2>

              <p className="mt-1 text-gray-400">
                {user.role}
              </p>

             <Link
              href="/profile/edit"
              className="mt-6 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium transition hover:bg-orange-600"
            >
              <HiOutlinePencilSquare className="h-5 w-5" />
              Edit Profile
            </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-8 lg:col-span-2">
            {/* Personal Information */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-6 text-2xl font-semibold">
                Personal Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <HiOutlineUser className="text-xl text-orange-500" />
                  <span>{fullName}</span>
                </div>

                <div className="flex items-center gap-4">
                  <HiOutlineEnvelope className="text-xl text-orange-500" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-4">
                  <HiOutlinePhone className="text-xl text-orange-500" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">
                      Favorites
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-orange-400">
                      {favoriteCount}
                    </h2>
                  </div>

                  <HiOutlineHeart className="text-5xl text-orange-500" />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">
                      My Properties
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-orange-400">
                      {propertyCount}
                    </h2>
                  </div>

                  <HiOutlineHome className="text-5xl text-orange-500" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 text-2xl font-semibold">
                Quick Actions
              </h3>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/favorites"
                  className="rounded-xl border border-white/10 px-5 py-3 transition hover:border-orange-500 hover:text-orange-400"
                >
                  Favorites
                </Link>

                <Link
                  href="/my-properties"
                  className="rounded-xl border border-white/10 px-5 py-3 transition hover:border-orange-500 hover:text-orange-400"
                >
                  My Properties
                </Link>

                <Link
                  href="/add-property"
                  className="rounded-xl border border-white/10 px-5 py-3 transition hover:border-orange-500 hover:text-orange-400"
                >
                  Add Property
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 transition hover:bg-red-600"
                >
                  <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}