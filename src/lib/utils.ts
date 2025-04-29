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