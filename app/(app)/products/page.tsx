import { getUserSession } from "@/lib/auth";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Product[]> {
  const response = await fetch("https://shim-ventare.vercel.app/api/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  const data = await response.json();
  return data;
}

export default async function ProductPage() {
  const data = await getData();
  const session = await getUserSession();

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
