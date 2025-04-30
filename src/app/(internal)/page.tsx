"use client";

import { DashboardCards } from "@/components/dashboard/dashboardCards";
import { LatestOrders } from "@/components/dashboard/lastestOrders";
import { LowStockProducts } from "@/components/dashboard/lowStockProducts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDashboardData } from "@/hooks/queries/useDashboardData";
import { AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardData();

  if (error && !data) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Não foi possível carregar os dados do dashboard. {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>

      {/* Cards de resumo */}
      <DashboardCards
        totalClientes={data?.totalCustomers || 0}
        newClients={data?.newCustomersAmount || 0}
        totalOrders={data?.totalOrders || 0}
        totalSales={data?.totalAmountSales ? Number(data.totalAmountSales) : 0}
        isLoading={isLoading}
        error={error}
      />

      {/* Produtos com baixo estoque e pedidos recentes */}
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <LowStockProducts
          products={data?.productsWithLowStock || []}
          isLoading={isLoading}
          error={error}
        />

        <LatestOrders
          orders={data?.latestOrders || []}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
