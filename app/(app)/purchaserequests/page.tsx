import { getUserSession } from "@/lib/auth";

interface PurchaseRequest {
  id: number;
  userId: string;
  name: string;
  price: number;
  category: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

async function getData(): Promise<PurchaseRequest[]> {
  const response = await fetch(
    "https://shim-ventare.vercel.app/api/purchaserequests"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch purchase requests.");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export default async function PurchaseRequestPage() {
  const data = await getData();
  const session = await getUserSession();

  return (
    <div className="container mx-auto py-10">
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
