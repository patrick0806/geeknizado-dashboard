'use client'

import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { createCategory } from "@/services/categories/createCategory";

const categorySchema = z.object({
    name: z.string(),
    isActive: z.boolean()
})

type CreateCategoryData = z.infer<typeof categorySchema>;

export function CreateCategoryForm() {
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<CreateCategoryData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            isActive: true,
        },
    });

    const handleSubmit = async (data: CreateCategoryData) => {
        setLoading(true);
        try {

            await createCategory(data);
            toast({
                title: 'Categoria criado',
                description: 'A categoria foi criado com sucesso.',
                variant: 'success'
            });

            router.push('/categorias');
        } catch (error: any) {
            toast({
                title: 'Ocorreu um erro ao criar o Categoria.',
                description: error.message,
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='md:col-span-2'>
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
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border py-2 px-4">
                            <FormLabel className="text-base">Categoria ativa</FormLabel>
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
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Criando...' : 'Criar Categoria'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/categorias')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    )
}