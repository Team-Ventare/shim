"use client";

import { NewsPost } from "./page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditNewsPost from "@/components/news/edit-news-post";
import { Delete } from "lucide-react";
import DeleteNewsPost from "@/components/news/delete-news-post";

export default function PostDisplay({ data }: { data: NewsPost[] }) {
  return (
    <>
      {data.map((post) => (
        <div
          key={post.id}
          className="relative isolate flex flex-col gap-8 lg:flex-row max-w-4xl"
        >
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
              alt=""
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.createdAt} className="text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {post.label}
              </span>
              <div className="ml-auto space-x-2">
                <EditNewsPost post={post} />
                <DeleteNewsPost post={post} />
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
