import { CreateThemeForm } from '@/components/form/createThemeForm';
import { Header } from '@/components/layout/header';

export default function CreateCategory() {
  return (
    <div className="space-y-6">
      <Header title="Nova Categoria" />
      <p className="text-muted-foreground">
        Preencha as informações do novo tema
      </p>

      <CreateThemeForm />
    </div>
  );
}
