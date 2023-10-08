"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/logo1.png";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BuildingStorefrontIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  HomeModernIcon,
  NewspaperIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
  WrenchIcon,
  XMarkIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "@/app/(app)/dashboard/page";

const navigation = [
  { name: "Home", href: "/", icon: HomeModernIcon },
  { name: "News", href: "/news", icon: NewspaperIcon },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: RectangleGroupIcon,
  },
  { name: "Cart", href: "/cart", icon: ShoppingCartIcon },
  {
    name: "Inventory",
    href: "/products",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Purchase Requests",
    href: "/requests",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Staff", href: "/staff", icon: UsersIcon },
  { name: "Suppliers", href: "/suppliers", icon: TruckIcon },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: WrenchIcon,
  },
];

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r px-6 bg-white dark:bg-">
                    <div className="flex shrink-0 items-center h-16 mt-2">
                      <Image
                        height={48}
                        width={48}
                        className="w-auto h-10"
                        src={logo}
                        alt="Your Company"
                      />
                      <span className="text-2xl font-bold text-black dark:text-white ml-4">
                        Ventare
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-4">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.slice(0, 3).map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    item.href === pathname
                                      ? "bg-gray-50 dark:bg-transparent/30 text-indigo-600"
                                      : "text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-transparent/30",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      item.href === pathname
                                        ? "text-indigo-600"
                                        : "text-gray-400 dark:text-white group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400 dark:text-gray-300">
                            Console
                          </div>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.slice(3, 6).map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    item.href === pathname
                                      ? "bg-gray-50 dark:bg-transparent/30 text-indigo-600"
                                      : "text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-transparent/30",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      item.href === pathname
                                        ? "text-indigo-600"
                                        : "text-gray-400 dark:text-white group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                  {item.href === "/cart" && (
                                    <>
                                      <span className="ml-auto mr-2 text-xs font-semibold leading-6 text-gray-600 dark:text-white">
                                        {user.cart.products?.length || 0}
                                      </span>
                                    </>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400 dark:text-gray-300">
                            Support
                          </div>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.slice(6, 9).map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    item.href === pathname
                                      ? "bg-gray-50 dark:bg-transparent/30 text-indigo-600"
                                      : "text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-transparent/30",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      item.href === pathname
                                        ? "text-indigo-600"
                                        : "text-gray-400 dark:text-white group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <div className="flex items-center space-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-transparent/30">
                            <Avatar className="h-10 w-10 text-zinc-950 dark:text-white">
                              <AvatarImage
                                src={user.image as string}
                                referrerPolicy="no-referrer"
                              />
                              <AvatarFallback>{user.name.at(0)}</AvatarFallback>
                            </Avatar>
                            <span aria-hidden="true">{user.name}</span>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="ml-auto"
                                >
                                  <ChevronUpIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-48">
                                <DropdownMenuLabel>
                                  My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                  <DropdownMenuItem className="cursor-pointer">
                                    Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    Settings
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={() => signOut()}
                                  >
                                    Sign out
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r px-6">
            <div className="flex shrink-0 items-center h-16 mt-2">
              <Image
                height={48}
                width={48}
                className="w-auto h-10"
                src={logo}
                alt="Your Company"
              />
              <span className="text-2xl font-bold text-black dark:text-white ml-4">
                Ventare
              </span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-4">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.slice(0, 3).map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            item.href === pathname
                              ? "bg-gray-50 dark:bg-transparent/30 text-indigo-600"
                              : "text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-transparent/30",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={cn(
                              item.href === pathname
                                ? "text-indigo-600"
                                : "text-gray-400 dark:text-white group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400 dark:text-gray-300">
                    Console
                  </div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.slice(3, 6).map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            item.href === pathname
                              ? "bg-gray-50 dark:bg-transparent/30 text-indigo-600"
                              : "text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-transparent/30",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={cn(
                              item.href === pathname
                                ? "text-indigo-600"
                                : "text-gray-400 dark:text-white group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.href === "/cart" && (
                            <>
                              <span className="ml-auto mr-2 text-xs font-semibold leading-6 text-gray-600 dark:text-white">
                                {user.cart.products?.length || 0}
                              </span>
                            </>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400 dark:text-gray-300">
                    Support
                  </div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.slice(6, 9).map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            item.href === pathname
                              ? "bg-gray-50 dark:bg-transparent/30 text-indigo-600"
                              : "text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-transparent/30",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={cn(
                              item.href === pathname
                                ? "text-indigo-600"
                                : "text-gray-400 dark:text-white group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <div className="flex items-center space-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-transparent/30">
                    <Avatar className="h-10 w-10 text-zinc-950 dark:text-white">
                      <AvatarImage
                        src={user.image as string}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback>{user.name.at(0)}</AvatarFallback>
                    </Avatar>
                    <span aria-hidden="true">{user.name}</span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="ml-auto"
                        >
                          <ChevronUpIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="cursor-pointer">
                            Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Settings
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={() => signOut()}
                          >
                            Sign out
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 flex items-center gap-x-6 p-4 shadow-sm sm:px-6 lg:hidden bg-background dark:border-b">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Dashboard
          </div>
          <span className="sr-only">Your profile</span>
          <div className="flex items-center space-x-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            <Avatar className="h-10 w-10 text-zinc-950 dark:text-white">
              <AvatarImage
                src={user.image as string}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>{user.name.at(0)}</AvatarFallback>
            </Avatar>
            <span aria-hidden="true">{user.name}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ml-auto">
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => signOut()}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
