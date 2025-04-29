import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { EditCoupon } from "./editCoupon";
import { DeleteCoupon } from "./deleteCoupon";
import type { Coupon } from "@/types/coupon";
import { formatMoney } from "@/lib/utils";
import { Pagination } from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";

interface CouponCardsProps {
  coupons: Coupon[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function CouponCards({
  coupons,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: CouponCardsProps) {
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
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-4">
        {coupons.map((coupon) => {
          const isFixed = !!coupon.discountAmount;
          const valueLabel = isFixed
            ? formatMoney(coupon.discountAmount!)
            : `${coupon.discountPercent}%`;
          const typeLabel = isFixed ? "Valor fixo" : "Porcentagem";
          const isExpired =
            coupon.validUntil && new Date(coupon.validUntil) < new Date();

          return (
            <Card key={coupon.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{coupon.code}</CardTitle>
                  <Badge
                    variant={
                      coupon.isActive && !isExpired ? "default" : "secondary"
                    }
                  >
                    {coupon.isActive && !isExpired ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="mt-1">
                  <Badge variant="outline">{typeLabel}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>
                  Valor: <span className="font-medium">{valueLabel}</span>
                </p>
                <p>
                  Uso:{" "}
                  <span className="font-medium">
                    {coupon.timesUsed}
                    {coupon.usageLimit
                      ? ` / ${coupon.usageLimit}`
                      : " (ilimitado)"}
                  </span>
                </p>
                {coupon.validUntil && (
                  <p>
                    Válido até:{" "}
                    <span className="font-medium">
                      {format(new Date(coupon.validUntil), "dd/MM/yyyy")}
                    </span>
                  </p>
                )}
                <p>
                  Criado em:{" "}
                  <span className="font-medium">
                    {format(new Date(coupon.createdAt), "dd/MM/yyyy")}
                  </span>
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <EditCoupon coupon={coupon} />
                <DeleteCoupon id={coupon.id} code={coupon.code} />
              </CardFooter>
            </Card>
          );
        })}
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
