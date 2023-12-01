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
import { PreventativeMaintenance } from "@/app/(app)/maintenance/columns";
import { Textarea } from "@/components/ui/textarea";
import { refresh_PM } from "./refresh_page";
import { User } from "@/app/(app)/dashboard/page";
import { PutBlobResult, del } from "@vercel/blob";

export default function EditRequest({ userInfo, request }: { userInfo: User, request: PreventativeMaintenance }) {
  const [formValues, setFormValues] = useState({
    technician: request.technician,
    status: request.status,
    comments: request.comments,
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

          const response = await fetch(`/api/reports/${request.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...formValues,
              imageUrl: res.url,}),
          });

          if (response.ok) {
            refresh_PM();
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
      const response = await fetch(`/api/reports/${request.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formValues,
          imageUrl: request.imageUrl,
        }),
      });

      if (response.ok) {
        refresh_PM();
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
        <Button variant="outline">Edit Report</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>Edit Report Details</SheetTitle>
            <SheetDescription>
              Edit the report details and information here. Click save changes when
              you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="technician">Technician or Name of Report</Label>
              <Input
                id="technician"
                type="text"
                className="col-span-3"
                defaultValue={formValues.technician}
                onChange={(e) =>
                  setFormValues({ ...formValues, technician: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                defaultValue={formValues.comments}
                onChange={(e) =>
                  setFormValues({ ...formValues, comments: e.target.value })
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
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="ordered">Ordered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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
              {formValues.technician === "" ||
              formValues.comments === "" ? 
              (
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