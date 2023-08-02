import { getUserSession } from "@/lib/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Product } from "../products/columns";

async function getData(cartId: string): Promise<Product[]> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/cart/${cartId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();
  return data.products;
}

export default async function Cart() {
  const user = await getUserSession();
  const data = await getData(user.cartId);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
