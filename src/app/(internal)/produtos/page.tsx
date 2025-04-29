import { Header } from "@/components/layout/header";
import { ProductList } from "@/components/products/productList";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Header title="Produtos" />
      <ProductList />
    </div>
  );
}
