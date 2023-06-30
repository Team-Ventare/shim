import { motion } from "framer-motion";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineEditCalendar } from "react-icons/md";

interface ProductProps {
  product: {
    name: string;
    quantity: number;
    location: string;
  };
  edit: () => void;
  cart: () => void;
}

const Product = ({ product, edit, cart }: ProductProps) => {
  return (
    <>
      <tr
        key={product.name}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product.name}
        </th>
        <td className="px-4 py-4">{product.quantity}</td>
        <td className="px-4 py-4">Location</td>
        <td className="px-4 py-4">Type</td>
        <td className="px-4 py-4">Status</td>
        <td className="px-4 py-4">
          <div className="flex flex-row space-x-4 w-auto">
            <motion.button
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <MdOutlineEditCalendar
                onClick={edit}
                className="text-xl cursor-pointer rounded-sm text-slate-600 dark:text-white hover:text-slate-900"
              />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <BsCart3
                onClick={cart}
                className="text-xl cursor-pointer rounded-sm text-slate-600 dark:text-white hover:text-slate-900"
              />
            </motion.button>
          </div>
        </td>
      </tr>
    </>
  );
};

export { Product };
