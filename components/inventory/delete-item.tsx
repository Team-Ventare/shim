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

export default function DeleteItem({ id }: { id: string }) {
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

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">
            Copy ID
          </DropdownMenuItem>
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
