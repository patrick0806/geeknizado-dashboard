"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Customer } from "@/types/customer"
import { listCustomers } from "@/services/customer"
import { CreateCustomerForm } from "./createCustomerForm"
import { EditCustomerForm } from "./editCustomerForm"
import { ExcludeCustomerButton } from "./excludeCustomerButton"

export function ListCustomers() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [isActive, setIsActive] = useState<boolean>()
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['customers', page, size], queryFn: () => listCustomers(page, size, isActive) })

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= data?.totalPages!!) {
      setPage(page)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-row-reverse">
        <CreateCustomerForm refetch={refetch}/>
      </div>
      <Table>
        <TableHeader>
          <TableHead>Identificador</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableHeader>
        <TableBody>
          {isLoading && !isError && (
            // <TableSkeleton rowsAmount={10} collumnsAmount={5}/>
            <TableRow><TableCell colSpan={5}>Carregando...</TableCell></TableRow>
          )}
          {!isLoading && !isError && data?.content.map((customer: Customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${customer.isActive
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                  {customer.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </TableCell>
              <TableCell>
                <EditCustomerForm customer={customer} refetch={refetch}/>
                <ExcludeCustomerButton id={customer.id} name={customer.name} refetch={refetch} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Anterior</Button>
        <span>Página {page} de {data?.totalPages}</span>
        <Button onClick={() => handlePageChange(page + 1)} disabled={page === data?.totalPages}>Próxima</Button>
      </div>
    </div>
  )
}
