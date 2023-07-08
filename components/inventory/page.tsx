"use client";

import { BsCart3 } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import React from "react";
import { useSession } from "next-auth/react";
import { Product, Table, TableContext } from "./components/Table";
import PopupModal from "./components/PopupModal";

const categorys = ["Name", "Location", "Supplier"];

export default function Inventory() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [addItemSlideOver, setAddItemSlideOver] = useState(false);
  const [cartAddNotification, setCartAddNotification] = useState(false);
  const [itemSavedModal, setItemSavedModal] = useState(false);
  const [category, setCategory] = useState(categorys[0]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [searchContext, setSearchContext] = useState("");

  const tableProps: TableContext = {
    searchContext: searchContext,
    products: products,
    setItemSavedModal: (value: boolean) => {
      setItemSavedModal(value);
    },
    setCartAddNotification: (value: boolean) => {
      setCartAddNotification(value);
      setCartQuantity(cartQuantity + 1);
    },
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setProducts(data);
    };

    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen min-w-screen max-w-screen bg-white dark:bg-slate-900">
      <div className="mx-auto min-w-screen px-6 py-2 pt-4">
        {/* Start - Notification Stack */}
        <div>
          {
            /* Session Alert */
            session === undefined ? undefined : (
              <div className="bg-green-50 dark:bg-gray-800 border border-green-400 p-4 rounded-lg mb-2">
                <div className="flex justify-between">
                  <p className="text-green-800 dark:text-green-400 text-md">
                    {JSON.stringify(session)}
                  </p>
                </div>
              </div>
            )
          }
          {
            /* Item Saved Alert */
            !itemSavedModal ? undefined : (
              <div className="bg-orange-50 dark:bg-gray-800 border border-orange-400 p-4 rounded-lg mb-2">
                <div className="flex justify-between">
                  <p className="text-orange-800 dark:text-orange-400 text-md">
                    Item saved and inventory updated!
                  </p>
                  <div className="flex-shrink-0">
                    <RxCross2
                      onClick={() => setItemSavedModal(false)}
                      className="text-lg bg-orange-50 dark:bg-gray-800 text-orange-800 dark:text-orange-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )
          }

          {
            /* Cart Alert */
            !cartAddNotification ? undefined : (
              <div className="bg-blue-50 dark:bg-gray-800 border border-blue-400 p-4 rounded-lg mb-2">
                <div className="flex justify-between">
                  <p className="text-blue-800 dark:text-blue-400 text-md">{`Item added to cart. Cart total ${cartQuantity}`}</p>
                  <div className="flex-shrink-0">
                    <RxCross2
                      onClick={() => setCartAddNotification(false)}
                      className="text-lg bg-blue-50 dark:bg-gray-800 text-blue-800 dark:text-blue-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )
          }
          {/* End - Notification Stack */}
        </div>

        {addItemSlideOver ? (
          <PopupModal
            slideOver={addItemSlideOver}
            products={products}
            setSlideOver={() => setAddItemSlideOver(!addItemSlideOver)}
          />
        ) : undefined}

        <div className="pb-2">
          {/* Start - Top Bar */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex">
              {/* Search Bar */}
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  onChange={(event) => setSearchContext(event.target.value)}
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-9"
                  placeholder={`Searching by ${category.toLowerCase()}..`}
                />
              </div>
              {/* END - Search Bar */}

              {/* Category Pill */}
              <Menu
                as="div"
                className="relative inline-block text-left pl-2 mt-1"
              >
                <div>
                  <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-9">
                    Category
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2">
                      {categorys.slice(0, 3).map((pill, index) => (
                        <Menu.Item key={index}>
                          <button
                            onClick={(s) => setCategory(pill)}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          >
                            {pill}
                          </button>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* END - Category Pill */}
            </div>

            {/* Start - Right Side */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAddItemSlideOver(true)}
                className="text-sm font-medium leading-6 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md flex items-center border-black dark:border-slate-400 border h-9"
              >
                <IoAdd className="text-lg pr-1" /> Add Item
              </button>
              <button className="text-sm font-medium leading-6 text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-md flex items-center border h-9">
                <BsCart3 className="text-lg pr-1" /> Cart
              </button>
            </div>
          </div>
          {/* END - Top Bar */}
        </div>

        {/* Table */}
        <Table props={tableProps} />
      </div>
    </div>
  );
}
