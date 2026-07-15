"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineHomeModern, HiOutlineSparkles } from "react-icons/hi2";
import { FiGrid } from "react-icons/fi";

import PropertyGrid from "@/src/components/properties/PropertyGrid";
import PropertySearch from "@/src/components/properties/PropertySearch";
import PropertyFilters from "@/src/components/properties/PropertyFilters";
import PropertySort from "@/src/components/properties/PropertySort";
import useProperties from "@/src/hooks/useProperties";

const PAGE_SIZE = 6;

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#070707] flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        </main>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}

function PropertiesContent() {
  const searchParams = useSearchParams();

  const locationParam = searchParams.get("location") ?? "";
  const propertyTypeParam = searchParams.get("propertyType") ?? "";
  const listingTypeParam = searchParams.get("listingType") ?? "";
  const bedroomsParam = searchParams.get("bedrooms") ?? "";
  const budgetParam = searchParams.get("budget") ?? "";

  const [search, setSearch] = useState(locationParam);
  const [propertyType, setPropertyType] = useState(propertyTypeParam);
  const [listingType, setListingType] = useState(listingTypeParam);

  const [sortBy, setSortBy] = useState("latest");

  const [page, setPage] = useState(1);

  const { properties, loading, error } = useProperties();

  const filteredProperties = useMemo(() => {
    let data = [...properties];

    if (search) {
      data = data.filter(
        (property) =>
          property.title.toLowerCase().includes(search.toLowerCase()) ||
          property.city.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (bedroomsParam) {
      data = data.filter(
        (property) =>
          property.bedrooms.toString() === bedroomsParam.replace(" BHK", "")
      );
    }

    if (propertyType) {
      data = data.filter(
        (property) =>
          property.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }

    if (listingType) {
      data = data.filter(
        (property) =>
          property.listingType.toLowerCase() === listingType.toLowerCase()
      );
    }

    switch (sortBy) {
      case "priceLow":
        data.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        data.sort((a, b) => b.price - a.price);
        break;
    }

    return data;
  }, [properties, search, propertyType, listingType, bedroomsParam, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);

  const currentProperties = filteredProperties.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070707] flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-16 w-16 rounded-full border-4 border-orange-500 border-t-transparent"
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-8 py-8 text-center">
          <h2 className="text-2xl font-bold text-red-400">
            Something went wrong
          </h2>

          <p className="mt-3 text-gray-300">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] py-16">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[160px]" />

        <div className="absolute right-0 top-32 h-[450px] w-[450px] rounded-full bg-orange-400/5 blur-[180px]" />

        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Hero */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-500/30
              bg-orange-500/10
              px-6
              py-3
              text-orange-400
              backdrop-blur-xl
            "
          >
            <HiOutlineSparkles className="h-5 w-5" />
            Premium Collection
          </div>

          <h1 className="mt-8 text-5xl font-black text-white md:text-7xl">
            Explore
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Luxury Properties
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Discover premium apartments, luxury villas, penthouses and
            commercial spaces carefully selected for modern living.
          </p>
        </motion.div>

        {/* Search Card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[34px]
            border
            border-orange-500/20
            bg-gradient-to-br
            from-white/5
            via-white/[0.03]
            to-white/[0.02]
            p-7
            backdrop-blur-2xl
            shadow-[0_35px_120px_rgba(249,115,22,.10)]
          "
        >
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="relative">
            <PropertySearch
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />

            <div className="mt-7 grid gap-5 xl:grid-cols-[2fr_1fr]">
              <PropertyFilters
                propertyType={propertyType}
                setPropertyType={(value) => {
                  setPropertyType(value);
                  setPage(1);
                }}
                listingType={listingType}
                setListingType={(value) => {
                  setListingType(value);
                  setPage(1);
                }}
              />

              <PropertySort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </motion.div>

        {/* Result Bar */}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <HiOutlineHomeModern className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Available Listings
              </p>

              <h3 className="text-2xl font-bold text-white">
                {filteredProperties.length}
                <span className="ml-2 text-orange-400">Properties</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
            <FiGrid className="text-orange-400" />

            <span className="text-gray-300">Premium Collection</span>
          </div>
        </div>

        {/* Grid Starts Below */}
        {/* Grid */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mt-10"
        >
          <PropertyGrid properties={currentProperties} />
        </motion.div>

        {/* Bottom Section */}

        <div className="mt-16">
          <div
            className="
              flex
              flex-col
              gap-8
              rounded-[30px]
              border
              border-white/10
              bg-gradient-to-br
              from-white/5
              via-white/[0.03]
              to-white/[0.02]
              p-7
              backdrop-blur-xl
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* Left */}

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Search Results
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Showing
                <span className="mx-3 text-orange-400">
                  {currentProperties.length}
                </span>
                of
                <span className="mx-3 text-orange-400">
                  {filteredProperties.length}
                </span>
                Premium Properties
              </h2>

              <p className="mt-3 text-gray-400">
                Browse carefully selected luxury properties from our exclusive
                collection.
              </p>
            </div>

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-6
                    py-3
                    font-medium
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-orange-500
                    hover:bg-orange-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  ← Previous
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className={`
                        h-12
                        w-12
                        rounded-2xl
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          page === index + 1
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_10px_30px_rgba(249,115,22,.45)] scale-110"
                            : "border border-white/10 bg-white/5 text-gray-300 hover:border-orange-500 hover:text-white"
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-6
                    py-3
                    font-medium
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-orange-500
                    hover:bg-orange-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
