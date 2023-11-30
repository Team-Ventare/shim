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
  import { toast } from "@/components/ui/use-toast";
import { deletePM } from "./delete_report";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "@/app/(app)/dashboard/page";
import { PreventativeMaintenance } from "@/app/(app)/maintenance/columns";
  
  export default function DeleteRequest({ request, userInfo }: { userInfo: User , request: PreventativeMaintenance }) {
    async function deleteRequest() {
        "use server";
        const res = await fetch(
            `https://shim-ventare.vercel.app/api/reports/${request.id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
        );
        if (res.ok){
            revalidatePath("/maintenance");
            redirect("/maintenance");
        }
    }

    if (userInfo.role==="User" || userInfo.role==="Pending") {
      if(userInfo.id!==request.userId){
        return null;
      }
    }
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DialogTrigger asChild>
              <DropdownMenuItem className="text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer">
                Delete Report
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="tracking-normal font-medium">
              Do you want to delete this request?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form action={deleteRequest}>
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  