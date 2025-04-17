'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { deleteCustomer } from '@/services/customer';
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

type ExcludeCustomerButtonProps = {
  id: string;
  name: string;
  refetch: Function;
};

export function ExcludeCustomerButton({ id, name, refetch }: ExcludeCustomerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDeleteCustomer = async () => {
    try {
      setIsLoading(true);
      await deleteCustomer(id);
      refetch();
      toast({ variant: 'success', title: 'Sucesso ao apagar cliente' });
    } catch (error: any) {
      toast({ variant: 'error', title: 'Erro ao excluir cliente', description: error.message });
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
            Tem certeza que deseja excluir o cliente: {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser revertida. Todos os dados do cliente serão perdidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            disabled={isLoading}
            onClick={handleDeleteCustomer}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
