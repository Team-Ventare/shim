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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
