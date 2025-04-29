"use client";

import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const categorySchema = z.object({
  slug: z.string().optional(),
  name: z
    .string()
    .min(3, "O nome da categoria precisa ter pelo menos 3 caracteres"),
  isActive: z.boolean(),
});

type CategoryFormData = z.infer<typeof categorySchema>;
type CategoryFormProps = {
  category?: Omit<Category, "id" | "createdAt" | "updatedAt">;
  onSubmit: (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => void;
  onCancel: () => void;
  isPending: boolean;
};

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isPending,
}: CategoryFormProps) {
  console.log("category->", category);
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      isActive: category?.isActive !== undefined ? category?.isActive : true,
      slug: category?.slug,
    },
  });

  const handleSubmit = (data: CategoryFormData) => {
    onSubmit({
      name: data.name,
      isActive: data.isActive,
      slug: data.slug || "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o nome da categoria"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ativo</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <p>
                <Spinner className="text-white" /> Salvando...
              </p>
            ) : (
              " Salvar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
