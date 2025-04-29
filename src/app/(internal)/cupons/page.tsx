import { CouponList } from "@/components/coupons/couponList";
import { Header } from "@/components/layout/header";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Header title="Cupons" />
      <CouponList />
    </div>
  );
}
