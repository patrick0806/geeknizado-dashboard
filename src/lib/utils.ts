import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  }).format(value);
}

export function parseMoneyToNumber(value: string): number {
  const clean =  value.replace(/\D/g, '');
  const parsed = Number.parseFloat(clean);
  return parsed / 100
}

export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, "").slice(0, 11); // Garante que só pegue até 11 dígitos
  if (cleaned.length !== 11) {
    throw new Error("CPF deve conter exatamente 11 dígitos");
  }

  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
}