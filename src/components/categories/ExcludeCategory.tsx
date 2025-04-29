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
import { useDeleteCategory } from "@/hooks/mutations/useDeleteCategory";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function ExcludeCategory({ id, name }: { id: string; name: string }) {
  const { mutate, isPending } = useDeleteCategory();
  const handleDelete = () => {
    mutate(
      { id },
      {
        onError: (error) => {
          toast.error("Falha ao apagar a categoria", {
            description: error.message,
          });
        },
        onSuccess: () => {
          toast.success("Categoria apagada com sucesso");
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
            Tem certeza que deseja apagar a categoria: {name} ?
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
