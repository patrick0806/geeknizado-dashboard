"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { parseMoneyToNumber } from "@/lib/utils";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ProductImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  position: z.number().int().nonnegative(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const relationalSchema = z.object({
  id: z.string().uuid("É obrigatório selecionar uma das opções"),
});

export const ProductSchema = z
  .object({
    sku: z.string().min(1, "O Sku é obirgatório"),
    name: z
      .string()
      .min(3, "O nome do produto precisa ter pelo menos 3 caracteres"),
    description: z
      .string()
      .min(20, "A descrição do produto precisa ter pelo menos 20 caracteres"),
    price: z.preprocess((value) => {
      if (typeof value === "string") {
        return parseMoneyToNumber(value);
      }
      return value;
    }, z.number().gt(0, "O preço precisa ser maior que 0")),
    discount: z.preprocess((value) => {
      if (typeof value === "string") {
        return parseMoneyToNumber(value);
      }
      return value;
    }, z.number().nonnegative("O valor de desconto não pode ser negativo")),
    amount: z.coerce
      .number()
      .int()
      .nonnegative("A quantidade em estoque não pode ser negativa"),
    weight: z.coerce.number().nonnegative(),
    width: z.coerce.number().nonnegative(),
    height: z.coerce.number().nonnegative(),
    depth: z.coerce.number().nonnegative(),
    category: relationalSchema,
    theme: relationalSchema,
    isActive: z.boolean(),
  })
  .refine(({ price, discount }) => price >= discount, {
    message: "O valor do desconto não pode ser maior que o preço do produto",
    path: ["discount"],
  })
  .refine(
    ({ isActive, width, weight, height, depth }) => {
      if (isActive) {
        const allValuesGreaterThanZero = width && weight && height && depth;
        if (allValuesGreaterThanZero) {
          return true;
        }

        toast.error(
          "O produto só pode ser criado como ativo se já tiver todas as medidas"
        );
        return false;
      }

      return true;
    },
    {
      message:
        "O produto só pode ser criado como ativo se já tiver todas as medidas",
      path: ["isActive"],
    }
  );

type FormType = z.infer<typeof ProductSchema>;

export function ProductFormContext({
  children,
  product,
  onSubmit,
  onCancel,
  isPending = false,
}: {
  children: ReactNode;
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const form = useForm<FormType>({
    resolver: zodResolver(ProductSchema as any),
    defaultValues: {
      sku: product?.sku || "",
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      discount: product?.discount || 0,
      amount: product?.amount || 0,
      weight: product?.weight || 0,
      width: product?.width || 0,
      height: product?.height || 0,
      depth: product?.depth || 0,
      category: product?.category || { id: "" },
      theme: product?.theme || { id: "" },
      isActive: product?.isActive ?? true,
    },
  });

  const handleSubmit = (data: FormType) => {
    onSubmit({ ...data } as Partial<Product>);
  };

  useEffect(() => {
    console.log(JSON.stringify(form.formState.errors, null, 2));
  }, [form.formState]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner className="text-white" />
                Salvando...
              </div>
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
