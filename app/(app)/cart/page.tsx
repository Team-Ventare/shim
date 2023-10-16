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
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Cart
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Select products to checkout with a provided course name, view specific product details, or delete products from your cart.
          </p>
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
