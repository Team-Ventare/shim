import Image from "next/image";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import Link from "next/link";

const actions = [
  {
    title: "News",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    description:
      "Stay up-to-date with the latest happenings and important announcements that shape our community.",
  },
  {
    title: "Purchase Requests",
    href: "#",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    description:
      "Seamlessly manage and track your purchase requests, ensuring a streamlined and efficient procurement process.",
  },
  {
    title: "Staff",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    description:
      "Discover the faces behind our organization's success - a diverse and talented staff dedicated to serving you.",
  },
  {
    title: "Inventory",
    href: "#",
    icon: BanknotesIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
    description:
      "Dive into a world of products and resources, and navigate our inventory effortlessly to find what you need.",
  },
  {
    title: "Maintenance",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
    description:
      "Experience seamless upkeep and improvements through our dedicated maintenance services for a thriving environment.",
  },
  {
    title: "Dashboard",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
    description:
      "Access a consolidated overview of essential metrics and insights, empowering you to make informed decisions.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-row h-screen w-screen max-h-screen max-w-screen">

      <div className="flex flex-col py-32 sm:py-0 px-6 pt-14 lg:px-8 w-full">
        <div className="flex justify-center">
          <Image src="/scaledshimlogo.png" width={520} height={77} alt="" />
        </div>
        <div className="hidden sm:mb-8 sm:flex sm:justify-center mx-auto mt-auto">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our newest update.{" "}
            <Link href="/news" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="mb-8 mx-auto max-w-6xl divide-y border divide-emerald-400 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={cn(
                actionIdx === 0
                  ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                  : "",
                actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                actionIdx === actions.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              )}
            >
              <div>
                <span
                  className={cn(
                    action.iconBackground,
                    action.iconForeground,
                    "inline-flex rounded-lg p-3 ring-4 ring-white"
                  )}
                >
                  <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  <a href={action.href} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
