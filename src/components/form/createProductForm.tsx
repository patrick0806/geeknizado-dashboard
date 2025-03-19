'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/useToast';
import { ImageUploadPreview } from '@/components/ImageUploader';

import { GeneralData } from './product/generalData';
import { MeasurementsData } from './product/MeasurmentsData';
import { Separator } from '../ui/separator';
import { Category, Theme } from '@/types/product';
import { createProduct } from '@/services/products/createProduct';
import { useGetThemes } from '@/hooks/useGetThemes';
import { useCategories } from '@/hooks/useGetCategories';

type CreateProductFormProps = {
  categories: Category[];
  themes: Theme[];
};

const createProductSchema = z.object({
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

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function CreateProductForm() {
  const router = useRouter();
  const toast = useToast();
  const { data: themesPage } = useGetThemes({ page: 1, limit: 99 });
  const { data: categoriesPage } = useCategories({ page: 1, limit: 99 });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '0' as any,
      categoryId: '',
      themeId: '',
      discount: '0' as any,
      stock: '0' as any,
      width: '0' as any,
      height: '0' as any,
      length: '0' as any,
      weight: '0' as any,
      isActive: true,
      hasVariations: false,
    },
  });

  const handleSubmit = async (values: CreateProductFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...values,
          slug: values.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-'),
        })
      );

      images.forEach((image) => {
        formData.append('images', image.file);
      });

      await createProduct(formData);

      toast({
        title: 'Produto criado',
        description: 'O produto foi criado com sucesso.',
        variant: 'success'
      });

      router.push('/produtos');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar o produto.',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <GeneralData categories={categoriesPage?.content || []} themes={themesPage?.content || []} />
        <Separator className="my-4" />
        <MeasurementsData />
        <Separator className="my-4" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Imagens do Produto</h3>
          <ImageUploadPreview
            value={images}
            onChange={setImages}
            maxFiles={5}
          />
          {images.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Adicione pelo menos uma imagem. A primeira imagem será usada como
              miniatura.
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Produto'}
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
  );
}
