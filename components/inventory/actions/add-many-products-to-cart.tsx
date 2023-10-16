"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { addProductToCart } from "./add-product-to-cart";
import { toast } from "@/components/ui/use-toast";

export default function AddManyProducts({ selected }: { selected: any }) {
  async function updateCart() {
    if (selected.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "No products selected.",
      });
      return;
    } else {
      selected.map(async (row: any) => {
        await addProductToCart({ product: row.original });
      });
      selected.forEach((row: any) => {
        row.toggleSelected(false);
      });
      toast({
        title: "Success!",
        description: `${selected.length} product(s) have been added to your cart.`,
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <Plus className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will add {selected.length} products to your cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={async () => {
                await updateCart();
              }}
            >
              Update Cart
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
