"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type Product = {
  id: string;
  name: string;
  amount: number;
  location: string;
  type: string;
  status: "AVAILABLE" | "CHECKED_OUT";
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <a href={`/products/${product.id}`} className="hover:underline">
          {product.name}
        </a>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                toast({
                  title: "Success! Deleted from cart",
                  description: `${product.name} has been deleted from your cart.`,
                });
              }}
            >
              Delete from cart
            </DropdownMenuItem> */}

            <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-gray-700 pl-2 pr-9 select-none items-center rounded-sm py-1.5 cursor-pointer focus:bg-accent focus:text-accent-foreground"
            >
               Delete from cart
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm</AlertDialogTitle>
                <AlertDialogDescription>
                Are you sure you want to delete the item from your cart?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                <Button 
                onClick={() => {
                  toast({
                    // title: "Success! Deleted from cart",
                    // description: `${product.name} has been deleted from your cart.`,
                    variant: "destructive",
                    title: "Deleted from cart.",
                    description: `${product.name} has been deleted from your cart.`,
                    action: <ToastAction altText="Undo">Undo</ToastAction>,
                  });
                }}
                >
                Confirm
                </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

            <DropdownMenuSeparator />
            <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-gray-700 pl-2 pr-24 w-full text-left select-none rounded-sm py-1.5 cursor-pointer focus:bg-accent focus:text-accent-foreground"
              >
                Edit Item
              </Button>
            </DialogTrigger>
              <DialogContent className="sm:max-w-[250px]">
                <DialogHeader>
                  <DialogTitle>Edit Item</DialogTitle>
                  <DialogDescription>
                    Change the item amount.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input id="new_amount" className="col-span-4" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="items-left">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(product.id);

                toast({
                  title: "Success! Copied product ID",
                  description: `${product.name} ID has been copied to your clipboard.`,
                });
              }}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/products/${product.id}`}>View product details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
