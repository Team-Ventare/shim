import { getUserSession } from "@/lib/auth";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";
import AddItemSheet from "@/components/inventory/actions/add-item";

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
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the assests in your database including their name,
            amount, location, type and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AddItemSheet />
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
