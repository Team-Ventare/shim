import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { MoreHorizontalIcon } from "lucide-react";
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
import { PurchaseRequest } from "@/app/(app)/requests/columns";
  
  export default function ChangeRequestStatus({ request }: { request: PurchaseRequest }) {
    async function UpdateRequestStatus() {
        "use server";
        //update the status of that request to whatever the user selects
        //following has not been tested yet
        // const res = await fetch(
        //   `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
        //   {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //   }
        // );
        // if (res.ok) {
        //   revalidatePath("/requests");
        //   redirect("/requests");
        // }
    }
    
    if (request.status === "APPROVED" || request.status === "REJECTED") {
        return null;
    }
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">Change Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
                Approve
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
                Reject
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
  }
  