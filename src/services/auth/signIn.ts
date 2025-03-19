import { AxiosResponse } from "axios";
import { api } from "../api";

export async function signIn(email: string, password: string): Promise<AxiosResponse> {
    return api.post('/auth/sign-in', { email, password, type: 'admin' });
}