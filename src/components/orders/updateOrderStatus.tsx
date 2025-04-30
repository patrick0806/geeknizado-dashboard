"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Order } from "@/types/order";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { useUpdateOrderStatus } from "@/hooks/mutations/useUpdateOrder";
import { OrderStatus } from "@/types/orderStatus";

interface UpdateOrderStatusProps {
  order: Order;
}

export function UpdateOrderStatus({ order }: UpdateOrderStatusProps) {
  const { mutate, isPending } = useUpdateOrderStatus();

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    if (newStatus === order.status) return;

    mutate(
      { orderCode: order.code, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Status atualizado para ${getStatusLabel(newStatus)}`);
        },
        onError: (error) => {
          toast.error("Erro ao atualizar status", {
            description:
              error instanceof Error
                ? error.message
                : "Tente novamente mais tarde",
          });
        },
      }
    );
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING_PAYMENT:
        return "Aguardando pagamento";
      case OrderStatus.PROCESSING_PAYMENT:
        return "Processando pagamento";
      case OrderStatus.PAYMENT_CONFIRMED:
        return "Pagamento confirmado";
      case OrderStatus.PAYMENT_DECLINED:
        return "Pagamento recusado";
      case OrderStatus.PAYMENT_CANCELLED:
        return "Pagamento cancelado";
      case OrderStatus.PENDING_SHIPPING:
        return "Aguardando envio";
      case OrderStatus.CONFIRMED:
        return "Confirmado";
      case OrderStatus.SHIPPED:
        return "Enviado";
      case OrderStatus.DELIVERED:
        return "Entregue";
      case OrderStatus.CANCELED:
        return "Cancelado";
      case OrderStatus.REFOUNDED:
        return "Reembolsado";
      default:
        return status;
    }
  };

  const availableStatuses = [
    { value: OrderStatus.PENDING_PAYMENT, label: "Aguardando pagamento" },
    { value: OrderStatus.PROCESSING_PAYMENT, label: "Processando pagamento" },
    { value: OrderStatus.PAYMENT_CONFIRMED, label: "Pagamento confirmado" },
    { value: OrderStatus.PAYMENT_DECLINED, label: "Pagamento recusado" },
    { value: OrderStatus.PAYMENT_CANCELLED, label: "Pagamento cancelado" },
    { value: OrderStatus.PENDING_SHIPPING, label: "Aguardando envio" },
    { value: OrderStatus.CONFIRMED, label: "Confirmado" },
    { value: OrderStatus.SHIPPED, label: "Enviado" },
    { value: OrderStatus.DELIVERED, label: "Entregue" },
    { value: OrderStatus.CANCELED, label: "Cancelado" },
    { value: OrderStatus.REFOUNDED, label: "Reembolsado" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending}>
          Atualizar Status
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableStatuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleUpdateStatus(status.value)}
            disabled={status.value === order.status}
            className={status.value === order.status ? "font-medium" : ""}
          >
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
