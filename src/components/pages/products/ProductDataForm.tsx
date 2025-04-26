import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatMoney, parseMoney } from "@/lib/utils";
import { ProductImagesForm } from "./ProductImagesForm";
import React, { useState } from "react";

const productSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  description: z.string().min(2, "Descrição obrigatória"),
  sku: z.string().min(1, "SKU obrigatório"),
  amount: z.number().min(0, "Estoque não pode ser menor que zero"),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  themeId: z.string().min(1, "Tema obrigatório"),
  isActive: z.boolean(),
  weight: z.number().min(0, "Peso não pode ser menor que zero"),
  width: z.number().min(0, "Largura não pode ser menor que zero"),
  height: z.number().min(0, "Altura não pode ser menor que zero"),
  depth: z.number().min(0, "Profundidade não pode ser menor que zero"),
  price: z.number().min(0.1, "Preço não pode ser menor que zero"),
  discount: z.number().min(0),
  images: z.any(), // managed outside zod, not required for validation
});

export type ProductDataFormValues = z.infer<typeof productSchema>;

interface ProductDataFormProps {
  onSubmit: (data: ProductDataFormValues) => void;
  loading: boolean;
  categories: { id: string; name: string }[];
  themes: { id: string; name: string }[];
  categoriesLoading: boolean;
  themesLoading: boolean;
  images: File[];
  setImages: (files: File[]) => void;
}

export function ProductDataForm({
  onSubmit,
  loading,
  categories,
  themes,
  categoriesLoading,
  themesLoading,
  images,
  setImages,
}: ProductDataFormProps) {
  const form = useForm<ProductDataFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      amount: 0,
      categoryId: "",
      themeId: "",
      isActive: true,
      weight: 0,
      width: 0,
      height: 0,
      depth: 0,
      price: 0,
      discount: 0,
      images: [],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit({ ...data, images });
        })}
        className="space-y-4"
      >
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
                    disabled={categoriesLoading}
                    defaultValue=""
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selectione a categoria" />
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
                    disabled={themesLoading}
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
          {/* Image upload section, full width */}
          <div className="col-span-2">
            <ProductImagesForm images={images} setImages={setImages} />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}
