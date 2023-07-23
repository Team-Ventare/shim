import { getUserSession } from "@/lib/auth";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

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
  console.log(data);
  return data;
}

export default async function Cart() {
  const user = await getUserSession();
  const data = await getData(user.cartId);

  return (
    <div className="container mx-auto py-10">
      {user && (
        <div className="bg-blue-50 dark:bg-gray-800 border border-blue-400 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <p className="text-blue-800 dark:text-blue-400 text-md">
              {JSON.stringify(user)}
            </p>
          </div>
        </div>
      )}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
