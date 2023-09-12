export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/news",
    "/cart",
    "/products",
    "/requests",
    "/staff",
    "/suppliers",
    "/maintenance",
    "/dashboard",
  ],
};
