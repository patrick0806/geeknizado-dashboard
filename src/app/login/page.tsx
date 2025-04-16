import Image from 'next/image';

import { LoginForm } from '@/components/form/loginForm';

export default function AdminLoginPage() {
  return (
    <main className="w-full grid md:grid-cols-2 md:grid-rows-1 grid-rows-2">
      <div className="bg-secondary flex items-center justify-center">
        <Image
          src="https://geeknizado.s3.us-east-1.amazonaws.com/admin-area-images/admin-login.png"
          alt="Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="bg-background flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-xl font-light text-white/60">
          Coloque suas credenciais abaixo
        </p>

        <div className="md:w-1/2 w-full md:p-0 p-4">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
