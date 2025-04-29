import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/types/category";
import { Pagination } from "@/components/ui/pagination";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { EditCategory } from "./EditCategory";
import { ExcludeCategory } from "./ExcludeCategory";

interface CategoryCardsProps {
  categories: Category[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function CategoryCards({
  categories,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: CategoryCardsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index.toString()}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
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
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-muted-foreground">
                <p>Slug: {category.slug}</p>
                <p>Criado em: {format(category.createdAt, "dd/MM/yyyy")}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <EditCategory category={category} />
              <ExcludeCategory id={category.id} name={category.name} />
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
