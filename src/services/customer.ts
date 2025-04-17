import { Customer } from "@/types/customer";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    const response = await api.post('/customers', data);
    return response.data;
}

export async function updateCustomer(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Customer> {
    const response = await api.patch(`/customers/${id}`, data);
    return response.data;
}

export async function deleteCustomer(id: string): Promise<void> {
    await api.delete(`/customers/${id}`);
}

export async function findCustomerById(id: string): Promise<Customer> {
    const response = await api.get(`/customers/${id}`);
    return response.data;
}

export async function listCustomers(page: number, size: number, isActive?: boolean): Promise<Page<Customer>> {
    let path = `/customers?page=${page}&size=${size}`;
    if (isActive !== undefined) {
        path += `&isActive=${isActive}`;
    }
    const response = await api.get(path);
    return response.data;
}
