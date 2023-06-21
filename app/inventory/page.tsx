"use client";

import { CiShoppingCart } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Nav } from "../nav/navbar";

const products = [
  { name: "Product 1", quantity: 100, location: "A1", supplier: "Supplier 1" },
  { name: "Product 2", quantity: 200, location: "A2", supplier: "Supplier 2" },
  { name: "Product 3", quantity: 300, location: "A3", supplier: "Supplier 3" },
];

export default function Example() {
  return (
    <div className="bg-white min-h-screen min-w-screen max-w-screen">
      <Nav />

      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <button className="text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md">
            Notifications
          </button>
          <button className="text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md ml-1">
            Recent Scans
          </button>
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
