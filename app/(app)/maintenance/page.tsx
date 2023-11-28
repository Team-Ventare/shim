import { getUserSession } from "@/lib/auth";
import { PreventativeMaintenance, columns } from "./columns";
import { DataTable } from "./data-table";
import AddReportSheet from "@/components/preventativemaintenance/actions/add-report";

async function getData(): Promise<PreventativeMaintenance[]> {
  const response = await fetch("https://shim-ventare.vercel.app/api/reports", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  const data = await response.json();
  return data;
}

export default async function PreventativeMaintenancePage() {
  const data = await getData();
  const user = await getUserSession();

  return (
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Preventative Maintenance
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Submit a maintenance report for any of the assets in the hospital by
            uploading a PDF file.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AddReportSheet userId={user.id} />
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={data} userId={user.id} />
      </div>
    </div>
  );
}
