"use client";

import { CiShoppingCart } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { Nav } from "../nav/navbar";

const products = [
  { name: "Product 1", quantity: 100, location: "A1", supplier: "Supplier 1" },
  { name: "Product 2", quantity: 200, location: "A2", supplier: "Supplier 2" },
  { name: "Product 3", quantity: 300, location: "A3", supplier: "Supplier 3" },
];

export default function Example() {
  return (
    <div className="min-h-screen max-h-screen relative isolate">
      <Nav />

      <div className="w-screen mx-auto pt-20 py-16 px-6">
        <div className="text-center pt-8">
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
