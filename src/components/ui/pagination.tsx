"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Função para gerar os números de página a serem exibidos
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Se o total de páginas for menor que o máximo a ser exibido, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sempre mostra a primeira página
      pages.push(1);

      // Calcula o intervalo de páginas a serem exibidas
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Ajusta o intervalo para mostrar sempre 3 páginas no meio
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Adiciona elipses se necessário
      if (startPage > 2) {
        pages.push("...");
      }

      // Adiciona as páginas do intervalo
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Adiciona elipses se necessário
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Sempre mostra a última página
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Página anterior</span>
      </Button>

      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index.toString()}`} className="px-2">
              ...
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === "number" && onPageChange(page)}
              className="w-8 h-8"
            >
              {page}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Próxima página</span>
      </Button>
    </div>
  );
}
