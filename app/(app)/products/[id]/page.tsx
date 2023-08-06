import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Product } from "../columns";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import hospital from "../../../../public/hospital.png";
import Link from "next/link";
import EditItemSheet from "@/components/inventory/actions/edit-product";
import DeleteItem from "@/components/inventory/actions/delete-product";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { statuses, types } from "@/components/inventory/data";

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
    `https://shim-ventare.vercel.app/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  } else {
    revalidatePath(`/products/${id}`);
  }

  const data = await response.json();
  return data;
}

async function getCheckoutHistory(id: string) {
  const data = await prisma.checkoutHistory.findMany({
    where: {
      Products: {
        some: {
          id: id,
        },
      },
    },
    include: {
      Users: true,
    },
  });

  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const history = await getCheckoutHistory(params.id);
  const status = statuses.find((status) => status.value === data.status);
  const type = types.find((type) => type.value === data.type);

  if (!status || !type) {
    return null;
  }

  return (
    <div className="h-screen py-10">
      <div className="border-b h-[360px] mt-2">
        <div className="container flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="overflow-hidden whitespace-nowrap">
            <HomeIcon className="h-4 w-4" />
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            href="/products"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            Inventory
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{data.name}</div>
        </div>
        <div className="container flex mt-8">
          <Image
            priority={true}
            src={hospital}
            alt="Photo by Drew Beamer"
            className="rounded-sm object-cover"
            width={400}
            height={(9 / 16) * 400}
          />

          <div className="ml-8 grid grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Name
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.name}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Status
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {status.view()}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Category
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {type.view()}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Location
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.location}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Quantity
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.amount}
              </p>
            </div>
            <div className="col-span-3">
              <Label className="block text-sm font-light text-gray-500">
                Description
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Malesuada nunc vel risus commodo. Proin nibh nisl condimentum
                id.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start space-x-2">
            <div>
              <DeleteItem id={params.id} />
            </div>
            <div>
              <EditItemSheet product={data} />
            </div>
          </div>
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
              {history.map((object, index) => {
                return (
                  <AccordionContent
                    key={index}
                    className={cn(
                      "px-2",
                      index === 0 ? "border-t pt-4" : undefined
                    )}
                  >
                    <div className="flex justify-between gap-x-6">
                      <div className="flex gap-x-2 justify-center">
                        <Avatar className="h-10 w-10 text-zinc-950 flex-shrink-0">
                          <AvatarImage
                            src={undefined}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback>
                            {object.Users.name.at(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-normal leading-6 text-gray-900">
                            {object.Users.name}
                          </p>
                          <p className="truncate text-xs leading-5 text-gray-500">
                            {object.Users.email}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {object.course}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          {object.createdAt.toDateString()}
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
              <AccordionContent className="px-4 border-t pt-4">
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
