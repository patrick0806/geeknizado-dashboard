import { api } from "../api";

export async function resetPassword(token: string, password: string) {
    const { data } = await api.post('/users/set-password', {
        token,
        password,
    });
    return data;
} 