import { getUserSession } from "@/lib/auth";
import { Avatar } from "./avatar";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Inventory" },
  { href: "/purchaserequests", label: "Purchase Requests" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/staff", label: "Staff" },
];

export async function NavBar() {
  const user = await getUserSession();

  return (
    <div className="top-0 z-0 sticky mx-auto py-1 border-b bg-white">
      <div className="flex items-center py-2 px-8 space-x-4">
        <Link href="/" className="-m-1.5">
          <Image height={46} width={46} src="/logo1.png" alt="" />
        </Link>

        <nav>
          <ul className="flex items-center gap-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-sm"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="flex-grow" />
        {user && (
          <>
            <Avatar user={user} />
          </>
        )}
      </div>
    </div>
  );
}
