import { getUserSession } from "@/lib/auth";
import { columns } from "./columns";
import { checkedOut } from "./checkedOut/columns";
import { DataTable } from "./data-table";
import { CheckedOutDataTable } from "./checkedOut/checked-out-data-table";
import { Product } from "../products/columns";
import { User } from "../dashboard/page";

async function getUser(id: string): Promise<User> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data;
}

async function getData(cartId: string): Promise<Product[]> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/cart/${cartId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();
  return data.products;
}

export default async function Cart() {
  const user = await getUserSession();

  // Running these requests in parallel
  const userData = getUser(user.id);
  const cartData = getData(user.cartId);
  const [userD, cartD] = await Promise.all([userData, cartData]);

  console.log(userD.currentCheckout.length);

  return (
    <div className="container mx-auto py-6">
      {userD.currentCheckout.length > 0 && (
        <div className="pb-6">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Your currently checkout items
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Select products to return to the inventory. Only return items that
            are in good condition. If an item is damaged, please submit a
            maintenance request.
          </p>
          <div className="pt-6">
            <CheckedOutDataTable
              columns={checkedOut}
              data={userD.currentCheckout}
              userId={user.id}
            />
          </div>
        </div>
      )}
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Checkout & Return
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Select products to checkout with a provided course name or return
            items previously checked out.
          </p>
        </div>
      </div>
      <div className="pt-6">
        <DataTable columns={columns} data={cartD} userInfo={user} />
      </div>
    </div>
  );
}
