"use client";

import { User } from "@/app/(app)/dashboard/page";
import { UserList } from "@/components/dashboard/users/user-list";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SettingsDashboard } from "./settings/settings-dashboard";
import {
  INotification,
  NotificationsDashboard,
} from "./notifications/notifications-dashboard";

export default function DashboardLayout({
  user,
  users,
  notifications,
}: {
  user: User;
  users: User[];
  notifications: INotification[];
}) {
  return (
    <div className="container mx-auto py-6">
      <div className="flex-1 space-y-4">
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
            <NotificationsDashboard notifications={notifications} />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <UserList users={users} currentUser={user} />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsDashboard user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
