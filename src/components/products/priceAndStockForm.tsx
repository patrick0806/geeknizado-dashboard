"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { formatMoney, parseMoneyToNumber } from "@/lib/utils";

export function PriceAndStockForm() {
  const form = useFormContext();
  return (
    <div className="mt-4 flex flex-col gap-y-4">
      {/* Preço */}
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <Input
                {...field}
                inputMode="numeric"
                value={formatMoney(field.value)}
                onChange={(e) => {
                  const numericValue = parseMoneyToNumber(e.target.value);
                  field.onChange(numericValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Desconto */}
      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Desconto</FormLabel>
            <FormControl>
              <Input
                {...field}
                inputMode="numeric"
                value={formatMoney(field.value)}
                onChange={(e) => {
                  const numericValue = parseMoneyToNumber(e.target.value);
                  field.onChange(numericValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Quantidade */}
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
