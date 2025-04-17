"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Coupon } from "@/types/coupon"
import { listCoupons } from "@/services/coupon"
import { CreateCouponForm } from "./createCouponForm"
import { EditCouponForm } from "./editCouponForm"
import { ExcludeCouponButton } from "./excludeCouponButton"
import { format } from "date-fns"
import { formatMoney } from "@/lib/utils"


export function ListCoupons() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [isActive, setIsActive] = useState<boolean>()
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['coupons', page, size], queryFn: () => listCoupons(page, size, isActive) })

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= data?.totalPages!!) {
      setPage(page)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-row-reverse">
         <CreateCouponForm refetch={refetch}/>
      </div>
      <Table>
        <TableHeader>
          <TableHead>Identificador</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Desconto</TableHead>
          <TableHead>Limite de uso</TableHead>
          <TableHead>Usos</TableHead>
          <TableHead>Data de validade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableHeader>
        <TableBody>
          {isLoading && !isError && (
            // <TableSkeleton rowsAmount={10} collumnsAmount={7}/>
            <TableRow><TableCell colSpan={7}>Carregando...</TableCell></TableRow>
          )}
          {!isLoading && !isError && data?.content.map((coupon: Coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.id}</TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discountAmount ? `${formatMoney(coupon.discountAmount)}` : `${coupon.discountPercent || 0}%`}</TableCell>
              <TableCell>{coupon.usageLimit ?? '-'}</TableCell>
              <TableCell>{coupon.timesUsed}</TableCell>
              <TableCell>{coupon.validUntil ? format(coupon.validUntil, "dd/MM/yyyy") : '-'}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${coupon.isActive
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                  {coupon.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </TableCell>
              <TableCell>
                <EditCouponForm coupon={coupon} refetch={refetch}/>
                <ExcludeCouponButton id={coupon.id} code={coupon.code} refetch={refetch} />
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
