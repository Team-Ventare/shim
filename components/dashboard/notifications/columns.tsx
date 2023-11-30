"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/inventory/data-table-column-header";
import { INotification } from "./notifications-dashboard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCreatedAt } from "@/lib/utils";

export const columns: ColumnDef<INotification>[] = [
  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notification" />
    ),
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center space-x-1 py-1">
          <Avatar className="mr-1 h-10 w-10 text-zinc-950">
            <AvatarImage
              src={product.user.image as string}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{product.user.name?.at(0)}</AvatarFallback>
          </Avatar>
          <p className="font-medium">{product.user.name}</p>
          <p>{product.message}.</p>
        </div>
      );
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const notification = row.original;

      return <Badge variant="outline">{notification.category}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const notification = row.original;

      return <span>{formatCreatedAt(notification.createdAt)}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
