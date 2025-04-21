import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns a string with the given number formatted as BRL currency.
 * @example formatMoney(10.99) // "R$ 10,99"
 */
export function formatMoney(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Returns a number with the given string formatted as BRL currency.
 * @example parseMoney("R$ 10,99") // 10.99
 */
export function parseMoney(value: string) {
  const cleaned = value.replace(/\D/g, '');
  return  Number(cleaned) / 100;
}
