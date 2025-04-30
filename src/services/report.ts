import { Product } from "@/types/product";
import { api } from "./api";
import { Order } from "@/types/order";

export type ResumeStore = {
    productsWithLowStock: Product[]
    latestOrders: Order[]
    totalCustomers: number
    newCustomersAmount: number
    totalOrders: number
    totalAmountSales: string 
}

export async function resumeStore():Promise<ResumeStore>{
    const { data } = await api.get("/report/resume-store") 
    return data;
}