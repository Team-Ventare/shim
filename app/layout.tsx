import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/side-bar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "S.H.I.M",
  description: "Created by Team Ventare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
