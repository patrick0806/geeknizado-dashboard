'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import { deleteProduct } from '@/services/product';

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

type ExcludeProductButtonProps = {
  id: string;
  name: string;
  refetch: Function;
};

export function ExcludeProductButton({
  id,
  name,
  refetch,
}: ExcludeProductButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);
      await deleteProduct(id);
      refetch();
      toast({
        variant: 'success',
        title: 'Sucesso ao apagar produto',
      });
    } catch (error: any) {
      toast({
        variant: 'error',
        title: 'Erro ao excluir produto',
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
            Tem certeza que deseja excluir a produto: {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não pode ser revertida todos os dados da produto serão
            perdidos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            disabled={isLoading}
            onClick={handleDeleteCategory}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
