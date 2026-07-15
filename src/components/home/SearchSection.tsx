"use client";

import { motion, type Variants } from "framer-motion";
import {
  HiAdjustmentsHorizontal,
  HiBuildingOffice2,
  HiMapPin,
  HiCurrencyRupee,
  HiHomeModern,
  HiMagnifyingGlass,
  HiChevronDown,
} from "react-icons/hi2";

import * as Select from "@radix-ui/react-select";
import { FiCheck, FiChevronDown } from "react-icons/fi";

import { useRouter } from "next/navigation";
import { useState } from "react";

const tabs = ["Buy", "Rent", "Commercial"];

const popularSearches = [
  "Luxury Villas",
  "Premium Apartments",
  "Ready To Move",
  "Beach House",
  "Lake View",
  "Gated Community",
];

const containerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
    },
  },
};

export default function SearchSection() {
  const router = useRouter();

  const [listingType, setListingType] = useState("sale");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [budget, setBudget] = useState("50L-2Cr");
  const [bedrooms, setBedrooms] = useState("Any");

  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);

  const propertyTypes = [
    "Apartment",
    "Villa",
    "House",
    "Plot",
    "Commercial",
    "Office",
  ];

  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showBedroomDropdown, setShowBedroomDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const budgetOptions = [
    "Any Budget",
    "Below ₹25L",
    "₹25L - ₹50L",
    "₹50L - ₹1Cr",
    "₹1Cr - ₹2Cr",
    "Above ₹2Cr",
  ];

  const bedroomOptions = ["Any", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];

  const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Trichy",
    "Erode",
    "Tiruppur",
    "Vellore",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kochi",
    "Mysore",
    "Goa",
    "Noida",
    "Gurgaon",
    "Ahmedabad",
    "Visakhapatnam",
  ];

  const filteredCities =
    location.trim() === ""
      ? []
      : cities.filter((city) =>
          city.toLowerCase().includes(location.toLowerCase())
        );
  const handleSearch = () => {
    // Location Required
    if (!location.trim()) {
      alert("Please select a location.");
      return;
    }

    const params = new URLSearchParams();

    if (propertyType !== "Any") {
      params.append("propertyType", propertyType);
    }

    if (bedrooms !== "Any") {
      params.append("bedrooms", bedrooms);
    }

    // Required
    params.append("location", location.trim());

    // Optional
    params.append("listingType", listingType);

    if (propertyType !== "Any") {
      params.append("propertyType", propertyType);
    }

    if (budget !== "Any Budget") {
      params.append("budget", budget);
    }

    if (bedrooms !== "Any") {
      params.append("bedrooms", bedrooms);
    }

    router.push(`/properties?${params.toString()}`);
  };
  return (
    <section
      className="relative z-30 -mt-16 pb-16 -mt-6
sm:-mt-10
lg:-mt-20
xl:-mt-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            relative
            overflow-visible
            rounded-[36px]
            border
            border-white/10
            bg-[#151515]/90
            backdrop-blur-3xl
            shadow-[0_40px_120px_rgba(0,0,0,.45)]
          "
        >
          {/* Top Gradient Line */}

          <div className="h-[4px] w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

          {/* Background Glow */}

          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px]" />

          <div className="relative p-4 sm:p-6 lg:p-12">
            <motion.div variants={itemVariant} className="flex flex-wrap gap-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() =>
                    setListingType(
                      tab === "Buy"
                        ? "sale"
                        : tab === "Rent"
                        ? "rent"
                        : "commercial"
                    )
                  }
                  className={`
    rounded-full
    px-5
    sm:px-6
    lg:px-7

    py-2.5
    lg:py-3

    text-sm
    sm:text-base
    font-semibold
    transition-all
    duration-300
    ${
      listingType ===
      (tab === "Buy" ? "sale" : tab === "Rent" ? "rent" : "commercial")
        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
        : "border border-white/10 bg-white/5 text-white/80 hover:border-orange-400/30 hover:bg-white/10"
    }
  `}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            <motion.div variants={itemVariant} className="mt-10 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white ">
                Find Your
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  {" "}
                  Perfect Property
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-white/65">
                Search verified apartments, villas, gated communities,
                commercial spaces and premium investment opportunities across
                India's fastest-growing cities.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="

                  relative
                  grid
                  overflow-visible
                  grid-cols-1

                  sm:grid-cols-1

                  md:grid-cols-2

                  lg:grid-cols-2

                  xl:grid-cols-[1.35fr_1fr_1fr_1fr_220px]
                  "
            >
              {/* Location */}
              {/* Location */}

              <div
                className="
    relative
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
   px-4
