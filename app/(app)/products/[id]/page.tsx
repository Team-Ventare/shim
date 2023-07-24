import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoreHorizontal } from "lucide-react";
import Hospital from "@/public/hospital.png";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../columns";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cn } from "@/lib/utils";

const checkoutHistory = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "ADMIN",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    checkout: "3h ago",
    room: "Room 203",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    checkout: "2d ago",
    room: "Room 202",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    checkout: "5d ago",
    room: "Room 201",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    checkout: "1w ago",
    room: "Room 102",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    checkout: "2w ago",
    room: "Room 101",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    checkout: "2w ago",
    room: "Room 203",
  },
];

async function getData(id: string): Promise<Product> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/products/${id}`
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

  async function deleteProduct() {
    "use server";

    const res = await fetch(
      `https://shim-ventare.vercel.app/api/products/${params.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      revalidatePath("/products");
      redirect("/products");
    }
  }

  return (
    <div className="h-screen py-10">
      <div className="border-b h-[360px] mt-16">
        <div className="container pt-12">
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <p className="text-sm text-gray-500">{data.type}</p>
          <p className="text-sm text-gray-500">{data.location}</p>
          <p className="text-sm text-gray-500">{data.status}</p>
          <p className="text-sm text-gray-500">{data.amount}</p>
          <p className="text-sm text-gray-500">Description</p>
        </div>
      </div>
      <div className="h-[480px]">
        <div className="container py-12">
          <h1 className="text-2xl font-semibold">Product Details</h1>

          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md mt-8"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4">
                Checkout History
              </AccordionTrigger>
              {checkoutHistory.map((person, index) => {
                return (
                  <AccordionContent
                    key={index}
                    className={cn(
                      "px-2",
                      index === 0 ? "border-t pt-4" : undefined
                    )}
                  >
                    <div className="flex justify-between gap-x-6">
                      <div className="flex gap-x-4">
                        <Image
                          height={48}
                          width={48}
                          className="flex-none rounded-full bg-gray-50"
                          src={person.imageUrl}
                          alt=""
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-normal leading-6 text-gray-900">
                            {person.name}
                          </p>
                          <p className="truncate text-xs leading-5 text-gray-500">
                            {person.email}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {person.room}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          Checked out {person.checkout}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4">
                Maintenance History
              </AccordionTrigger>
              <AccordionContent className="px-2 border-t pt-4">
                <p className="text-sm font-normal leading-6 text-gray-900">
                  No maintenance history found.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
