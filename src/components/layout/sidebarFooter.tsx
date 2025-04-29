"use client";

import { ChevronUp, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export function SidebarFooter() {
  const route = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    route.replace("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{user?.name}</span>
            {/*  <span className="text-xs text-muted-foreground">{email}</span> */}
          </div>
          <ChevronUp className="ml-auto h-4 w-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
