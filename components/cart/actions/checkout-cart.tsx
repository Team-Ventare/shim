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
} from "@/components/ui/alert-dialog"
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import React from "react";
import { checkoutItems } from "./checkout-items";
import { deleteItemFromCart } from "./delete-item";
import { refreshCart } from "./refresh-cart";

export default function CheckoutCart({ selectedRows }: { selectedRows: any }) {
  async function cartCheckout() {
    if(selectedRows.length===0){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "No products selected."
      });
    }
    else{
      //get the ids of the selected rows
      const ids = selectedRows.map((row: any) => row.original.id); 
      const res = await checkoutItems({ ids });
      //there might be a better way to delete but ill leave it for now
      selectedRows.forEach(async (row: any) => {deleteItemFromCart({ product: row.original });});
      refreshCart();
      //remove the checkmark from the selected rows SETTIMEOUT WILL GIVE AN ERROR
      // setTimeout(() => {
      //   selectedRows.forEach((row: any) => { row.toggleSelected(false); });
      // }, 1500);
      selectedRows.forEach((row: any) => { row.toggleSelected(false); });
      toast({
        title: "Success!",
        description: `${selectedRows.length} product(s) have been checked out.`,
      });
    }
  }

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex text-white bg-blue-500 hover:bg-blue-600 hover:text-white"
        >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Checkout
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm</AlertDialogTitle>
        <AlertDialogDescription>
        Are you sure you want to checkout the selected item(s)?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
              className="cursor-pointer"
              onClick={async () => {cartCheckout();}}
            >
              Confirm
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  );
}
