"use client";

import {
  HiOutlineBuildingOffice2,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { MdOutlineSell } from "react-icons/md";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiCheck } from "react-icons/fi";


interface PropertyFiltersProps {
  propertyType: string;
  setPropertyType: (value: string) => void;

  listingType: string;
  setListingType: (value: string) => void;
}

export default function PropertyFilters({
  propertyType,
  setPropertyType,
  listingType,
  setListingType,
}: PropertyFiltersProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Property Type */}

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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_60%)]" />

        <div className="relative flex items-center gap-4 px-5 py-4">
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
              transition
              group-hover:scale-110
              group-hover:bg-orange-500/20
            "
          >
            <HiOutlineBuildingOffice2 className="h-6 w-6" />
          </div>

         <div className="flex-1">
  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
    Property Type
  </p>

  <Select.Root
    value={propertyType}
    onValueChange={setPropertyType}
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
      <Select.Value placeholder="All Property Types" />

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
        "
      >
        <Select.Viewport className="p-2">

          {[
            "All Property Types",
            "Apartment",
            "Villa",
            "House",
            "Penthouse",
            "Commercial",
          ].map((item, index) => (
            <Select.Item
              key={item}
              value={index === 0 ? "" : item}
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
                transition
                data-[highlighted]:bg-orange-500/15
              "
            >
              <Select.ItemText>
                {item}
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

      {/* Listing Type */}

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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_60%)]" />

        <div className="relative flex items-center gap-4 px-5 py-4">
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
              transition
              group-hover:scale-110
              group-hover:bg-orange-500/20
            "
          >
            <MdOutlineSell className="h-6 w-6" />
          </div>

          <div className="flex-1">
  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
    Listing Type
  </p>

  <Select.Root
    value={listingType}
    onValueChange={setListingType}
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
      <Select.Value placeholder="All Listings" />

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
          min-w-[220px]
          overflow-hidden
          rounded-2xl
          border
          border-orange-500/20
          bg-[#151515]/95
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(249,115,22,.25)]
        "
      >
        <Select.Viewport className="p-2">

          {[
            { label: "All Listings", value: "" },
            { label: "Sale", value: "Sale" },
            { label: "Rent", value: "Rent" },
          ].map((item) => (
            <Select.Item
              key={item.label}
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
                transition
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
    </div>
  );
}