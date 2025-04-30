import { Separator } from "@/components/ui/separator";
import type { Order } from "@/types/order";
import { formatCPF, formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusLabel,
} from "@/util/orderStatusLabel";
import { getPaymentMethodLabel } from "@/util/paymentMethodLabel";
import { useOrder } from "@/hooks/queries/useOrder";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const { data, isLoading } = useOrder({ orderCode: order.code });
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Pedido #{order.code}</h3>
          <p className="text-sm text-muted-foreground">
            Criado em{" "}
            {format(new Date(order.createdAt), "dd/MM/yyyy 'às' HH:mm")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant={getOrderStatusBadgeVariant(order.status) as any}
            className="h-7 px-3"
          >
            {getOrderStatusLabel(order.status)}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-[400px] mx-auto">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>

        {/* Tab de Detalhes */}
        <TabsContent value="details" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Informações do Cliente</h4>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{order.customer.name}</p>
                <p>CPF: {formatCPF(order.customer.cpf)}</p>
                <p>Email: {order.customer.email}</p>
                {/* {order.customer.phone && <p>Telefone: {order.customer.phone}</p>} */}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Endereço de Entrega</h4>
              <div className="space-y-1 text-sm">
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.number}
                </p>
                <p>
                  {order.shippingAddress.complement &&
                    `${order.shippingAddress.complement}, `}
                  {order.shippingAddress.neighborhood}
                </p>
                <p>
                  {order.shippingAddress.city} - {order.shippingAddress.state}
                </p>
                <p>CEP: {order.shippingAddress.zipCode}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Resumo do Pedido</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatMoney(order.totalValue)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Desconto</span>
                <span>-{formatMoney(order.discountAmount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete ({order.shippingMethod})</span>
                <span>{formatMoney(order.shippingValue)}</span>
              </div>
              {order.coupon && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Cupom: {order.coupon.code}</span>
                  <span>-{formatMoney(order.coupon.discountAmount || 0)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatMoney(order.totalWithDiscount)}</span>
              </div>
              <Separator />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Informações de Pagamento</h4>
            <div className="space-y-1 text-sm">
              <p>Método: {getPaymentMethodLabel(order.paymentMethod)}</p>
              <p>Status: {getOrderStatusLabel(order.status)}</p>
            </div>
          </div>
        </TabsContent>

        {/* Tab de Produtos */}
        <TabsContent value="products" className="space-y-6 mt-6">
          <h4 className="font-medium mb-3">Produtos do Pedido</h4>

          {isLoading && !data ? (
            // Estado de carregamento
            <div className="space-y-4">
              <div className="rounded-md border overflow-hidden">
                <div className="bg-muted px-4 py-3">
                  <div className="grid grid-cols-12 gap-4">
                    <Skeleton className="h-4 col-span-1" />
                    <Skeleton className="h-4 col-span-5" />
                    <Skeleton className="h-4 col-span-2" />
                    <Skeleton className="h-4 col-span-2" />
                    <Skeleton className="h-4 col-span-2" />
                  </div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">
                          <Skeleton className="h-12 w-12 rounded-md" />
                        </div>
                        <div className="col-span-5 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <Skeleton className="h-4 w-8" />
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : data?.items && data.items.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left w-16">Thumbnail</th>
                      <th className="px-4 py-3 text-left">Produto</th>
                      <th className="px-4 py-3 text-center">Qtd</th>
                      <th className="px-4 py-3 text-right">Preço</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data.items.map((item) => (
                      <tr key={item.id} className="bg-card">
                        <td className="px-4 py-3">
                          {item.product.images &&
                          item.product.images.length > 0 ? (
                            <div className="relative h-12 w-12 rounded-md overflow-hidden">
                              <Image
                                src={
                                  item.product.images.sort(
                                    (a, b) => a.position - b.position
                                  )[0].url || "/placeholder.svg"
                                }
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                              Sem imagem
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            SKU: {item.product.sku}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatMoney(item.unitPrice)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {formatMoney(item.unitPrice * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Sem produtos
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">
                Nenhum produto encontrado neste pedido
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-medium">
              <span>
                Total ({data?.items?.length || 0}{" "}
                {data?.items?.length === 1 ? "produto" : "produtos"})
              </span>
              <span>{formatMoney(order.totalWithDiscount)}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
