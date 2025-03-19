'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { createCustomer } from '@/services/customers/createCustomer';
import { useToast } from '@/hooks/useToast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const createCustomerSchema = z.object({
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
  password: z
    .string()
    .min(2, {
      message: 'Senha é obrigatório e deve ter no mínimo 2 caracteres.',
    })
    .max(100, { message: 'Senha deve ter no máximo 100 caracteres.' }),
  phone: z
    .string()
    .min(2, {
      message: 'Telefone é obrigatório e deve ter no mínimo 2 caracteres.',
    })
    .max(25, { message: 'Telefone deve ter no máximo 25 caracteres.' }),
  isActive: z.boolean(),
});

type CreateCustomerData = z.infer<typeof createCustomerSchema>;

export default function NewCustomerPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateCustomerData>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      isActive: true,
    },
  });

  const handleSubmit = async (data: CreateCustomerData) => {
    setIsLoading(true);
    try {
      await createCustomer(data);
      toast({
        title: 'Cleiten criado',
        description: 'O Cleiten foi criado com sucesso.',
        variant: 'success',
      });

      router.push('/clientes');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar o cliente.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Header title="Novo Cliente" />
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
              name="password"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Cliente'}
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
