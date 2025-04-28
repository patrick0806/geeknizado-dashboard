"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@/services/auth";
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

const ForgotPasswordSchema = z.object({
  email: z.string().email("Insira um endereço de email válido"),
});

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: ForgotPassword) => {
    setIsLoading(true);
    try {
      await forgotPassword(email);
      router.push("/");
    } catch (error) {
      let errorMessage = "Verifique suas credenciais";
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

        <Button
          type="submit"
          className="w-full hover:bg-primary/80 hover:text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-white">
              <Spinner className="text-white" /> <p>Enviando...</p>
            </div>
          ) : (
            "Enviar email de reset de senha"
          )}
        </Button>
      </form>

      <Button
        type="button"
        variant="link"
        className="w-full mt-5 text-white hover:text-primary cursor-pointer"
        onClick={() => router.push("/login")}
      >
        Lembrei minha senha
      </Button>
    </Form>
  );
}
