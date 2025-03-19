'use client'
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetStoreResume } from "@/hooks/useGetStoreResume"
import { mask } from "@/lib/mask"
import Image from "next/image"

export default function HomePage() {

    const { data, isLoading, isError } = useGetStoreResume()

    return (
        <div className="space-y-8">
            <Header title='Dashboard' />
            {isLoading && <LoadLayout />}

            {!isLoading && isError && 'Houve um erro (improve error view in the future)'}

            {!isLoading && data && <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Pedidos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.ordersLastSevenDays.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Produtos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.productsAmount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Clientes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.customersAmount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total em vendas (Ultimos 7 dias)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mask.money(data.totalSales)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Últimos Pedidos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data?.ordersLastSevenDays.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-medium">{order.id}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.customer.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{mask.money(order.total)}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Produtos em fim de Estoque (Menos de 10)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data?.productsWithLowStock.map((product) => (
                                    <div
                                        key={product.name}
                                        className="grid md:grid-cols-5 md:grid-rows-1 items-center justify-between"
                                    >
                                        <Image
                                            src={product?.images[0]?.url || '/placeholder.svg'}
                                            width={50}
                                            height={50}
                                            alt={product.name}
                                            className="rounded-md"
                                        />

                                        <div className="md:col-span-4 flex md:flex-row flex-col md:items-center items-start justify-between">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {product.category.name}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {mask.money(product.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>}
        </div>
    )
}

function LoadLayout() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="w-full h-88" />
                <Skeleton className="w-full h-88" />
            </div>
        </>
    );

}