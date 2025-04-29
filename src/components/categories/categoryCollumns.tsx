"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Category } from "@/types/category";
import { format } from "date-fns";
import { EditCategory } from "./EditCategory";
import { ExcludeCategory } from "./ExcludeCategory";

export const CategoryColumns: ColumnDef<Category>[] = [
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
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("slug")}</div>
    ),
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
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div>{format(date, "dd/MM/yyyy")}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex gap-2">
          <EditCategory category={category} />
          <ExcludeCategory id={category.id} name={category.name} />
        </div>
      );
    },
  },
];
