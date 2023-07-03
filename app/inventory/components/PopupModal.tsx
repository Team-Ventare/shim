import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BiLockAlt } from "react-icons/bi";

interface PopupModalProps {
  slideOver: boolean;
  setSlideOver: () => void;
}

const PopupModal = ({ slideOver, setSlideOver }: PopupModalProps) => {
  return (
    <Transition.Root show={slideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSlideOver}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6 items-center pb-6 border-b">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        Add New Item
                      </Dialog.Title>

                      <div className="absolute right-2 top-1 -ml-6 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-900 p-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setSlideOver()}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {/* Add New Item Form */}
                    <div className="relative mt-4 flex-1">
                      <form>
                        <div className="mb-4 flex flex-row items-center justify-between border-b px-5 pb-4">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            Item name
                          </label>
                          <div className="relative w-96">
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4 flex flex-row items-start justify-between border-b px-5 pb-4">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white self-start">
                            Description
                          </label>
                          <div className="relative w-96">
                            <textarea
                              className="bg-gray-50 border h-24 flex-wrap border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4 flex flex-row items-center justify-between border-b px-5 pb-4">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            Location
                          </label>
                          <div className="relative w-96">
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4 flex flex-row items-center justify-between border-b px-5 pb-4">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            Amount
                          </label>
                          <div className="relative w-96">
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PopupModal;
