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
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import React from "react";
import { deleteItemFromCart } from "./delete-item";
import { refreshCart } from "./refresh-cart";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DeleteManyItems({
  selectedRows,
}: {
  selectedRows: any;
}) {
  async function cartDelete() {
    if (selectedRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "No products selected to delete.",
      });
      return;
    } else {
      selectedRows.forEach(async (row: any) => {
        const res = await deleteItemFromCart({ product: row.original });
        if (res.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Product(s) could not be removed.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          //remove the checkmark from the selected rows
          refreshCart();
          toast({
            variant: "destructive",
            title: "Removed from cart.",
            description: `${row.original.name} has been removed from your cart.`,
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          });
        }
        // setTimeout(() => {
        //   selectedRows.forEach((row: any) => { row.toggleSelected(false); });
        // }, 1500);
        selectedRows.forEach((row: any) => {
          row.toggleSelected(false);
        });
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex text-white bg-red-500 hover:bg-red-600 hover:text-white"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
            Confirm
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the selected item(s) from your cart?
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
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
