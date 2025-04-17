'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/useToast';
import { login } from '@/services/auth';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Spinner } from '../spinner';

const formSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string().min(6, { message: 'Insira uma senha válida' }),
});

type LoginFormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: LoginFormSchema) => {
    try {
      setIsLoading(true);
      await login(email, password);
      router.push('/');
    } catch (error) {
      toast({
        title: 'Falha ao fazer login',
        description: 'Verifique suas credenciais',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Digite seu e-mail"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full hover:bg-primary-purple hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-white">
              <Spinner /> <p>Verificando seu acesso</p>
            </div>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <Button 
        type="button" 
        variant="link" 
        className="w-full mt-5 text-white hover:text-primary"
        onClick={() => router.push('/esqueci-minha-senha')}
        >
         Esqueci minha senha
      </Button>
    </Form>
  );
}
