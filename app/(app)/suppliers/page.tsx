import { getUserSession } from "@/lib/auth";
import { Supplier, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Supplier[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/suppliers",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers.");
  }

  const data = await response.json();
  return data;
}

export default async function SupplierPage() {
  const data = await getData();
  const session = await getUserSession();

  return (
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Suppliers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all local suppliers and their contact information.
          </p>
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
