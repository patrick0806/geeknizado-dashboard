import { OrderStatus } from "@/types/orderStatus";

export const getOrderStatusLabel = (status: OrderStatus) => {
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

export const getOrderStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING_PAYMENT:
      case OrderStatus.PROCESSING_PAYMENT:
        return "warning";
      case OrderStatus.PAYMENT_CONFIRMED:
      case "CONFIRMED":
      case OrderStatus.PENDING_SHIPPING:
        return "secondary";
      case OrderStatus.SHIPPED:
        return "default";
      case OrderStatus.DELIVERED:
        return "success";
      case OrderStatus.PAYMENT_DECLINED:
      case OrderStatus.PAYMENT_CANCELLED:
      case OrderStatus.CANCELED:
      case OrderStatus.REFOUNDED:
        return "destructive";
      default:
        return "outline";
    }
  };