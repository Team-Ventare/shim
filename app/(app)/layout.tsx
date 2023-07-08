import { NavBar } from "@/components/nav-bar";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="h-full">{children}</main>
      <Toaster />
    </>
  );
}
