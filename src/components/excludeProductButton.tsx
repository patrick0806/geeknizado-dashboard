'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';

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
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { deleteProduct } from '@/services/products/deleteProduct';

type ExcludeProductButtonProps = {
  id: string;
  name: string;
  refetch: Function
};

export function ExcludeProductButton({
  id,
  name,
  refetch,
}: ExcludeProductButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await deleteProduct(id);

      refetch();
      toast({
        variant: 'success',
        title: 'Sucesso ao apagar produto',
      });
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Erro',
        description: 'Erro ao excluir produto',
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
            Tem certeza que deseja excluir o produt: {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não pode ser revertida todos os dados do produto serão
            perdidos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            disabled={isLoading}
            onClick={handleDeleteProduct}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
