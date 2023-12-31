"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/app/(app)/dashboard/page";
import { PutBlobResult } from "@vercel/blob";
import { refresh_PRODUCT } from "./refresh_page";

export default function AddNewProduct({ userInfo }: { userInfo: User }) {
  const [formValues, setFormValues] = React.useState({});
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];

      if (file) {
        const req = await fetch(`/api/users/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const res = (await req.json()) as PutBlobResult;
        if (res.url) {
          setBlob(res);

          const response = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({
              ...formValues,
              imageUrl: res.url,
            }),
          });

          if (response.ok) {
            refresh_PRODUCT();
            toast({
              title: "Product Added!",
              duration: 2000,
              description: "The new product was successfully created.",
            });

            fetch("/api/notifications", {
              method: "POST",
              body: JSON.stringify({
                message: `added a new assest to the inventory`,
                category: "Inventory",
                userId: userInfo.id,
              }),
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              duration: 2000,
              description: "There was a problem with your request. Make sure you have filled out all the fields correctly.",
            });
          }
        } else {
          //console.log(res);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            duration: 2000,
            description: "There was a problem with your product. Make sure you have filled out all the fields correctly.",
          });
        }
      }
    }

    // const response = await fetch("/api/products", {
    //   method: "POST",
    //   body: JSON.stringify(formValues),
    // });

    // if (response.ok) {
    //   toast({
    //     title: "You submitted the following values:",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">
    //           {JSON.stringify(formValues, null, 2)}
    //         </code>
    //       </pre>
    //     ),
    //   });

    //   fetch("/api/notifications", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       message: `added a new assest to the inventory`,
    //       category: "Inventory",
    //       userId: userInfo.id,
    //     }),
    //   });
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem with your request.",
    //   });
    // }
  };
  //if the user is not an admin or staff, return null
  if (userInfo.role !== "Admin" && userInfo.role !== "Staff") {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>New Product</SheetTitle>
            <SheetDescription>
              Upload product information here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                id="description"
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="amount" className="text-left">
                Amount
              </Label>
              <Input
                id="amount"
                type="integer"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="location" className="text-left">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, location: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    status: value.toUpperCase(),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="checked_out">Checked Out</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type" className="text-left">
                Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    type: value.toUpperCase(),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" id="type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="patient_simulators">
                      Patient Simulators
                    </SelectItem>
                    <SelectItem value="task_trainers">Task Trainers</SelectItem>
                    <SelectItem value="simulation_equipment">
                      Simulation Equipment
                    </SelectItem>
                    <SelectItem value="medical_furniture">
                      Medical Furniture
                    </SelectItem>
                    <SelectItem value="consmable_supplies">
                      Consumable Supplies
                    </SelectItem>
                    <SelectItem value="nonconsumable_supplies">
                      Nonconsumable Supplies
                    </SelectItem>
                    <SelectItem value="computers">Computers</SelectItem>
                    <SelectItem value="office_supplies">
                      Office Supplies
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Picture</Label>
              <Input
                id="picture"
                type="file"
                ref={inputFileRef}
                onChange={(e) => {
                  console.log(inputFileRef);
                  console.log(inputFileRef.current?.files);
                }}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="w-full max-w-sm">
                Add Product
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
