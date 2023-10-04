import AddNewsPost from "@/components/news/add-news-post";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "../dashboard/page";
import PostDisplay from "./post-display";

export type NewsPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  imageUrl: string | undefined;
  label: string;
  users: User;
};

async function getData(): Promise<NewsPost[]> {
  const response = await fetch("https://shim-ventare.vercel.app/api/newspost", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return data;
}

export default async function NewsPage() {
  const data = await getData();
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

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
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AddNewsPost userId={session.user.id} />
        </div>
      </div>
      <div className="mt-8 lg:mt-12 space-y-16">
        <PostDisplay data={data} />
      </div>
    </div>
  );
}
