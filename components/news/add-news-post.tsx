"use client";

import type { PutBlobResult } from "@vercel/blob";
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
import React, { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { revalidateNews } from "./revalidate-news";
import { User } from "@/app/(app)/dashboard/page";

export default function AddNewsPost({ userInfo }: { userInfo: User }) {
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

          const response = await fetch("/api/newspost", {
            method: "POST",
            body: JSON.stringify({
              ...formValues,
              imageUrl: res.url,
            }),
          });

          if (response.ok) {
            revalidateNews();
            toast({
              title: "News Post Added!",
              duration: 2000,
              description: "The new posted was successfully created.",
            });

            fetch("/api/notifications", {
              method: "POST",
              body: JSON.stringify({
                message: "added a new post to the news page",
                category: "News",
                userId: userInfo.id,
              }),
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh!",
            description: "There was a problem uploading the image.",
          });
        }
      }
    }
  };
  //if the user is not an admin, return null
  if (userInfo.role != "Admin") {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSumbit}>
          <SheetHeader>
            <SheetTitle>New Post</SheetTitle>
            <SheetDescription>
              Create a new post to share with your team.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Title</Label>
              <Input
                id="title"
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Description</Label>
              <Textarea
                id="description"
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Label</Label>
              <Select
                onValueChange={(value) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    label: value.toUpperCase(),
                  }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a label" id="label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Labels</SelectLabel>
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
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                className="w-full max-w-sm"
                onClick={async () => {
                  setFormValues({ ...formValues, userId: userInfo.id });
                }}
              >
                Post
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
