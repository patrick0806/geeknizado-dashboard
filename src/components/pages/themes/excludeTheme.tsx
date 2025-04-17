'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import { deleteTheme } from '@/services/theme';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type ExcludeThemeButtonProps = {
  id: string;
  name: string;
  refetch: Function;
};

export function ExcludeThemeButton({
  id,
  name,
  refetch,
}: ExcludeThemeButtonProps) {   
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDeleteTheme = async () => {
    try {
      setIsLoading(true);
      await deleteTheme(id);
      refetch();
      toast({
        variant: 'success',
        title: 'Sucesso ao apagar tema',
      });
    } catch (error: any) {
      toast({
        variant: 'error',
        title: 'Erro ao excluir tema',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir o tema: {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não pode ser revertida todos os dados do tema serão
            perdidos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            disabled={isLoading}
            onClick={handleDeleteTheme}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
