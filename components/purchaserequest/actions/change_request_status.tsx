"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PurchaseRequest } from "@/app/(app)/requests/columns";
import { UpdateStatusAccept, UpdateStatusReject } from "./status_change";
import { refresh_PR } from "./refresh_page";
import { toast } from "@/components/ui/use-toast";

export default function ChangeRequestStatus({
  userId,
  request,
}: {
  userId: string;
  request: PurchaseRequest;
}) {
  async function UpdateRequestStatus(status: string) {
    if (status === "APPROVED") {
      const res = await UpdateStatusAccept({ id: request.id });
      if (res) {
        refresh_PR();
        toast({
          title: "Success!",
          duration: 2000,
          description: `Status of ${request.title} has been changed to ${status}`,
        });

        fetch("/api/notifications", {
          method: "POST",
          body: JSON.stringify({
            message: `approved a purchase request`,
            category: "Purchase Request",
            userId: userId,
          }),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          duration: 2000,
          description: `Status of ${request.title} has not been changed. Please try again.`,
        });
      }
    } else if (status === "REJECTED") {
      const res = await UpdateStatusReject({ id: request.id });
      if (res) {
        refresh_PR();
        toast({
          title: "Success!",
          duration: 2000,
          description: `Status of ${request.title} has been changed to ${status}`,
        });

        fetch("/api/notifications", {
          method: "POST",
          body: JSON.stringify({
            message: `rejected a purchase request`,
            category: "Purchase Request",
            userId: userId,
          }),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          duration: 2000,
          description: `Status of ${request.title} has not been changed. Please try again.`,
        });
      }
    }
  }

  if (request.status === "APPROVED" || request.status === "REJECTED") {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Update Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="hover:bg-gray-50 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              Accept
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to accept the purchase request? You will
                not be able to edit any request information after this.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("APPROVED");
                  }}
                >
                  Accept
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="hover:bg-gray-50 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              Reject
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject the purchase request? You will
                not be able to edit any request information after this.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("REJECTED");
                  }}
                >
                  Reject
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
