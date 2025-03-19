
import { EditProductForm } from '@/components/form/editProductForm';
import { Header } from '@/components/layout/header';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  return (
    <div className="space-y-8 pb-6">
      <Header title='Edição de Produtos' />
      <EditProductForm />
    </div >
  );
}
