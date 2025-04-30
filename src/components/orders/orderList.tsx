"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Search } from "lucide-react";

import { DataTable } from "../ui/dataTable";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ErrorState } from "../states/errorState";
import type { OrderStatus } from "@/types/orderStatus";
import { useOrders } from "@/hooks/queries/useOrders";
import { OrderCards } from "./orderCards";
import { OrderColumns } from "./orderColumns";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "../ui/input";

export function OrderList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>();
  const [customerName, setCustomerName] = useState<string>();
  const debouncedName = useDebounce(customerName, 500);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data, isLoading, isError } = useOrders({
    page: currentPage,
    size: isMobile ? 5 : 10,
    customerName: debouncedName,
    orderStatus: selectedStatus,
  });

  const handleStatusSelect = (value: string) => {
    if (value === "all") {
      setSelectedStatus(undefined);
    } else {
      setSelectedStatus(value as OrderStatus);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="w-full flex md:flex-row flex-col gap-5 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-8 w-full"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-64">
            <Select defaultValue={"all"} onValueChange={handleStatusSelect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="PENDING_PAYMENT">
                  Aguardando pagamento
                </SelectItem>
                <SelectItem value="PROCESSING_PAYMENT">
                  Processando pagamento
                </SelectItem>
                <SelectItem value="PAYMENT_CONFIRMED">
                  Pagamento confirmado
                </SelectItem>
                <SelectItem value="PAYMENT_DECLINED">
                  Pagamento recusado
                </SelectItem>
                <SelectItem value="PAYMENT_CANCELLED">
                  Pagamento cancelado
                </SelectItem>
                <SelectItem value="PENDING_SHIPPING">
                  Aguardando envio
                </SelectItem>
                <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                <SelectItem value="SHIPPED">Enviado</SelectItem>
                <SelectItem value="DELIVERED">Entregue</SelectItem>
                <SelectItem value="CANCELED">Cancelado</SelectItem>
                <SelectItem value="REFOUNDED">Reembolsado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      {isError && (
        <ErrorState
          title="Falha ao carregar pedidos"
          message="Tente atualizar a página em instantes"
        />
      )}

      {!isError && isMobile && (
        <OrderCards
          orders={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {!isError && !isMobile && (
        <DataTable
          columns={OrderColumns}
          data={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
