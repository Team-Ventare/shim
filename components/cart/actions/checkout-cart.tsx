"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import React from "react";
import { checkoutItems } from "./checkout-items";
import { deleteItemFromCart } from "./delete-item";
import { refreshCart } from "./refresh-cart";

export default function CheckoutCart({ selectedRows }: { selectedRows: any }) {
  function formatProducts() {
    return (
      <div>
        {selectedRows.map((row: any) => (
          <div className="grid gap-2 py-2" key={row.original.id}>
            <Input
              id="products"
              type="text"
              className="col-span-3"
              value={row.original.name}
              readOnly
            />
          </div>
        ))}
      </div>
    );
  }
  const [formValues, setFormValues] = React.useState({
    course: "",
    userId: "",
    products: "",
  });

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "No products selected.",
      });
    } else if (formValues.course === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "No course selected.",
      });
    } else {
      //add the selected products to the form values in the structure of [{"id": "product id"}]
      formValues.products = selectedRows.map((row: any) => ({
        id: row.original.id,
      }));
      const res = await checkoutItems(formValues);
      if (res) {
        //there might be a better way to delete but ill leave it for now
        selectedRows.forEach(async (row: any) => {
          deleteItemFromCart({ product: row.original });
        });
        refreshCart();
        selectedRows.forEach((row: any) => {
          row.toggleSelected(false);
        });
        toast({
          title: "Success!",
          description: `${selectedRows.length} product(s) have been checked out.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Please try again.",
        });
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex text-white bg-blue-500 hover:bg-blue-600 hover:text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Checkout
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
            <SheetDescription>
              Enter the course that will be using the products. Click checkout
              cart when you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="course" className="text-left">
                Course
              </Label>
              <Input
                id="course"
                type="text"
                placeholder="Enter a course name"
                onChange={(e) =>
                  setFormValues({ ...formValues, course: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="products" className="text-left">
                Products
              </Label>
              {selectedRows.length === 0 ? (
                <>
                  <Input
                    id="products"
                    type="text"
                    className="col-span-3"
                    value="No products selected"
                    readOnly
                  />
                </>
              ) : (
                formatProducts()
              )}
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              {formValues.course === "" || selectedRows.length === 0 ? (
                <Button type="submit" className="w-full max-w-sm" disabled>
                  Checkout
                </Button>
              ) : (
                <Button type="submit" className="w-full max-w-sm">
                  Checkout
                </Button>
              )}
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
