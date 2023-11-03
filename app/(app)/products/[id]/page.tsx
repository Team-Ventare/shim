import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Product } from "../columns";
import { cn, formatCreatedAt } from "@/lib/utils";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import hospital from "../../../../public/hospital.png";
import Link from "next/link";
import EditItemSheet from "@/components/inventory/actions/edit-product";
import DeleteItem from "@/components/inventory/actions/delete-product";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { statuses, types } from "@/components/inventory/data";
import { getUserSession } from "@/lib/auth";

async function getData(id: string): Promise<Product> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data;
}

async function getCheckoutHistory(id: string) {
  const data = await prisma.checkoutHistory.findMany({
    where: {
      products: {
        some: {
          id: id,
        },
      },
    },
    include: {
      users: true,
    },
    orderBy: {
      createdAt: "desc",
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
  const user = await getUserSession();
  const status = statuses.find((status) => status.value === data.status);
  const type = types.find((type) => type.value === data.type);

  if (!status || !type) {
    return <div>Not found</div>;
  }
  return (
    <div className="container mx-auto space-y-5">
      <div className="mt-8 lg:mt-12 space-y-10">
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

        <div className="relative isolate flex flex-col gap-10 lg:flex-row mx-8">
            {/* STILL NEED TO UPDATE THE IMAGE BUT NEED BLOB SERVICE TO WORK AGAIN */}
            <Image
              priority={true}
              src={hospital}
              alt="Photo by Drew Beamer"
              className="rounded-sm object-cover"
              width={400}
              height={(9 / 16) * 400}
            />

          <div className="w-full">
            <div className="ml-2 mr-2 grid grid-rows-5 grid-flow-col gap-4">
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Name
                </Label>
                <p className="mt-1 text-sm font-light text-zinc-950">
                  {data.name}
                </p>
              </div>
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Status
                </Label>
                {status.view()}
              </div>
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Category
                </Label>
                {type.view()}
              </div>
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Location
                </Label>
                <p className="mt-1 text-sm font-light text-zinc-950">
                  {data.location}
                </p>
              </div>
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Quantity
                </Label>
                <p className="mt-1 text-sm font-light text-zinc-950">
                  {data.amount}
                </p>
              </div>
              <div className="flex flex-grow space-x-2 justify-end">
                <div className="ml-auto">
                  <DeleteItem id={params.id} userInfo={user} />
                </div>
                <div className="ml-auto">
                  <EditItemSheet product={data} userInfo={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[360px] py-2">
        <div className="container py-5 mx-auto border-t border-gray-900/5">
          <h1 className="text-xl font-semibold">Product Details</h1>
          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md mt-6"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4">
                Additional Information
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 border-t pt-4">
                <div className="col-span-3">
                  <Label className="mt-1 block text-sm font-semibold text-zinc-950">
                    Description:
                  </Label>
                  <p className="mt-1 text-sm font-light text-gray-500">
                    {data.description}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4">
                Checkout History
              </AccordionTrigger>
              {history.map((object, index) => {
                return (
                  <AccordionContent key={index} className="border-t p-2">
                    <div className="flex justify-between gap-x-6">
                      <div className="flex gap-x-2 justify-center">
                        <Avatar className="h-10 w-10 text-zinc-950 flex-shrink-0">
                          <AvatarImage
                            src={object.users.image as string}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback>
                            {object.users.name.at(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-auto">
                          <p className="text-sm font-normal leading-6 text-gray-900">
                            {object.users.name}
                          </p>
                          <p className="truncate text-xs leading-5 text-gray-500">
                            {object.users.email}
                          </p>
                        </div>
                      </div>
                      <div className=" sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900 items-end">
                          {object.course}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          {/* can change to add time? seems ok like this though */}
                          {new Date(object.createdAt).toDateString()}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
            <AccordionItem value="item-3">
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
