"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Coupon } from "@/types/coupon";
import { format } from "date-fns";
import { DeleteCoupon } from "./deleteCoupon";
import { EditCoupon } from "./editCoupon";
import { formatMoney } from "@/lib/utils";

export const CouponColumns: ColumnDef<Coupon>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("code")}</div>
    ),
  },
  {
    id: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const coupon = row.original;
      const isPercent = !!coupon.discountPercent;
      return (
        <Badge variant={isPercent ? "outline" : "default"}>
          {isPercent ? "Percentual" : "Valor Fixo"}
        </Badge>
      );
    },
  },
  {
    id: "discount",
    header: "Desconto",
    cell: ({ row }) => {
      const coupon = row.original;
      if (coupon.discountAmount && coupon.discountAmount > 0) {
        return formatMoney(coupon.discountAmount);
      }

      if (coupon.discountPercent !== null) {
        return `${coupon.discountPercent}%`;
      }

      return "-";
    },
  },
  {
    accessorKey: "usageLimit",
    header: "Limite de Uso",
    cell: ({ row }) => {
      const value = row.getValue("usageLimit");
      return value != null ? value : "-";
    },
  },
  {
    accessorKey: "timesUsed",
    header: "Usos",
    cell: ({ row }) => <div>{row.getValue("timesUsed")}</div>,
  },
  {
    accessorKey: "validUntil",
    header: "Válido até",
    cell: ({ row }) => {
      const date = row.getValue("validUntil") as Date | null | undefined;
      return date ? format(new Date(date), "dd/MM/yyyy") : "-";
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div className="flex gap-2">
          <EditCoupon coupon={coupon} />
          <DeleteCoupon id={coupon.id} code={coupon.code} />
        </div>
      );
    },
  },
];
