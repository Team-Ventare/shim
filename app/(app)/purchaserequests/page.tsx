import { PurchaseRequest, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<PurchaseRequest[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/purchaserequests",
    {
      next: { revalidate: 30 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export default async function PurchaseRequestPage() {
  const data = await getData();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            ***ADMIN ACCESS ONLY***
          </h2>
          <p className="text-muted-foreground">
            Displaying history of all purchase requests!
          </p>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
