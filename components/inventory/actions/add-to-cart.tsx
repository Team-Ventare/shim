import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

export default function AddToCartButton() {
  return (
    <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
      <Plus className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
