import { CreateCategoryForm } from '@/components/form/createCategoryForm';
import { Header } from '@/components/layout/header';

export default function CreateCategory() {
  return (
    <div className="space-y-6">
      <Header title="Nova Categoria" />
      <p className="text-muted-foreground">
        Preencha as informações da nova categoria
      </p>

      <CreateCategoryForm />
    </div>
  );
}
