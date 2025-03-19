'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
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
import { Header } from '@/components/layout/header';
import { TableContentSkeleton } from '@/components/tableContentSkeleton';
import { TableEmptyState } from '@/components/tableEmptyState';
import { ExcludeCustomerButton } from '@/components/excludeCustomerButton';
import { useListCustomers } from '@/hooks/useListCustomers';

export default function AdminCustomers() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error, refetch } = useListCustomers({
        page: currentPage,
        limit: 10,
        search: '',
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
            <Header title='Clientes' />
            <div className="flex items-center justify-between">
                <Button asChild>
                    <Link href="/clientes/novo">Novo Cliente</Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            <TableContentSkeleton rowsAmount={5} collumnsAmount={5} />
                        )}

                        {!isLoading && data?.content.length === 0 && (
                            <TableEmptyState message='Nenhum cliente encontrado' colSpan={5} />
                        )}

                        {!isLoading &&
                            data?.content &&
                            data?.content.length > 0 &&
                            data?.content.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${customer.isActive
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}
                                        >
                                            {customer.isActive ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/clientes/${customer.id}`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <ExcludeCustomerButton
                                                id={customer.id}
                                                name={customer.name}
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