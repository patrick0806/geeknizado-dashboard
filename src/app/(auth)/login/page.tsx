import { LoginForm } from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <p className="text-xl font-light text-white/60">
        Coloque suas credenciais abaixo
      </p>

      <div className="w-full md:p-0 p-4">
        <LoginForm />
      </div>
    </div>
  );
}
