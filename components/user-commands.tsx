"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { CommandSeparator } from "cmdk";

export function UserCommands({ name, image }: { name: string; image: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-100 hover:text-zinc-50"
        >
          <Avatar className="mr-2 h-5 w-5 text-zinc-950">
            <AvatarImage src={image as string} referrerPolicy="no-referrer" />
            <AvatarFallback>{name.at(0)}</AvatarFallback>
          </Avatar>
          {name}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0 bg-zinc-900 border-zinc-700">
        <Command className="bg-zinc-900">
          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer text-zinc-100 hover:text-zinc-50 mb-1">
                Profile
              </CommandItem>
              <CommandItem className="cursor-pointer text-zinc-100 hover:text-zinc-50 mb-1">
                Settings
              </CommandItem>
              <CommandItem
                className="cursor-pointer text-zinc-100 hover:text-zinc-50"
                onSelect={() => {
                  signOut();
                }}
              >
                Sign Out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
