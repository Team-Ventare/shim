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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditRequest from "@/components/purchaserequest/actions/edit_request";
import ChangeRequestStatus from "@/components/purchaserequest/actions/change_request_status";
import DeleteRequest from "@/components/purchaserequest/actions/delete_request_w_dialog";

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
  const status = statuses.find((s) => s.value === data.status);
  const priority = priorities.find((s) => s.value === data.priority);
  //console.log(data);

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
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-80 xl:w-96 lg:shrink-0">
            {data.imageUrl && (
              <img
                src={data.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
              />
            )}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="ml-8 mr-6 grid grid-cols-1 gap-4">
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
                Amount
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
          </div>
          <div className="flex flex-row items-start space-x-2 ml-auto">
            <div>
              <EditRequest request={data} />
            </div>
            <div>
              <ChangeRequestStatus request={data} />
            </div>
            <div>
              <DeleteRequest id={data.id} />
            </div>
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
                Additional Information
              </AccordionTrigger>
              <AccordionContent className="px-4 border-t pt-4">
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
              <AccordionContent className="px-4 border-t pt-4">
                <div className="flex justify-between gap-x-6">
                  <div className="flex gap-x-2 justify-center">
                    <Avatar className="h-10 w-10 text-zinc-950 flex-shrink-0">
                      <AvatarImage
                        src={undefined}
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
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Role: {data.users.role.charAt(0).toUpperCase() + data.users.role.slice(1).toLowerCase()}
                    </p>
                    <p className="text-xs leading-5 text-gray-500">
                      Created request on: {new Date(data.createdAt).toDateString()}
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
