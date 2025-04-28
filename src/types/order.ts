import { Coupon } from "./coupon"
import { Customer } from "./customer"
import { OrderStatus } from "./orderStatus"
import { PaymentMethod } from "./paymentMethod"

type ShippingAddress = {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement: string
  }

export type Order = {
    id: string
    code: string
  totalValue: number
  discountAmount: number
  paymentMethod: PaymentMethod
  status: OrderStatus
  shippingMethod: string
  shippingValue: number
  totalWithDiscount: number
  createdAt: string
  updatedAt: string
  customer: Customer & {cpf: string},
  shippingAddress: ShippingAddress
  coupon?: Coupon
}