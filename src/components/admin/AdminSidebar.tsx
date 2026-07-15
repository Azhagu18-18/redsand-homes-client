"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: HiOutlineHomeModern,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: HiOutlineUsers,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-orange-500/20 bg-[#070707]">

      {/* Logo */}

      <div className="border-b border-white/10 p-8">

        <h1 className="text-3xl font-bold text-white">
          <span className="text-orange-500">RedSand</span> Admin
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Management Panel
        </p>

      </div>

      {/* Menu */}

      <nav className="mt-8 px-4">

        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                mb-3 flex items-center gap-4 rounded-xl px-5 py-4
                transition-all duration-300
                ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-orange-400"
                }
              `}
            >
              <Icon className="text-2xl" />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="absolute bottom-8 left-4 right-4">

        <button
          className="
            flex w-full items-center justify-center gap-3
            rounded-xl
            border border-red-500/20
            bg-red-500/10
            py-3
            text-red-400
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <HiOutlineArrowLeftOnRectangle className="text-xl" />

          Logout
        </button>

      </div>

    </aside>
  );
}