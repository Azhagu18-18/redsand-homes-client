"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineMapPin,
  HiOutlineHomeModern,
  HiOutlineSquares2X2,
  HiOutlineEye,
} from "react-icons/hi2";
import FavoriteButton from "../property/FavoriteButton";

export interface Property {
  id: string;
  title: string;
  image: string;
  price: number;
  city: string;
  state: string;
  propertyType: string;
  listingType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  featured?: boolean;
   isFavorited: boolean, 
  status?: "Available" | "Pending" | "Sold" | "Rejected";
  createdAt?: string;
  showActions?: boolean;
}

interface PropertyCardProps {
  property: Property;

  showActions?: boolean;

  onEdit?: (id: string) => void;

  onDelete?: (id: string) => void;
}

export default function PropertyCard({
    property,
    showActions = false,
    onEdit,
    onDelete,
}: PropertyCardProps){

  const imageSrc =
  property.image && property.image.trim() !== ""
    ? property.image
    : "/images/property-placeholder.jpg";

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#111111]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-orange-500/50
        hover:shadow-[0_20px_60px_rgba(249,115,22,0.18)]
      "
    >
      {/* Image */}

      <div className="relative h-64 overflow-hidden">

       <Image
          src={imageSrc}
          alt={property.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {/* Listing Type */}

        <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">

          {property.listingType}

        </div>

        <div className="absolute right-4 bottom-4">
  <span
    className={`
      rounded-full px-3 py-1 text-xs font-bold text-white

      ${
        property.status === "Available"
          ? "bg-green-500"
          : property.status === "Pending"
          ? "bg-yellow-500 text-black"
          : property.status === "Sold"
          ? "bg-blue-500"
          : "bg-red-500"
      }
    `}
  >
    {property.status}
  </span>
</div>

        {/* Featured */}

        {property.featured && (

          <div className="absolute left-4 bottom-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">

            Featured

          </div>

        )}

        {/* Favourite */}

      <div className="absolute right-4 top-4">
        <FavoriteButton
          propertyId={property.id}
          initialFavorited={property.isFavorited ?? false}
        />
    </div>

      </div>

      {/* Content */}

      <div className="space-y-5 p-6">

        {/* Price */}

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-orange-400">

            ₹ {property.price.toLocaleString("en-IN")}

          </h2>

          <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300">

            {property.propertyType}

          </span>

        </div>

        {/* Title */}

        <h3 className="line-clamp-2 text-xl font-semibold text-white">

          {property.title}

        </h3>

        {/* Location */}

        <div className="flex items-center gap-2 text-gray-400">

          <HiOutlineMapPin className="text-orange-400" />

          <span>

            {property.city}, {property.state}

          </span>

        </div>

        <p className="text-sm text-gray-500">
    Listed on{" "}
    {property.createdAt &&
        new Date(property.createdAt).toLocaleDateString()}
</p>
                {/* Property Stats */}

        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">

          <div className="flex flex-col items-center">

            <HiOutlineHomeModern className="mb-2 h-6 w-6 text-orange-400" />

            <span className="text-lg font-semibold text-white">
              {property.bedrooms}
            </span>

            <span className="text-xs text-gray-400">
              Bedrooms
            </span>

          </div>

          <div className="flex flex-col items-center">

            <HiOutlineHomeModern className="mb-2 h-6 w-6 text-orange-400" />

            <span className="text-lg font-semibold text-white">
              {property.bathrooms}
            </span>

            <span className="text-xs text-gray-400">
              Bathrooms
            </span>

          </div>

          <div className="flex flex-col items-center">

            <HiOutlineSquares2X2 className="mb-2 h-6 w-6 text-orange-400" />

            <span className="text-lg font-semibold text-white">
              {property.area}
            </span>

            <span className="text-xs text-gray-400">
              Sq.ft
            </span>

          </div>

        </div>

        {/* Buttons */}

       <div className="flex gap-3">
  <Link
    href={`/properties/${property.id}`}
    className="
      flex-1
      rounded-xl
      bg-orange-500
      px-5
      py-3
      text-center
      font-semibold
      text-white
      transition-all
      duration-300
      hover:bg-orange-600
    "
  >
    View Details
  </Link>

  {showActions ? (
    <>
      <button
        onClick={() => onEdit?.(property.id)}
        className="
          rounded-xl
          bg-blue-600
          px-4
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-blue-700
        "
      >
        Edit
      </button>

      <button
        onClick={() => onDelete?.(property.id)}
        className="
          rounded-xl
          bg-red-600
          px-4
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-red-700
        "
      >
        Delete
      </button>
    </>
  ) : (
   <Link
  href={`/properties/${property.id}`}
  className="
    flex
    items-center
    justify-center
    rounded-xl
    border
    border-white/10
    bg-white/5
    px-5
    text-white
    transition-all
    duration-300
    hover:border-orange-500
    hover:bg-orange-500/10
  "
>
  <HiOutlineEye className="h-6 w-6" />
</Link>
  )}
</div>
      </div>

    </div>
  );
}