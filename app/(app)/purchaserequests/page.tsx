import { getUserSession } from "@/lib/auth";

interface PurchaseRequest {
  id: number;
  createdAt: string;
  userId: string;
  price: number;
  category: string;
  status: string;
}

async function getData(): Promise<PurchaseRequest[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/purchaserequests"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers.");
  }

  const data = await response.json();
  return data;
}

export default async function InventoryPage() {
  const data = await getData();
  const session = await getUserSession();

  return (
    <div className="container mx-auto py-10">
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
