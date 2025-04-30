import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  uploadProductImages,
  deleteProductImage,
  updateImagePosition,
} from '@/services/product';

type UploadImagesInput = {
  productId: string;
  deletedImageIds: string[];
  newImages: File[];
  updatedImages: { id: string; position: number }[];
  newImagePositions: Record<string, number>;
};

export function useUploadProductImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      deletedImageIds,
      newImages,
      updatedImages,
      newImagePositions
    }: UploadImagesInput) => {
      // Deletar
      await Promise.all(
        deletedImageIds.map((id) =>
          deleteProductImage(productId, id)
        )
      );

      // Atualizar posições
      await Promise.all(
        updatedImages.map(({ id, position }) =>
          updateImagePosition(productId, id, position)
        )
      );

      // Upload de novas
      if (newImages.length > 0) {
        await uploadProductImages(productId, {files: newImages, positions: newImagePositions});
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}