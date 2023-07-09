import { NavBar } from "@/components/nav-bar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen max-w-screen bg-white dark:bg-slate-900">
      <NavBar />

      <div className="py-6 flex justify-center">
        <Image src="/scaledshimlogo.png" width={520} height={77} alt="" />
      </div>
      <div className="mx-auto min-w-screen max-w-2xl py-32 sm:py-0 px-6 pt-14 lg:px-8">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our newest update.{" "}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl py-8 dark:text-white">
            Smart Hospital Inventory Management.
          </h1>
          <p className="mt-0 text-lg leading-8 text-gray-600">
            Developed by Ventare, a team of software engineers at the University
            of Texas at Arlington.
          </p>
        </div>
      </div>
    </div>
  );
}
