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
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import React from "react";
import { Textarea } from "../ui/textarea";
import { NewsPost } from "@/app/(app)/news/page";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { revalidateNews } from "./revalidate-news";

export default function EditNewsPost({ post }: { post: NewsPost }) {
  const [formValues, setFormValues] = React.useState({
    title: post.title,
    description: post.description,
    label: post.label,
  });

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/api/newspost/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      revalidateNews();
      toast({
        title: "News Post Updated!",
        duration: 2000,
        description: "The news post was successfully updated.",
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
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
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
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type">Label</Label>
              <Select
                onValueChange={(value) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    label: value.toUpperCase(),
                  }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={formValues.label} id="label" />
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
              <Button type="submit" className="w-full max-w-sm">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
