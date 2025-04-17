"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { EditThemeForm } from "./editThemeForm"
import { ExcludeThemeButton } from "./excludeTheme"
import { TableSkeleton } from "@/components/tableSkeleton"
import { CreateThemeForm } from "./createThemeForm";
import { listThemes } from "@/services/theme"

export function ListThemes(){
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [isActive, setIsActive] = useState<boolean>()
    const {data, isLoading, isError, refetch} = useQuery({ queryKey: ['themes',page,size], queryFn: ()=> listThemes(page,size, isActive) })

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= data?.totalPages!!) {
          setPage(page);
        }
      };

    return(
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-row-reverse">
                <CreateThemeForm refetch={refetch}/>
            </div>
        <Table>
            <TableHeader>
                <TableHead>Identificador</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
            </TableHeader>
            <TableBody>
                {isLoading && !isError && <TableSkeleton rowsAmount={10} collumnsAmount={4}/>}
                {!isLoading && !isError && data?.content.map((theme) => (
                    <TableRow key={theme.id}>
                        <TableCell>{theme.id}</TableCell>
                        <TableCell>{theme.name}</TableCell>
                        <TableCell>
                            <span 
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${theme.isActive
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >{theme.isActive ? 'Ativo' : 'Inativo'}</span>
                        </TableCell>
                        <TableCell>
                            <EditThemeForm theme={theme}  refetch={refetch}/>
                            <ExcludeThemeButton id={theme.id} name={theme.name} refetch={refetch} />
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
