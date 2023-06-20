"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CiShoppingCart } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Inventory", href: "#" },
  { name: "Orders", href: "#" },
  { name: "Suppliers", href: "#" },
  { name: "Staff", href: "#" },
];

const products = [
  { name: "Product 1", quantity: 100, location: "A1", supplier: "Supplier 1" },
  { name: "Product 2", quantity: 200, location: "A2", supplier: "Supplier 2" },
  { name: "Product 3", quantity: 300, location: "A3", supplier: "Supplier 3" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen max-h-screen relative isolate">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
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
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="w-screen mx-auto pt-20 py-16 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Inventory console
          </h1>
        </div>

        <div className="grid grid-flow-col py-12">
          {products.map((product) => (
            <div className="border border-gradient rounded-md m-auto w-96 h-auto bg-white relative">
              <div className="text-black p-4 rounded-md rounded-b-none border-b">
                <strong className="text-2xl">{product.name}</strong>
              </div>
              <div className="p-4">
                <div className="flex items-center px-2 py-1">
                  <CiShoppingCart />
                  <p className="px-2 text-gray-700">{product.quantity}</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <TiLocation />
                  <p className="px-2 text-gray-700">{product.location}</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <FaTruck />
                  <p className="px-2 text-gray-700">{product.supplier}</p>
                </div>
              </div>
              <button className="border text-black rounded-md py-2 px-4 mb-4 mx-4 absolute right-0 bottom-0 hover:border-black">
                Order More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
