"use client";

import { useCategories } from "@/hooks/queries/useCategories";
import { useProducts } from "@/hooks/queries/useProducts";
import { useThemes } from "@/hooks/queries/useThemes";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { PlusCircle, Search } from "lucide-react";
import { ProductCards } from "./productCards";
import { DataTable } from "../ui/dataTable";
import { productColumns } from "./productColumns";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductForm } from "./productForm";
import { useCreateProduct } from "@/hooks/mutations/useCreateProduct";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { ErrorState } from "../states/errorState";

export function ProductList() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState<string>();
  const [name, setName] = useState<string>();
  const debouncedName = useDebounce(name, 500);
  const [categoryId, setCategorySlug] = useState<string>();
  const [themeId, setThemeSlug] = useState<string>();
  const { mutate, isPending } = useCreateProduct();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    data: categoiresData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
  } = useCategories({ page: 1, size: 100, isActive: true });
  const {
    data: themesData,
    isLoading: isLoadingTheme,
    isError: isErrorTheme,
  } = useThemes({ page: 1, size: 100, isActive: true });

  const { data, isLoading, isError } = useProducts({
    page: currentPage,
    size: 10,
    isActive: isActive === undefined ? undefined : isActive === "true",
    name: debouncedName,
    categoryId: categoryId ? categoryId : "",
    themeId: themeId ? themeId : "",
  });

  const handleCreateProduct = (product: Partial<Product>) => {
    mutate(product, {
      onError: (error) => {
        toast.error("Falha ao criar producto", {
          description: error.message,
        });
      },
      onSuccess: () => {
        setOpen(false);
        toast.success(`Product: ${product.name} criado com sucesso`);
      },
    });
  };

  const handleSelect = (value: string) => {
    if (value === "all") {
      setIsActive(undefined);
    } else {
      setIsActive(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="w-full flex md:flex-row flex-col gap-5 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-8 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            {isLoadingTheme && <Skeleton className="h-8 w-48" />}
            {!isLoadingTheme && (
              <Select onValueChange={setThemeSlug} disabled={isErrorTheme}>
                <SelectTrigger className=" w-48">
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  {themesData?.content.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex flex-col">
            {isLoadingCategory && <Skeleton className="h-8 w-48" />}
            {!isLoadingCategory && (
              <Select
                onValueChange={setCategorySlug}
                disabled={isErrorCategory}
              >
                <SelectTrigger className=" w-48">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categoiresData?.content.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex flex-col">
            <Select defaultValue={"all"} onValueChange={handleSelect}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> Todos</SelectItem>
                <SelectItem value="true"> Ativo</SelectItem>
                <SelectItem value="false"> Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {isError && (
        <ErrorState
          title="Falha ao carregar produtos"
          message="Tente atualizar a página em instantes"
        />
      )}

      {!isError && isMobile && (
        <ProductCards
          products={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
          categories={categoiresData?.content || []}
          themes={themesData?.content || []}
        />
      )}

      {!isError && !isMobile && (
        <DataTable
          columns={productColumns({
            categories: categoiresData?.content || [],
            themes: themesData?.content || [],
          })}
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
              <DrawerTitle>Novo Produto</DrawerTitle>
              <DrawerDescription>
                Preencha os campos abaixo para criar um novo produto.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p>desenvolvendo</p>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar um novo produto.
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleCreateProduct}
              onCancel={() => setOpen(false)}
              isPending={isPending}
              categories={categoiresData?.content || []}
              themes={themesData?.content || []}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
