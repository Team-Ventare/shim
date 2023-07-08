import { Product } from "../columns";

async function getData(id: string): Promise<Product> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/inventory/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  return <div className="container mx-auto py-10">{JSON.stringify(data)}</div>;
}
