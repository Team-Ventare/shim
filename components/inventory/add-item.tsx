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
} from "@/components/ui/select";

export default function AddItemSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New product</SheetTitle>
          <SheetDescription>
            Upload product information here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Description
            </Label>
            <Input id="username" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Amount
            </Label>
            <Input id="username" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Location
            </Label>
            <Input id="username" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Status
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="availble">AVAILABLE</SelectItem>
                <SelectItem value="checked_out">CHECKED_OUT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Type
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
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
                <SelectItem value="office_supplies">Office Supplies</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save product</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
