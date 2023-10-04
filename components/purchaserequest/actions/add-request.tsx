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
import React from "react";
import { refresh_PR } from "./refresh_page";
import { Textarea } from "@/components/ui/textarea";

export default function AddRequestSheet({ userId }: { userId: string }) {
  const [formValues, setFormValues] = React.useState({});

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(formValues);
    const response = await fetch("/api/purchaserequests", {
      method: "POST",
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      refresh_PR();
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formValues, null, 2)}
            </code>
          </pre>
        ),
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

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
            <SheetTitle>New Purchase Request</SheetTitle>
            <SheetDescription>
              Upload purchase request information here. Click save when you are
              done.
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
              <Label htmlFor="price" className="text-left">
                Price
              </Label>
              <Input
                id="price"
                type="integer"
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
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
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                className="w-full max-w-sm"
                onClick={() => setFormValues({ ...formValues, userId: userId })}
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