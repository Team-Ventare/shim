import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import {
  BackpackIcon,
  CaretSortIcon,
  CrumpledPaperIcon,
  CubeIcon,
  HomeIcon,
  IdCardIcon,
  BellIcon,
  PersonIcon,
  LayersIcon,
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
    href: "/news",
    label: "News",
    icon: <BellIcon />,
    spacing: true,
  },
  {
    href: "/cart",
    label: "Cart",
    icon: <BackpackIcon />,
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
    href: "/maintenance",
    label: "Maintenance",
    icon: <LayersIcon />,
    spacing: true,
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
];

export async function Sidebar() {
  const user = await getUserSession();

  return (
    <div className="bg-zinc-900 w-72 relative">
      <div className="pt-8 space-y-2">
        {links.map((link, index) => (
          <div
            key={index}
            className={`w-full ${
              link.spacing ? "border-b border-slate-800 pb-2" : undefined
            }`}
          >
            <div className="px-2">
              <Link
                href={link.href}
                className="w-full text-zinc-100 hover:text-zinc-50 text-sm flex items-center gap-x-2 cursor-pointer p-2 rounded-md hover:bg-zinc-800"
              >
                <div className="flex items-center">
                  <span className="text-2xl block float-left">{link.icon}</span>
                  <p className="ml-4">{link.label}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-2 absolute px-2 w-full space-y-2 border-t border-slate-800">
        <Link
          href="/dashboard"
          className="text-zinc-100 hover:text-zinc-50 text-sm flex items-center gap-x-2 cursor-pointer p-2 rounded-md mt-2 hover:bg-zinc-800"
        >
          <div className="flex items-center">
            <span className="text-2xl block float-left">
              <PersonIcon />
            </span>
            <p className="ml-4">Dashboard</p>
          </div>
        </Link>

        <Button
          variant="outline"
          className="w-full bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-100 hover:text-zinc-50"
        >
          <Avatar className="mr-2 h-5 w-5 text-zinc-950">
            <AvatarImage
              src={user.image as string}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{user.name?.at(0)}</AvatarFallback>
          </Avatar>
          {user?.name}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </div>
    </div>
  );
}
