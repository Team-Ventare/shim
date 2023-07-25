import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import Image from "next/image";
  import { PurchaseRequest } from "../columns";
  import { cn } from "@/lib/utils";
  import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
  import { Label } from "@/components/ui/label";
  import Logo from "../../../../public/logo1.png";
  import Link from "next/link";
  import EditItemSheet from "@/components/purchaserequest/edit-item";
  import DeleteItem from "@/components/inventory/delete-item";
  import { revalidatePath } from "next/cache";
  
  const checkoutHistory = [
    {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        role: "Director of Product",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        checkout: "1d ago",
        status: "APPROVED",
      },
    {
      name: "Dries Vincent",
      email: "dries.vincent@example.com",
      role: "Business Relations",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      checkout: "8d ago",
      status: "DENIED",
    },
    {
      name: "Courtney Henry",
      email: "courtney.henry@example.com",
      role: "Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      checkout: "3w ago",
      status: "APPROVED",
    },
    
  ];
  
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
      revalidatePath(`/products/${id}`);
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
  
    return (
      <div className="h-screen py-10">
        <div className="border-b h-[400px] pb-0 mt-2">
          <div className="container flex items-center space-x-1 text-sm text-muted-foreground">
            <Link href="/" className="overflow-hidden whitespace-nowrap">
              <HomeIcon className="h-4 w-4" />
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <Link
              href="/products"
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              Purchase Requests
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <div className="font-medium text-foreground">{data.title}</div>
          </div>
          <div className="container flex mt-8">
            <Image
              priority={true}
              src={Logo}
              alt="Photo by Drew Beamer"
              className="rounded-sm object-cover"
              width={300}
              height={300}
            />
  
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
                  <br/>Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, 
                  and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, 
                  which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched 
                  to the skin and splattered with mud.
                  Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, 
                  and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, 
                  which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched 
                  to the skin and splattered with mud.
                  
                  </p>
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <div>
                <DeleteItem id={params.id} />
              </div>
              
              <div>
                {/* <EditItemSheet product={data} />  */}
                <EditItemSheet/>
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
                            {person.status}
                          </p>
                          <p className="text-xs leading-5 text-gray-500">
                             {person.checkout}
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
  