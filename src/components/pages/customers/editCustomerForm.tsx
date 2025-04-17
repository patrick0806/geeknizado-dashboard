"use client"

import { useToast } from "@/hooks/useToast";
import { updateCustomer } from "@/services/customer";
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
import { Customer } from "@/types/customer";

const formSchema = z.object({
    name: z.string().min(3, { message: 'Insira um nome válido' }),
    email: z.string().email({ message: 'Insira um e-mail válido' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }).optional(),
    isActive: z.boolean()
});

type EditCustomerFormSchema = z.infer<typeof formSchema>;

export function EditCustomerForm({ customer, refetch }: { customer: Customer, refetch: Function }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const form = useForm<EditCustomerFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: customer.name,
            email: customer.email,
            password: '',
            isActive: customer.isActive
        },
    });

    useEffect(() => {
        form.reset({
            name: customer.name,
            email: customer.email,
            password: '',
            isActive: customer.isActive
        });
    }, [open]);

    const onSubmit = async (values: EditCustomerFormSchema) => {
        try {
            setIsLoading(true);
            await updateCustomer(customer.id, values);
            toast({ title: 'Cliente editado com sucesso', variant: 'success' });
            form.reset();
            setOpen(false);
            refetch();
        } catch (error) {
            toast({ title: 'Falha ao editar cliente', description: 'Verifique os dados inseridos', variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger aria-haspopup="dialog">
                <Pencil className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edição de cliente</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Digite o nome do cliente" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} placeholder="Digite o e-mail do cliente" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} placeholder="Digite a nova senha (opcional)" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isActive" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ativo</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" className="w-full hover:bg-primary-purple hover:text-white" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-white">
                                    <Spinner /> <p>Salvando cliente</p>
                                </div>
                            ) : (
                                'Salvar'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
