"use client";

import { Button } from "@/components/ui/button";

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
import React from "react";
import { CheckIcon, SwatchIcon } from "@heroicons/react/24/outline";
import { prismaReturn } from "./prisma-return";

export default function DeleteManyItems({
  userId,
  selectedRows,
}: {
  userId: string;
  selectedRows: any;
}) {
  async function cartDelete() {
    if (selectedRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Please select some products to return.",
      });
      return;
    } else {
      const res = await prismaReturn(userId, selectedRows);

      if (res) {
        selectedRows.forEach((row: any) => {
          row.toggleSelected(false);
        });
        toast({
          title: "Success!",
          description: "Products returned to inventory.",
        });
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <SwatchIcon className="mr-2 h-4 w-4" />
          Return
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <CheckIcon className="h-6 w-6 text-green-600 bg-green-100 mr-2 rounded-full" />
            Confirm
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to return the selected item(s) to inventory?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="cursor-pointer"
              onClick={async () => {
                cartDelete();
              }}
            >
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
