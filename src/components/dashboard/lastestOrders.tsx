"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ShoppingCart, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Order } from "@/types/order";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusLabel,
} from "@/util/orderStatusLabel";
import { getPaymentMethodLabel } from "@/util/paymentMethodLabel";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { OrderDetails } from "../orders/orderDetails";

interface LatestOrdersProps {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
}

export function LatestOrders({ orders, isLoading, error }: LatestOrdersProps) {
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Últimos pedidos realizados na loja</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Não foi possível carregar os pedidos recentes. {error.message}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>
              Últimos pedidos realizados na loja
            </CardDescription>
          </div>
          <Link href="/pedidos">
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum pedido recente</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Não há pedidos recentes para exibir.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const statusInfo = getOrderStatusLabel(order.status);

              return (
                <div key={order.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pedido #{order.code}</span>
                      <Badge
                        variant={
                          getOrderStatusBadgeVariant(order.status) as any
                        }
                      >
                        {statusInfo}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(order.createdAt, "dd/MM/yyyy")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">{order.customer.name}</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.totalWithDiscount)}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {order.items?.length}{" "}
                      {order.items?.length === 1 ? "item" : "itens"}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{order.shippingMethod}</span>
                  </div>

                  <div className="pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          Ver detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido</DialogTitle>
                        </DialogHeader>
                        {<OrderDetails order={order} />}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
