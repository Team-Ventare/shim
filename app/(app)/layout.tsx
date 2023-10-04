import Sidebar from "@/components/sidebar";
import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { User } from "./dashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

async function getData(id: string): Promise<User> {
  const response = await fetch(
    `https://shim-ventare.vercel.app/api/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data;
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  const user = await getData(session.user.id);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-row">
            <div className="fixed flex-none w-full lg:w-28">
              <Sidebar user={user} />
            </div>
            <div className="w-screen mt-16 lg:mt-0 lg:ml-72 4xl:ml-0 bg-background">
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
