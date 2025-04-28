import { Coupon } from "@/types/coupon";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createCoupon(data: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'timesUsed'>): Promise<Coupon> {
    const response = await api.post('/coupons', data);
    return response.data;
}

export async function updateCoupon(id: string, data: Partial<Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'timesUsed'>>): Promise<Coupon> {
    const response = await api.patch(`/coupons/${id}`, data);
    return response.data;
}

export async function deleteCoupon(id: string): Promise<void> {
    await api.delete(`/coupons/${id}`);
}

export async function findCouponById(id: string): Promise<Coupon> {
    const response = await api.get(`/coupons/${id}`);
    return response.data;
}

export async function listCoupons(page: number, size: number, isActive?: boolean): Promise<Page<Coupon>> {
    let path = `/coupons?page=${page}&size=${size}`;
    if (isActive !== undefined) {
        path += `&isActive=${isActive}`;
    }
    const response = await api.get(path);
    return response.data;
}
