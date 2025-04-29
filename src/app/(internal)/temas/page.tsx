import { ThemeList } from "@/components/themes/themeList";
import { Header } from "@/components/layout/header";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Header title="Temas" />
      <ThemeList />
    </div>
  );
}
