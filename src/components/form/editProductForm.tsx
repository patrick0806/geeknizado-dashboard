'use client';

import { notFound, usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import { useToast } from '@/hooks/useToast';

import { Button } from '../ui/button';
import { Label } from '../ui/label';

import { ImageUploadPreview } from '../ImageUploader';
import { GeneralData } from './product/generalData';
import { Separator } from '../ui/separator';
import { MeasurementsData } from './product/MeasurmentsData';
import { Product, ProductImage } from '@/types/product';
import { findProductBySlug } from '@/services/products/findProductBySlug';
import { useGetThemes } from '@/hooks/useGetThemes';
import { useCategories } from '@/hooks/useGetCategories';
import { updateProduct } from '@/services/products/updateProduct';
import { deleteProductImages } from '@/services/products/deleteProductImages';
import { uploadProductImges } from '@/services/products/uploadProductImages';

const editProductSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Nome é obrigatório e deve ter no mínimo 2 caracteres.',
    })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres.' }),
  description: z.string().min(10, {
    message: 'Descrição é obrigatória e deve conter pelo menos 10 caracteres.',
  }),
  price: z
    .string()
    .transform((value) => parseFloat(value.replace(/\D/g, '')) / 100)
    .refine((value) => value > 0, {
      message: 'Preço deve ser maior que zero.',
    }),
  categoryId: z.string().min(1, { message: 'Categoria é obrigatória.' }),
  themeId: z.string().min(1, { message: 'Tipo é obrigatório.' }),
  discount: z
    .string()
    .transform((value) => parseInt(value.replace(/\D/g, ''), 10))
    .refine((value) => value >= 0 && value <= 100, {
      message: 'Desconto deve estar entre 0 e 100.',
    }),
  stock: z
    .string()
    .transform((value) => parseInt(value.replace(/\D/g, ''), 10))
    .refine((value) => value >= 0, {
      message: 'Estoque não pode ser negativo.',
    }),

  width: z
    .string()
    .transform((value) => parseFloat(value.replace(',', '.')))
    .refine((value) => value >= 0, {
      message: 'Largura deve ser maior que zero.',
    }),
  height: z
    .string()
    .transform((value) => parseFloat(value.replace(',', '.')))
    .refine((value) => value >= 0, {
      message: 'Altura deve ser maior que zero.',
    }),
  length: z
    .string()
    .transform((value) => parseFloat(value.replace(',', '.')))
    .refine((value) => value >= 0, {
      message: 'Comprimento deve ser maior que zero.',
    }),
  weight: z
    .string()
    .transform((value) => parseFloat(value.replace(',', '.')))
    .refine((value) => value >= 0, {
      message: 'Peso deve ser maior que zero.',
    }),
  isActive: z.boolean(),
  hasVariations: z.boolean(),
});

export function EditProductForm() {
  const router = useRouter();
  const path = usePathname();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<
    Product | null
  >(null);
  const { data: themesPage } = useGetThemes({ page: 1, limit: 99 });
  const { data: categoriesPage } = useCategories({ page: 1, limit: 99 });
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [existingImages, setExistingImages] =
    useState<Array<{ id: string; url: string }>>();
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      description: '',
      price: '' as any,
      categoryId: '',
      themeId: '',
      discount: '' as any,
      stock: '' as any,
      width: '' as any,
      height: '' as any,
      length: '' as any,
      weight: '' as any,
      isActive: true,
      hasVariations: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await findProductBySlug(path.split('/').pop()!);
        setProduct(data);
        setExistingImages(
          data.images.map((image: ProductImage) => ({
            id: image.id,
            url: image.url,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    form.reset({
      name: product?.name,
      description: product?.description,
      price: product?.price ? product?.price as any : '0',
      categoryId: product?.category.id,
      themeId: product?.theme.id,
      discount: product?.discount?.toString() || '0' as any,
      stock: product?.stock?.amount.toString() || '0' as any,
      width: product?.width?.toString() || '0' as any,
      height: product?.height?.toString() || '0' as any,
      length: product?.length?.toString() || '0' as any,
      weight: product?.weight?.toString() || '0' as any,
      isActive: product?.isActive,
      hasVariations: false,//TODO -- add variations
    });
  }, [product])

  const handleSubmit = async (values: z.infer<typeof editProductSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append('images', image.file);
      });

      if (!product) throw new Error('Product is undefined');
      await updateProduct(product.id, values);

      if (deletedImageIds.length) await deleteProductImages(product.id, deletedImageIds);
      if (images.length) {
        //TODO - add more images Upload
        formData.append('order', images.map((_image, idx) => idx + product.images.length - 1).toString())
        await uploadProductImges(product.id, formData)
      }

      toast({
        title: 'Produto atualizado',
        description: 'O produto foi editado com sucesso.',
        variant: 'success'
      });

      router.push('/produtos');
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error?.response?.message || 'Houve um erro ao atualizar produto',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = (imageId: string) => {
    setExistingImages((prev) =>
      prev!!.filter((img: { id: string; url: string }) => img.id !== imageId)
    );
    setDeletedImageIds((prev: string[]) => [...prev, imageId]);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!loading && !product) {
    return notFound();
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <GeneralData categories={categoriesPage?.content || []} themes={themesPage?.content || []} />
          <Separator className="my-4" />
          <MeasurementsData />
          <Separator className="my-4" />
          <div className="space-y-4">
            <Label>Imagens Existentes</Label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {existingImages!!.map(
                (image: { id: string; url: string }, index: number) => (
                  <div key={image.id} className="group relative aspect-square">
                    <Image
                      src={image.url}
                      alt={`Imagem ${index + 1}`}
                      fill
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleImageDelete(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {index === 0 && (
                      <span className="absolute left-2 top-2 rounded-md bg-primary/80 px-2 py-1 text-xs font-medium text-primary-foreground">
                        Miniatura
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Imagens do Produto</h3>
            <ImageUploadPreview
              value={images}
              onChange={setImages}
              maxFiles={5}
            />
            {images.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Adicione pelo menos uma imagem. A primeira imagem será usada
                como miniatura.
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Editando...' : 'Editar Produto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/produtos')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
