import { Header } from "@/components/layout/header";
import { ListThemes } from "@/components/pages/themes/listThemes";

export default function ThemesListPage(){
    return (
        <div className="space-y-8">
            <Header title="Temas" />
            <ListThemes />
        </div>
    )
}