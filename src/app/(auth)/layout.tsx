import Image from "next/image";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full ">
      <main className="w-full grid md:grid-cols-2 grid-cols-1">
        <div className="bg-secondary flex items-center justify-center">
          <Image
            src="https://geeknizado.s3.us-east-1.amazonaws.com/admin-area-images/admin-login.png"
            alt="Logo"
            width={500}
            height={500}
          />
        </div>
        <div className="bg-background flex flex-col items-center justify-center gap-4">
          {children}
        </div>
      </main>
    </div>
  );
}
