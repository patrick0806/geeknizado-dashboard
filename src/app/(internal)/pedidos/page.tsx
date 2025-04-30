import { Header } from "@/components/layout/header";
import { OrderList } from "@/components/orders/orderList";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Header title="Produtos" />
      <OrderList />
    </div>
  );
}
