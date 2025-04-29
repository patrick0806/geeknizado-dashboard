import { useState } from 'react';
import { useCreateTheme } from '@/hooks/mutations/useCreateTheme';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ThemeForm } from './themeForm';
import { toast } from 'sonner';

export function CreateTheme() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateTheme();

  const handleSubmit = (values: { name: string; isActive: boolean }) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success('Tema criado com sucesso');
      },
      onError: () => {
        toast.error("Erro ao criar tema");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Criar Tema</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Tema</DialogTitle>
        </DialogHeader>
        <ThemeForm onSubmit={handleSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
} 