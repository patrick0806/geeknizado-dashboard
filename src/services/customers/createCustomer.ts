import { Customer } from "@/types/customer";
import { api } from "../api";

interface CreateCustomerData {
    name: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
}

export async function createCustomer(data: CreateCustomerData): Promise<Customer> {
    const { data: response } = await api.post('/customers', data);
    return response;
} 