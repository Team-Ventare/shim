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
import { deletePR } from "@/components/purchaserequest/actions/delete_request";
import { refresh_PR } from "@/components/purchaserequest/actions/refresh_page";
import { User } from "next-auth";
import { Users } from "@prisma/client";

export interface PurchaseRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  status: string;
  priority: string;
  label: string;
  description: string;
  price: string;
  amount: number;
  reason: string;
  userId: string;
  users: Users;
  imageUrl: string;
}

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
      const request = row.original;

      return (
        <a href={`/requests/${request.id}`} className="hover:underline">
          {request.title}
        </a>
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
      <DataTableColumnHeader column={column} title="Submitted by" />
    ),
    cell: ({ row }) => {
      const user: User = row.getValue("users");

      if (!user) {
        return null;
      }

      return (
        <div className="flex items-center space-x-1">
          <Avatar className="mr-2 h-6 w-6 text-zinc-950">
            <AvatarImage
              src={user.image as string}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{user.name?.at(0)}</AvatarFallback>
          </Avatar>
          <p className="font-medium">{user.name}</p>
        </div>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
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
                        const res = await deletePR({ id: request.id });

                        if (res.error) {
                          toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:
                              "Purchase request could not be removed.",
                          });
                        } else {
                          refresh_PR();
                          toast({
                            variant: "destructive",
                            title: "Success!",
                            description: `${request.title} has been deleted.`,
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
              <Link href={`/requests/${request.id}`}>View request details</Link>
            </DropdownMenuItem>
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
