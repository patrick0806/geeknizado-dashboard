"use client"

import { useToast } from "@/hooks/useToast";
import { updateCoupon } from "@/services/coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Pencil } from "lucide-react";
import { Coupon } from "@/types/coupon";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
    code: z.string().min(3, { message: 'Insira um código válido' }),
    discountAmount: z.coerce.number().optional(),
    discountPercent: z.coerce.number().optional(),
    usageLimit: z.coerce.number().optional(),
    isActive: z.boolean(),
    validUntil: z.date().optional()
});

type EditCouponFormSchema = z.infer<typeof formSchema>;

export function EditCouponForm({ coupon, refetch }: { coupon: Coupon, refetch: Function }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    
    const form = useForm<EditCouponFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: coupon.code,
            discountAmount: coupon.discountAmount,
            discountPercent: coupon.discountPercent,
            usageLimit: coupon.usageLimit,
            isActive: coupon.isActive,
            validUntil: coupon.validUntil ? coupon.validUntil : undefined
        },
    });

    useEffect(() => {
        form.reset({
            code: coupon.code,
            discountAmount: coupon.discountAmount,
            discountPercent: coupon.discountPercent,
            usageLimit: coupon.usageLimit,
            isActive: coupon.isActive,
            validUntil: coupon.validUntil ? coupon.validUntil : undefined
        });
    }, [open]);

    const onSubmit = async (values: EditCouponFormSchema) => {
        try {
            setIsLoading(true);
            await updateCoupon(coupon.id, values);
            toast({ title: 'Cupom editado com sucesso', variant: 'success' });
            form.reset();
            setOpen(false);
            refetch();
        } catch (error) {
            toast({ title: 'Falha ao editar cupom', description: 'Verifique os dados inseridos', variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger aria-haspopup="dialog">
                <Pencil className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edição de cupom</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField control={form.control} name="code" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Digite o código do cupom"  disabled={true}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="discountAmount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Desconto (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="Valor do desconto" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="discountPercent" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Desconto (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="Percentual de desconto" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="usageLimit" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Limite de uso</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="Limite de uso" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isActive" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ativo</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="validUntil" render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Data limite de validade</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
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
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )} />
                        <Button type="submit" className="w-full hover:bg-primary-purple hover:text-white" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-white">
                                    <Spinner /> <p>Salvando cupom</p>
                                </div>
                            ) : (
                                'Salvar'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
