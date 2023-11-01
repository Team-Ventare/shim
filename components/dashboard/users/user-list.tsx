import { User } from "@/app/(app)/dashboard/page";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

type Role = {
  value: string
  label: string
}
 
const roles: Role[] = [
  {
    value: "penmding",
    label: "Pending",
  },
  {
    value: "user",
    label: "User",
  },
  {
    value: "staff",
    label: "Staff",
  },
  {
    value: "admin",
    label: "Admin",
  },
]

export function UserList({ users }: { users: User[] }) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Role | null>(
    null
  )
  return (
    <>
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your database including their name,
            title, email and role.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center ml-2">
                        <Avatar className="flex h-10 w-10 items-center justify-center space-y-0 border">
                          <AvatarImage
                            src={user.image as string}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="mt-1 text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 flex justify-end">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                          >
                            {user.role}
                            <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="end">
                          <Command>
                            <CommandInput placeholder="Select new role..." />
                            <CommandList>
                              <CommandEmpty>No roles found.</CommandEmpty>
                              <CommandGroup>
                                <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                  <p>Pending</p>
                                  <p className="text-sm text-muted-foreground">
                                    Cannot access any resources.
                                  </p>
                                </CommandItem>
                                <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                  <p>User</p>
                                  <p className="text-sm text-muted-foreground">
                                    Can view and checkout.
                                  </p>
                                </CommandItem>
                                <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                  <p>Staff</p>
                                  <p className="text-sm text-muted-foreground">
                                    Can view, checkout, comment and edit.
                                  </p>
                                </CommandItem>
                                <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                  <p>Admin</p>
                                  <p className="text-sm text-muted-foreground">
                                    Admin-level access to all resources.
                                  </p>
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
