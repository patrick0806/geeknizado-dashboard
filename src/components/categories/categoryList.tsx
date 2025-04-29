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
import { useCreateCategory } from "@/hooks/mutations/useCreateCategory";
import { useCategories } from "@/hooks/queries/useCategories";
import { CategoryCards } from "./categoryCards";
import { DataTable } from "../ui/dataTable";
import { CategoryForm } from "./categoryForm";
import { Category } from "@/types/category";
import { toast } from "sonner";
import { CategoryColumns } from "./categoryCollumns";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState<string>();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useCreateCategory();
  const { data, isLoading, isError } = useCategories({
    page: currentPage,
    size: isMobile ? 5 : 10,
    isActive: isActive === undefined ? undefined : isActive === "true",
  });

  const handleSelect = (value: string) => {
    if (value === "all") {
      setIsActive(undefined);
    } else {
      console.log(value, isActive, isActive === "true");
      setIsActive(value);
    }
  };

  const handleCreateCategory = (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => {
    mutate(
      { name: category.name, isActive: category.isActive },
      {
        onError: (error) => {
          toast.error("Falha ao criar categoria", {
            description: error.message,
          });
        },
        onSuccess: () => {
          setOpen(false);
          toast.success(`Categoria: ${category.name} criada com sucesso`);
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
          Nova Categoria
        </Button>
      </div>

      {!isError && isMobile && (
        <CategoryCards
          categories={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {!isError && !isMobile && (
        <DataTable
          columns={CategoryColumns}
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
              <DrawerTitle>Nova Categoria</DrawerTitle>
              <DrawerDescription>
                Preencha os campos abaixo para criar uma nova categoria.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <CategoryForm
                onSubmit={handleCreateCategory}
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
              <DialogTitle>Nova Categoria</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar uma nova categoria.
              </DialogDescription>
            </DialogHeader>
            <CategoryForm
              onSubmit={handleCreateCategory}
              onCancel={() => setOpen(false)}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
