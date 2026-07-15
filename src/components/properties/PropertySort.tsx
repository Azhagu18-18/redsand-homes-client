"use client";


import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface PropertySortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PropertySort({
  value,
  onChange,
}: PropertySortProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-white/5
        to-white/[0.02]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-orange-500/40
        hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]
      "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_60%)]" />

      <div className="relative flex items-center gap-4 px-5 py-4">
        {/* Icon */}
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-orange-500/10
            text-orange-400
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:bg-orange-500/20
          "
        >
          <HiOutlineAdjustmentsHorizontal className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
    Sort Properties
  </p>

  <Select.Root
    value={value}
    onValueChange={onChange}
  >
    <Select.Trigger
      className="
        mt-1
        flex
        h-11
        w-full
        items-center
        justify-between
        rounded-xl
        bg-transparent
        text-lg
        font-semibold
        text-white
        outline-none
      "
    >
      <Select.Value />

      <Select.Icon>
        <FiChevronDown className="text-orange-400 transition-transform duration-300" />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        sideOffset={8}
        position="popper"
        className="
          z-50
          min-w-[260px]
          overflow-hidden
          rounded-2xl
          border
          border-orange-500/20
          bg-[#151515]/95
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(249,115,22,.25)]
          animate-in
          fade-in
          zoom-in-95
        "
      >
        <Select.Viewport className="p-2">

          {[
            {
              label: "Latest Listings",
              value: "latest",
            },
            {
              label: "Price: Low → High",
              value: "priceLow",
            },
            {
              label: "Price: High → Low",
              value: "priceHigh",
            },
          ].map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              className="
                relative
                flex
                cursor-pointer
                items-center
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition-all
                duration-200
                data-[highlighted]:bg-orange-500/15
                data-[highlighted]:text-orange-300
              "
            >
              <Select.ItemText>
                {item.label}
              </Select.ItemText>

              <Select.ItemIndicator className="absolute right-4 text-orange-400">
                <FiCheck />
              </Select.ItemIndicator>
            </Select.Item>
          ))}

        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</div>
      </div>
    </div>
  );
}