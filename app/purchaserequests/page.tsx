"use client";

import { Header } from "../components/Header";
import React from "react";

export default function PurchaseRequests() {
  return (
    <div className="min-h-screen min-w-screen max-w-screen bg-white dark:bg-slate-900">
      <Header />
      <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-center">
        <div className="mt-3 flex items-center justify-center gap-x-6">
          <a
            href="#new"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            CREATE NEW REQUEST
          </a>
        </div>
        <div className="mt-2 dark:text-white">
          <h1>Need something?</h1>
        </div>
      </div>

      <>
        {/* component */}
        <section className="antialiased bg-white text-gray-600 h-full w-full px-4">
          <div className="flex flex-col justify-center h-full">
            {/* Table */}
            <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                  Purchase Requests
                </h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Request Title
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Price</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Date</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Request ID
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                width={40}
                                height={40}
                                alt="Alex Shatov"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              Alexis Castillo
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            Nitrile Disposable Gloves
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            $62.40
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">06/26/2023</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">051622154</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
                                width={40}
                                height={40}
                                alt="Philip Harbach"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              Philip Harbach
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            Digital Blood Pressure Monitor Pro
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            $767.89
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">06/15/2023</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">057622134</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
                                width={40}
                                height={40}
                                alt="Mirko Fisuk"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              Mario Fisuk
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">Portable Ventilator</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            $2,996.00
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">05/06/2023</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">551622155</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                                width={40}
                                height={40}
                                alt="Olga Semklo"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              Samantha Wagner
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            Medical Disposable Surgical Masks
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            $40.66
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">03/20/2023</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">651622154</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                                width={40}
                                height={40}
                                alt="Burak Long"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              Burak Long
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">Digital X Ray Machine</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            $4,890.66
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">01/25/2023</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-left">789622154</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
