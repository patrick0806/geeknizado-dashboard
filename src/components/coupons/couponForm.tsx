"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Spinner } from "../ui/spinner";
import { Coupon } from "@/types/coupon";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { cn, formatMoney, parseMoneyToNumber } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

type CouponFormProps = {
  coupon?: Omit<Coupon, "createdAt" | "updatedAt">;
  onSubmit: (coupon: Omit<Coupon, "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  isPending: boolean;
};

const baseCouponSchema = z.object({
  code: z.string().min(3, "O código do cupom deve ter no mínimo 3 caracteres"),
  usageLimit: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int("A quantidade máxima de usos deve ser um número inteiro").positive("A quantidade máxima deve ser positiva").optional()),
  isActive: z.boolean(),
  validUntil: z.date().optional(),
});

const couponFixedSchema = baseCouponSchema.extend({
  discountAmount: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseMoneyToNumber(val);
      }
      return val;
    },
    z
      .number({
        required_error: "Informe o valor de desconto",
        invalid_type_error: "O valor precisa ser um número",
      })
      .positive("O valor deve ser positivo")
  ),
});

const couponPercentSchema = baseCouponSchema.extend({
  discountPercent: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseMoneyToNumber(val);
      }
      return val;
    },
    z
      .number({
        required_error: "Informe o percentual de desconto",
        invalid_type_error: "O percentual precisa ser um número",
      })
      .min(1, "O percentual deve ser maior que 0")
      .max(100, "O percentual não pode ser maior que 100")
  ),
});

export const couponSchema = z.union([couponFixedSchema, couponPercentSchema]);

export type CouponFormData = z.infer<typeof couponSchema>;

export function CouponForm({
  coupon,
  onSubmit,
  onCancel,
  isPending,
}: CouponFormProps) {
  const [discountType, setDiscountType] = useState<"amount" | "percent">(
    "amount"
  );

  const couponDefault =
    coupon?.discountAmount !== undefined
      ? {
          code: coupon.code,
          isActive: coupon.isActive,
          discountAmount: coupon.discountAmount,
          usageLimit: coupon.usageLimit,
          validUntil: coupon.validUntil,
        }
      : {
          code: coupon?.code,
          isActive: coupon?.isActive,
          discountPercent: coupon?.discountPercent,
          usageLimit: coupon?.usageLimit,
          validUntil: coupon?.validUntil,
        };

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema as any),
    defaultValues: coupon
      ? couponDefault
      : {
          code: "",
          usageLimit: undefined,
          isActive: true,
          discountAmount: undefined,
          discountPercent: undefined,
          validUntil: undefined,
        },
  });

  const handleSubmit = (data: CouponFormData) => {
    onSubmit(data as any);
  };

  return (
    <div className="space-y-4">
      <Tabs
        value={discountType}
        onValueChange={(val) => setDiscountType(val as any)}
      >
        <TabsList>
          <TabsTrigger value="amount">Valor Fixo (R$)</TabsTrigger>
          <TabsTrigger value="percent">Porcentagem (%)</TabsTrigger>
        </TabsList>
      </Tabs>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="EXEMPLO123" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {discountType === "amount" && (
            <FormField
              control={form.control}
              name="discountAmount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Valor de Desconto (R$)</FormLabel>
                    <FormControl>
                      <Input
                        inputMode="numeric"
                        {...field}
                        value={formatMoney(field.value)}
                        onChange={(e) => {
                          const numericValue = parseMoneyToNumber(
                            e.target.value
                          );
                          field.onChange(numericValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          {discountType === "percent" && (
            <FormField
              control={form.control}
              name="discountPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desconto (%)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="usageLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite de usos</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validUntil"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data limite de validade</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Escolher data limite de validade</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Ativo</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <p>
                  <Spinner className="text-white" /> Salvando...
                </p>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
