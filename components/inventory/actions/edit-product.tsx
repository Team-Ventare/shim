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
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/app/(app)/products/columns";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/app/(app)/dashboard/page";
import { PutBlobResult } from "@vercel/blob";
import { refresh_PRODUCT } from "./refresh_page";

export default function EditProduct({ product, userInfo }: { userInfo: User, product: Product }) {
  const [formValues, setFormValues] = useState({
    name: product.name,
    description: product.description,
    amount: product.amount,
    location: product.location,
    status: product.status,
    type: product.type,
  });
  const { toast } = useToast();
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputFileRef.current?.files && inputFileRef.current?.files[0]) {
      const file = inputFileRef.current.files[0];

      if (file) {
        const req = await fetch(`/api/users/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const res = (await req.json()) as PutBlobResult;
        if (res.url) {
          setBlob(res);
          
          //delete old image
          await fetch(`/api/users/upload?url=${product.imageUrl}`, {
            method: "DELETE",
          });

          const response = await fetch(`/api/products/${product.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...formValues,
              imageUrl: res.url,}),
          });

          if (response.ok) {
            refresh_PRODUCT();
            toast({
              title: "Product updated!",
              duration: 2000,
              description: "The product was successfully updated.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        } else {
          //console.log(res);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      }
    }
    else{
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formValues,
          imageUrl: product.imageUrl,}),
      });

      if (response.ok) {
        refresh_PRODUCT();
        toast({
          title: "Product updated!",
          duration: 2000,
          description: "The product was successfully updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };

  //right now only letting admin/staff be able to edit products
  if (userInfo.role === "User" || userInfo.role === "Pending") {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>
              Edit product information here. Click save when you are done.
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
                defaultValue={formValues.name}
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
                defaultValue={formValues.description}
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
                defaultValue={formValues.amount}
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
                defaultValue={formValues.location}
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
                  <SelectValue placeholder={formValues.status} />
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
                  <SelectValue placeholder={formValues.type} id="type" />
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
                    <SelectItem value="nonconsmable_supplies">
                      Non-consumable Supplies
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
              <Label htmlFor="picture">Picture</Label>
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
              {formValues.name === "" ||
              formValues.description === "" ||
              formValues.location === "" ||
              !formValues.amount ? (
                <Button type="submit" className="w-full max-w-sm" disabled>
                  Save changes
                </Button>
              ) : (
                <Button type="submit" className="w-full max-w-sm">
                  Save changes
                </Button>
              )}
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
