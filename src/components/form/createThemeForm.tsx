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
import { createTheme } from "@/services/themes/createTheme";

const themeSchema = z.object({
    name: z.string(),
    isActive: z.boolean()
})

type CreateThemeData = z.infer<typeof themeSchema>;

export function CreateThemeForm() {
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<CreateThemeData>({
        resolver: zodResolver(themeSchema),
        defaultValues: {
            name: '',
            isActive: true,
        },
    });

    const handleSubmit = async (data: CreateThemeData) => {
        setLoading(true);
        try {
            await createTheme(data);
            toast({
                title: 'Tema criado',
                description: 'O Tema foi criado com sucesso.',
                variant: 'success'
            });

            router.push('/temas');
        } catch (error: any) {
            toast({
                title: 'Ocorreu um erro ao criar o Tema.',
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
                            <FormLabel className="text-base">Tema ativo</FormLabel>
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
                        {loading ? 'Criando...' : 'Criar Tema'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/temas')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    )
}