import axios from 'axios';
import type { AuthResponse, User, Meal, PriceSetting, Dashboard } from '@/types';
import { auth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({ baseURL: API_BASE_URL });

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = auth.getRefreshToken();
      if (!refreshToken) {
        auth.clearAuth();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await apiClient.post('/auth/refresh', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = data;
        const user = auth.getUser();
        auth.setAuth(accessToken, newRefreshToken, user!);
        setAuthToken(accessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
        processQueue(null, accessToken);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        auth.clearAuth();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: (email: string, password: string) => 
      apiClient.post<AuthResponse>('/auth/login', { email, password }),
    register: (email: string, password: string, name: string, role?: 'USER' | 'ADMIN') => 
      apiClient.post<AuthResponse>('/auth/register', { email, password, name, role }),
    refresh: (refreshToken: string) => 
      apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken }),
    me: (token: string) => 
      apiClient.get<User>('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  },
  meals: {
    list: (params?: { date?: string; mealType?: string; startDate?: string; endDate?: string }) => 
      apiClient.get<Meal[]>('/meals', { params }),
    create: (data: { date: string; mealType: string; count: number; note?: string }) => 
      apiClient.post<Meal>('/meals', data),
    createBulk: (data: { dates?: string[]; startDate?: string; endDate?: string; daysOfWeek?: number[]; skipWeekends?: boolean; mealType: string; count: number; note?: string }) => 
      apiClient.post('/meals/bulk', data),
    bulkUpdate: (data: { startDate: string; endDate: string; mealType?: string; count?: number; note?: string }) => 
      apiClient.patch('/meals/bulk', data),
    bulkCancel: (data: { startDate: string; endDate: string; mealType?: string }) => 
      apiClient.delete('/meals/bulk', { data }),
    getCalendar: (params?: { month?: string; week?: string }) => 
      apiClient.get('/meals/calendar', { params }),
    update: (id: string, data: { count?: number; note?: string }) => 
      apiClient.patch<Meal>(`/meals/${id}`, data),
    delete: (id: string) => 
      apiClient.delete(`/meals/${id}`),
  },
  dashboard: {
    get: () => apiClient.get<Dashboard>('/dashboard'),
    monthly: (params?: { month?: string }) => apiClient.get('/dashboard/monthly', { params }),
    weekly: (params?: { week?: string }) => apiClient.get('/dashboard/weekly', { params }),
  },
  price: {
    get: () => apiClient.get<PriceSetting>('/users/me/price'),
    update: (data: { breakfast: number; lunch: number; dinner: number; custom: number }) => 
      apiClient.patch<PriceSetting>('/users/me/price', data),
  },
  users: {
    getProfile: () => apiClient.get<User>('/users/profile'),
    updateProfile: (data: { name?: string; mobile?: string }) => 
      apiClient.patch<User>('/users/profile', data),
  },
  admin: {
    getAllUsers: () => apiClient.get('/admin/users'),
    getUserSummary: (userId: string) => apiClient.get(`/admin/users/${userId}/summary`),
  },
};
