import { getUserSession } from "@/lib/auth";
import { Avatar } from "./avatar";
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
    <div className="border-r w-72 relative">
      <div className="flex items-center py-2">
        <Link href="/" className="-m-1.5">
          <img src="/scaledshimlogo.png" alt="" />
        </Link>
      </div>
      <ul className="px-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="text-slate-800 hover:text-slate-900 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 hover:bg-slate-100"
          >
            <span className="text-2xl block float-left">{link.icon}</span>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {user && (
        <div className="bottom-2 absolute px-2 w-full">
          <Button variant="outline" className="w-full">
            <span className="flex-grow">{user?.name}</span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      )}
    </div>
  );
}
