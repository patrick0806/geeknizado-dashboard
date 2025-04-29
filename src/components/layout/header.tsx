import { SidebarTrigger } from "../ui/sidebar";

export function Header({ title = "unknow" }: { title: string }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b">
      <SidebarTrigger />
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
}
