import { Page } from "@/types/page";
import { api } from "./api";
import { Order } from "@/types/order";
import { OrderStatus } from "@/types/orderStatus";

export async function listOrders(page: number, size:number, customerName?: string, orderStatus?: OrderStatus){
    let path = `/orders?page=${page}&size=${size}`;

    if(customerName){
        path += `&customerName=${customerName}`
    }

    if(orderStatus){
        path += `&orderStatus=${orderStatus}`
    }
    const {data} = await api.get<Page<Order>>(path);
    return data;
}

export async function getOrder(code: string){
    const {data} = await api.get(`/orders/${code}`);
    return data;
}

export async function updateOrderStatus(orderCode: string, status: OrderStatus){
    const {data} = await api.patch<Page<Order>>(`/orders/status/${orderCode}`,{status});
    return data;
}
