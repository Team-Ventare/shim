import { getUserSession } from "@/lib/auth";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(ids: string[]): Promise<Product[]> {
  const productPromises = ids.map(async (id) => {
    const response = await fetch(
      `https://shim-ventare.vercel.app/api/products/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }

    const data = await response.json();
    return data;
  });

  const products = await Promise.all(productPromises);
  console.log(products);
  return products;
}

export default async function Cart() {
  const session = await getUserSession();
  const ids = session?.cart ?? [];
  const data = await getData(ids);

  return (
    <div className="container mx-auto py-10">
      {session && (
        <div className="bg-blue-50 dark:bg-gray-800 border border-blue-400 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <p className="text-blue-800 dark:text-blue-400 text-md">
              {JSON.stringify(session)}
            </p>
          </div>
        </div>
      )}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
