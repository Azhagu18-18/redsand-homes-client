/* eslint-disable */
import api from "../../lib/axios";

export interface CreatePropertyPayload {
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
  latitude?: number;
  longitude?: number;
  images?: string[];
}

export interface Property extends CreatePropertyPayload {
  id: string;
  userId: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  amenities?: string[] | string;

  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  createdAt: string;
  updatedAt: string;

  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

class PropertyService {
  async create(data: CreatePropertyPayload) {
    const response = await api.post("/properties", data);

    return response.data;
  }

  async getAll(params?: Record<string, string | number>) {
    const response = await api.get("/properties", {
      params,
    });

    return response.data;
  }

  async getById(id: string) {
    const response = await api.get(`/properties/${id}`);

    return response.data;
  }

  async getSimilar(id: string) {
  const { data } = await api.get(
    `/properties/similar/${id}`
  );

  return data;
}

  async getMyProperties(
  page: number = 1,
  limit: number = 10
) {
  const response = await api.get(
    "/properties/my-properties",
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
}

async getByIdForEdit(id: string) {
  const response = await api.get(
    `/properties/edit/${id}`
  );

  return response.data;
}

  async update(
    id: string,
    data: Partial<CreatePropertyPayload>
  ) {
    const response = await api.put(
      `/properties/${id}`,
      data
    );

    return response.data;
  }

  async remove(id: string) {
    const response = await api.delete(
      `/properties/${id}`
    );

    return response.data;
  }
}

export default new PropertyService();