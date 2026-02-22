import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api';
import { User, LoginCredentials, RegisterData } from '../types';
import { useEffect, useState } from 'react';
import { initialiseStorage } from '../utils/localStorage';

export function useAuth() {
  const queryClient = useQueryClient();
  const [tokens, setTokens] = useState<{ accessToken: string | null; refreshToken: string | null } | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      const storageInstance = await initialiseStorage();
      const accessToken = storageInstance?.getString('access_token') as string | null;
      const refreshToken = storageInstance?.getString('refresh_token') as string;
      setTokens({ accessToken, refreshToken });
    };
    loadTokens();
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getCurrentUser,
    staleTime: Infinity,
    gcTime: 0,
    enabled: !!tokens?.accessToken && !!tokens?.refreshToken
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await userService.login(credentials);
      const { access, refresh, ...userData } = response;
      return userData as User;
    },
    onSuccess: (userData) => {
      console.log('Login successful, user data:', userData);
      queryClient.setQueryData(['user'], userData);
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      await userService.register(data);
    },
  });

  // const logoutMutation = useMutation({
  //   mutationFn: async () => {
  //     await Promise.all([
  //       AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
  //       AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
  //       AsyncStorage.removeItem(USER_KEY),
  //     ]);
  //   },
  //   onSuccess: () => {
  //     queryClient.setQueryData(['user'], null);
  //   },
  // });

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    error: loginMutation.error || registerMutation.error,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    // logout: logoutMutation.mutateAsync,
  };
}
