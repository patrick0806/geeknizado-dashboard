"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Package, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/product";

interface LowStockProductsProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export function LowStockProducts({
  products,
  isLoading,
  error,
}: LowStockProductsProps) {
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Produtos com Estoque Baixo</CardTitle>
          <CardDescription>Produtos que precisam de reposição</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Não foi possível carregar os produtos com estoque baixo.{" "}
              {error.message}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>
              Produtos que precisam de reposição
            </CardDescription>
          </div>
          <Link href="/admin/produtos">
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">
              Nenhum produto com estoque baixo
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Todos os produtos estão com estoque adequado.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-start gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0].url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{product.name}</p>
                    <Badge variant="destructive" className="ml-2">
                      {product.amount} em estoque
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>SKU: {product.sku}</span>
                    <span className="mx-2">•</span>
                    <span>{product.category.name}</span>
                  </div>
                </div>
              </div>
            ))}

            {products.length > 0 && (
              <div className="pt-2">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {products.length} produto{products.length > 1 ? "s" : ""}{" "}
                    com estoque baixo.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
