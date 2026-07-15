"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import propertyService from "../../services/property.service";
import PropertyGallery from "@/src/components/properties/PropertyGallery";
import PropertyInfoCard from "@/src/components/properties/PropertyInfoCard";
import OwnerInfoCard from "@/src/components/properties/OwnerInfoCard";
import PropertyAmenities from "@/src/components/properties/PropertyAmenities";
import SimilarProperties from "@/src/components/properties/SimilarProperties";


import type { Property } from "../../services/property.service";



export default function PropertyDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

       const response = await propertyService.getById(id);

        setProperty(response.data);
        const similar = await propertyService.getSimilar(id);

        setSimilarProperties(similar.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load property.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707]">
        <h2 className="text-xl text-white">
          Loading Property...
        </h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707]">
        <h2 className="text-red-500">{error}</h2>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707]">
        <h2 className="text-white">
          Property not found.
        </h2>
      </main>
    );
  }

const images =
  typeof property.images === "string"
    ? JSON.parse(property.images)
    : property.images ?? [];

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <h1 className="text-4xl font-bold">
          {property.title}
        </h1>

        <p className="mt-4 text-gray-400">
          {property.address}
        </p>

        <PropertyGallery
            images={images}
            title={property.title}
          />

          <PropertyInfoCard property={property} />

          <PropertyAmenities
              amenities={
                typeof property.amenities === "string"
                  ? JSON.parse(property.amenities)
                  : property.amenities ?? []
              }
            />

        <h2 className="mt-8 text-3xl font-bold text-orange-500">
          ₹ {Number(property.price).toLocaleString()}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-white/10 p-6">
            <h3 className="text-gray-400">Bedrooms</h3>
            <p className="mt-2 text-2xl">
              {property.bedrooms}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 p-6">
            <h3 className="text-gray-400">Bathrooms</h3>
            <p className="mt-2 text-2xl">
              {property.bathrooms}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 p-6">
            <h3 className="text-gray-400">Area</h3>
            <p className="mt-2 text-2xl">
              {property.area} Sq.ft
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold">
            Description
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            {property.description}
          </p>
        </div>

        <OwnerInfoCard
            owner={{
              first_name: property.first_name,
              last_name: property.last_name,
              email: property.email,
              phone: property.phone,
            }}
          />

          <SimilarProperties
  properties={similarProperties}
/>

      </div>
    </main>
  );
}