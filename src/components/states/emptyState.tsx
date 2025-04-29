import { FolderOpen } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  message = "Nenhum dado encontrado",
  icon = <FolderOpen className="h-12 w-12 text-muted-foreground/60" />,
}: EmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-[200px] text-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          {icon}
          <p className="text-lg font-medium text-muted-foreground">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
