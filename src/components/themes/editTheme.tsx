import { useState } from "react";
import { Theme } from "@/types/theme";
import { useUpdateTheme } from "@/hooks/mutations/useUpdateTheme";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeForm } from "./themeForm";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface EditThemeProps {
  theme: Theme;
}

export function EditTheme({ theme }: EditThemeProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useUpdateTheme();

  const handleSubmit = (values: { name: string; isActive: boolean }) => {
    mutate(
      { slug: theme.slug, ...values },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Tema atualizado com sucesso");
        },
        onError: () => {
          toast.error("Erro ao atualizar tema");
        },
      }
    );
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Editar Tema</DrawerTitle>
              <DrawerDescription>
                Atualize os dados do tema nos campos abaixo
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <ThemeForm
                defaultValues={theme}
                onSubmit={handleSubmit}
                onCancel={() => setOpen(false)}
                isPending={isPending}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tema</DialogTitle>
              <DialogDescription>
                Atualize os dados do tema nos campos abaixo
              </DialogDescription>
            </DialogHeader>
            <ThemeForm
              defaultValues={theme}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
