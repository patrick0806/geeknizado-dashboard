import { Customer } from "@/types/customer";
import { api } from "../api";

interface UpdateCustomerData {
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
}

export async function updateCustomer(
    customerId: string,
    data: UpdateCustomerData
): Promise<Customer> {
    const { data: response } = await api.put(`/customers/${customerId}`, data);
    return response;
} 