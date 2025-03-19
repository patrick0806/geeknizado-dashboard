import { EmptyState } from './svgs/emptyState';
import { TableCell, TableRow } from './ui/table';

type TableEmptyStateProps = {
  message: string;
  colSpan: number;
};

export function TableEmptyState({
  message,
  colSpan = 1,
}: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-8">
          <EmptyState />
          <p className="text-xl font-medium">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
