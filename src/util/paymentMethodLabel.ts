import { PaymentMethod } from "@/types/paymentMethod";

export const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return "Cartão de crédito";
      case PaymentMethod.DEBIT_CARD:
        return "Cartão de débito";
      case PaymentMethod.BOLETO:
        return "Boleto";
      case PaymentMethod.PIX:
        return "PIX";
      default:
        return method;
    }
  };