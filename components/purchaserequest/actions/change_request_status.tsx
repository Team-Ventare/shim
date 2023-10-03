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
  import { MoreHorizontalIcon } from "lucide-react";
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
import { PurchaseRequest } from "@/app/(app)/requests/columns";
import { stat } from "fs";
import { UpdateStatusAccept, UpdateStatusReject } from "./status_change";
  
  export default function ChangeRequestStatus({ request }: { request: PurchaseRequest }) {
    async function UpdateRequestStatus(status: string) {
        if (status === "APPROVED") {
            UpdateStatusAccept({id: request.id});
        }
        else if (status === "REJECTED") {
            UpdateStatusReject({id: request.id});
        }
        
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
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer"
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
                    Are you sure you want to accept the purchase request?
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
                <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer"
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
                    Are you sure you want to reject the purchase request?
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
  