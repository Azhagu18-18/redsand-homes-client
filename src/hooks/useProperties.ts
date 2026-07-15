import { useEffect, useState } from "react";
import propertyService from "../app/services/property.service";

export interface Property {
  id: string;
  title: string;
  description: string;

  price: number;

  propertyType: string;
  listingType: string;

  bedrooms: number;
  bathrooms: number;
  area: number;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  image: string;
  images: string[];

  isFavorited: boolean;

  created_at: string;
}

export default function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await propertyService.getAll();

      console.table(
          response.data.map((p: any) => ({
            title: p.title,
            city: p.city,
            propertyType: p.propertyType,
            property_type: p.property_type,
            listingType: p.listingType,
            listing_type: p.listing_type,
            bedrooms: p.bedrooms,
          }))
        );

      setProperties(
  (response.data ?? []).map((property: any) => ({
    ...property,

    propertyType: property.property_type,
    listingType: property.listing_type,

    

    image:
      property.images?.[0] ??
      "/images/property-placeholder.jpg",

    isFavorited: false,
  }))
);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refresh: fetchProperties,
  };
}