"use client";

import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-orange-500",
}: StatCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-white/10
        bg-[#111111]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-500/50
        hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div
          className="
            rounded-2xl
            bg-orange-500/10
            p-4
            transition-all
            duration-300
            group-hover:bg-orange-500
          "
        >
          <Icon
            className={`text-3xl ${color} group-hover:text-white`}
          />
        </div>

      </div>
    </div>
  );
}