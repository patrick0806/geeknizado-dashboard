import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { Product } from "@/types/product";
import { formatMoney } from "@/lib/utils";
import { EditProduct } from "./editProduct";
import { Category } from "@/types/category";
import { Theme } from "@/types/theme";
import { ExcludeProduct } from "./excludeProduct";
import { UploadImage } from "./image/UploadImage";
/* import { ExcludeProduct } from "./ExcludeProduct"; */

interface ProductCardsMobileProps {
  products: Product[];
  categories: Category[];
  themes: Theme[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function ProductCards({
  products,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  categories = [],
  themes = [],
}: ProductCardsMobileProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index.toString()}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-2">
                <Skeleton className="h-32 w-full rounded" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 pb-2">
              <img
                src={
                  product?.images.sort((a, b) => a.position - b.position)?.[0]
                    ?.url || "/placeholder.png"
                }
                alt={product.name}
                className="h-32 w-full rounded object-cover"
              />
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                <span>{formatMoney(product.price)}</span>
                {product.discount > 0 && (
                  <Badge variant="destructive">
                    -{formatMoney(product.discount)}
                  </Badge>
                )}
                {product.amount <= 5 && (
                  <Badge variant="destructive">Baixo estoque</Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                SKU: {product.sku}
              </div>
              <div className="text-sm text-muted-foreground">
                {product.category?.name ?? "-"} | {product.theme?.name ?? "-"}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 pt-2">
              <UploadImage
                productId={product.id}
                existingImages={product.images}
              />
              <EditProduct
                product={product}
                categories={categories}
                themes={themes}
              />
              <ExcludeProduct id={product.id} name={product.name} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
