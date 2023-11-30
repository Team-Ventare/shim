"use client";

import { NewsPost } from "./page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditNewsPost from "@/components/news/edit-news-post";
import DeleteNewsPost from "@/components/news/delete-news-post";
import { formatCreatedAt } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PostDisplay({
  data,
  userRole,
}: {
  data: NewsPost[];
  userRole: String;
}) {
  return (
    <>
      {data.map((post) => (
        <div
          key={post.id}
          className="relative isolate flex flex-col gap-8 lg:flex-row"
        >
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-80 xl:w-96 lg:shrink-0">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
              />
            )}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-x-4 text-xs">
              {formatCreatedAt(post.createdAt)}
              <Badge variant="outline">{post.label}</Badge>
              <div className="ml-auto space-x-2">
                <EditNewsPost post={post} userRole={userRole} />
                <DeleteNewsPost post={post} userRole={userRole} />
              </div>
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
                <Avatar className="h-10 w-10 text-zinc-950">
                  <AvatarImage
                    src={post.users.image as string}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>{post.users.name.at(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    {post.users.name}
                  </p>
                  <p className="text-gray-600">{post.users.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
