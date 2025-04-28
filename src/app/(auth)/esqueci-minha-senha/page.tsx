import { ForgotPasswordForm } from "@/components/auth/forgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Esqueci minha senha</h2>
      <p className="text-xl font-light text-white/60">
        Insira seu email abaixo
      </p>

      <div className="w-full md:p-0 p-4">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
