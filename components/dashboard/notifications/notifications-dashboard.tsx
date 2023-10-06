import { User } from "@/app/(app)/dashboard/page";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export interface INotification {
  id: string;
  createdAt: string;
  message: string;
  category: string;
  user: User;
}

export function NotificationsDashboard({
  notifications,
}: {
  notifications: INotification[];
}) {
  return (
    <div className="mx-auto py-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Notifications
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A collection of all notifications happening in the system.
          </p>
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={notifications} />
      </div>
    </div>
  );
}
