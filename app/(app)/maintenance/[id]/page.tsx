import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import shimlogo from "../../../../public/scaledshimlogo.png";
import { PreventativeMaintenance } from "../columns";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { statuses } from "@/components/preventativemaintenance/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import EditRequest from "@/components/preventativemaintenance/actions/edit_report";
import { getUserSession } from "@/lib/auth";
import ChangeRequestStatus from "@/components/preventativemaintenance/actions/change_report_status";
import DeleteRequest from "@/components/preventativemaintenance/actions/delete_report_w_dialog";
import { Document, Page } from 'react-pdf';

async function getData(id: string): Promise<PreventativeMaintenance> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/reports/${id}`,
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

export default async function PreventativeMaintenancePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserSession();
  const data = await getData(params.id);
  const status = statuses.find((s) => s.value === data.status);

  if (!status) {
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
            href="/maintenance"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            Maintenance
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{data.technician}</div>
        </div>
        <div className="container flex mt-8">
          <div className="flex flex-col items-center justify-center ml-10 mr-10">
            <Image
              
              src={shimlogo}
              alt="Photo by Drew Beamer"
              className="rounded-sm object-cover"
              width={300}
              height={170}
            />
          </div>
          <div className="ml-8 mr-6 grid grid-cols-1 gap-4">
            <div>
              <Label className="block text-sm font-semibold text-zinc-950">
                Technician
              </Label>
              <p className="mt-1 text-sm font-light text-zinc-950">
                {data.technician}
              </p>
            </div>
            <div>
              <Label className="block text-sm font-semibold text-zinc-950">
                Status
              </Label>
              <Badge variant="outline">{status.label}</Badge>
            </div>

            <div>
              <Label className="block text-sm font-semibold text-zinc-950">
                Uploaded By
              </Label>
              <p className="mt-1 text-sm font-light text-zinc-950">
                {data.users.name}
              </p>
            </div>
          </div>
          { <div className="flex flex-row items-start space-x-2 ml-auto">
              <div>
                <EditRequest userInfo={user} request={data} />
              </div>
              <div>
                <ChangeRequestStatus userInfo={user} request={data} />
              </div>
              <div>
                <DeleteRequest userInfo={user} request={data} />
              </div>
    </div> }
        </div>
      </div>
      <div className="h-[480px] py-2">
        <div className="container py-12">
          <h1 className="text-xl font-semibold">Report Details</h1>

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
                <div>
                  <Label className="mt-1 block text-sm font-semibold text-zinc-950">
                    Comments:
                  </Label>
                  <p className="mt-1 text-sm font-light text-gray-500">
                    {data.comments}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4">
                Uploader Information
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
                      Role:{" "}
                      {data.users.role.charAt(0).toUpperCase() +
                        data.users.role.slice(1).toLowerCase()}
                    </p>
                    <p className="text-xs leading-5 text-gray-500">
                      Uploadeded report on:{" "}
                      {new Date(data.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="container py-12">
            <p className="font-bold">Error Not Loading?</p>
            Download Link - (Right Click, Save link as...){" "}
            <a href="/sample.pdf" className="underline">
              Click Here!
            </a>
          </div>
          <embed src={data.imageUrl} type="application/pdf" width="100%" height = "1150"/>
          
          

          
            <p>
              Alternative text - include a link{" "}
              <a href={data.imageUrl}>to the PDF!</a>
            </p>
          
          
        </div>
        
      </div>
    </div>
    
  );
}