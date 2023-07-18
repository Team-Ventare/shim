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
import React from "react";

export default function DeleteItem() {
  

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
          onClick={() => {
            toast({
              title: "Success!",
              description: `Item(s) has been deleted from your cart.`,
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
