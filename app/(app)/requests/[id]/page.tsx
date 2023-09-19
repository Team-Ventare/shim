import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import stretcher from "../../../../public/stretcher.png";
import { PurchaseRequest } from "../columns";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { priorities, statuses } from "@/components/purchaserequest/data";
import { getUserSession } from "@/lib/auth";
import { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getData(id: string): Promise<PurchaseRequest> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  } else {
    revalidatePath(`/requests/${id}`);
  }

  const data = await response.json();
  return data;
}

export default async function PurchaseRequestPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  //get user session
  const user = await getUserSession();
  const status = statuses.find((s) => s.value === data.status);
  const priority = priorities.find((s) => s.value === data.priority);
  console.log(data);

  if (!status||!priority) {
    return <div>Not found</div>;
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
            href="/requests"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            Purchase Requests
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{data.title}</div>
        </div>
        <div className="container flex mt-8">
          <div>
            <Image
              priority={true}
              src={stretcher}
              alt="Photo by Drew Beamer"
              className="rounded-sm object-cover"
              width={300}
              height={300}
            />
          </div>
          <div className="ml-8 grid grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Title
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.title}
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
                Priority
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {priority.view()}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Requester
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {user.name}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Price
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                ${data.price}
              </p>
            </div>
            {/* add image*/}
            {/* <div>
              <Label className="block text-sm font-light text-gray-500">
                Reason
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.reason}
              </p>
            </div>
            <div className="col-span-3">
              <Label className="block text-sm font-light text-gray-500">
                Description
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.description}
              </p>
            </div> */}
          </div>
          <div className="flex flex-row items-start space-x-2">
            {/* <div>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-zinc-950 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    Accept
                    <ChevronRightIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="h-[480px] py-2">
        <div className="container py-12">
          <h1 className="text-xl font-semibold">Purchase Request Details</h1>

          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md mt-8"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4">
                Description
              </AccordionTrigger>
              <AccordionContent className="px-4 border-t pt-4">
              <div>
                <Label className="block text-sm font-light text-gray-500">
                  Description
                </Label>
                <p className="mt-1 text-sm font-semibold text-zinc-950">
                  {data.description}
                </p>
              </div>
              <div className="col-span-3">
                <Label className="block text-sm font-light text-gray-500">
                  Reason
                </Label>
                <p className="mt-1 text-sm font-semibold text-zinc-950">
                  {data.reason}
                </p>
              </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4">
                Requester Information
              </AccordionTrigger>
              {/* <AccordionContent className="px-4 border-t pt-4"> */}
              <AccordionContent className="px-4 border-t pt-4">
                <div className="flex justify-between gap-x-6">
                  <div className="flex gap-x-2 justify-center">
                    <Avatar className="h-10 w-10 text-zinc-950 flex-shrink-0">
                      <AvatarImage
                        src={undefined}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback>
                      {user.name.at(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-normal leading-6 text-gray-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs leading-5 text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {/* show user role and have first letter upper case while the rest lower case */}
                      Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                    </p>
                    <p className="text-xs leading-5 text-gray-500">
                      Created on: {new Date(data.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
