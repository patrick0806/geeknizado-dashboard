"use client"

import { useToast } from "@/hooks/useToast";
import { createCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '../ui/form';
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { Switch } from "../ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Plus } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(3, { message: 'Insira um nome válido' }),
    isActive: z.boolean()
});

type CreateCategoryFormSchema = z.infer<typeof formSchema>;

export function CreateCategoryForm({refetch}: {refetch: Function}) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
      const toast = useToast();
      const form = useForm<CreateCategoryFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: '',
          isActive: true,
        },
      });

    const onSubmit = async ({ name, isActive }: CreateCategoryFormSchema) => {
      try {
        setIsLoading(true);
        await createCategory(name, isActive);
        toast({
          title: 'Categoria criada com sucesso',
          variant: 'success',
        });
        form.reset();
        setOpen(false);
        refetch();
      } catch (error) {
        toast({
          title: 'Falha ao criar categoria',
          description: 'Verifique os dados inseridos',
          variant: 'error',
        });
      }
      finally {
        setIsLoading(false);
      }
    } 

    return(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger >
          <Button aria-haspopup="dialog">
          <Plus/> Nova categoria
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criação de categoria</DialogTitle>
          </DialogHeader>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o nome da categoria" />
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
                        <Switch  checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full hover:bg-primary-purple hover:text-white" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-white">
                      <Spinner /> <p>Salvando categoria</p>
                    </div>
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
    )
};