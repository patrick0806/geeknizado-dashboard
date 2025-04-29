"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Coupon } from "@/types/coupon";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { CouponForm } from "./couponForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useUpdateCoupon } from "@/hooks/mutations/useUpdateCoupon";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export function EditCoupon({ coupon }: { coupon: Coupon }) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useUpdateCoupon();

  const handleSubmit = (data: Omit<Coupon, "createdAt" | "updatedAt">) => {
    mutate(data, {
      onError: (error) => {
        toast.error("Falha ao criar categoria", {
          description: error.message,
        });
      },
      onSuccess: () => {
        setOpen(false);
        toast.success(`Cupom: ${coupon.code} editado com sucesso`, {
          style: { borderBlockColor: "#000" },
        });
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={true}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Editar Cupom</DrawerTitle>
              <DrawerDescription>
                Atualize os dados do cupom nos campos abaixo
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <CouponForm
                coupon={coupon}
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
              <DialogTitle>Editar Cupom</DialogTitle>
              <DialogDescription>
                Atualize os dados do cupom nos campos abaixo
              </DialogDescription>
            </DialogHeader>
            <CouponForm
              coupon={coupon}
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
