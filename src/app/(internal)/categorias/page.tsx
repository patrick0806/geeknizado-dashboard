import { CategoryList } from "@/components/categories/categoryList";
import { Header } from "@/components/layout/header";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Header title="Categorias" />
      <CategoryList />
    </div>
  );
}
