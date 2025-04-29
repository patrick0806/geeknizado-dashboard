import { useState } from "react";
import { useDeleteTheme } from "@/hooks/mutations/useDeleteTheme";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface DeleteThemeProps {
  themeId: string;
}

export function DeleteTheme({ themeId }: DeleteThemeProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteTheme();

  const handleDelete = () => {
    mutate(themeId, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Tema excluído com sucesso");
      },
      onError: () => {
        toast.error("Erro ao excluir tema");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash className="h-4 w-4 mr-1 " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Tema</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Tem certeza que deseja excluir este tema?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
