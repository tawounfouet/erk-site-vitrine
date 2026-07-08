import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_tenant: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const { data } = await api.post('/auth/jwt/create/', credentials);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  async register(userData: Record<string, unknown>): Promise<void> {
    await api.post('/auth/users/', userData);
  },

  async getProfile(): Promise<UserData> {
    const { data } = await api.get('/auth/users/me/');
    return data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
