"use client";

import { motion , type Variants } from "framer-motion";
import { HiOutlineHomeModern } from "react-icons/hi2";
import PropertyCard from "./PropertyCard";
import { Property } from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PropertyGrid({
  properties,
  showActions = false,
  onEdit,
  onDelete,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-orange-500/20
          bg-gradient-to-br
          from-[#151515]
          via-[#101010]
          to-[#080808]
          px-8
          py-20
          text-center
          shadow-[0_25px_80px_rgba(249,115,22,0.12)]
        "
      >
        {/* Background Glow */}
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative flex flex-col items-center">
          <div
            className="
              mb-8
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-3xl
              border
              border-orange-500/30
              bg-orange-500/10
              text-orange-400
            "
          >
            <HiOutlineHomeModern className="h-12 w-12" />
          </div>

          <h2 className="text-4xl font-bold text-white">
            No Properties Found
          </h2>

          <p className="mt-4 max-w-md text-lg leading-8 text-gray-400">
            We couldn't find any properties matching your filters.
            Try changing your search criteria or explore other
            premium listings.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="
        grid
        gap-8
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {properties.map((property) => (
        <motion.div
          key={property.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 35,
              scale: 0.96,
            },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.45,
              },
            },
          }}
        >
          <PropertyCard
            property={property}
            showActions={showActions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}