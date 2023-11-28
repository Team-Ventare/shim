import { Product } from "@/app/(app)/products/columns";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      image: string | undefined;
      email: string;
      name: string;
      role: string;
      cartId: string;
      cart: {
        products: Product[];
      };
      currentCheckout: {
        products: Product[];
      };
    };
  }
}
