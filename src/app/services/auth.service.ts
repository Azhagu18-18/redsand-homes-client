import api from "@/src/lib/axios";
import type { LoginFormData , RegisterFormData } from "@/src/lib/validations/auth";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  };
}

class AuthService {
  /**
   * Register
   */
  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      data
    );

    return response.data;
  }

  /**
   * Login
   */
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/login",
      data
    );

    return response.data;
  }

  /**
   * Get Current Logged-in User
   */
  async getProfile(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>(
      "/auth/me"
    );

    return response.data;
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await api.post("/auth/logout");
  }
}

const authService = new AuthService();

export default authService;