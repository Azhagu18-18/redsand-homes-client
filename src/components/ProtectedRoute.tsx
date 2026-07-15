"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const protectedRoutes = [
  "/profile",
  "/favorites",
  "/add-property",
  "/my-properties",
  "/admin",
];

const authRoutes = [
  "/login",
  "/register",
];

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // User NOT logged in
    if (
      protectedRoutes.some((route) =>
        pathname.startsWith(route)
      ) &&
      !isAuthenticated
    ) {
      router.replace("/login");
      return;
    }

    // Admin Route Protection
    if (
      pathname.startsWith("/admin") &&
      isAuthenticated &&
      user?.role !== "ADMIN"
    ) {
      router.replace("/");
      return;
    }

    // User already logged in
    if (
      authRoutes.includes(pathname) &&
      isAuthenticated
    ) {
      router.replace("/");
    }
  }, [
    pathname,
    user,
    isAuthenticated,
    isLoading,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}