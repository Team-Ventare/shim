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

export function UserList({ users }: { users: User[] }) {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((part) => part[0]).join("");
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            <svg
              className="h-1.5 w-1.5 fill-red-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            Admin
          </span>
        );
      case "User":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
            <svg
              className="h-1.5 w-1.5 fill-green-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            User
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/10">
            <svg
              className="h-1.5 w-1.5 fill-yellow-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            Pending
          </span>
        );
    }
  };

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
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center ml-2">
                        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                          <AvatarImage src="/avatars/02.png" alt="Avatar" />
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="mt-1 text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">Title</div>
                      <div className="mt-1 text-gray-500">Department</div>
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
