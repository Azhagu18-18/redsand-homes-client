"use client";

import {
  HiOutlineBuildingOffice2,
  HiOutlineCheckBadge,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

interface PropertyInfoCardProps {
  property: {
    propertyType: string;
    listingType: string;
    furnishing?: string;
    parking?: string;
    facing?: string;
    city: string;
    state: string;
    pincode: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
  };
}

export default function PropertyInfoCard({
  property,
}: PropertyInfoCardProps) {
  const items = [
    {
      icon: <HiOutlineBuildingOffice2 className="h-5 w-5 text-orange-400" />,
      label: "Property Type",
      value: property.propertyType,
    },
    {
      icon: <HiOutlineCheckBadge className="h-5 w-5 text-orange-400" />,
      label: "Listing Type",
      value: property.listingType,
    },
    {
      icon: <HiOutlineHomeModern className="h-5 w-5 text-orange-400" />,
      label: "Furnishing",
      value: property.furnishing || "Not Specified",
    },
    {
      icon: <HiOutlineHomeModern className="h-5 w-5 text-orange-400" />,
      label: "Parking",
      value: property.parking || "Not Specified",
    },
    {
      icon: <HiOutlineMapPin className="h-5 w-5 text-orange-400" />,
      label: "Facing",
      value: property.facing || "Not Specified",
    },
    {
      icon: <HiOutlineMapPin className="h-5 w-5 text-orange-400" />,
      label: "Location",
      value: `${property.city}, ${property.state}`,
    },
    {
      icon: <HiOutlineMapPin className="h-5 w-5 text-orange-400" />,
      label: "Pincode",
      value: property.pincode,
    },
    {
      icon: <HiOutlineSquares2X2 className="h-5 w-5 text-orange-400" />,
      label: "Area",
      value: `${property.area} Sq.ft`,
    },
    {
      icon: <HiOutlineHomeModern className="h-5 w-5 text-orange-400" />,
      label: "Bedrooms",
      value: property.bedrooms,
    },
    {
      icon: <HiOutlineHomeModern className="h-5 w-5 text-orange-400" />,
      label: "Bathrooms",
      value: property.bathrooms,
    },
  ];

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-8">
      <h2 className="mb-8 text-2xl font-bold text-white">
        Property Information
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-4 rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-orange-500/50"
          >
            <div className="rounded-lg bg-orange-500/10 p-2">
              {item.icon}
            </div>

            <div>
              <p className="text-sm text-gray-400">
                {item.label}
              </p>

              <p className="mt-1 font-medium text-white">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}