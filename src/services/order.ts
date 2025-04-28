import { Page } from "@/types/page";
import { api } from "./api";
import { Order } from "@/types/order";

export async function listOrders(page: number, size:number){
    const {data} = await api.get<Page<Order>>(`/orders?page=${page}&size=${size}`);
    return data;
}