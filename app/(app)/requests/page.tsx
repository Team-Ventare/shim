import { getUserSession } from "@/lib/auth";
import { PurchaseRequest, columns } from "./columns";
import { DataTable } from "./data-table";
import AddRequestSheet from "@/components/purchaserequest/actions/add-request";

async function getData(): Promise<PurchaseRequest[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/purchaserequests",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch purchase requests");
  }

  const data = await response.json();
  return data;
}

export default async function PurchaseRequestPage() {
  const data = await getData();
  const user = await getUserSession();

  return (
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Purchase Requests
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the purchase requests in your database including their
            title, status, priority and user.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AddRequestSheet userId={user.id} />
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={data} userId={user.id} />
      </div>
    </div>
  );
}
