import { Dialog } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface MobileMenuProps {
  navigation: { name: string; href: string }[];
  user?:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      }
    | undefined;
  mobileMenuOpen: boolean;
  menuToggle: () => void;
}

const MobileMenu = ({
  navigation,
  user,
  mobileMenuOpen,
  menuToggle,
}: MobileMenuProps) => {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={menuToggle}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              height={32}
              width={32}
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={menuToggle}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-slate-400 pt-2">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              {user ? (
                <>
                  <button
                    onClick={() => signOut()}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 w-full text-left text-red-700 hover:bg-red-100 hover:text-red-900"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export { MobileMenu };
export type { MobileMenuProps };
