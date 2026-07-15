"use client";

import { HiOutlineCheckCircle } from "react-icons/hi2";

interface PropertyAmenitiesProps {
  amenities?: string[];
}

export default function PropertyAmenities({
  amenities = [],
}: PropertyAmenitiesProps) {
  if (amenities.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-8">
      <h2 className="mb-8 text-2xl font-bold text-white">
        Amenities
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-black/30
              px-5
              py-4
              transition-all
              duration-300
              hover:border-orange-500/40
            "
          >
            <HiOutlineCheckCircle className="h-6 w-6 text-orange-400" />

            <span className="font-medium text-white">
              {amenity}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}