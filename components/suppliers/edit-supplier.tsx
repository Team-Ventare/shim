"use client"

import { Supplier } from "@/app/(app)/suppliers/columns";
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
import { DropdownMenuItem, Label } from "@radix-ui/react-dropdown-menu";
import { User } from "next-auth";
import { useState } from "react";
import { refresh_SP } from "./refresh_page";
import { useToast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export default function EditRequest({ supp }: { supp: Supplier }) {
    const [formValues, setFormValues] = useState({
        name: supp.name,
        title: supp.title,
        vendor: supp.vendor,
        email: supp.email,
    });

    const { toast } = useToast();

    const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        //event.preventDefault();
        const response = await fetch(`/api/suppliers/${supp.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...formValues}),
        });

        if (response.ok) {
            refresh_SP();
            toast({
              title: "Supplier updated!",
              duration: 2000,
              description: "The supplier was successfully updated.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              duration: 2000,
              description:
                "There was a problem updating the supplier. Please try again",
            });
          }
    };
    return (
      <Sheet>
        <SheetTrigger>
            <DropdownMenuItem className="cursor-pointer">
                Edit supplier
            </DropdownMenuItem>
        </SheetTrigger>
        <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>Edit Supplier</SheetTitle>
            <SheetDescription>
              Upload supplier information here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-left">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                defaultValue={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-left">
                Description
              </Label>
              <Input id="description" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-left">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                defaultValue={formValues.title}
                onChange={(e) =>
                  setFormValues({...formValues,title: e.target.value,})
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-left">
                Vendor
              </Label>
              <Input
                id="vendor"
                type="text"
                defaultValue={formValues.vendor}
                onChange={(e) =>
                  setFormValues({ ...formValues, vendor: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-left">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                defaultValue={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="w-full max-w-sm">
                Update Supplier
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>  
    </Sheet>
  );
}