import { Header } from "@/components/layout/header";
import { ListCategories } from "@/components/pages/categoires/listCategories";

export default function CateogiresListPage(){
    return (
        <div className="space-y-8">
            <Header title="Categorias" />
            <ListCategories />
        </div>
    )
}