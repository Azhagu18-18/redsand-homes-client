import api from "../lib/axios";

export interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  pendingProperties: number;
  approvedProperties: number;
  rejectedProperties: number;
  recentProperties: any[];
  recentUsers: any[];
}

class AdminService {
  /**
   * Dashboard Statistics
   */
  async getDashboard() {
    const response = await api.get("/admin/dashboard");
    return response.data;
  }

  /**
   * Get All Properties
   */
  async getAllProperties() {
    const response = await api.get("/admin/properties");
    return response.data;
  }

  /**
   * Get Property Details
   */
  async getProperty(id: string) {
    const response = await api.get(`/admin/properties/${id}`);
    return response.data;
  }

  /**
   * Approve Property
   */
  async approveProperty(id: string) {
    const response = await api.patch(
      `/admin/properties/${id}/approve`
    );

    return response.data;
  }

  /**
   * Reject Property
   */
  async rejectProperty(id: string) {
    const response = await api.patch(
      `/admin/properties/${id}/reject`
    );

    return response.data;
  }

  /**
   * Delete Property
   */
  async deleteProperty(id: string) {
    const response = await api.delete(
      `/admin/properties/${id}`
    );

    return response.data;
  }

  /**
   * Get All Users
   */
  async getAllUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  }

  /**
   * Get User Details
   */
  async getUser(id: string) {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  }

  /**
   * Update User Role
   */
  async updateUserRole(
    id: string,
    role: "USER" | "ADMIN"
  ) {
    const response = await api.patch(
      `/admin/users/${id}/role`,
      { role }
    );

    return response.data;
  }
}

export default new AdminService();