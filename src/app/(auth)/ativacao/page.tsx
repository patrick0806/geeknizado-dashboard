import { ActivationForm } from "@/components/auth/activationForm";

export default function ActivationPage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Defina sua senha</h2>
      <p className="text-xl font-light text-white/60">
        Sua senha deve ter mais de 9 caracteres
      </p>

      <div className="w-full md:p-0 p-4">
        <ActivationForm />
      </div>
    </div>
  );
}
