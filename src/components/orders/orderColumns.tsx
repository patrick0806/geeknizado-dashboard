"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import type { Order } from "@/types/order";
import { formatMoney } from "@/lib/utils";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { OrderStatus } from "@/types/orderStatus";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusLabel,
} from "@/util/orderStatusLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { OrderDetails } from "./orderDetails";
import { getPaymentMethodLabel } from "@/util/paymentMethodLabel";
import { PaymentMethod } from "@/types/paymentMethod";

export const OrderColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => (
      <div className="font-medium">#{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Cliente",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return <div>{customer.name}</div>;
    },
  },
  {
    accessorKey: "totalWithDiscount",
    header: "Total",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("totalWithDiscount"));
      return <div className="font-medium">{formatMoney(amount)}</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Pagamento",
    cell: ({ row }) => {
      const paymentMethod = row.getValue("paymentMethod") as PaymentMethod;
      return <div>{getPaymentMethodLabel(paymentMethod)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;

      return (
        <Badge variant={getOrderStatusBadgeVariant(status) as any}>
          {getOrderStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return <div>{format(new Date(date), "dd/MM/yyyy")}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Detalhes do Pedido</DialogTitle>
              </DialogHeader>
              {<OrderDetails order={row.original} />}
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
