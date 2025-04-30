"use client";

import { z } from "zod";
import { useState } from "react";
import { useUploadProductImages } from "@/hooks/mutations/useUploadProductImages";
import { ImagesUploader } from "./ImageUploader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ProductImage } from "@/types/product";
import { toast } from "sonner";

export const uploadImagesFormSchema = z.object({
  productId: z.string().uuid(),
  files: z.array(z.instanceof(File)).min(1, "'Envie pelo menos uma imagem'"),
  positions: z.record(z.number().int().nonnegative()),
});

export type ExistingImage = {
  id: string;
  url: string;
  position: number;
};

export type NewImage = File;

export type UnifiedImage = {
  file?: File;
  id?: string;
  url?: string;
  position: number;
  type: "existing" | "new";
};

export function UploadImageForm({
  productId,
  existingImages = [],
  onCancel,
}: {
  productId: string;
  existingImages: ProductImage[];
  onCancel: () => void;
}) {
  const [images, setImages] = useState<UnifiedImage[]>(
    existingImages
      .map(
        (image): UnifiedImage => ({
          id: image.id,
          position: image.position,
          url: image.url,
          type: "existing",
        })
      )
      .sort((a, b) => a.position - b.position)
  );
  const { mutate, isPending } = useUploadProductImages();

  const onSubmit = () => {
    const deletedImageIds = existingImages
      .filter((img) => !images.find((i) => i.id === img.id))
      .map((img) => img.id);

    const updatedImages = images
      .filter((img) => img.type === "existing")
      .filter(
        (img) =>
          img.position !== existingImages.find((i) => i.id === img.id)?.position
      )
      .map((img) => ({ id: img.id!, position: img.position }));

    const newImages = images
      .filter((img) => img.type === "new" && img.file)
      .map((img) => img.file!);

    const newImagePositions: Record<string, number> = {};
    for (const img of images) {
      if (img.type === "new" && img.file) {
        newImagePositions[img.file.name] = img.position;
      }
    }

    mutate(
      {
        productId,
        deletedImageIds,
        updatedImages,
        newImages,
        newImagePositions,
      },
      {
        onError: (error) => {
          toast.error("Falha ao salvar imagens", {
            description: error instanceof Error ? error.message : undefined,
          });
        },
        onSuccess: () => {
          toast.success("Imagens atualizadas com sucesso");
          onCancel();
        },
      }
    );
  };

  return (
    <>
      <ImagesUploader images={images} setImages={setImages} />
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" onClick={onSubmit} disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner className="text-white" />
              Salvando...
            </div>
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </>
  );
}
