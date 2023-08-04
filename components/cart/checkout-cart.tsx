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
import { deleteItemFromCart } from "@/app/(app)/cart/actions";
import React from "react";

export default function CheckoutCart({ selectedRows }: { selectedRows: any }) {
  async function cartCheckout() {
    var test:boolean = true;
    
    if(selectedRows.length===0){
      test=false;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "No products selected."
        });
    }
    else{
      selectedRows.forEach(async (row: any) => {
        const res = await deleteItemFromCart({ product: row.original });
        if (res.error) {
          toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "Product(s) could not be checked out.",
          action: (
            <ToastAction altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      }
      });
      if(test)
      {
      toast({
        title: "Success! Removed from cart.",
        description: `${selectedRows.length} product(s) have been checked out.`,
      });
      }
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
