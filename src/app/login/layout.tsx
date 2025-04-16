'use client'; //workaround for not inerat layout from admin

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen w-full ">{children}</div>;
}
