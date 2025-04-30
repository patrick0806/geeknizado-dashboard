"use client";

import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Product } from "@/types/product";
import { ProductGeneralDataForm } from "./productGeneralDataForm";
import { ProductFormContext } from "@/contexts/productFormContext";
import { ProductSizesForm } from "./productSizesForm";
import { Category } from "@/types/category";
import { Theme } from "@/types/theme";
import { PriceAndStockForm } from "./priceAndStockForm";

type ProductFormProps = {
  product?: Product;
  categories: Category[];
  themes: Theme[];
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
  isPending: boolean;
};

export function ProductForm({
  product,
  onSubmit,
  onCancel,
  isPending,
  categories = [],
  themes = [],
}: ProductFormProps) {
  return (
    <Tabs defaultValue="info">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="info">Geral</TabsTrigger>
        <TabsTrigger value="price">Preço & Estoque</TabsTrigger>
        <TabsTrigger value="media">Medidas</TabsTrigger>
      </TabsList>
      <ProductFormContext
        product={product}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isPending={isPending}
      >
        <TabsContent value="info">
          <ProductGeneralDataForm categories={categories} themes={themes} />
        </TabsContent>
        <TabsContent value="price">
          <PriceAndStockForm />
        </TabsContent>
        <TabsContent value="media">
          <ProductSizesForm />
        </TabsContent>
      </ProductFormContext>
    </Tabs>
  );
}
