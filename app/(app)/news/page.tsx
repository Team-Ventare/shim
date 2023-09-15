async function getData() {
  const response = await fetch("https://shim-ventare.vercel.app/api/news", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return data;
}

export default async function NewsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            News
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Your weekly dose of news updates from the smart hospital.
          </p>
        </div>
      </div>
    </div>
  );
}
