"use client";

import Link from "next/link";
import Image from "next/image";
import { HiOutlineMapPin } from "react-icons/hi2";

export interface SimilarProperty {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  images?: string[];
}

interface SimilarPropertiesProps {
  properties: SimilarProperty[];
}

export default function SimilarProperties({
  properties,
}: SimilarPropertiesProps) {
  if (!properties.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-2xl font-bold text-white">
        Similar Properties
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => {
          const image =
            property.images?.[0] ??
            "/images/property-placeholder.jpg";

          return (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#111111]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-orange-500
              "
            >
              <div className="relative h-56">
                <Image
                  src={image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              <div className="space-y-4 p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-white">
                  {property.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <HiOutlineMapPin className="text-orange-400" />

                  <span>
                    {property.city}, {property.state}
                  </span>
                </div>

                <div className="text-2xl font-bold text-orange-500">
                  ₹ {Number(property.price).toLocaleString()}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}