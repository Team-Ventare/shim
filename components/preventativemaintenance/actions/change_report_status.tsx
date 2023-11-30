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
import { PreventativeMaintenance } from "@/app/(app)/maintenance/columns";
import { UpdateStatusReviewed, UpdateStatusNeedsReview, UpdateStatusInProgress, UpdateStatusOrdered, UpdateStatusCompleted } from "./status_change";
import { refresh_PM } from "./refresh_page";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/app/(app)/dashboard/page";

export default function ChangeRequestStatus({ userInfo, request,}: {userInfo: User; request: PreventativeMaintenance;}) {
  async function UpdateRequestStatus(status: string) {

    if (status === "REVIEWED") {
      const res = await UpdateStatusReviewed({ id: request.id });
      if (res) {
        refresh_PM();
        toast({
          title: "Success!",
          duration: 2000,
          description: `Status of ${request.technician} has been changed to ${status}`,
        });

        fetch("/api/notifications", {
          method: "POST",
          body: JSON.stringify({
            message: `reviewed a maintenance report`,
            category: "Maintenance",
            userId: userInfo.id,
          }),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          duration: 2000,
          description: `Status of ${request.technician} has not been changed. Please try again.`,
        });
      }
    } else if (status === "NEEDS_REVIEW") {
      const res = await UpdateStatusNeedsReview({ id: request.id });
      if (res) {
        refresh_PM();
        toast({
          title: "Success!",
          duration: 2000,
          description: `Status of ${request.technician} has been changed to ${status}`,
        });

        fetch("/api/notifications", {
          method: "POST",
          body: JSON.stringify({
            message: `changed a maintenance report status to: NEEDS REVIEW`,
            category: "Maintenance",
            userId: userInfo.id,
          }),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          duration: 2000,
          description: `Status of ${request.technician} has not been changed. Please try again.`,
        });
      }
    } else if (status === "IN_PROGRESS") {
        const res = await UpdateStatusInProgress({ id: request.id });
        if (res) {
          refresh_PM();
          toast({
            title: "Success!",
            duration: 2000,
            description: `Status of ${request.technician} has been changed to ${status}`,
          });
  
          fetch("/api/notifications", {
            method: "POST",
            body: JSON.stringify({
              message: `changed a maintenance report status to: IN PROGRESS`,
              category: "Maintenance",
              userId: userInfo.id,
            }),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error!",
            duration: 2000,
            description: `Status of ${request.technician} has not been changed. Please try again.`,
          });
        }
      } else if (status === "ORDERED") {
        const res = await UpdateStatusOrdered({ id: request.id });
        if (res) {
          refresh_PM();
          toast({
            title: "Success!",
            duration: 2000,
            description: `Status of ${request.technician} has been changed to ${status}`,
          });
  
          fetch("/api/notifications", {
            method: "POST",
            body: JSON.stringify({
              message: `changed a maintenance report status to: ORDERED`,
              category: "Maintenance",
              userId: userInfo.id,
            }),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error!",
            duration: 2000,
            description: `Status of ${request.technician} has not been changed. Please try again.`,
          });
        }
      } else if (status === "COMPLETED") {
        const res = await UpdateStatusCompleted({ id: request.id });
        if (res) {
          refresh_PM();
          toast({
            title: "Success!",
            duration: 2000,
            description: `Status of ${request.technician} has been changed to ${status}`,
          });
  
          fetch("/api/notifications", {
            method: "POST",
            body: JSON.stringify({
              message: `changed a maintenance report status to: COMPLETED`,
              category: "Maintenance",
              userId: userInfo.id,
            }),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error!",
            duration: 2000,
            description: `Status of ${request.technician} has not been changed. Please try again.`,
          });
        }
      }
  }

  if (request.status === "COMPLETED" || (userInfo.role !== "Admin" && userInfo.role !== "Staff")) {
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
              Needs Review
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm: Needs Review
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update the maintenance report status? You will
                not be able to edit any reports with a completed status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("NEEDS_REVIEW");
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
              Reviewed
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm: Reviewed
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update the maintenance report status? You will
                not be able to edit any reports with a completed status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("REVIEWED");
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
              In Progress
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm: In Progress
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update the maintenance report status? You will
                not be able to edit any reports with a completed status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("IN_PROGRESS");
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
              Ordered
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm: Ordered
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update the maintenance report status? You will
                not be able to edit any reports with a completed status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("ORDERED");
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
              Completed
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                Confirm: WARNING!!! COMPLETED STATUS 
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update the maintenance report status? You will
                not be able to edit any reports with a completed status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    UpdateRequestStatus("COMPLETED");
                  }}
                >
                  Accept
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}