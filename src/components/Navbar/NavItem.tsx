"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  href,
  label,
  icon,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group
        relative
        flex
        items-center
        gap-2
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-300
        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      {/* Icon */}
      <span
        className={`
          transition-transform
          duration-300
          group-hover:scale-110
          ${active ? "text-white" : ""}
        `}
      >
        {icon}
      </span>

      {/* Label */}
      <span>{label}</span>

      {/* Bottom Active Indicator */}
      {!active && (
        <span
          className="
            absolute
            bottom-1
            left-5
            h-0.5
            w-0
            rounded-full
            bg-blue-600
            transition-all
            duration-300
            group-hover:w-[70%]
          "
        />
      )}
    </Link>
  );
}