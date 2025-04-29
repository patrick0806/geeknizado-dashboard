"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useCreateCoupon } from "@/hooks/mutations/useCreateCoupon";
import { DataTable } from "../ui/dataTable";
import { Coupon } from "@/types/coupon";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CouponCards } from "./couponCards";
import { CouponColumns } from "./couponCollumns";
import { CouponForm } from "./couponForm";
import { useCoupons } from "@/hooks/queries/useCoupons";

export function CouponList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate, isPending } = useCreateCoupon();
  const { data, isLoading, isError } = useCoupons({
    page: currentPage,
    size: isMobile ? 5 : 10,
  });

  const handleCreateCoupon = (
    coupon: Omit<Coupon, "id" | "createdAt" | "updatedAt">
  ) => {
    mutate(coupon, {
      onError: (error) => {
        toast.error("Falha ao criar cupom", {
          description: error.message,
        });
      },
      onSuccess: () => {
        setOpen(false);
        toast.success(`Cupom: ${coupon.code} criado com sucesso`);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="w-full sm:w-64" />
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo cupom
        </Button>
      </div>

      {!isError && isMobile && (
        <CouponCards
          coupons={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {!isError && !isMobile && (
        <DataTable
          columns={CouponColumns}
          data={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Novo cupom</DrawerTitle>
              <DrawerDescription>
                Preencha os campos abaixo para criar um novo cupom.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <CouponForm
                onSubmit={handleCreateCoupon}
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
              <DialogTitle>Novo cupom</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar um novo cupom.
              </DialogDescription>
            </DialogHeader>
            <CouponForm
              onSubmit={handleCreateCoupon}
              onCancel={() => setOpen(false)}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
