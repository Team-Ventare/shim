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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PurchaseRequest } from "@/app/(app)/requests/columns"; 
import { Textarea } from "@/components/ui/textarea";

export default function EditRequest({ request }: { request: PurchaseRequest }) {
    const [formValues, setFormValues] = useState({
        title: request.title,
        priority: request.priority,
        price: request.price,
        description: request.description,
        reason: request.reason,
    });
    const { toast } = useToast();

    const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const response = await fetch(`/api/purchaserequests/${request.id}`, {
          method: "PUT",
          body: JSON.stringify(formValues),
        });
    
        if (response.ok) {
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
      
    if (request.status === "APPROVED" || request.status === "REJECTED") {
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
            <SheetTitle>Edit Purchase Request</SheetTitle>
            <SheetDescription>
                Edit purchase request information here. Click save when you are done.
            </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">
                Title
                </Label>
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
                <Label htmlFor="description">
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
                <Label htmlFor="reason">
                Reason
                </Label>
                <Textarea
                id="reason"
                defaultValue={formValues.reason}
                onChange={(e) =>
                    setFormValues({...formValues,reason: e.target.value})
                }
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="location">
                Price
                </Label>
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
            </div>
            <SheetFooter>
            <SheetClose asChild>
                <Button type="submit">Save changes</Button>
            </SheetClose>
            </SheetFooter>
        </form>
        </SheetContent>
    </Sheet>
    );
}