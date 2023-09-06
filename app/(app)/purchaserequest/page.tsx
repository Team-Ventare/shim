import { getUserSession } from "@/lib/auth";
import { PurchaseRequest, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<PurchaseRequest[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/purchaserequests",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch purchase request.");
  }

  const data = await response.json();
  return data;
}

export default async function PurchaseRequestPage() {
  const data = await getData();
  const user = await getUserSession();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} userId={user.id} />
    </div>
  );
}
