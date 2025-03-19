'use client';

import { Header } from "@/components/layout/header";
import { ExcludeThemeButton } from "@/components/excludeThemeButton";
import { TableContentSkeleton } from "@/components/tableContentSkeleton";
import { TableEmptyState } from "@/components/tableEmptyState";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetThemes } from "@/hooks/useGetThemes";

export default function ThemesDashboardPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error, refetch } = useGetThemes({ page: currentPage, limit: 10 });

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
            <Header title='Categorias' />
            <div className="flex items-center justify-between">
                <Button asChild>
                    <Link href="/temas/novo">Novo Tema</Link>
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
                            <TableEmptyState message='Nenhum tema encontrado' colSpan={8} />
                        )}

                        {!isLoading &&
                            data?.content &&
                            data?.content.length > 0 &&
                            data?.content.map((theme) => (
                                <TableRow key={theme.id}>
                                    <TableCell>{theme.id}</TableCell>
                                    <TableCell>{theme.name}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${theme.isActive
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}
                                        >
                                            {theme.isActive ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/dashboard/categorias/${theme.slug}`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <ExcludeThemeButton
                                                id={theme.id}
                                                name={theme.name}
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
    )
}