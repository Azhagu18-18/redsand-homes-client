"use client";

import { useState , useEffect } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import favoriteService from "@/src/services/favorite.service";
import { toast } from "sonner";

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorited?: boolean;
  size?: number;
  onChange?: (favorited: boolean) => void;
}

export default function FavoriteButton({
  propertyId,
  initialFavorited = false,
  size = 24,
  onChange,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setFavorited(initialFavorited);
}, [initialFavorited]);

  const handleToggleFavorite = async () => {
    if (loading) return;

    // Save current state
    const previous = favorited;

    // Optimistic UI
    setFavorited(!previous);
    setLoading(true);

   try {
  const result = await favoriteService.toggleFavorite(propertyId);

  setFavorited(result.favorited);

  onChange?.(result.favorited);

  if (result.favorited) {
    toast.success("Property added to favorites ❤️");
  } else {
    toast.success("Property removed from favorites 💔");
  }
} catch (error) {
  setFavorited(previous);

  toast.error("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleToggleFavorite}
      aria-label="Favorite Property"
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-black/60
        backdrop-blur-md
        transition-all
        duration-300
        hover:scale-110
        hover:bg-black/80
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {favorited ? (
        <HiHeart
          size={size}
          className="text-red-500"
        />
      ) : (
        <HiOutlineHeart
          size={size}
          className="text-white"
        />
      )}
    </button>
  );
}