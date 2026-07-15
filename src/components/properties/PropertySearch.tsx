"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface PropertySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PropertySearch({
  value,
  onChange,
}: PropertySearchProps) {
  return (
    <div className="relative">

      <HiOutlineMagnifyingGlass
        className="
          absolute
          left-4
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-orange-400
        "
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, city..."
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-[#111111]
          py-4
          pl-12
          pr-4
          text-white
          outline-none
          transition
          focus:border-orange-500
        "
      />

    </div>
  );
}