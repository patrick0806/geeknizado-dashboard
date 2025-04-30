"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useCreateTheme } from "@/hooks/mutations/useCreateTheme";
import { ThemeCards } from "./themeCards";
import { DataTable } from "../ui/dataTable";
import { ThemeForm } from "./themeForm";
import { Theme } from "@/types/theme";
import { toast } from "sonner";
import { ThemeColumns } from "./themesCollumns";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useThemes } from "@/hooks/queries/useThemes";
import { ErrorState } from "../states/errorState";

export function ThemeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState<string>();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useCreateTheme();
  const { data, isLoading, isError } = useThemes({
    page: currentPage,
    size: isMobile ? 5 : 10,
    isActive: isActive === undefined ? undefined : isActive === "true",
  });

  const handleSelect = (value: string) => {
    if (value === "all") {
      setIsActive(undefined);
    } else {
      setIsActive(value);
    }
  };

  const handleCreateTheme = (
    theme: Omit<Theme, "slug" | "id" | "createdAt" | "updatedAt">
  ) => {
    mutate(
      { name: theme.name, isActive: theme.isActive },
      {
        onError: (error) => {
          toast.error("Falha ao criar tema", {
            description: error.message,
          });
        },
        onSuccess: () => {
          setOpen(false);
          toast.success(`Tema: ${theme.name} criado com sucesso`);
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="w-full sm:w-64">
          <Label>Status</Label>
          <Select defaultValue={"all"} onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> Todos</SelectItem>
              <SelectItem value="true"> Ativo</SelectItem>
              <SelectItem value="false"> Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo tema
        </Button>
      </div>

      {isError && (
        <ErrorState
          title="Falha ao carregar cupons"
          message="Tente atualizar a página em instantes"
        />
      )}

      {!isError && isMobile && (
        <ThemeCards
          themes={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {!isError && !isMobile && (
        <DataTable
          columns={ThemeColumns}
          data={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Novo Tema</DrawerTitle>
              <DrawerDescription>
                Preencha os campos abaixo para criar um novo tema.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <ThemeForm
                onSubmit={handleCreateTheme}
                onCancel={() => setOpen(false)}
                isPending={isPending}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Tema</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar um novo tema.
              </DialogDescription>
            </DialogHeader>
            <ThemeForm
              onSubmit={handleCreateTheme}
              onCancel={() => setOpen(false)}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
