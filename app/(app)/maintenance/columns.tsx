"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { statuses } from "@/components/preventativemaintenance/data";
import { DataTableColumnHeader } from "@/components/preventativemaintenance/data-table-column-header";
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
import { deletePM } from "@/components/preventativemaintenance/actions/delete_report";
import { refresh_PM } from "@/components/preventativemaintenance/actions/refresh_page";
import { User } from "next-auth";
import { Users } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export interface PreventativeMaintenance {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  technician: string;
  status: string;
  //priority: string;
  label: string /*xxx*/;
  comments: string;
  userId: string;
  users: Users;
  imageUrl: string;
}

export const columns: ColumnDef<PreventativeMaintenance>[] = [
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
    accessorKey: "technician",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Technician" />
    ),
    cell: ({ row }) => {
      const report = row.original;

      return (
        <a href={`/maintenance/${report.id}`} className="hover:underline">
          {report.technician}
        </a>
      );
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uploaded by" />
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
          <p className="font-semibold">{user.name}</p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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

      //return status.view();
      return <Badge variant="outline">{status.label}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original;

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
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/maintenance/${report.id}`}>
                View report details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(report.id);

                toast({
                  title: "Report ID copied",
                  description: `Report ID ${report.id} copied to clipboard`,
                });
              }}
            >
              Copy report ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  Delete report
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete report from{" "}
                    {report.technician}?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="cursor-pointer"
                      onClick={async () => {
                        const res = await deletePM({ id: report.id });

                        if (res.error) {
                          toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: "Report could not be removed.",
                          });
                        } else {
                          refresh_PM();
                          toast({
                            variant: "destructive",
                            title: "Success!",
                            description: `${report.technician} has been deleted.`,
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
