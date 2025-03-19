'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { updateCustomer } from '@/services/customers/updateCustomer';
import { Customer } from '@/types/customer';
import { useToast } from '@/hooks/useToast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { findCustomerById } from '@/services/customers/findCustomerById';

const updateCustomerSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Nome é obrigatório e deve ter no mínimo 2 caracteres.',
        })
        .max(100, { message: 'Nome deve ter no máximo 100 caracteres.' }),
    email: z
        .string()
        .min(2, {
            message: 'Email é obrigatório e deve ter no mínimo 2 caracteres.',
        })
        .max(100, { message: 'Email deve ter no máximo 100 caracteres.' }),
    phone: z
        .string()
        .min(2, {
            message: 'Telefone é obrigatório e deve ter no mínimo 2 caracteres.',
        })
        .max(25, { message: 'Telefone deve ter no máximo 25 caracteres.' }),
    isActive: z.boolean(),
});

type UpdateCustomerData = z.infer<typeof updateCustomerSchema>;

export default function EditCustomerPage() {
    const router = useRouter();
    const toast = useToast();
    const path = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const form = useForm<UpdateCustomerData>({
        resolver: zodResolver(updateCustomerSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            isActive: true,
        },
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await findCustomerById(path.split('/').pop()!);
                setCustomer(data);
                form.reset({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    isActive: data.isActive,
                });
            } catch (error) {
                toast({
                    title: 'Erro',
                    description: 'Ocorreu um erro ao carregar os dados do cliente.',
                    variant: 'error',
                });
            }
        };

        fetchCustomer();
    }, [form, toast]);

    const handleSubmit = async (data: UpdateCustomerData) => {
        setIsLoading(true);
        try {
            await updateCustomer(path.split('/').pop()!, data);
            toast({
                title: 'Cliente atualizado',
                description: 'O cliente foi atualizado com sucesso.',
                variant: 'success',
            });
            router.push('/clientes');
        } catch (error) {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao atualizar o cliente.',
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!customer) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="">
            <Header title="Editar Cliente" />
            <div className="rounded-lg shadow p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border py-2 px-4">
                                    <FormLabel className="text-base">Cliente ativo</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Atualizando...' : 'Atualizar Cliente'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/clientes')}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
