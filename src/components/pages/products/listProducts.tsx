"use client"

import { TableSkeleton } from "@/components/tableSkeleton"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatMoney } from "@/lib/utils"
import { listProducts } from "@/services/product"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { ExcludeProductButton } from "./excludeProduct"
import CreateProductForm from "./createProductForm"

export function ListProducts(){
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [isActive, setIsActive] = useState<boolean>()
    const {data, isLoading, isError, refetch} = useQuery({ queryKey: ['products',page,size], queryFn: ()=> listProducts(page,size, isActive) })

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= data?.totalPages!!) {
          setPage(page);
        }
      };

    return(
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-row-reverse">
                <CreateProductForm/>
            </div>
        <Table>
            <TableHeader>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Sku</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
            </TableHeader>
            <TableBody>
                {isLoading && !isError && <TableSkeleton rowsAmount={10} collumnsAmount={7}/>}
                {!isLoading && !isError && data?.content.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell><Image src={product?.images[0]?.url || ''} alt={product.name} width={100} height={100} /></TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatMoney(product.price)}</TableCell>
                        <TableCell>{product.amount}</TableCell>
                        <TableCell>{product?.category?.name}</TableCell>
                        <TableCell>{product?.theme?.name}</TableCell>
                        <TableCell>
                            <span 
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${product.isActive
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >{product.isActive ? 'Ativo' : 'Inativo'}</span>
                        </TableCell>
                        <TableCell>
                            {/* <EditThemeForm theme={theme}  refetch={refetch}/> */}
                            <ExcludeProductButton id={product.id} name={product.name} refetch={refetch} />
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
    )
}