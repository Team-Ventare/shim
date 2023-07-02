import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

const ProfileDropDown = ({ props }: { props: any }) => {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex text-md items-center">
          <span className="sr-only">Open user menu</span>
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h1 className="pl-2">{props.name}</h1>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {navigation.map((item, index) => (
            <Menu.Item key={index}>
              <a
                href={item.href}
                className={`w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
              >
                {item.name}
              </a>
            </Menu.Item>
          ))}
          <Menu.Item>
            <button
              onClick={() => signOut()}
              className="w-full text-left block px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900"
            >
              Sign Out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { ProfileDropDown };
