import { getUserSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import {
  BackpackIcon,
  CaretSortIcon,
  CrumpledPaperIcon,
  CubeIcon,
  HomeIcon,
  IdCardIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const links = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    href: "/products",
    label: "Inventory",
    icon: <CubeIcon />,
  },
  {
    href: "/purchaserequests",
    label: "Purchase Requests",
    icon: <CrumpledPaperIcon />,
  },
  {
    href: "/suppliers",
    label: "Suppliers",
    icon: <IdCardIcon />,
  },
  {
    href: "/staff",
    label: "Staff",
    icon: <PersonIcon />,
  },
  {
    href: "/checkout",
    label: "Checkout",
    icon: <BackpackIcon />,
  },
];

export async function Sidebar() {
  const user = await getUserSession();

  return (
    <div className="bg-zinc-900 w-72 relative">
      <ul className="pt-8 px-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="text-zinc-100 hover:text-zinc-50 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 hover:bg-zinc-800"
          >
            <span className="text-2xl block float-left">{link.icon}</span>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {user && (
        <div className="bottom-2 absolute px-2 w-full">
          <Button
            variant="outline"
            className="w-full bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-100 hover:text-zinc-50"
          >
            <Avatar className="mr-2 h-5 w-5 text-zinc-950">
              <AvatarImage src={user?.image} referrerPolicy="no-referrer" />
              <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
            </Avatar>
            {user?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      )}
    </div>
  );
}
