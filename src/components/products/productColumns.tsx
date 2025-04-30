import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatMoney } from "@/lib/utils";
import { EditProduct } from "./editProduct";
import { Category } from "@/types/category";
import { Theme } from "@/types/theme";

export const productColumns = ({
  categories = [],
  themes = [],
}: {
  categories: Category[];
  themes: Theme[];
}): ColumnDef<Product>[] => {
  return [
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
      accessorKey: "images",
      header: "Imagem",
      cell: ({ row }) => {
        const image = row.original.images?.[0]?.url;
        return image ? (
          <img src={image} alt="" className="h-12 w-12 rounded object-cover" />
        ) : (
          <Badge variant="secondary">Sem imagem</Badge>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("sku")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => formatMoney(row.getValue("price")),
    },
    {
      accessorKey: "discount",
      header: "Desconto",
      cell: ({ row }) => formatMoney(row.getValue("discount")),
    },
    {
      accessorKey: "amount",
      header: "Estoque",
    },
    {
      accessorKey: "category.name",
      header: "Categoria",
      cell: ({ row }) => row.original.category?.name ?? "-",
    },
    {
      accessorKey: "theme.name",
      header: "Tema",
      cell: ({ row }) => row.original.theme?.name ?? "-",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex gap-2">
            <EditProduct
              product={product}
              categories={categories}
              themes={themes}
            />
            {/* <ExcludeProduct id={product.id} name={product.name} /> */}
          </div>
        );
      },
    },
  ];
};
