"use server";

import DashboardLayout from "@/components/dashboard/dashboard";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

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
  const usersData = getUsers();

  const [users] = await Promise.all([usersData]);

  return <DashboardLayout users={users} />;
}
