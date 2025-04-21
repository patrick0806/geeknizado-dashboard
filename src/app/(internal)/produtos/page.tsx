import { Header } from "@/components/layout/header";
import { ListProducts } from "@/components/pages/products/listProducts";

export default function ProductsListPage(){
    return (
        <div className="space-y-8">
            <Header title="Produtos" />
            <ListProducts />
        </div>
    )
}