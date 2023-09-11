import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import {
  BackpackIcon,
  CrumpledPaperIcon,
  CubeIcon,
  HomeIcon,
  IdCardIcon,
  BellIcon,
  PersonIcon,
  LayersIcon,
} from "@radix-ui/react-icons";
import { UserCommands } from "./user-commands";

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
  },
  {
    href: "/staff",
    label: "Staff",
    icon: <PersonIcon />,
    spacing: true,
  },
  {
    href: "/requests",
    label: "Purchase Requests",
    icon: <CrumpledPaperIcon />,
  },
  {
    href: "/products",
    label: "Inventory",
    icon: <CubeIcon />,
  },
  {
    href: "/cart",
    label: "Cart",
    icon: <BackpackIcon />,
    spacing: true,
  },
  {
    href: "/suppliers",
    label: "Suppliers",
    icon: <IdCardIcon />,
  },
  {
    href: "/maintenance",
    label: "Maintenance",
    icon: <LayersIcon />,
  },
];

export async function Sidebar() {
  const user = await getUserSession();

  return (
    <div className="bg-zinc-900 w-56 shrink-0 h-screen border-r border-zinc-800">
      <div className="pt-2 space-y-2">
        {links.map((link, index) => (
          <div
            key={index}
            className={`w-full ${
              link.spacing ? "border-b border-zinc-800 pb-2" : undefined
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

      <div className="bottom-2 absolute px-2 w-56 space-y-2 border-t border-zinc-800">
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

        <UserCommands name={user?.name} image={user?.image} />
      </div>
    </div>
  );
}
