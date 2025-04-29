import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

type TableSkeletonProps = {
  rowsAmount: number;
  collumnsAmount: number;
};

export function TableSkeleton({
  rowsAmount = 1,
  collumnsAmount = 1,
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsAmount }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: collumnsAmount }).map((_, idx) => (
            <TableCell key={idx}>
              <Skeleton className="h-[30px] w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
