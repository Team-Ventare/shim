import { getUserSession } from "@/lib/auth";
import { Supplier, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Supplier[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/suppliers",
    {
      next: { revalidate: 30 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers.");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export default async function SupplierPage() {
  const data = await getData();
  const session = await getUserSession();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
