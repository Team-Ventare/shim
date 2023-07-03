"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import { ProfileDropDown } from "./ProfileDropDown";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { MobileMenu, MobileMenuProps } from "./MobileMenu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "Purchase Requests", href: "/purchaserequests" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Staff", href: "/staff" },
];

const Header = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white top-0 z-0 mx-auto border-b border-slate-900/10 dark:border-slate-50/[0.06] dark:bg-transparent sticky">
      <nav
        className="flex items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src="/logo1.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-4">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2">
          {session ? (
            // User signed in
            <motion.div className="flex flex-row items-center px-3 py-2 text-sm leading-6 font-semibold rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100">
              <ProfileDropDown props={session.user} />
            </motion.div>
          ) : (
            // User not signed in
            <>
              <Link
                href="/signin"
                className="text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <MobileMenu
        navigation={navigation}
        user={session ? session.user : undefined}
        mobileMenuOpen={mobileMenuOpen}
        menuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
    </div>
  );
};

export { Header };
