import { Header } from "@/components/layout/header";
import { ListCoupons } from "@/components/pages/coupons/listCoupons";

export default function CouponsListPage(){
    return (
        <div className="space-y-8">
            <Header title="Cupons" />
            <ListCoupons />
        </div>
    )
}
