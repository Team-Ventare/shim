import { getUserSession } from "@/lib/auth";

interface Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  notes: string;
}

async function getData(): Promise<Supplier[]> {
  const response = await fetch("https://shim-ventare.vercel.app/api/suppliers");

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers.");
  }

  const data = await response.json();
  return data;
}

export default async function InventoryPage() {
  const session = await getUserSession();

  return <div className="container mx-auto py-10"></div>;
}
