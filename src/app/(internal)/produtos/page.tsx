'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mask } from '@/lib/mask';
import { ExcludeProductButton } from '@/components/excludeProductButton';
import { useListProducts } from '@/hooks/useListProducts';
import { Header } from '@/components/layout/header';
import { TableContentSkeleton } from '@/components/tableContentSkeleton';
import { TableEmptyState } from '@/components/tableEmptyState';

export default function AdminProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useListProducts({
    page: currentPage,
    limit: 10,
    category: '',
    search: '',
    theme: '',
    sort: 'ASC',
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= data?.totalPages!!) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="space-y-8">
      <Header title='Produtos' />
      <div className="flex items-center justify-between">
        <Button asChild>
          <Link href="/produtos/novo">Novo Produto</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableContentSkeleton rowsAmount={5} collumnsAmount={8} />
            )}

            {!isLoading && data?.content.length === 0 && (
              <TableEmptyState message='Nenhum produto encontrado' colSpan={8} />
            )}

            {!isLoading &&
              data?.content &&
              data?.content.length > 0 &&
              data?.content.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative aspect-square h-16 w-16 overflow-hidden rounded-md">
                      {product?.images?.length ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-xs text-muted-foreground">
                            Sem imagem
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.theme.name}</TableCell>
                  <TableCell>{mask.money(product.price)}</TableCell>
                  <TableCell>
                    {product.stock.amount === 0 && (
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                           bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`}
                      >
                        Sem estoque
                      </span>
                    )}
                    {product.stock.amount > 0 && <p>{product.stock.amount}</p>}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${product.isActive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                    >
                      {product.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/produtos/${product.slug}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <ExcludeProductButton
                        id={product.id}
                        name={product.name}
                        refetch={refetch}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {data?.totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data?.totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
