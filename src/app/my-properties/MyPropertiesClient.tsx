"use client";

import { useEffect, useState } from "react";
import propertyService from "../services/property.service";
import { useRouter } from "next/navigation";
import PropertyGrid from "@/src/components/properties/PropertyGrid";
import type { Property as PropertyCardType } from "../../components/properties/PropertyCard";
import PropertySkeleton from "@/src/components/ui/PropertySkeleton";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  property_type: string;
  listing_type: string;
   is_favorited: boolean;  
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  status: string;
  images: string[];
  created_at: string;
}



export default function MyPropertiesClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProperties = async (page = 1) => {
    try {
      setLoading(true);

      const response = await propertyService.getMyProperties(page, 10);

      setProperties(response.data.properties);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch my properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  

  const handleEdit = (id: string) => {
  router.push(`/edit-property/${id}`);
};

const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this property?"
  );

  if (!confirmed) return;

  try {
    await propertyService.remove(id);

    await fetchProperties(pagination?.page || 1);
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="mb-8 text-3xl font-bold">
          My Properties
        </h1>

        <PropertySkeleton count={6} />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="text-6xl">🏡</div>

        <h2 className="mt-5 text-3xl font-bold">
          No Properties Found
        </h2>

        <p className="mt-3 text-gray-500">
          You haven't added any properties yet.
        </p>
      </div>
    );
  }

  const formattedProperties: PropertyCardType[] = properties.map((property) => ({
  id: property.id,
  title: property.title,
  image:
    property.images?.[0] || "/images/property-placeholder.jpg",
  price: property.price,
  city: property.city,
  state: property.state,
  propertyType: property.property_type,
  listingType:
    property.listing_type === "rent" ? "Rent" : "Sale",
     isFavorited: property.is_favorited, 
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  area: property.area,
  status: property.status as
    | "Available"
    | "Pending"
    | "Sold"
    | "Rejected",
  createdAt: property.created_at,
}));

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          My Properties
        </h1>

        <span className="rounded-lg bg-orange-500 px-4 py-2 text-white">
          {pagination?.total} Properties
        </span>
      </div>

      <PropertyGrid
            properties={formattedProperties}
            showActions
            onEdit={handleEdit}
            onDelete={handleDelete}
            />

      {pagination && pagination.pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchProperties(pagination.page - 1)}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of {pagination.pages}
          </span>

          <button
            disabled={pagination.page === pagination.pages}
            onClick={() => fetchProperties(pagination.page + 1)}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}