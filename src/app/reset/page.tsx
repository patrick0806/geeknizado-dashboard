'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { resetPassword } from '@/services/auth/resetPassword';

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(6, {
            message: 'A senha deve ter no mínimo 6 caracteres.',
        })
        .max(50, { message: 'A senha deve ter no máximo 50 caracteres.' }),
    confirmPassword: z
        .string()
        .min(6, {
            message: 'A senha deve ter no mínimo 6 caracteres.',
        })
        .max(50, { message: 'A senha deve ter no máximo 50 caracteres.' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const handleSubmit = async (data: ResetPasswordData) => {
        setIsLoading(true);
        try {
            const token = searchParams.get('token');
            if (!token) {
                toast({
                    title: 'Erro',
                    description: 'Token de recuperação não encontrado.',
                    variant: 'error',
                });
                return;
            }

            await resetPassword(token, data.password);
            toast({
                title: 'Senha alterada',
                description: 'Sua senha foi alterada com sucesso.',
                variant: 'success',
            });
            router.push('/login');
        } catch (error) {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao alterar a senha.',
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Redefinir Senha</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Digite sua nova senha abaixo.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nova Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Digite sua nova senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Nova Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirme sua nova senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Alterando...' : 'Alterar Senha'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
