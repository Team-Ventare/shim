"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage, Avatar as RootAvatar } from "./ui/avatar";
import { Logout } from "./logout";
import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";

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
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer">
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
