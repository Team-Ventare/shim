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
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import React, { useRef, useState } from "react";
import { refresh_PR } from "./refresh_page";
import { Textarea } from "@/components/ui/textarea";
import { PutBlobResult } from "@vercel/blob";
import { User } from "@/app/(app)/dashboard/page";

export default function AddRequestSheet({ userInfo }: { userInfo: User }) {
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

          const response = await fetch("/api/purchaserequests", {
            method: "POST",
            body: JSON.stringify({
              ...formValues,
              imageUrl: res.url,
            }),
          });

          if (response.ok) {
            refresh_PR();
            toast({
              title: "Request Added!",
              duration: 2000,
              description: "The new request was successfully created.",
            });

            fetch("/api/notifications", {
              method: "POST",
              body: JSON.stringify({
                message: `submitted a new purchase request`,
                category: "Purchase Request",
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
            description: "There was a problem with your request. Make sure you have filled out all the fields correctly.",
          });
        }
      }
    }
    // //console.log(formValues);
    // const response = await fetch("/api/purchaserequests", {
    //   method: "POST",
    //   body: JSON.stringify(formValues),
    // });

    // if (response.ok) {
    //   refresh_PR();
    //   toast({
    //     // title: "You submitted the following values:",
    //     // description: (
    //     //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //     //     <code className="text-white">
    //     //       {JSON.stringify(formValues, null, 2)}
    //     //     </code>
    //     //   </pre>
    //     // ),
    //     title: "Request submitted!",
    //     duration: 2000,
    //     description: "The request was successfully submitted.",
    //   });
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     duration: 2000,
    //     description: "There was a problem with your request.",
    //   });
    // }
  };
  //return null if the user is not an Admin or Staff or User
  if (userInfo.role !== "Admin" && userInfo.role !== "Staff" && userInfo.role !== "User") {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>New Request</SheetTitle>
            <SheetDescription>
              Upload purchase request information here. Click create reqest when
              you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title" className="text-left">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
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
              <Label htmlFor="reason" className="text-left">
                Reason
              </Label>
              <Textarea
                id="reason"
                onChange={(e) =>
                  setFormValues({ ...formValues, reason: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="amount" className="text-left">
                Quantity
              </Label>
              <Input
                id="quantity"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="price" className="text-left">
                Price Per Item (Optional)
              </Label>
              <Input
                id="price"
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="category" className="text-left">
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
                  <SelectValue placeholder="Select priority" id="priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
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
              <Button
                type="submit"
                className="w-full max-w-sm"
                onClick={() => setFormValues({ ...formValues, userId: userInfo.id })}
              >
                Create Request
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
