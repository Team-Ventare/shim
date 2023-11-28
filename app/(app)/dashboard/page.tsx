"use server";

import DashboardLayout from "@/components/dashboard/dashboard";
import { Product } from "../products/columns";
import { getUserSession } from "@/lib/auth";

export type User = {
  id: string;
  image: string | undefined;
  email: string;
  name: string;
  role: string;
  cartId: string;
  cart: {
    products: Product[];
  };
  currentCheckout: {
    length: any;
    products: Product[];
  };
};

async function getNotifications() {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/notifications",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();
  return data;
}

async function getUsers() {
  const response = await fetch("https://shim-ventare.vercel.app/api/users", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data;
}

export default async function Dashboard() {
  // Initiate all requrests in parallel
  const usersData = getUsers();
  const notificationsData = getNotifications();

  // Wait for all promises to resolve
  const [users, notifications] = await Promise.all([
    usersData,
    notificationsData,
  ]);

  const user = await getUserSession();
  return (
    <DashboardLayout user={user} users={users} notifications={notifications} />
  );
}
