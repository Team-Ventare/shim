"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { priorities, statuses } from "@/components/purchaserequest/data";
import { DataTableColumnHeader } from "@/components/purchaserequest/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { deletePR } from "@/components/purchaserequest/actions/delete_request";
import { refresh_PR } from "@/components/purchaserequest/actions/refresh_page";

export interface PurchaseRequest {
  id: string;
  title: string;
  status: string;
  priority: string;
  label: string;
}

export type User = {
  id: string;
  name: string;
  email: number;
  role: string;
  image: string;
};

export const columns: ColumnDef<PurchaseRequest>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return status.view();
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return priority.view();
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user: User = row.getValue("users");

      if (!user) {
        return null;
      }

      return (
        <Button
          variant="outline"
          className="hover:bg-zinc-800 text-zinc-800 hover:text-zinc-50"
        >
          <div className="flex items-center space-x-2">
            <Avatar className="mr-2 h-7 w-7 text-zinc-950">
              <AvatarImage
                src={user.image as string}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>{user.name.at(0)}</AvatarFallback>
            </Avatar>
            {user.name}
          </div>
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

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
                navigator.clipboard.writeText(request.id);

                toast({
                  title: "Request ID copied",
                  description: `Request ID ${request.id} copied to clipboard`,
                });
              }}
            >
              Copy request ID
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  Delete request
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {request.title}?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="cursor-pointer"
                      onClick={async () => {
                        const res = await deletePR({ id: request.id});

                        if (res.error) {
                          toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:
                              "Purchase request could not be removed.",
                            action: (
                              <ToastAction altText="Try again">
                                Try again
                              </ToastAction>
                            ),
                          });
                        } else {
                          refresh_PR();
                          toast({
                            title: "Success!",
                            description: `Purchase request has been removed from your cart.`,
                          });
                        }
                      }}
                    >
                      Confirm
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/purchaserequests/${request.id}`}>
                View request details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
