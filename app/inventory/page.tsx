"use client";

import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { BsUpcScan } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { Nav } from "../nav/navbar";

const products = [
  { name: "Product 1", quantity: 100, location: "A1", supplier: "Supplier 1" },
  { name: "Product 2", quantity: 200, location: "A2", supplier: "Supplier 2" },
  { name: "Product 3", quantity: 300, location: "A3", supplier: "Supplier 3" },
];

/*
<div className="flex py-2 px-1 rounded-lg text-gray-500 font-semibold cursor-pointer">
  <span>Category</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
</div>
*/

export default function Example() {
  return (
    <div className="bg-white min-h-screen min-w-screen max-w-screen">
      <Nav />

      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex">
          <button className="text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md flex items-center">
            <IoIosNotificationsOutline className="text-lg mr-1" />
            <span>Notifications</span>
          </button>
          <button className="text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md flex items-center ml-1">
            <BsUpcScan className="text-lg mr-2" />
            <span>Scans</span>
          </button>

          <div className="flex justify-start items-center px-3 relative ml-1">
            <input
              className="text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300  outline-none"
              type="text"
              placeholder="Search"
              style={{ paddingRight: "2.5rem" }}
            />
            <svg
              className="absolute right-5 z-10 cursor-pointer"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                stroke="#4B5563"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L15 15"
                stroke="#4B5563"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <button className="text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md flex items-center">
          <IoAdd className="text-lg mr-1" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="mx-auto min-w-screen p-4">
        <div className="text-center p-4">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Inventory
          </h2>
        </div>

        <div className="flex flex-row flex-wrap justify-center py-2">
          {products.map((product, index) => (
            <div
              className="border border-gradient rounded-md m-auto w-96 h-auto bg-white relative flex-shrink-0 mb-4 shadow-xl"
              key={index}
            >
              <div className="text-black p-4 rounded-md rounded-b-none border-b flex items-center justify-between">
                <strong className="text-2xl">{product.name}</strong>
                <MdOutlineEditCalendar className="text-xl mr-2 cursor-pointer" />
              </div>

              <div className="p-4">
                <div className="flex items-center px-2 py-1">
                  <CiShoppingCart className="text-xl" />
                  <p className="px-2 text-gray-700">{product.quantity}</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <TiLocation className="text-xl" />
                  <p className="px-2 text-gray-700">{product.location}</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <FaTruck className="text-xl" />
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
