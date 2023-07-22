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

import { toast } from "@/components/ui/use-toast";
import React from "react";

export default function CheckoutCart() {
  

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
          onClick={() => {
            toast({
              title: "Success!",
              description: `Item(s) checked out.`,
            });
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
