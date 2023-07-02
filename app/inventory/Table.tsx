"use client";

import { useState } from "react";
import { Product } from "./Product";

const headers = ["Item Name", "Amount", "Location", "Type", "Status", "Action"];

const products = [
  { name: "Product 1", quantity: 100, location: "A1", supplier: "Supplier 1" },
  { name: "Product 2", quantity: 200, location: "A2", supplier: "Supplier 2" },
  { name: "Product 3", quantity: 300, location: "A3", supplier: "Supplier 3" },
  { name: "Product 4", quantity: 400, location: "A4", supplier: "Supplier 4" },
  { name: "Product 5", quantity: 500, location: "A5", supplier: "Supplier 5" },
  { name: "Product 6", quantity: 600, location: "A6", supplier: "Supplier 6" },
  { name: "Product 7", quantity: 700, location: "A7", supplier: "Supplier 7" },
  { name: "Product 8", quantity: 800, location: "A8", supplier: "Supplier 8" },
  { name: "Product 9", quantity: 900, location: "A9", supplier: "Supplier 9" },
  {
    name: "Product 10",
    quantity: 1000,
    location: "A10",
    supplier: "Supplier 10",
  },
  {
    name: "Product 11",
    quantity: 1100,
    location: "A11",
    supplier: "Supplier 11",
  },
  {
    name: "Product 12",
    quantity: 1200,
    location: "A12",
    supplier: "Supplier 12",
  },
];

interface TableContext {
  searchContext: string;
  setItemSavedModal: (value: boolean) => void;
  setCartAddNotification: (value: boolean) => void;
}

const Table = ({ props }: { props: TableContext }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  let search = props.searchContext;

  const getPageRange = () => {
    const startRange = (currentPage - 1) * itemsPerPage + 1;
    const endRange = Math.min(currentPage * itemsPerPage, totalItems);
    return `${startRange}-${endRange}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    if (currentPage > products.length / 10) {
      setCurrentPage(Math.ceil(products.length / 10));
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto border border-slate-400 sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto sm:rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {search !== ""
            ? currentProducts
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((data, index) => (
                  <>
                    <Product
                      key={index}
                      product={data}
                      edit={() => props.setItemSavedModal(true)}
                      cart={() => props.setCartAddNotification(true)}
                    />
                  </>
                ))
            : currentProducts.map((data, index) => (
                <>
                  <Product
                    key={index}
                    product={data}
                    edit={() => props.setItemSavedModal(true)}
                    cart={() => props.setCartAddNotification(true)}
                  />
                </>
              ))}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between px-4 py-1 bg-white border-t border-gray-200 sm:px-6 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {getPageRange()}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {products.length}
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a
              href="#"
              onClick={() => {
                if (currentPage === 1) return;
                handlePageChange(currentPage - 1);
              }}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          {getPageNumbers().map((pageNumber) => (
            <li key={pageNumber}>
              <a
                href="#"
                className={`px-3 py-2 leading-tight ${
                  pageNumber === currentPage
                    ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={() => {
                if (currentPage === totalPages) return;
                handlePageChange(currentPage + 1);
              }}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { Table };
export type { TableContext };