sm:px-5

py-3
sm:py-4
    backdrop-blur-2xl
    transition-all
    duration-300
    hover:border-orange-400/40
    hover:bg-white/[0.06]
  "
              >
                <p className="mb-3 text-sm font-medium text-white/50">
                  Location
                </p>

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <HiMapPin
                      className="text-orange-400 flex-shrink-0"
                      size={20}
                    />

                    <HiMagnifyingGlass
                      className="text-white/40 flex-shrink-0"
                      size={18}
                    />

                    <input
                      type="text"
                      placeholder="Search City..."
                      value={location}
                      onFocus={() => setShowCityDropdown(true)}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      className="
          w-full
          bg-transparent
          text-white
          placeholder:text-white/35
          text-base
          font-medium
          outline-none
        "
                    />
                  </div>

                  {showCityDropdown && filteredCities.length > 0 && (
                    <div
                      className="
absolute
bottom-full
left-0
right-0
mb-3

max-h-60

sm:max-h-72
overflow-y-auto

rounded-2xl
border
border-white/10

bg-[#1b1b1b]/95
backdrop-blur-3xl

shadow-[0_20px_50px_rgba(0,0,0,0.45)]
"
                    >
                      {filteredCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setLocation(city);
                            setShowCityDropdown(false);
                          }}
                          className="
              flex
              w-full
              items-center
              gap-3
              border-b
              border-white/5
              px-4
              py-3
              text-left
              text-white
              transition-all
              duration-200
              hover:bg-orange-500/15
              last:border-b-0
            "
                        >
                          <HiMapPin
                            className="text-orange-400 flex-shrink-0"
                            size={18}
                          />

                          <span className="truncate text-sm sm:text-base">
                            {city}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Type */}

              {/* Property Type */}

              <div
                className="
    relative
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    py-4
    backdrop-blur-2xl
    transition-all
    duration-300
    hover:border-orange-400/40
    hover:bg-white/[0.06]
  "
              >
                <p className="mb-3 text-sm font-medium text-white/50">
                  Property Type
                </p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowPropertyDropdown(!showPropertyDropdown)
                    }
                    className="
        flex
        w-full
        items-center
        justify-between
        gap-4
      "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <HiBuildingOffice2
                        className="flex-shrink-0 text-orange-400"
                        size={20}
                      />

                      <span className="truncate text-base font-medium text-white">
                        {propertyType}
                      </span>
                    </div>

                    <HiChevronDown
                      size={20}
                      className={`flex-shrink-0 text-white/70 transition-transform duration-300 ${
                        showPropertyDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showPropertyDropdown && (
                    <div
                      className="
          absolute
          top-full
          left-0
          right-0
          mt-3
         max-h-60

sm:max-h-72
          overflow-y-auto
          rounded-2xl
          border
          border-white/10
          bg-[#1b1b1b]/95
          backdrop-blur-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.45)]
        "
                    >
                      {propertyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setPropertyType(type);
                            setShowPropertyDropdown(false);
                          }}
                          className="
              flex
              w-full
              items-center
              gap-3
              border-b
              border-white/5
              px-4
              py-3
              text-left
              text-white
              transition-all
              duration-200
              hover:bg-orange-500/15
              last:border-b-0
            "
                        >
                          <HiBuildingOffice2
                            className="flex-shrink-0 text-orange-400"
                            size={18}
                          />

                          <span className="truncate text-sm sm:text-base">
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Budget */}

              {/* Budget */}

              <div
                className="
    relative
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    py-4
    backdrop-blur-2xl
    transition-all
    duration-300
    hover:border-orange-400/40
    hover:bg-white/[0.06]
  "
              >
                <p className="mb-3 text-sm font-medium text-white/50">Budget</p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
                    className="
        flex
        w-full
        items-center
        justify-between
        gap-4
      "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <HiCurrencyRupee
                        className="flex-shrink-0 text-orange-400"
                        size={20}
                      />

                      <span className="truncate text-base font-medium text-white">
                        {budget}
                      </span>
                    </div>

                    <HiChevronDown
                      size={20}
                      className={`flex-shrink-0 text-white/70 transition-transform duration-300 ${
                        showBudgetDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showBudgetDropdown && (
                    <div
                      className="
          absolute
          top-full
          left-0
          right-0
          mt-3
         max-h-60

sm:max-h-72
          overflow-y-auto
          rounded-2xl
          border
          border-white/10
          bg-[#1b1b1b]/95
          backdrop-blur-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.45)]
        "
                    >
                      {budgetOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setBudget(item);
                            setShowBudgetDropdown(false);
                          }}
                          className="
              flex
              w-full
              items-center
              gap-3
              border-b
              border-white/5
              px-4
              py-3
              text-left
              text-white
              transition-all
              duration-200
              hover:bg-orange-500/15
              last:border-b-0
            "
                        >
                          <HiCurrencyRupee
                            className="flex-shrink-0 text-orange-400"
                            size={18}
                          />

                          <span className="truncate text-sm sm:text-base">
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bedrooms */}

              {/* Bedrooms */}

              <div
                className="
    relative
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    py-4
    backdrop-blur-2xl
    transition-all
    duration-300
    hover:border-orange-400/40
    hover:bg-white/[0.06]
  "
              >
                <p className="mb-3 text-sm font-medium text-white/50">
                  Bedrooms
                </p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBedroomDropdown(!showBedroomDropdown)}
                    className="
        flex
        w-full
        items-center
        justify-between
        gap-4
      "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <HiHomeModern
                        className="flex-shrink-0 text-orange-400"
                        size={20}
                      />

                      <span className="truncate text-base font-medium text-white">
                        {bedrooms}
                      </span>
                    </div>

                    <HiChevronDown
                      size={20}
                      className={`flex-shrink-0 text-white/70 transition-transform duration-300 ${
                        showBedroomDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showBedroomDropdown && (
                    <div
                      className="
          absolute
          top-full
          left-0
          right-0
          mt-3
          max-h-60

sm:max-h-72
          overflow-y-auto
          rounded-2xl
          border
          border-white/10
          bg-[#1b1b1b]/95
          backdrop-blur-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.45)]
        "
                    >
                      {bedroomOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setBedrooms(item);
                            setShowBedroomDropdown(false);
                          }}
                          className="
              flex
              w-full
              items-center
              gap-3
              border-b
              border-white/5
              px-4
              py-3
              text-left
              text-white
              transition-all
              duration-200
              hover:bg-orange-500/15
              last:border-b-0
            "
                        >
                          <HiHomeModern
                            className="flex-shrink-0 text-orange-400"
                            size={18}
                          />

                          <span className="truncate text-sm sm:text-base">
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Search Button */}

              <motion.button
                type="button"
                onClick={handleSearch}
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                    group
                    flex
                    h-16
                    w-full
                    sm:h-[72px]

                    xl:h-[92px]
                    xl:min-w-[220px]
                    items-center
                    justify-center
                    gap-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    via-orange-500
                    to-amber-500
                    px-8
                   text-sm
sm:text-base
lg:text-lg
                    font-bold
                    text-white
                    shadow-[0_20px_50px_rgba(249,115,22,.35)]
                    transition-all
                    duration-300
                    hover:shadow-[0_30px_70px_rgba(249,115,22,.45)]
                  "
              >
                <HiMagnifyingGlass
                  size={26}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <div className="text-left">
                  <p>Search</p>

                  <span className="text-sm font-medium text-white/80">
                    25,000+ Properties
                  </span>
                </div>
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="mt-10 flex flex-wrap items-center gap-2 md:gap-3"
            >
              <div className="mr-2 flex items-center gap-2 text-white/60">
                <HiAdjustmentsHorizontal
                  size={18}
                  className="text-orange-400"
                />

                <span className="font-medium">Popular Searches</span>
              </div>

              {popularSearches.map((item) => (
                <button
                  key={item}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-4
sm:px-5

py-2
sm:py-2.5

text-xs
sm:text-sm
                    text-sm
                    font-medium
                    text-white/80
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-orange-400/30
                    hover:bg-orange-500/10
                    hover:text-orange-300
                  "
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Decorative Blur */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-12
            left-1/2
            h-32
            w-full

sm:w-[90%]
            -translate-x-1/2
            rounded-full
            bg-orange-500/10
            blur-[80px]
          "
        />
      </div>
    </section>
  );
}
