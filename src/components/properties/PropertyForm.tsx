"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";


import uploadService from "@/src/services/upload.service";



export const amenitiesList = [
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

export const propertySchema = z.object({
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

export type PropertyFormData = z.infer<typeof propertySchema>;

export interface PropertyFormProps {
  mode: "create" | "edit";

  initialData?: Partial<PropertyFormData> & {
    images?: string[];
  };

  onSubmit: (
    data: PropertyFormData,
    images: string[]
  ) => Promise<void>;

  submitText?: string;
}

export default function PropertyForm({
  mode,
  initialData,
  onSubmit,
  submitText,
}: PropertyFormProps) {
  const [loading, setLoading] = useState(false);

  // Newly selected images
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Existing Cloudinary images (Edit Mode)
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
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
    },
  });

  // ============================================
  // Prefill form while editing
  // ============================================

  useEffect(() => {
    if (!initialData) return;

    reset({
      title: initialData.title ?? "",

      propertyType: initialData.propertyType ?? "",

      listingType: initialData.listingType ?? "",

      price: initialData.price ?? 0,

      address: initialData.address ?? "",

      city: initialData.city ?? "",

      state: initialData.state ?? "",

      pincode: initialData.pincode ?? "",

      bedrooms: initialData.bedrooms ?? 1,

      bathrooms: initialData.bathrooms ?? 1,

      area: initialData.area ?? 100,

      description: initialData.description ?? "",

      furnishing: initialData.furnishing ?? "",

      facing: initialData.facing ?? "",

      parking: initialData.parking ?? "",

      amenities: initialData.amenities ?? [],
    });

    setExistingImages(initialData.images ?? []);
  }, [initialData, reset]);

  // ============================================
  // Remove Existing Image (Edit)
  // ============================================

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================
  // Remove Newly Selected Image
  // ============================================

  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
    // ============================================
  // Shared Submit Handler
  // ============================================

  const handleFormSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      setLoading(true);

      let uploadedImageUrls: string[] = [];

      // Upload only newly selected images
      if (selectedImages.length > 0) {
        uploadedImageUrls =
          await uploadService.uploadPropertyImages(selectedImages);
      }

      // Existing Images + Newly Uploaded Images
      const finalImages = [...existingImages];

        if (uploadedImageUrls.length > 0) {
        finalImages.push(...uploadedImageUrls);
        }

      await onSubmit(data, finalImages);

      toast.success(
        mode === "create"
          ? "Property added successfully."
          : "Property updated successfully."
      );

      // Reset only while creating
      if (mode === "create") {
                reset();

                setSelectedImages([]);
                setExistingImages([]);
                } else {
                setSelectedImages([]);
                }
    } catch (error) {
      console.error(error);

      toast.error(
        mode === "create"
          ? "Failed to add property."
          : "Failed to update property."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Form Completion
  // ============================================

  const completedFields = [
    watch("title"),
    watch("propertyType"),
    watch("listingType"),
    watch("price"),
    watch("city"),
    watch("state"),
    watch("description"),
  ].filter(Boolean).length;

  const progress = Math.min(
    Math.round((completedFields / 7) * 100),
    100
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
        {/* ===========================================================
    EXISTING IMAGES (EDIT MODE)
=========================================================== */}

{mode === "edit" && existingImages.length > 0 && (
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
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
          "
        >
          <img
            src={image}
            alt={`Property ${index}`}
            className="
              h-44
              w-full
              object-cover
              transition-all
              duration-500
              group-hover:scale-110
            "
          />

          <button
            type="button"
            onClick={() => removeExistingImage(index)}
            className="
              absolute
              right-3
              top-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-red-500/90
              text-white
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
              hover:scale-110
            "
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </>
)}

{/* ===========================================================
    NEWLY SELECTED IMAGES
=========================================================== */}

{selectedImages.length > 0 && (
  <>
    <div className="mt-8 flex items-center justify-between">
      <h3 className="text-lg font-bold text-white">
        New Images
      </h3>

      <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
        {selectedImages.length} Selected
      </span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
      {selectedImages.map((image, index) => (
        <div
          key={index}
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
          "
        >
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            className="
              h-44
              w-full
              object-cover
              transition-all
              duration-500
              group-hover:scale-110
            "
          />

          <button
            type="button"
            onClick={() => removeSelectedImage(index)}
            className="
              absolute
              right-3
              top-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-red-500/90
              text-white
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
              hover:scale-110
            "
          >
            ✕
          </button>
        </div>
      ))}
    </div>
    
  </>
)}

</main>
  )};