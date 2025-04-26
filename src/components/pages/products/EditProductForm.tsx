"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductImagesForm } from "./ProductImagesForm";
import { updateProduct, uploadProductImages } from "@/services/product";
import { formatMoney, parseMoney } from "@/lib/utils";
import { Product } from "@/types/product";

const productSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  description: z.string().min(2, "Descrição obrigatória"),
  sku: z.string().min(1, "SKU obrigatório"),
  amount: z.number().min(0, "Estoque não pode ser menor que zero"),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  themeId: z.string().min(1, "Tema obrigatória"),
  isActive: z.boolean(),
  weight: z.number().min(0, "Peso não pode ser menor que zero"),
  width: z.number().min(0, "Largura não pode ser menor que zero"),
  height: z.number().min(0, "Altura não pode ser menor que zero"),
  depth: z.number().min(0, "Profundidade não pode ser menor que zero"),
  price: z.number().min(0.1, "Preço não pode ser menor que zero"),
  discount: z.number().min(0),
});

export function EditProductForm({
  product,
  refetch,
  categories,
  themes,
}: {
  product: Product;
  refetch: Function;
  categories: { id: string; name: string }[];
  themes: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(product.images || []);
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      sku: product.sku,
      amount: product.amount,
      categoryId: product.category?.id || "",
      themeId: product.theme?.id || "",
      isActive: product.isActive,
      weight: product.weight,
      width: product.width,
      height: product.height,
      depth: product.depth,
      price: product.price,
      discount: product.discount,
    },
  });

  useEffect(() => {
    if (open) {
      setExistingImages(product.images || []);
      form.reset({
        name: product.name,
        description: product.description,
        sku: product.sku,
        amount: product.amount,
        categoryId: product.category?.id || "",
        themeId: product.theme?.id || "",
        isActive: product.isActive,
        weight: product.weight,
        width: product.width,
        height: product.height,
        depth: product.depth,
        price: product.price,
        discount: product.discount,
      });
    }
  }, [open, product]);

  const handleRemoveImage = (imageId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    // TODO: Optionally, call an API to remove the image from backend
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await updateProduct(product.id, {
        ...data,
        categoryId: data.categoryId,
        themeId: data.themeId,
      });
      if (images.length > 0) {
        const positions: Record<string, number> = {};
        images.forEach((file, idx) => {
          positions[file.name] = idx + 1;
        });
        await uploadProductImages(product.id, images, positions);
      }
      setOpen(false);
      setImages([]);
      refetch();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Editar produto">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edição de produto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Controller
                        name="price"
                        control={form.control}
                        render={({ field }) => {
                          const [inputValue, setInputValue] = useState(
                            formatMoney(field.value || 0)
                          );
                          return (
                            <Input
                              value={inputValue}
                              onChange={(e) => {
                                const raw = e.target.value;
                                const parsed = parseMoney(raw);
                                setInputValue(formatMoney(parsed));
                                field.onChange(parsed);
                              }}
                            />
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desconto</FormLabel>
                    <FormControl>
                      <Controller
                        name="discount"
                        control={form.control}
                        render={({ field }) => {
                          const [inputValue, setInputValue] = useState(
                            formatMoney(field.value || 0)
                          );
                          return (
                            <Input
                              value={inputValue}
                              onChange={(e) => {
                                const raw = e.target.value;
                                const parsed = parseMoney(raw);
                                setInputValue(formatMoney(parsed));
                                field.onChange(parsed);
                              }}
                            />
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (g)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Largura (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profundidade (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue=""
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="themeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tema</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue=""
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione o tema" />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme.id} value={theme.id}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 col-span-2">
                    <FormLabel>Ativo</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Existing images */}
            <div>
              <div className="font-semibold mb-2">Imagens atuais</div>
              <div className="flex gap-2 flex-wrap">
                {existingImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      alt="product"
                      className="w-24 h-24 object-cover rounded shadow"
                    />
                    {/* Remove button (optional) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {existingImages.length === 0 && (
                  <span className="text-gray-500">Nenhuma imagem</span>
                )}
              </div>
            </div>
            {/* Upload more images */}
            <div>
              <div className="font-semibold mb-2 mt-4">
                Adicionar novas imagens
              </div>
              <ProductImagesForm images={images} setImages={setImages} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
