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
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PurchaseRequest } from "@/app/(app)/requests/columns";
import { Textarea } from "@/components/ui/textarea";
import { refresh_PR } from "./refresh_page";
import { User } from "@/app/(app)/dashboard/page";
import { PutBlobResult, del } from "@vercel/blob";

export default function EditRequest({ userInfo, request }: { userInfo: User, request: PurchaseRequest }) {
  const [formValues, setFormValues] = useState({
    title: request.title,
    priority: request.priority,
    price: request.price,
    amount: request.amount,
    description: request.description,
    reason: request.reason,
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
          await fetch(`/api/users/upload?url=${request.imageUrl}`, {
            method: "DELETE",
          });

          const response = await fetch(`/api/purchaserequests/${request.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...formValues,
              imageUrl: res.url,}),
          });

          if (response.ok) {
            refresh_PR();
            toast({
              title: "Request updated!",
              duration: 2000,
              description: "The request was successfully updated.",
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
            description: "There was a problem with your request. Make sure you have filled out all the fields correctly.",
          });
        }
      }
    }
    else{
      const response = await fetch(`/api/purchaserequests/${request.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formValues,
          imageUrl: request.imageUrl,}),
      });

      if (response.ok) {
        refresh_PR();
        toast({
          title: "Request updated!",
          duration: 2000,
          description: "The request was successfully updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          duration: 2000,
          description:
            "There was a problem updating the request. Please try again",
        });
      }
    }
                                  
  };

  if (userInfo.role === "User" || userInfo.role === "Pending") {
    if (userInfo.id !== request.userId) {
      return null;
    }
  }
  if (request.status === "APPROVED" || request.status === "REJECTED") {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Request</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>Edit Purchase Request</SheetTitle>
            <SheetDescription>
              Edit purchase request information here. Click save changes when
              you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                className="col-span-3"
                defaultValue={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                defaultValue={formValues.reason}
                onChange={(e) =>
                  setFormValues({ ...formValues, reason: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="amount">Quantity</Label>
              <Input
                id="quantity"
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
              <Label htmlFor="price">Price Per Item (Optional)</Label>
              <Input
                id="price"
                type="text"
                defaultValue={formValues.price}
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="status" className="text-left">
                Priority
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    priority: value.toUpperCase(),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={formValues.priority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
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
              {formValues.title === "" ||
              formValues.description === "" ||
              formValues.reason === "" ||
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
