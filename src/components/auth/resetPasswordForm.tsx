"use client";

import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/services/auth";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(9, "A senha precisa ter pelo menos 9 caracteres"),
    confirmPassword: z
      .string()
      .min(9, "A senha precisa ter pelo menos 9 caracteres"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

type ResetPassword = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async ({ password }: ResetPassword) => {
    setIsLoading(true);
    try {
      await resetPassword(searchParams.get("token")!, password);
      router.push("/login");
    } catch (error) {
      let errorMessage = "Falha ao resetar a senha, tente novamente";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      }
      toast("Falha ao fazer o login", {
        description: errorMessage,
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Digite sua senha"
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
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Digite sua senha novamente"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full hover:bg-primary/80 hover:text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-white">
              <Spinner className="text-white" /> <p>Alterando...</p>
            </div>
          ) : (
            "Alterar senha"
          )}
        </Button>
      </form>

      <Button
        type="button"
        variant="link"
        className="w-full mt-5 text-white hover:text-primary cursor-pointer"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </Form>
  );
}
