'use client';

import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Header } from '@/components/layout/header';
import { ExcludeCategoryButton } from '@/components/excludeCategoryButton';
import { TableContentSkeleton } from '@/components/tableContentSkeleton';
import { TableEmptyState } from '@/components/tableEmptyState';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategories } from '@/hooks/useGetCategories';

export default function CategoriesDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } = useCategories({
    page: currentPage,
    limit: 10,
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
      <Header title="Categorias" />
      <div className="flex items-center justify-between">
        <Button asChild>
          <Link href="/categorias/novo">Nova Categoria</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identificador</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableContentSkeleton rowsAmount={5} collumnsAmount={4} />
            )}

            {!isLoading && data?.content.length === 0 && (
              <TableEmptyState
                message="Nenhuma categoria encontrada"
                colSpan={8}
              />
            )}

            {!isLoading &&
              data?.content &&
              data?.content.length > 0 &&
              data?.content.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        category.isActive
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {category.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/categorias/${category.slug}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <ExcludeCategoryButton
                        id={category.id}
                        name={category.name}
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
