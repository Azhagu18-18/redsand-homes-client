import api from "../lib/axios";

export interface FavoriteProperty {
  favorite_id: string;
  favorited_at: string;

  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  property_type: string;
  listing_type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;

  images: string[];

  owner_id: string;
  owner_name: string;

  created_at: string;
}

interface ToggleFavoriteResponse {
  success: boolean;
  favorited: boolean;
  message: string;
}

interface FavoritesResponse {
  success: boolean;
  count: number;
  data: FavoriteProperty[];
}

class FavoriteService {
  /**
   * Toggle Favorite
   * POST /api/favorites/:propertyId
   */
 async toggleFavorite(propertyId: string) {
  const response = await api.post(`/favorites/${propertyId}`);

  window.dispatchEvent(new Event("favorites-updated"));

  return response.data;
}

  /**
   * Get Logged-in User Favorites
   * GET /api/favorites
   */
  async getMyFavorites(): Promise<FavoriteProperty[]> {
    const response =
      await api.get<FavoritesResponse>("/favorites");

    return response.data.data;
  }
}

export default new FavoriteService();