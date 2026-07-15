"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlinePlusCircle,
  HiOutlineHeart,
  HiOutlineUserCircle,
  HiOutlineUser,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import { useAuth } from "@/src/context/AuthContext";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    title: "Home",
    href: "/",
    icon: <HiOutlineHome size={22} />,
  },
  {
    title: "Properties",
    href: "/properties",
    icon: <HiOutlineBuildingOffice2 size={22} />,
  },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  return (
    <div
      className={`lg:hidden fixed top-20 left-0 w-full bg-white shadow-2xl border-t border-slate-200 transition-all duration-300 ease-in-out z-40 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-5 pointer-events-none"
      }`}
    >
      <div className="px-6 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.icon}

              <span className="font-medium">{item.title}</span>
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={onClose}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  pathname === "/profile"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <HiOutlineUser size={22} />
                <span className="font-medium">Profile</span>
              </Link>

              <Link
                href="/favorites"
                onClick={onClose}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  pathname === "/favorites"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <HiOutlineHeart size={22} />
                <span className="font-medium">Favorites</span>
              </Link>

              <Link
                href="/add-property"
                onClick={onClose}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  pathname === "/add-property"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <HiOutlinePlusCircle size={22} />
                <span className="font-medium">Add Property</span>
              </Link>
            </>
          )}
        </nav>

        <div className="border-t border-slate-200 my-6" />

        {!isAuthenticated ? (
          <div className="space-y-3">
            <Link
              href="/login"
              onClick={onClose}
              className="block text-center py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={onClose}
              className="block text-center py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            <HiOutlineArrowRightOnRectangle size={22} />
            Logout
          </button>
        )}

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-100 p-4">
          <HiOutlineUserCircle size={34} className="text-blue-600" />

          <div>
            <h3 className="font-semibold text-slate-800">
              {isAuthenticated
                ? `Welcome, ${user?.firstName ?? "User"}`
                : "Welcome"}
            </h3>

            <p className="text-sm text-slate-500">
              {isAuthenticated
                ? user?.email
                : "Login to manage your properties"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
