"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Erro ao carregar dados",
  message = "Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 rounded-lg">
      {/* border border-red-200 bg-red-200 */}
      <div className="rounded-full bg-red-50 p-3">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>

      <Alert variant="destructive" className="border-red-500">
        <AlertTitle className="text-lg font-semibold">{title}</AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground mt-2">
          {message}
        </AlertDescription>
      </Alert>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-4 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
