"use server";

import DashboardLayout from "@/components/dashboard/dashboard";
import { Product } from "../products/columns";

export type User = {
  status: string;
  id: string;
  image: string | undefined;
  email: string;
  name: string;
  role: string;
  cartId: string;
  cart: {
    products: Product[];
  };
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
