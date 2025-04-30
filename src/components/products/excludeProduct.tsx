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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/mutations/useDeleteProduct";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function ExcludeProduct({ id, name }: { id: string; name: string }) {
  const { mutate, isPending } = useDeleteProduct();
  const handleDelete = () => {
    mutate(
      { id },
      {
        onError: (error) => {
          toast.error("Falha ao apagar produto", {
            description: error.message,
          });
        },
        onSuccess: () => {
          toast.success("Produto apagado com sucesso");
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash className="h-4 w-4 mr-1 " />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja apagar o produto: {name} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Está ação é permanente e não podera ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
