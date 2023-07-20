import { NavBar } from "@/components/nav-bar";
import { Sidebar } from "@/components/side-bar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="h-full w-full">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
