import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PurchaseRequest } from "../columns";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { priorities, statuses } from "@/components/purchaserequest/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditRequest from "@/components/purchaserequest/actions/edit_request";
import ChangeRequestStatus from "@/components/purchaserequest/actions/change_request_status";
import DeleteRequest from "@/components/purchaserequest/actions/delete_request_w_dialog";
import { getUserSession } from "@/lib/auth";
import { refresh_PR } from "@/components/purchaserequest/actions/refresh_page";

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
    refresh_PR();
  }

  const data = await response.json();
  return data;
}

export default async function PurchaseRequestPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserSession();
  const data = await getData(params.id);
  const status = statuses.find((s) => s.value === data.status);
  const priority = priorities.find((s) => s.value === data.priority);

  if (!status || !priority) {
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
            href="/requests"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            Purchase Requests
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{data.title}</div>
        </div>
        <div className="relative isolate flex flex-col gap-10 lg:flex-row mx-8">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-80 xl:w-96 lg:shrink-0">
            {data.imageUrl && (
              <img
                src={data.imageUrl}
                alt=""
                className="flex-auto inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
              />
            )}
            <div className="flex-auto inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="w-full">
            <div className="ml-2 mr-2 grid grid-rows-5 grid-flow-col gap-4">
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Title
                </Label>
                <p className="mt-1 text-sm font-light text-zinc-950">
                  {data.title}
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
                  Priority
                </Label>
                {priority.view()}
              </div>
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Quantity
                </Label>
                <p className="mt-1 text-sm font-light text-zinc-950">
                  {data.amount}
                </p>
              </div>
              <div>
                <Label className="block text-sm font-semibold text-zinc-950">
                  Requester
                </Label>
                <p className="mt-1 text-sm font-light text-zinc-950">
                  {data.users.name}
                </p>
              </div>
              <div className="flex flex-grow space-x-2 justify-end">
                <div className="ml-auto">
                  <EditRequest userInfo={user} request={data} />
                </div>
                <div className="ml-auto">
                  <ChangeRequestStatus userInfo={user} request={data} />
                </div>
                <div className="ml-auto">
                  <DeleteRequest userInfo={user} request={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[360px] py-2">
        <div className="container py-5 mx-auto border-t border-gray-900/5">
          <h1 className="text-xl font-semibold">Purchase Request Details</h1>
          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md mt-8"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4">
                Additional Information
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 border-t pt-4">
                <div className="col-span-3">
                  <Label className="mt-1 block text-sm font-semibold text-zinc-950">
                    Price:
                  </Label>
                  <p className="mt-1 text-sm font-light text-gray-500">
                    {data.price}
                  </p>
                </div>
                <div>
                  <Label className="mt-1 block text-sm font-semibold text-zinc-950">
                    Description:
                  </Label>
                  <p className="mt-1 text-sm font-light text-gray-500">
                    {data.description}
                  </p>
                </div>
                <div className="col-span-3">
                  <Label className="mt-1 block text-sm font-semibold text-zinc-950">
                    Reason:
                  </Label>
                  <p className="mt-1 text-sm font-light text-gray-500">
                    {data.reason}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4">
                Requester Information
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 border-t pt-4 ">
                <div className="flex justify-between gap-x-6">
                  <div className="flex gap-x-2 justify-center">
                    <Avatar className="h-10 w-10 text-zinc-950 flex-shrink-0">
                      <AvatarImage
                        src={data.users.image as string}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback>
                        {data.users.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-normal leading-6 text-gray-900">
                        {data.users.name}
                      </p>
                      <p className="truncate text-xs leading-5 text-gray-500">
                        {data.users.email}
                      </p>
                    </div>
                  </div>
                  <div className=" sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900 items-end">
                      Role:{" "}
                      {data.users.role.charAt(0).toUpperCase() +
                        data.users.role.slice(1).toLowerCase()}
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
