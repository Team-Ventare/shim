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
import { MoreHorizontal } from "lucide-react";
import Hospital from "@/public/hospital.png";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../columns";

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
    `https://shim-ventare.vercel.app/api/inventory/${id}`
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

  return (
    <div className="container mx-auto py-10 h-screen">
      <div className="h-fit border rounded-lg">
        <div className="h-1/4 border-b">
          <div className="flex justify-between items-center py-2 px-4">
            <h1 className="text-xl">Product Details</h1>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="hover:bg-gray-100">
                    <Link className="w-full" href={`/projects/${data.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="text-red-500 hover:bg-red-100 hover:text-red-700 cursor-pointer">
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="tracking-normal font-medium">
                    Do you want to delete this product?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to
                    permanently delete this product?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <form>
                    <Button type="submit" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col lg:flex-row justify-between py-2 px-4">
            <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-3">
              <p className="text-sm">
                <span className="font-semibold">Name:</span> {data.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Quantity:</span> {data.amount}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Location:</span> {data.location}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Category:</span> {data.type}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span> {data.status}
              </p>
              <p className="text-sm col-span-2">
                <span className="font-semibold">Description:</span> Nitrate is a
                nitrogen oxoanion formed by loss of a proton from nitric acid.
                Principal species present at pH 7.3. It is a nitrogen oxoanion,
                a member of reactive nitrogen species and a monovalent inorganic
                anion. It is a conjugate base of a nitric acid.
              </p>
            </div>

            <Image
              src={Hospital}
              alt={data.name}
              width={250}
              height={250}
              className="border rounded-sm object-contain"
            />
          </div>
        </div>

        <div className="py-2 px-4">
          <h1 className="text-xl">Checkout History</h1>

          <div className="flex flex-col">
            <ul role="list" className="divide-y divide-gray-100">
              {checkoutHistory.map((person) => (
                <li
                  key={person.email}
                  className="flex justify-between gap-x-6 py-5"
                >
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
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {person.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.room}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Checked out {person.checkout}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
