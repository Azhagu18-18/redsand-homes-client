/* eslint-disable */
"use client";

import uploadService from "@/src/services/upload.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import propertyService from "../../services/property.service";

import { FiImage , FiUploadCloud } from "react-icons/fi";

import { HiOutlineMap , HiOutlineTruck } from "react-icons/hi2";


import { HiOutlineShieldCheck , HiOutlineSparkles } from "react-icons/hi2";

import * as Select from "@radix-ui/react-select";
import { FiCheck, FiChevronDown } from "react-icons/fi";

import {
  HiOutlineBuildingOffice2,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Power Backup",
  "Lift",
  "Security",
  "Garden",
  "Club House",
  "Parking",
  "Children Park",
  "CCTV",
  "WiFi",
  "Rain Water Harvesting",
];

const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),

  propertyType: z.string().min(1, "Property type is required"),

  listingType: z.string().min(1, "Listing type is required"),

  price: z.coerce.number().min(1, "Enter a valid price"),

  address: z.string().min(10, "Address is required"),

  city: z.string().min(2),

  state: z.string().min(2),

  bedrooms: z.coerce.number().min(0),

  bathrooms: z.coerce.number().min(0),

  area: z.coerce.number().min(100),

  pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode"),

  description: z
    .string()
    .min(30, "Description should be at least 30 characters"),

  furnishing: z.string(),

  facing: z.string(),

  parking: z.string(),

  amenities: z.array(z.string()).optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const {
  register,
  handleSubmit,
  control,
  reset,
  watch,
  formState: { errors, isSubmitting },
} = useForm<PropertyForm>({
  resolver: zodResolver(propertySchema) as any,

   defaultValues: {
  propertyType: "",
  listingType: "",
  furnishing: "",
  facing: "",
  parking: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  title: "",
  description: "",
  amenities: [],
  bedrooms: 1,
  bathrooms: 1,
  area: 100,
  price: 0,
}
  });

