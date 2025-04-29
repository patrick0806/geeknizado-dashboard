"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Category } from "@/types/category";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { CategoryForm } from "./categoryForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEditCategory } from "@/hooks/mutations/useEditCategory";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export function EditCategory({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useEditCategory();

  const handleSubmit = (
    editedData: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => {
    mutate(
      {
        slug: editedData.slug,
        name: editedData.name,
        isActive: editedData.isActive,
      },
      {
        onError: (error) => {
          toast.error("Falha ao criar categoria", {
            description: error.message,
          });
        },
        onSuccess: () => {
          setOpen(false);
          toast.success(`Categoria: ${category.name} editado com sucesso`, {
            style: { borderBlockColor: "#000" },
          });
        },
      }
    );
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Editar Categoria</DrawerTitle>
              <DrawerDescription>
                Atualize os dados da categoria nos campos abaixo
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <CategoryForm
                category={category}
                onSubmit={handleSubmit}
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
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>
                Atualize os dados da categoria nos campos abaixo
              </DialogDescription>
            </DialogHeader>
            <CategoryForm
              category={category}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
