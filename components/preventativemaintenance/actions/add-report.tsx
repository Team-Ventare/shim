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
import { refresh_PM } from "./refresh_page";
import { Textarea } from "@/components/ui/textarea";

export default function AddReportSheet({ userId }: { userId: string }) {
  const [formValues, setFormValues] = React.useState({});

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(formValues);
    const response = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      refresh_PM();
      toast({
        // title: "You submitted the following values:",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">
        //       {JSON.stringify(formValues, null, 2)}
        //     </code>
        //   </pre>
        // ),
        title: "Request submitted!",
        duration: 2000,
        description: "The request was successfully submitted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        duration: 2000,
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          PDF Upload
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>Preventative Maintenance </SheetTitle>
            <SheetDescription>
              Upload a PDF file of your preventative maintenance report here. 
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="technician" className="text-left">
                Technician
              </Label>
              <Input
                id="technician"
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, technician: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="comments" className="text-left">
                Comments
              </Label>
              <Textarea
                id="comments"
                onChange={(e) =>
                  setFormValues({ ...formValues, comments: e.target.value })
                }
              />
            </div>
            

            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="category" className="text-left">
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
                  <SelectValue placeholder="Select Current Status" id="status" />
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
              <Label htmlFor="picture">PDF Report</Label>
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
                Upload PDF 
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}