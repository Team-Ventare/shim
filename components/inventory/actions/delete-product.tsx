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
import { User } from "@/app/(app)/dashboard/page";

export default function DeleteProduct({ id, userInfo }: { userInfo:User, id: string }) {
  async function deleteProduct() {
    "use server";

    const res = await fetch(
      `https://shim-ventare.vercel.app/api/products/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      revalidatePath("/products");
      redirect("/products");
    }
  }
  //can change who we can let delete the product in the future
  if (userInfo.role === "User" || userInfo.role === "Pending") {
    return null;
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
          {/* temporarily removing it since it was doing nothing plus can't display a toast when i tried doing it
          (maybe one of yall can figure it out and readd it)-bryan */}
          {/* <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
            Copy ID
          </DropdownMenuItem> */}
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="tracking-normal font-medium">
            Do you want to delete this product?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this product?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={deleteProduct}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
