"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import type { Order } from "@/types/order";
import { formatMoney } from "@/lib/utils";
import { getPaymentMethodLabel } from "@/util/paymentMethodLabel";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusLabel,
} from "@/util/orderStatusLabel";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { OrderDetails } from "./orderDetails";
import { useState } from "react";

interface OrderCardsProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function OrderCards({
  orders,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: OrderCardsProps) {
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index.toString()}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Pedido #{order.code}</CardTitle>
                <Badge
                  variant={getOrderStatusBadgeVariant(order.status) as any}
                >
                  {getOrderStatusLabel(order.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm space-y-2">
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-muted-foreground">
                  Data: {format(new Date(order.createdAt), "dd/MM/yyyy")}
                </p>
                <p className="font-semibold">
                  Total: {formatMoney(order.totalWithDiscount)}
                </p>
                <p className="text-muted-foreground">
                  Método de pagamento:{" "}
                  {getPaymentMethodLabel(order.paymentMethod)}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Detalhes do Pedido</DrawerTitle>
                    <DrawerDescription>
                      Informações completas do pedido selecionado.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">{<OrderDetails order={order} />}</div>
                </DrawerContent>
              </Drawer>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
