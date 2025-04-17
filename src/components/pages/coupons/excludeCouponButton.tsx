'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { deleteCoupon } from '@/services/coupon';
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

type ExcludeCouponButtonProps = {
  id: string;
  code: string;
  refetch: Function;
};

export function ExcludeCouponButton({ id, code, refetch }: ExcludeCouponButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDeleteCoupon = async () => {
    try {
      setIsLoading(true);
      await deleteCoupon(id);
      refetch();
      toast({ variant: 'success', title: 'Sucesso ao apagar cupom' });
    } catch (error: any) {
      toast({ variant: 'error', title: 'Erro ao excluir cupom', description: error.message });
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
            Tem certeza que deseja excluir o cupom: {code}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser revertida. Todos os dados do cupom serão perdidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            disabled={isLoading}
            onClick={handleDeleteCoupon}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
