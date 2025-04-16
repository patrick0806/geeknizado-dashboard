import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/localStorage";
import { api } from "./api";

export async function login(email: string, password: string): Promise<void>{
   const response = await api.post('/auth/user', { email, password });
   localStorage.setItem(ACCESS_TOKEN,response.headers["access-token"]);
   localStorage.setItem(REFRESH_TOKEN, response.headers["refresh-token"]);
}

export function logout(): void{
   localStorage.removeItem(ACCESS_TOKEN);
   localStorage.removeItem(REFRESH_TOKEN);
}

export function forgotPassword(email: string): Promise<void>{
   return api.post('/auth/forgot-password', { email });
}