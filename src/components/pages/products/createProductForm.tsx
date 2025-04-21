"use client"

import { useState } from 'react';
import { createProduct, uploadProductImages } from '@/services/product';
import { ProductDataForm, ProductDataFormValues } from './ProductDataForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CreateProductForm({ onSuccess, categories, themes }: { onSuccess?: Function, categories: { id: string; name: string }[], themes: { id: string; name: string }[]}) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unified submit handler
  const handleSubmit = async (data: ProductDataFormValues) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create product
      const product = await createProduct(data);
      // 2. Upload images
      if (images.length > 0) {
        const positions: Record<string, number> = {};
        images.forEach((file, idx) => {
          positions[file.name] = idx + 1;
        });
        await uploadProductImages(product.id, images, positions);
      }
      setLoading(false);
      setImages([]);
      setOpen(false);
      if (onSuccess) onSuccess(product);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar produto');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button aria-haspopup="dialog">
          <Plus /> Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de produto</DialogTitle>
        </DialogHeader>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <ProductDataForm
          onSubmit={handleSubmit}
          loading={loading}
          categories={categories || []}
          themes={themes || []}
          categoriesLoading={false}
          themesLoading={false}
          images={images}
          setImages={setImages}
        />
      </DialogContent>
    </Dialog>
  );
}
