import { FolderOpen } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

function DefaultLoadingComponent() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <TableCell key={idx}>
              <Skeleton className="h-[30px] w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

const DefaultEmptyComponent = () => (
  <TableRow>
    <TableCell colSpan={100} className="h-[200px] text-center">
      <div className="flex flex-col items-center justify-center space-y-3">
        <FolderOpen className="h-12 w-12 text-muted-foreground/60" />
        <p className="text-lg font-medium text-muted-foreground">
          Não há resultados
        </p>
      </div>
    </TableCell>
  </TableRow>
);

const DefaultErrorComponent = ({ error }: { error: Error | null }) => (
  <div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-700">
    <h3 className="text-lg font-medium">Error</h3>
    <p>{error?.message || "An unknown error occurred"}</p>
  </div>
);

type QueryResult<TData> = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: TData | undefined;
};

type WithQueryHandlerProps<TData> = {
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType<{ error: Error | null }>;
  EmptyComponent?: React.ComponentType;
  isEmpty?: (data: TData) => boolean;
};

/*
 * Higher-Order Component that handles different states of a React Query call
 * @param WrappedComponent Component to render when query is successful with data
 * @param options Configuration options for the HOC
 * @returns A new component that handles loading, error, and empty states
 */
export function withQueryHandler<TProps, TData>(
  WrappedComponent: React.ComponentType<TProps & { data: TData }>,
  options: WithQueryHandlerProps<TData> = {}
) {
  const {
    LoadingComponent = DefaultLoadingComponent,
    ErrorComponent = DefaultErrorComponent,
    EmptyComponent = DefaultEmptyComponent,
    isEmpty = (data: TData) => {
      if (data === null || data === undefined) return true;
      if (Array.isArray(data)) return data.length === 0;
      if (typeof data === "object") return Object.keys(data).length === 0;
      return false;
    },
  } = options;

  // Return a new component
  return function WithQueryHandler(props: TProps & QueryResult<TData>) {
    const { isLoading, isError, error, data, ...rest } = props;

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (isError) {
      return <ErrorComponent error={error} />;
    }

    if (!data || isEmpty(data)) {
      return <EmptyComponent />;
    }

    // If we have data, render the wrapped component with the data
    return <WrappedComponent {...(rest as TProps)} data={data} />;
  };
}
