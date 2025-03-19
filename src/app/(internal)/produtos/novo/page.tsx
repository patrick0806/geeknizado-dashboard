import { CreateProductForm } from '@/components/form/createProductForm';
import { Header } from '@/components/layout/header';
export default async function NewProductPage() {

  return (
    <div className="space-y-6 pb-6">
      <Header title='Novo produto' />
      <p className="text-muted-foreground">
        Preencha as informações do novo produto
      </p>

      <CreateProductForm />
    </div>
  );
}
