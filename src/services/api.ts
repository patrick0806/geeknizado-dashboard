import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/localStorage";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
  
      if (error.response && (error.response.status === 401)) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
          try {
            const refreshResponse = await api.post(
              "/auth/refresh-token",
              {},
              {
                headers: {
                  'Refresh-Token': refreshToken,
                  Accept: '*/*',
                },
              }
            );
  
            const { accessToken, refreshToken: newRefreshToken } =
              refreshResponse.data;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
  
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return api(error.config);
          } catch (refreshError) {
            console.error('Erro ao atualizar token:', refreshError);
            window.location.replace('/login')
            //TODO - when user is deleted review here
          }
        }
      }
      return Promise.reject(error);
    }
  );