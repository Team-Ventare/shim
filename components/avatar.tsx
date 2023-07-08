"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage, Avatar as RootAvatar } from "./ui/avatar";
import { Logout } from "./logout";
import { Session } from "next-auth";
import Link from "next/link";

export const Avatar = ({ user }: { user?: Session["user"] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="hover:bg-slate-100 rounded-sm">
      <div className="flex items-center space-x-2">
        <RootAvatar>
          {user?.image && (
            <AvatarImage src={user?.image} referrerPolicy="no-referrer" />
          )}
          {!user?.image && <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>}
        </RootAvatar>
        {user && <p className="pr-2">{user.name}</p>}
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        asChild
        className="w-full cursor-pointer hover:bg-slate-100"
      >
        <Link href="/admin/profile">Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="w-full cursor-pointer hover:bg-slate-100"
      >
        <Link href="/admin/team">Team</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="w-full cursor-pointer hover:bg-slate-100"
      >
        <Link href="/admin/billing">Billing</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <Logout />
    </DropdownMenuContent>
  </DropdownMenu>
);
