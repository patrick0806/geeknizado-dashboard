"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listCategoires } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EditCategoryForm } from "./editCategoryForm";
import { ExcludeCategoryButton } from "./excludeCategory";
import { TableSkeleton } from "@/components/tableSkeleton";
import { CreateCategoryForm } from "./createCategoryForm";
import { EmptyState } from "@/components/emptyState";

export function ListCategories() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isActive, setIsActive] = useState<boolean>();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["categoires", page, size],
    queryFn: () => listCategoires(page, size, isActive),
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= data?.totalPages!!) {
      setPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-row-reverse">
        <CreateCategoryForm refetch={refetch} />
      </div>
      <Table>
        <TableHeader>
          <TableHead>Identificador</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableHeader>
        <TableBody>
          {isLoading && !isError && (
            <TableSkeleton rowsAmount={10} collumnsAmount={4} />
          )}
          {!isLoading && !isError && data?.content.length === 0 && (
            <EmptyState message="Nenhuma categoria encontrada" />
          )}
          {!isLoading &&
            !isError &&
            data?.content.length &&
            data?.content.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      category.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {category.isActive ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell>
                  <EditCategoryForm category={category} refetch={refetch} />
                  <ExcludeCategoryButton
                    id={category.id}
                    name={category.name}
                    refetch={refetch}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span>
          Página {page} de {data?.totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === data?.totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
