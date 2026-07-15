import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ScrollToTop from "@/src/components/common/ScrollToTop";


import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { AuthProvider } from "../context/AuthContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RedSand Homes",
  description: "Premium Real Estate Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <AuthProvider>
          
          <Navbar />

         <main className="min-h-screen">
            {children}
          </main>

          <ScrollToTop/>

          <Footer />

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2500}
          />
        </AuthProvider>
</body>
    </html>
  );
}