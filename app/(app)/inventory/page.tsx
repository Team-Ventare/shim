import { getUserSession } from "@/lib/auth";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Product[]> {
  const response = await fetch("https://shim-ventare.vercel.app/api/inventory");

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  const data = await response.json();
  return data;
}

export default async function InventoryPage() {
  const data = await getData();
  const session = await getUserSession();

  return (
    <div className="container mx-auto py-10">
      {session && (
        <div className="bg-green-50 dark:bg-gray-800 border border-green-400 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <p className="text-green-800 dark:text-green-400 text-md">
              {JSON.stringify(session)}
            </p>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={data} />
    </div>
  );
}