useEffect(() => {


  if (!id) return;

  const fetchProperty = async () => {
    try {

      const property = await propertyService.getByIdForEdit(id);

      console.log(property);
    } catch (e) {
      console.log(e);
    }
  };

  fetchProperty();
}, [id]);

  const onSubmit: SubmitHandler<PropertyForm> = async (data) => {
    try {
      setLoading(true);

      let imageUrls = [...existingImages];

      if (selectedImages.length > 0) {
        const uploadedImages = await uploadService.uploadPropertyImages(
          selectedImages
        );

        imageUrls = [...imageUrls, ...uploadedImages];
      }

      await propertyService.update(id as string, {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        propertyType: data.propertyType,
        listingType: data.listingType,
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        area: Number(data.area),
        address: data.address,
        city: data.city,
        state: data.state,
        country: "India",
        pincode: data.pincode,

        images: imageUrls,
      });
      toast.success("Property Updated successfully.");

      router.push("/my-properties");
    } catch (error) {
      console.error(error);

      toast.error("Failed to Update property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Background Effects */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[120px] h-[380px] w-[380px] rounded-full bg-orange-400/10 blur-[160px]" />

        <div className="absolute bottom-[-160px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[180px]" />

        <div
          className="
      absolute
      inset-0
      opacity-[0.04]
      [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
      [background-size:70px_70px]
    "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-14">
        {/* =======================================================
        PREMIUM HERO
    ======================================================== */}

        <section
          className="
      relative
      overflow-hidden
      rounded-[42px]
      border
      border-orange-500/20
      bg-gradient-to-br
      from-[#151515]
      via-[#0d0d0d]
      to-[#060606]
      px-8
      py-16
      shadow-[0_45px_120px_rgba(249,115,22,.12)]
      md:px-14
      md:py-20
    "
        >
          {/* Glow */}

          <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-orange-500/15 blur-[130px]" />

          <div className="absolute right-[-80px] top-0 h-80 w-80 rounded-full bg-orange-400/10 blur-[150px]" />

          <div className="relative z-10 text-center">
            {/* Badge */}

            <div
              className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-orange-500/25
          bg-orange-500/10
          px-6
          py-3
          backdrop-blur-2xl
        "
            >
              <HiOutlineSparkles className="h-5 w-5 text-orange-400" />

              <span className="text-sm font-semibold tracking-[0.25em] uppercase text-orange-300">
                Premium Listing Portal
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
          mt-8
          text-5xl
          font-black
          leading-tight
          text-white
          md:text-6xl
        "
            >
              Showcase Your
              <span
                className="
            bg-gradient-to-r
            from-orange-300
            via-orange-500
            to-amber-500
            bg-clip-text
            text-transparent
          "
              >
                {" "}
                Dream Property
              </span>
            </h1>

            <p
              className="
          mx-auto
          mt-6
          max-w-3xl
          text-lg
          leading-8
          text-gray-400
        "
            >
              Publish premium listings, attract verified buyers, and experience
              a luxury real estate platform designed to maximize your property's
              visibility.
            </p>

            {/* Premium Stats */}

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <div
                className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.05]
            p-6
            backdrop-blur-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-500/40
            hover:shadow-[0_20px_60px_rgba(249,115,22,.15)]
          "
              >
                <HiOutlineShieldCheck className="mx-auto h-8 w-8 text-orange-400" />

                <h3 className="mt-4 text-lg font-bold text-white">
                  Verified Listings
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Every property undergoes quality verification for trusted
                  buyers.
                </p>
              </div>

              <div
                className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.05]
            p-6
            backdrop-blur-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-500/40
            hover:shadow-[0_20px_60px_rgba(249,115,22,.15)]
          "
              >
                <FiImage className="mx-auto h-8 w-8 text-orange-400" />

                <h3 className="mt-4 text-lg font-bold text-white">
                  Luxury Exposure
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Beautiful presentation with premium visibility across the
                  platform.
                </p>
              </div>

              <div
                className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.05]
            p-6
            backdrop-blur-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-500/40
            hover:shadow-[0_20px_60px_rgba(249,115,22,.15)]
          "
              >
                <FiUploadCloud className="mx-auto h-8 w-8 text-orange-400" />

                <h3 className="mt-4 text-lg font-bold text-white">
                  Instant Publishing
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Upload images and publish your property within minutes using
                  our premium workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
        PREMIUM GLASS FORM
    ======================================================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
      relative
      mt-12
      overflow-hidden
      rounded-[36px]
      border
      border-white/10
      bg-white/[0.04]
      p-8
      backdrop-blur-3xl
      shadow-[0_35px_90px_rgba(0,0,0,.45)]
      md:p-10
    "
        >
          <div className="absolute inset-0 rounded-[36px] border border-orange-500/10 pointer-events-none" />

          <div className="grid gap-7 md:grid-cols-2">
            {/* ===========================================================
    PROPERTY TITLE
=========================================================== */}

            <div className="md:col-span-2">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineHomeModern className="text-lg" />
                Property Title
              </label>

              <div className="group relative">
                <input
                  {...register("title")}
                  placeholder="Luxury Villa with Private Pool"
                  className="
      h-14
      w-full
      rounded-2xl
      border
      border-white/10
      bg-white/[0.04]
      px-5
      text-white
      placeholder:text-gray-500
      backdrop-blur-2xl
      outline-none
      transition-all
      duration-300

      hover:border-orange-500/30

      focus:border-orange-500
      focus:bg-white/[0.06]
      focus:ring-4
      focus:ring-orange-500/15
      "
                />

                <div
                  className="
      pointer-events-none
      absolute
      inset-0
      rounded-2xl
      opacity-0
      transition
      duration-300
      group-focus-within:opacity-100
      shadow-[0_0_45px_rgba(249,115,22,.18)]
      "
                />
              </div>

              {errors.title && (
                <p className="mt-3 text-sm font-medium text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    PROPERTY TYPE (RADIX)
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineBuildingOffice2 />
                Property Type
              </label>

              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      className="
          group
          flex
          h-14
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          px-5
          text-white
          backdrop-blur-xl
          transition-all
          duration-300

          hover:border-orange-500/40

          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15
          "
                    >
                      <Select.Value placeholder="Choose Property Type" />

                      <Select.Icon className="transition group-data-[state=open]:rotate-180">
                        <FiChevronDown />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        className="
            z-[999]
            w-[var(--radix-select-trigger-width)]
            overflow-hidden
            rounded-2xl
            border
            border-orange-500/20
            bg-[#111111]/95
            backdrop-blur-3xl
            shadow-[0_30px_80px_rgba(249,115,22,.18)]
            animate-in
            fade-in
            zoom-in-95
            duration-200
            "
                      >
                        <Select.Viewport className="p-2">
                          {[
                            "Apartment",
                            "Villa",
                            "House",
                            "Plot",
                            "Commercial",
                          ].map((item) => (
                            <Select.Item
                              key={item}
                              value={item}
                              className="
                  relative
                  flex
                  cursor-pointer
                  items-center
                  rounded-xl
                  px-4
                  py-3
                  text-gray-300
                  outline-none
                  transition-all
                  duration-200

                  hover:bg-orange-500/15
                  hover:text-orange-300

                  focus:bg-orange-500/20
                  focus:text-orange-300

                  data-[state=checked]:bg-orange-500/20
                  data-[state=checked]:text-orange-400
                  "
                            >
                              <Select.ItemText>{item}</Select.ItemText>

                              <Select.ItemIndicator className="absolute right-4">
                                <FiCheck />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              {errors.propertyType && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.propertyType.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    LISTING TYPE (RADIX)
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineCheckCircle />
                Listing Type
              </label>

              <Controller
                control={control}
                name="listingType"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      className="
          group
          flex
          h-14
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          px-5
          text-white
          backdrop-blur-xl
          transition-all
          duration-300

          hover:border-orange-500/40

          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15
          "
                    >
                      <Select.Value placeholder="Choose Listing Type" />

                      <Select.Icon className="transition group-data-[state=open]:rotate-180">
                        <FiChevronDown />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        className="
            z-[999]
            w-[var(--radix-select-trigger-width)]
            overflow-hidden
            rounded-2xl
            border
            border-orange-500/20
            bg-[#111111]/95
            backdrop-blur-3xl
            shadow-[0_30px_80px_rgba(249,115,22,.18)]
            p-2
            "
                      >
                        {["Sale", "Rent", "Lease"].map((item) => (
                          <Select.Item
                            key={item}
                            value={item}
                            className="
                relative
                flex
                cursor-pointer
                items-center
                rounded-xl
                px-4
                py-3
                text-gray-300
                outline-none
                transition-all

                hover:bg-orange-500/15
                hover:text-orange-300

                focus:bg-orange-500/20

                data-[state=checked]:bg-orange-500/20
                data-[state=checked]:text-orange-400
                "
                          >
                            <Select.ItemText>{item}</Select.ItemText>

                            <Select.ItemIndicator className="absolute right-4">
                              <FiCheck />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              {errors.listingType && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.listingType.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    PRICE
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineCurrencyDollar />
                Price
              </label>

              <input
                type="number"
                {...register("price")}
                placeholder="₹ 50,00,000"
                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    text-white
    placeholder:text-gray-500
    backdrop-blur-xl
    outline-none
    transition-all

    hover:border-orange-500/40

    focus:border-orange-500
    focus:ring-4
    focus:ring-orange-500/15
    "
              />

              {errors.price && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    ADDRESS
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineMapPin />
                Address
              </label>

              <input
                {...register("address")}
                placeholder="Enter complete property address"
                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    text-white
    placeholder:text-gray-500
    backdrop-blur-xl
    outline-none
    transition-all

    hover:border-orange-500/40

    focus:border-orange-500
    focus:ring-4
    focus:ring-orange-500/15
    "
              />

              {errors.address && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.address.message}
                </p>
              )}
            </div>
            {/* ===========================================================
    CITY
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineMapPin />
                City
              </label>

              <div className="group relative">
                <input
                  {...register("city")}
                  placeholder="Chennai"
                  className="
      h-14
      w-full
      rounded-2xl
      border
      border-white/10
      bg-white/[0.04]
      px-5
      text-white
      placeholder:text-gray-500
      backdrop-blur-2xl
      outline-none
      transition-all
      duration-300

      hover:border-orange-500/40

      focus:border-orange-500
      focus:bg-white/[0.06]
      focus:ring-4
      focus:ring-orange-500/15
      "
                />

                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-focus-within:opacity-100 shadow-[0_0_45px_rgba(249,115,22,.18)]" />
              </div>

              {errors.city && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    STATE
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineMapPin />
                State
              </label>

              <div className="group relative">
                <input
                  {...register("state")}
                  placeholder="Tamil Nadu"
                  className="
      h-14
      w-full
      rounded-2xl
      border
      border-white/10
      bg-white/[0.04]
      px-5
      text-white
      placeholder:text-gray-500
      backdrop-blur-2xl
      outline-none
      transition-all
      duration-300

      hover:border-orange-500/40

      focus:border-orange-500
      focus:bg-white/[0.06]
      focus:ring-4
      focus:ring-orange-500/15
      "
                />

                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-focus-within:opacity-100 shadow-[0_0_45px_rgba(249,115,22,.18)]" />
              </div>

              {errors.state && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    BEDROOMS
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineHomeModern />
                Bedrooms
              </label>

              <input
                type="number"
                {...register("bedrooms")}
                placeholder="4"
                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    text-white
    placeholder:text-gray-500
    backdrop-blur-2xl
    outline-none
    transition-all
    duration-300

    hover:border-orange-500/40

    focus:border-orange-500
    focus:ring-4
    focus:ring-orange-500/15

    [appearance:textfield]
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
    "
              />

              {errors.bedrooms && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.bedrooms.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    BATHROOMS
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineHomeModern />
                Bathrooms
              </label>

              <input
                type="number"
                {...register("bathrooms")}
                placeholder="3"
                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    text-white
    placeholder:text-gray-500
    backdrop-blur-2xl
    outline-none
    transition-all
    duration-300

    hover:border-orange-500/40

    focus:border-orange-500
    focus:ring-4
    focus:ring-orange-500/15

    [appearance:textfield]
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
    "
              />

              {errors.bathrooms && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.bathrooms.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    AREA
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineSquares2X2 />
                Area (Sq.ft)
              </label>

              <input
                type="number"
                {...register("area")}
                placeholder="2400"
                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    text-white
    placeholder:text-gray-500
    backdrop-blur-2xl
    outline-none
    transition-all
    duration-300

    hover:border-orange-500/40

    focus:border-orange-500
    focus:ring-4
    focus:ring-orange-500/15

    [appearance:textfield]
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
    "
              />

              {errors.area && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.area.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    PINCODE
=========================================================== */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineMapPin />
                Pincode
              </label>

              <input
                {...register("pincode")}
                placeholder="600001"
                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    px-5
    text-white
    placeholder:text-gray-500
    backdrop-blur-2xl
    outline-none
    transition-all
    duration-300

    hover:border-orange-500/40

    focus:border-orange-500
    focus:ring-4
    focus:ring-orange-500/15
    "
              />

              {errors.pincode && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.pincode.message}
                </p>
              )}
            </div>
            {/* ===========================================================
    PROPERTY DESCRIPTION
=========================================================== */}

            <div className="md:col-span-2">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <HiOutlineDocumentText className="text-lg" />
                Property Description
              </label>

              <div className="group relative">
                <textarea
                  rows={7}
                  {...register("description")}
                  placeholder="Describe your property in detail. Mention highlights, nearby landmarks, amenities, interiors, connectivity and everything buyers should know..."
                  className="
      w-full
      resize-none
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      px-5
      py-5
      text-white
      leading-8
      placeholder:text-gray-500
      backdrop-blur-2xl
      outline-none
      transition-all
      duration-300

      hover:border-orange-500/30

      focus:border-orange-500
      focus:bg-white/[0.06]
      focus:ring-4
      focus:ring-orange-500/15
      "
                />

                <div
                  className="
      pointer-events-none
      absolute
      inset-0
      rounded-3xl
      opacity-0
      transition
      duration-300
      group-focus-within:opacity-100
      shadow-[0_0_55px_rgba(249,115,22,.18)]
      "
                />
              </div>

              {errors.description && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    PREMIUM IMAGE UPLOAD
=========================================================== */}

            <div className="md:col-span-2">
              <label className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                <FiUploadCloud className="text-lg" />
                Property Images
              </label>

              <label
                className="
    group
    relative
    flex
    cursor-pointer
    flex-col
    items-center
    justify-center
    overflow-hidden
    rounded-[30px]
    border-2
    border-dashed
    border-orange-500/25
    bg-gradient-to-br
    from-white/[0.05]
    via-white/[0.03]
    to-transparent
    px-8
    py-14
    text-center
    backdrop-blur-3xl
    transition-all
    duration-300

    hover:border-orange-500
    hover:bg-orange-500/[0.05]
    hover:shadow-[0_25px_80px_rgba(249,115,22,.15)]
    "
              >
                <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[80px]" />

                <div
                  className="
      relative
      flex
      h-20
      w-20
      items-center
      justify-center
      rounded-full
      border
      border-orange-500/30
      bg-orange-500/10
      transition-all
      duration-300
      group-hover:scale-110
      group-hover:bg-orange-500/20
      "
                >
                  <FiUploadCloud className="text-4xl text-orange-400" />
                </div>

                <h3 className="relative mt-7 text-2xl font-bold text-white">
                  Drag & Drop Images
                </h3>

                <p className="relative mt-3 max-w-xl text-sm leading-7 text-gray-400">
                  Upload premium high-quality property photos to attract more
                  buyers. JPG, PNG & WEBP supported.
                </p>

                <div
                  className="
      relative
      mt-8
      rounded-full
      border
      border-orange-500/30
      bg-orange-500/10
      px-6
      py-3
      text-sm
      font-semibold
      text-orange-300
      transition-all
      duration-300
      group-hover:bg-orange-500/20
      "
                >
                  Browse Images
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files) return;

                    setSelectedImages(Array.from(e.target.files));
                  }}
                  className="hidden"
                />
              </label>

              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-gray-300">
                  Maximum 10 Images
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-gray-300">
                  JPG • PNG • WEBP
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-gray-300">
                  HD Quality Recommended
                </div>
              </div>

              {existingImages.length > 0 && (
  <>
    <div className="mt-8 flex items-center justify-between">
      <h3 className="text-lg font-bold text-white">
        Existing Images
      </h3>

      <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
        {existingImages.length} Images
      </span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
      {existingImages.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl border border-white/10"
        >
          <img
            src={image}
            className="h-44 w-full object-cover"
          />

          <button
            type="button"
            onClick={() =>
              setExistingImages(prev =>
                prev.filter((_, i) => i !== index)
              )
            }
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </>
)}
            </div>
            {/* ===========================================================
    FURNISHING (PREMIUM RADIX SELECT)
=========================================================== */}

            <div>
              <label
                className="
    mb-3
    flex
    items-center
    gap-2
    text-sm
    font-semibold
    uppercase
    tracking-[0.18em]
    text-orange-300
    "
              >
                <HiOutlineHomeModern className="text-lg" />
                Furnishing
              </label>

              <Controller
                control={control}
                name="furnishing"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      className="
          group
          flex
          h-14
          w-full
          items-center
          justify-between

          rounded-2xl

          border
          border-white/10

          bg-white/[0.04]

          px-5

          text-white

          backdrop-blur-2xl

          outline-none

          transition-all
          duration-300

          hover:border-orange-500/40
          hover:bg-white/[0.06]

          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15

          data-[placeholder]:text-gray-500
          "
                    >
                      <Select.Value placeholder="Choose Furnishing" />

                      <Select.Icon
                        className="
            transition-transform
            duration-300
            group-data-[state=open]:rotate-180
            "
                      >
                        <FiChevronDown className="text-lg text-orange-300" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        sideOffset={8}
                        className="
            z-[9999]

            w-[var(--radix-select-trigger-width)]

            overflow-hidden

            rounded-2xl

            border
            border-orange-500/20

            bg-[#101010]/95

            backdrop-blur-3xl

            shadow-[0_30px_80px_rgba(249,115,22,.18)]

            animate-in
            fade-in
            zoom-in-95
            duration-200
            "
                      >
                        <Select.ScrollUpButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▲
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-2">
                          {[
                            "Fully Furnished",
                            "Semi Furnished",
                            "Unfurnished",
                          ].map((item) => (
                            <Select.Item
                              key={item}
                              value={item}
                              className="
                  relative

                  flex

                  cursor-pointer
                  select-none

                  items-center

                  rounded-xl

                  px-4
                  py-3

                  text-gray-300

                  outline-none

                  transition-all
                  duration-200

                  hover:bg-orange-500/15
                  hover:text-orange-300

                  focus:bg-orange-500/20
                  focus:text-orange-300

                  data-[state=checked]:bg-orange-500/20
                  data-[state=checked]:text-orange-400
                  "
                            >
                              <Select.ItemText>{item}</Select.ItemText>

                              <Select.ItemIndicator
                                className="
                    absolute
                    right-4
                    "
                              >
                                <FiCheck className="text-orange-400" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>

                        <Select.ScrollDownButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▼
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              {errors.furnishing && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.furnishing.message}
                </p>
              )}
            </div>
            {/* ===========================================================
    FACING (PREMIUM RADIX SELECT)
=========================================================== */}

            <div>
              <label
                className="
    mb-3
    flex
    items-center
    gap-2
    text-sm
    font-semibold
    uppercase
    tracking-[0.18em]
    text-orange-300
    "
              >
                <HiOutlineMap className="text-lg" />
                Facing
              </label>

              <Controller
                control={control}
                name="facing"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      className="
          group
          flex
          h-14
          w-full
          items-center
          justify-between

          rounded-2xl

          border
          border-white/10

          bg-white/[0.04]

          px-5

          text-white

          backdrop-blur-2xl

          outline-none

          transition-all
          duration-300

          hover:border-orange-500/40
          hover:bg-white/[0.06]

          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15

          data-[placeholder]:text-gray-500
          "
                    >
                      <Select.Value placeholder="Choose Facing" />

                      <Select.Icon
                        className="
            transition-transform
            duration-300
            group-data-[state=open]:rotate-180
            "
                      >
                        <FiChevronDown className="text-lg text-orange-300" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        sideOffset={8}
                        className="
            z-[9999]

            w-[var(--radix-select-trigger-width)]

            overflow-hidden

            rounded-2xl

            border
            border-orange-500/20

            bg-[#101010]/95

            backdrop-blur-3xl

            shadow-[0_30px_80px_rgba(249,115,22,.18)]

            animate-in
            fade-in
            zoom-in-95
            duration-200
            "
                      >
                        <Select.ScrollUpButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▲
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-2">
                          {[
                            "North",
                            "South",
                            "East",
                            "West",
                            "North-East",
                            "North-West",
                            "South-East",
                            "South-West",
                          ].map((item) => (
                            <Select.Item
                              key={item}
                              value={item}
                              className="
                  relative

                  flex

                  cursor-pointer
                  select-none

                  items-center

                  rounded-xl

                  px-4
                  py-3

                  text-gray-300

                  outline-none

                  transition-all
                  duration-200

                  hover:bg-orange-500/15
                  hover:text-orange-300

                  focus:bg-orange-500/20
                  focus:text-orange-300

                  data-[state=checked]:bg-orange-500/20
                  data-[state=checked]:text-orange-400
                  "
                            >
                              <Select.ItemText>{item}</Select.ItemText>

                              <Select.ItemIndicator
                                className="
                    absolute
                    right-4
                    "
                              >
                                <FiCheck className="text-orange-400" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>

                        <Select.ScrollDownButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▼
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              {errors.facing && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.facing.message}
                </p>
              )}
            </div>
            {/* ===========================================================
    FACING (PREMIUM RADIX SELECT)
=========================================================== */}

            <div>
              <label
                className="
    mb-3
    flex
    items-center
    gap-2
    text-sm
    font-semibold
    uppercase
    tracking-[0.18em]
    text-orange-300
    "
              >
                <HiOutlineMap className="text-lg" />
                Facing
              </label>

              <Controller
                control={control}
                name="facing"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      className="
          group
          flex
          h-14
          w-full
          items-center
          justify-between

          rounded-2xl

          border
          border-white/10

          bg-white/[0.04]

          px-5

          text-white

          backdrop-blur-2xl

          outline-none

          transition-all
          duration-300

          hover:border-orange-500/40
          hover:bg-white/[0.06]

          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15

          data-[placeholder]:text-gray-500
          "
                    >
                      <Select.Value placeholder="Choose Facing" />

                      <Select.Icon
                        className="
            transition-transform
            duration-300
            group-data-[state=open]:rotate-180
            "
                      >
                        <FiChevronDown className="text-lg text-orange-300" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        sideOffset={8}
                        className="
            z-[9999]

            w-[var(--radix-select-trigger-width)]

            overflow-hidden

            rounded-2xl

            border
            border-orange-500/20

            bg-[#101010]/95

            backdrop-blur-3xl

            shadow-[0_30px_80px_rgba(249,115,22,.18)]

            animate-in
            fade-in
            zoom-in-95
            duration-200
            "
                      >
                        <Select.ScrollUpButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▲
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-2">
                          {[
                            "North",
                            "South",
                            "East",
                            "West",
                            "North-East",
                            "North-West",
                            "South-East",
                            "South-West",
                          ].map((item) => (
                            <Select.Item
                              key={item}
                              value={item}
                              className="
                  relative

                  flex

                  cursor-pointer
                  select-none

                  items-center

                  rounded-xl

                  px-4
                  py-3

                  text-gray-300

                  outline-none

                  transition-all
                  duration-200

                  hover:bg-orange-500/15
                  hover:text-orange-300

                  focus:bg-orange-500/20
                  focus:text-orange-300

                  data-[state=checked]:bg-orange-500/20
                  data-[state=checked]:text-orange-400
                  "
                            >
                              <Select.ItemText>{item}</Select.ItemText>

                              <Select.ItemIndicator
                                className="
                    absolute
                    right-4
                    "
                              >
                                <FiCheck className="text-orange-400" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>

                        <Select.ScrollDownButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▼
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              {errors.facing && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.facing.message}
                </p>
              )}
            </div>
            {/* ===========================================================
    PARKING (PREMIUM RADIX SELECT)
=========================================================== */}

            <div>
              <label
                className="
    mb-3
    flex
    items-center
    gap-2
    text-sm
    font-semibold
    uppercase
    tracking-[0.18em]
    text-orange-300
    "
              >
                <HiOutlineTruck className="text-lg" />
                Parking
              </label>

              <Controller
                control={control}
                name="parking"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      className="
          group
          flex
          h-14
          w-full
          items-center
          justify-between

          rounded-2xl

          border
          border-white/10

          bg-white/[0.04]

          px-5

          text-white

          backdrop-blur-2xl

          outline-none

          transition-all
          duration-300

          hover:border-orange-500/40
          hover:bg-white/[0.06]

          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15

          data-[placeholder]:text-gray-500
          "
                    >
                      <Select.Value placeholder="Choose Parking Availability" />

                      <Select.Icon
                        className="
            transition-transform
            duration-300
            group-data-[state=open]:rotate-180
            "
                      >
                        <FiChevronDown className="text-lg text-orange-300" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        sideOffset={8}
                        className="
            z-[9999]

            w-[var(--radix-select-trigger-width)]

            overflow-hidden

            rounded-2xl

            border
            border-orange-500/20

            bg-[#101010]/95

            backdrop-blur-3xl

            shadow-[0_30px_80px_rgba(249,115,22,.18)]

            animate-in
            fade-in
            zoom-in-95
            duration-200
            "
                      >
                        <Select.ScrollUpButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▲
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-2">
                          {[
                            "Available",
                            "Covered Parking",
                            "Open Parking",
                            "Basement Parking",
                            "Multiple Parking",
                            "Not Available",
                          ].map((item) => (
                            <Select.Item
                              key={item}
                              value={item}
                              className="
                  relative

                  flex

                  cursor-pointer
                  select-none

                  items-center

                  rounded-xl

                  px-4
                  py-3

                  text-gray-300

                  outline-none

                  transition-all
                  duration-200

                  hover:bg-orange-500/15
                  hover:text-orange-300

                  focus:bg-orange-500/20
                  focus:text-orange-300

                  data-[state=checked]:bg-orange-500/20
                  data-[state=checked]:text-orange-400
                  "
                            >
                              <Select.ItemText>{item}</Select.ItemText>

                              <Select.ItemIndicator
                                className="
                    absolute
                    right-4
                    "
                              >
                                <FiCheck className="text-orange-400" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>

                        <Select.ScrollDownButton
                          className="
              flex
              h-8
              items-center
              justify-center
              bg-[#101010]
              text-orange-400
              "
                        >
                          ▼
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              {errors.parking && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.parking.message}
                </p>
              )}
            </div>

            {/* ===========================================================
    PREMIUM SECTION DIVIDER
=========================================================== */}

            <div className="md:col-span-2 my-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

                <div
                  className="
      relative
      rounded-full
      border
      border-orange-500/20
      bg-[#111111]
      px-6
      py-2
      backdrop-blur-xl
      "
                >
                  <span
                    className="
        bg-gradient-to-r
        from-orange-300
        via-orange-500
        to-amber-400
        bg-clip-text
        text-sm
        font-bold
        uppercase
        tracking-[0.25em]
        text-transparent
        "
                  >
                    Property Features
                  </span>
                </div>
              </div>
            </div>
            {/* ===========================================================
    PREMIUM SECTION HEADER
=========================================================== */}

            <div className="md:col-span-2 mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-orange-500/20
        bg-orange-500/10
        px-4
        py-2
        backdrop-blur-xl
        "
                  >
                    <HiOutlineSparkles className="text-orange-400" />

                    <span
                      className="
          text-xs
          font-bold
          uppercase
          tracking-[0.25em]
          text-orange-300
          "
                    >
                      Property Information
                    </span>
                  </div>

                  <h2
                    className="
        mt-5
        text-3xl
        font-black
        text-white
        "
                  >
                    Basic Details
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Fill accurate property information for better reach.
                  </p>
                </div>

                <div
                  className="
      hidden
      lg:flex
      h-16
      w-16
      items-center
      justify-center
      rounded-3xl
      border
      border-orange-500/20
      bg-orange-500/10
      backdrop-blur-xl
      "
                >
                  <HiOutlineHomeModern className="text-3xl text-orange-400" />
                </div>
              </div>

              <div
                className="
    mt-8
    h-px
    w-full
    bg-gradient-to-r
    from-transparent
    via-orange-500/30
    to-transparent
    "
              />
            </div>

            {/* ===========================================================
    PREMIUM REQUIRED LABEL STYLE
=========================================================== */}

            <label
              className="
  mb-3
  flex
  items-center
  gap-2
  text-sm
  font-semibold
  uppercase
  tracking-[0.18em]
  text-orange-300
  "
            >
              Property Title
              <span
                className="
    rounded-full
    bg-red-500/20
    px-2
    py-[2px]
    text-[10px]
    font-bold
    tracking-wider
    text-red-300
    "
              >
                REQUIRED
              </span>
            </label>

            {/* ===========================================================
    PREMIUM ERROR MESSAGE STYLE
=========================================================== */}

            {errors.title && (
              <div
                className="
    mt-3
    flex
    items-center
    gap-3
    rounded-2xl
    border
    border-red-500/20
    bg-red-500/10
    px-4
    py-3
    backdrop-blur-xl
    "
              >
                <div
                  className="
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-full
      bg-red-500/20
      "
                >
                  ⚠
                </div>

                <span
                  className="
      text-sm
      font-medium
      text-red-300
      "
                >
                  {errors.title.message}
                </span>
              </div>
            )}

            {/* ===========================================================
    PREMIUM HELPER TEXT
=========================================================== */}

            <p
              className="
  mt-3
  flex
  items-center
  gap-2
  text-xs
  text-gray-500
  "
            >
              <HiOutlineShieldCheck className="text-orange-400" />
              Use a descriptive title to improve buyer engagement.
            </p>
            {/* ===========================================================
    PREMIUM SECTION HEADER
=========================================================== */}

            <div className="md:col-span-2 mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-orange-500/20
        bg-orange-500/10
        px-4
        py-2
        backdrop-blur-xl
        "
                  >
                    <HiOutlineHomeModern className="text-orange-400" />

                    <span
                      className="
          text-xs
          font-bold
          uppercase
          tracking-[0.25em]
          text-orange-300
          "
                    >
                      Property Information
                    </span>
                  </div>

                  <h2
                    className="
        mt-5
        text-3xl
        font-black
        text-white
        "
                  >
                    Basic Details
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Fill accurate property information for better reach.
                  </p>
                </div>

                <div
                  className="
      hidden
      lg:flex
      h-16
      w-16
      items-center
      justify-center
      rounded-3xl
      border
      border-orange-500/20
      bg-orange-500/10
      backdrop-blur-xl
      "
                >
                  <HiOutlineHomeModern className="text-3xl text-orange-400" />
                </div>
              </div>

              <div
                className="
    mt-8
    h-px
    w-full
    bg-gradient-to-r
    from-transparent
    via-orange-500/30
    to-transparent
    "
              />
            </div>

            {/* ===========================================================
    PREMIUM REQUIRED LABEL STYLE
=========================================================== */}

            <label
              className="
  mb-3
  flex
  items-center
  gap-2
  text-sm
  font-semibold
  uppercase
  tracking-[0.18em]
  text-orange-300
  "
            >
              Property Title
              <span
                className="
    rounded-full
    bg-red-500/20
    px-2
    py-[2px]
    text-[10px]
    font-bold
    tracking-wider
    text-red-300
    "
              >
                REQUIRED
              </span>
            </label>

            {/* ===========================================================
    PREMIUM ERROR MESSAGE STYLE
=========================================================== */}

            {errors.title && (
              <div
                className="
    mt-3
    flex
    items-center
    gap-3
    rounded-2xl
    border
    border-red-500/20
    bg-red-500/10
    px-4
    py-3
    backdrop-blur-xl
    "
              >
                <div
                  className="
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-full
      bg-red-500/20
      "
                >
                  ⚠
                </div>

                <span
                  className="
      text-sm
      font-medium
      text-red-300
      "
                >
                  {errors.title.message}
                </span>
              </div>
            )}

            {/* ===========================================================
    PREMIUM HELPER TEXT
=========================================================== */}

            <p
              className="
  mt-3
  flex
  items-center
  gap-2
  text-xs
  text-gray-500
  "
            >
              <HiOutlineShieldCheck className="text-orange-400" />
              Use a descriptive title to improve buyer engagement.
            </p>
            {/* ===========================================================
    FORM PROGRESS HEADER
=========================================================== */}

            <div className="md:col-span-2 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                  Form Completion
                </span>

                <span className="text-sm font-bold text-white">
                  {Math.min(
                    Math.round(
                      ([
                        watch("title"),
                        watch("propertyType"),
                        watch("listingType"),
                        watch("price"),
                        watch("city"),
                        watch("state"),
                        watch("description"),
                      ].filter(Boolean).length /
                        7) *
                        100
                    ),
                    100
                  )}
                  %
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="
      h-full
      rounded-full
      bg-gradient-to-r
      from-orange-400
      via-orange-500
      to-amber-400
      transition-all
      duration-700
      "
                  style={{
                    width: `${Math.min(
                      ([
                        watch("title"),
                        watch("propertyType"),
                        watch("listingType"),
                        watch("price"),
                        watch("city"),
                        watch("state"),
                        watch("description"),
                      ].filter(Boolean).length /
                        7) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* ===========================================================
    STICKY ACTION BAR
=========================================================== */}

            <div className="md:col-span-2">
              <div
                className="
    sticky
    bottom-6
    z-30

    rounded-[28px]

    border
    border-orange-500/20

    bg-[#0b0b0b]/80

    p-6

    backdrop-blur-3xl

    shadow-[0_20px_80px_rgba(0,0,0,.45)]
    "
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Ready to Publish
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-400">
                      Verify all details before publishing your premium listing.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="
        group
        relative
        overflow-hidden

        rounded-2xl

        bg-gradient-to-r
        from-orange-500
        via-orange-600
        to-amber-500

        px-10
        py-4

        font-bold
        text-white

        shadow-[0_25px_60px_rgba(249,115,22,.35)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-[1.02]

        active:scale-95

        disabled:cursor-not-allowed
        disabled:opacity-60
        "
                  >
                    {/* Shine */}

                    <span
                      className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
          transition-transform
          duration-[1400ms]
          group-hover:translate-x-full
          "
                    />

                    {/* Glow */}

                    <span
                      className="
                          absolute
                          inset-0
                          opacity-0
                          blur-2xl
                          transition-all
                          duration-500
                          group-hover:opacity-100
                          bg-orange-400/30
                          "
                    />

                    <span className="relative flex items-center gap-3">
                      <FiUploadCloud className="text-xl transition-transform duration-300 group-hover:-translate-y-1" />

                      {loading || isSubmitting
                        ? "Updating..."
                        : "Update Property"}

                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* ===========================================================
    LOADING OVERLAY
=========================================================== */}

            {(loading || isSubmitting) && (
              <div
                className="
    fixed
    inset-0
    z-[9999]

    flex
    items-center
    justify-center

    bg-black/70

    backdrop-blur-md
    "
              >
                <div
                  className="
      rounded-[30px]

      border
      border-orange-500/20

      bg-[#101010]

      px-10
      py-8

      text-center

      shadow-[0_25px_80px_rgba(249,115,22,.25)]
      "
                >
                  <div
                    className="
        mx-auto
        h-16
        w-16

        animate-spin

        rounded-full

        border-[4px]
        border-orange-500/20
        border-t-orange-500
        "
                  />

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    Updating Property
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Please wait while we update your property...
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
