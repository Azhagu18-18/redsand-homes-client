"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/src/components/properties/PropertyCard";
import favoriteService , {FavoriteProperty} from "@/src/services/favorite.service";


export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const data = await favoriteService.getMyFavorites();

      setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center text-white">
        Loading favorites...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold text-white">
          No Favorite Properties
        </h2>

        <p className="mt-3 text-gray-400">
          Start adding your favorite properties ❤️
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        My Favorites
      </h1>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map((property) => (
          <PropertyCard
            key={property.id}
            property={{
              id: property.id,
              title: property.title,
              image: property.images?.[0] || "/images/property-placeholder.jpg",
              price: property.price,
              city: property.city,
              state: property.state,
              propertyType: property.property_type,
              listingType: property.listing_type as "Sale" | "Rent",
              isFavorited: true,  
              status:
              property.status === "APPROVED"
                ? "Available"
                : property.status === "PENDING"
                ? "Pending"
                : property.status === "REJECTED"
                ? "Rejected"
                : "Sold",
              bedrooms: property.bedrooms,
              bathrooms: property.bathrooms,
              area: property.area,
            }}
          />
        ))}
      </div>
    </section>
  );
}