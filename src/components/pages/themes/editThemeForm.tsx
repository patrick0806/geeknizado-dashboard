"use client"

import { useToast } from "@/hooks/useToast";
import { updateTheme } from "@/services/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Theme } from "@/types/theme";

const formSchema = z.object({
    name: z.string().min(3, { message: 'Insira um nome válido' }),
    isActive: z.boolean()
});

type EditThemeFormSchema = z.infer<typeof formSchema>;

export function EditThemeForm({theme, refetch}: {theme: Theme, refetch: Function}) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
      const toast = useToast();
      const form = useForm<EditThemeFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: theme.name,
          isActive: theme.isActive,
        },
      });

    useEffect(() => {
        form.reset({
          name: theme.name,
          isActive: theme.isActive,
        });
      }, [open]);

    const onSubmit = async ({ name, isActive }: EditThemeFormSchema) => {
      try {
        setIsLoading(true);
        await updateTheme(theme.slug ,name, isActive);
        toast({
          title: 'Tema editado com sucesso',
          variant: 'success',
        });
        form.reset();
        setOpen(false);
        refetch();
      } catch (error) {
        toast({
          title: 'Falha ao editar tema',
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
            <Pencil className="h-4 w-4"/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edição de tema</DialogTitle>
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
                        <Input {...field} placeholder="Digite o nome da tema" />
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
                      <Spinner /> <p>Salvando tema</p>
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