import api from "@/src/lib/axios";
import type { LoginFormData  } from "@/src/lib/validations/auth";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl?: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      expiresIn: string;
    };
  };
}

class AuthService {
 /**
 * Register
 */
async register(data: RegisterRequest): Promise<AuthResponse> {
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
 * Update Current User Profile
 */
async updateProfile(
  data: UpdateProfileRequest
): Promise<AuthResponse> {
  const response = await api.put<AuthResponse>(
    "/auth/profile",
    data
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