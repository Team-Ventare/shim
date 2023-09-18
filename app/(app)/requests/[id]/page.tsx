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
  console.log(data);

  return (
    <div className="h-screen py-10">
      <div className="border-b h-[400px] pb-0 mt-2">
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
          <div className="ml-8 grid grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Purchase Request ID
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.id}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Status
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.status}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-light text-gray-500">
                Priority
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.priority}
              </p>
            </div>

            <div className="col-span-3">
              <Label className="block text-sm font-light text-gray-500">
                Description
              </Label>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {data.title}
                <p className="text-xs leading-5 text-gray-500">
                  <br />
                  {data.description}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[480px] py-2">
        <div className="container py-12">
          <h1 className="text-2xl font-semibold">Request Details</h1>

          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md mt-8"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4">
                Admin Review History
              </AccordionTrigger>
              <AccordionContent className="px-4 border-t pt-4">
                <p className="text-sm font-normal leading-6 text-gray-900">
                  No admin review history found.
                </p>
              </AccordionContent>
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
