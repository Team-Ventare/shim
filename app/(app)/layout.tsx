import { Sidebar } from "@/components/side-bar";
import NewSidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-row">
            <div className="fixed flex-none w-full lg:w-28">
              <NewSidebar />
            </div>
            <div className="w-full lg:ml-72 mx-auto mt-16 lg:mt-0">
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
