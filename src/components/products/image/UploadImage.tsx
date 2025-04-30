"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { UploadImageForm } from "./ImageForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Images } from "lucide-react";
import { ProductImage } from "@/types/product";

type UploadImagesProps = {
  productId: string;
  existingImages: ProductImage[];
};

export function UploadImage({ productId, existingImages }: UploadImagesProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Images className="h-4 w-4" />
      </Button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Uplaod de Images</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <UploadImageForm
                productId={productId}
                existingImages={existingImages}
                onCancel={() => setOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Uplaod de Images</DialogTitle>
            </DialogHeader>
            <UploadImageForm
              productId={productId}
              existingImages={existingImages}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
