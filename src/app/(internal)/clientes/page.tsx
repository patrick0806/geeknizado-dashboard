import { Header } from "@/components/layout/header";
import { CustomerList } from "@/components/customers/customerList";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Header title="Clientes" />
      <CustomerList />
    </div>
  );
}
