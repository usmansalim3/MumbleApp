import api from '../../axios';
import {User, LoginCredentials, RegisterData, AuthTokens} from '../../../types';

export const userService = {
  login: async (credentials: LoginCredentials): Promise<AuthTokens & User> => {
    const response = await api.post('/users/login/', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post('/users/register/', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me/');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch('/users/me/', data);
    return response.data;
  },

  getUserProfile: async (userId: number): Promise<User> => {
    const response = await api.get(`/users/${userId}/`);
    return response.data;
  },

  getUsers: async (query: string = ''): Promise<{results: User[]}> => {
    const response = await api.get('/users/', {params: {q: query}});
    return response.data;
  },

  followUser: async (userId: number): Promise<void> => {
    await api.post(`/users/${userId}/follow/`);
  },

  unfollowUser: async (userId: number): Promise<void> => {
    await api.delete(`/users/${userId}/follow/`);
  },

  sendActivationEmail: async (): Promise<void> => {
    await api.post('/users/send-activation-email/');
  },

  changePassword: async (data: {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<void> => {
    await api.post('/users/password-change/', data);
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete('/users/delete-account/');
  },
};
