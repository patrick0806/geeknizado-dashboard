"use client";

import { useState } from "react";

import { CustomerCards } from "./customerCards";
import { DataTable } from "../ui/dataTable";
import { CustomerColumns } from "./customerCollumns";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ErrorState } from "../states/errorState";
import { useCustomers } from "@/hooks/queries/useCustomer";

export function CustomerList() {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, isLoading, isError } = useCustomers({
    page: currentPage,
    size: isMobile ? 5 : 10,
  });

  return (
    <div className="space-y-4">
      {isError && (
        <ErrorState
          title="Falha ao carregar categorias"
          message="Tente atualizar a página em instantes"
        />
      )}

      {!isError && isMobile && (
        <CustomerCards
          customers={data?.content || []}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {!isError && !isMobile && (
        <DataTable
          columns={CustomerColumns}
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
