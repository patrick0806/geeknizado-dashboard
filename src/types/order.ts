import { Customer } from "./customer";

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    BOLETO = 'boleto',
    PIX = 'pix',
}

export type OrderItem = {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
}

export type Order = {
    id: string;
    customer: Customer;
    total: number;
    discount: number;
    shippingFee: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    transactionId: string;
    trackingCode: string;
    shippingStreet: string;
    shippingNeighborhood: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    shippingNumber: string;
    shippingComplement?: string;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}