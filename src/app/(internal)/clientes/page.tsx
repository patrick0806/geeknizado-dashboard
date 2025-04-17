import { Header } from "@/components/layout/header";
import { ListCustomers } from "@/components/pages/customers/listCustomers";

export default function CustomersListPage(){
    return (
        <div className="space-y-8">
            <Header title="Clientes" />
            <ListCustomers />
        </div>
    )
}
