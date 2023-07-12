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

export type PurchaseRequest = {
  id: string;
  name: string;
  price: number;
  category: "CONSUMABLE_SUPPLIES" | "OTHER";
  status: "AVAILABLE" | "CHECKED_OUT";
};

export const columns: ColumnDef<PurchaseRequest>[] = [
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
      const purchaserequest = row.original;

      return (
        <a href={`/purchaserequests/${purchaserequest.id}`} className="hover:underline">
          {purchaserequest.name}
        </a>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const purchaserequest = row.original;

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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                toast({
                  title: "Success! Added to cart",
                  description: `${purchaserequest.name} has been added to your cart.`,
                });
              }}
            >
              Add to cart
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(purchaserequest.id);

                toast({
                  title: "Success! Copied product ID",
                  description: `${purchaserequest.name} ID has been copied to your clipboard.`,
                });
              }}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/purchaserequests/${purchaserequest.id}`}>View product details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
