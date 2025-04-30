"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { ProductForm } from "./productForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useUpdateProduct } from "@/hooks/mutations/useUpdateProduct";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Theme } from "@/types/theme";

export function EditProduct({
  product,
  categories,
  themes,
}: {
  product: Product;
  categories: Category[];
  themes: Theme[];
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useUpdateProduct();

  const handleSubmit = (data: Partial<Product>) => {
    mutate(
      { ...data, id: product.id },
      {
        onError: (error) => {
          toast.error("Falha ao criar categoria", {
            description: error.message,
          });
        },
        onSuccess: () => {
          setOpen(false);
          toast.success(`Produto: ${product.sku} editado com sucesso`, {
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
              <DrawerTitle>Editar Cupom</DrawerTitle>
              <DrawerDescription>
                Atualize os dados do cupom nos campos abaixo
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <ProductForm
                product={product}
                onSubmit={handleSubmit}
                onCancel={() => setOpen(false)}
                isPending={isPending}
                categories={categories}
                themes={themes}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Cupom</DialogTitle>
              <DialogDescription>
                Atualize os dados do cupom nos campos abaixo
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              product={product}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isPending={isPending}
              categories={categories}
              themes={themes}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
