import AddNewsPost from "@/components/news/add-news-post";
import { User } from "../dashboard/page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export type NewsPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  imageUrl: string | undefined;
  label: string;
  users: User[];
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
      <div className="mt-8 space-y-20 lg:mt-12 lg:space-y-20">
        {data.map((post) => (
          <article
            key={post.id}
            className="relative isolate flex flex-col gap-8 lg:flex-row"
          >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
              <img
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.createdAt} className="text-gray-500">
                  {post.createdAt}
                </time>
                <a
                  href={post.label}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.label}
                </a>
              </div>
              <div className="group relative max-w-xl">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <span className="absolute inset-0" />
                  {post.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                <div className="relative flex items-center gap-x-4">
                  <img
                    src={post.users[0].image}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post.users[0].name}
                    </p>
                    <p className="text-gray-600">{post.users[0].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
