"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({
  children,
}: LayoutShellProps) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <main>{children}</main>

      {!isAdminRoute && <Footer />}
    </>
  );
}