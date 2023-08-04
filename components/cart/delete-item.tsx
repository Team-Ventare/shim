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
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { deleteItemFromCart } from "@/app/(app)/cart/actions";
import React from "react";

export default function DeleteItem({ selectedRows }: { selectedRows: any }) {
  async function cartDelete() {
    var test:boolean = true; //maybe there are better methods to run this function
    
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
            "Product(s) could not be removed.",
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
        description: `${selectedRows.length} product(s) have been removed from your cart.`,
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
        className="ml-auto hidden h-8 lg:flex text-white bg-red-500 hover:bg-red-600 hover:text-white"
        >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm</AlertDialogTitle>
        <AlertDialogDescription>
        Are you sure you want to delete the selected item(s) from your cart?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
              className="cursor-pointer"
              onClick={async () => {cartDelete();}}
            >
              Confirm
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  );
}
