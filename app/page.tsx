import Sidebar from "@/components/sidebar";
import {
  BellAlertIcon,
  HomeIcon,
  InboxIcon,
  TicketIcon,
  UserGroupIcon,
  WindowIcon,
  WrenchIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import homePNG from "../public/home.png";

const features = [
  {
    name: "Dashboard.",
    description:
      "Access a consolidated overview of essential metrics and insights, empowering you to make informed decisions.",
    icon: HomeIcon,
  },
  {
    name: "Inventory.",
    description:
      "Dive into a world of products and resources, and navigate our inventory effortlessly to find what you need.",
    icon: WindowIcon,
  },
  {
    name: "Maintenance.",
    description:
      "Experience seamless upkeep and improvements through our dedicated maintenance services for a thriving environment.",
    icon: WrenchIcon,
  },
  {
    name: "News.",
    description:
      "Stay up-to-date with the latest happenings and important announcements that shape our community.",
    icon: BellAlertIcon,
  },
  {
    name: "Purchase Requests.",
    description:
      "Seamlessly manage and track your purchase requests, ensuring a streamlined and efficient procurement process.",
    icon: TicketIcon,
  },
  {
    name: "Staff.",
    description:
      "Discover the faces behind our organization's success - a diverse and talented staff dedicated to serving you.",
    icon: UserGroupIcon,
  },
];

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="fixed flex-none w-full lg:w-28">
        <Sidebar />
      </div>

      <div className="w-full lg:ml-72 mx-auto mt-16 lg:mt-0 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Intuit Inventory Management
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Developed and maintained by Team Ventare. Intuit Inventory
              Management is a web application that allows you to manage your
              inventory, purchase requests, and more.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src={homePNG}
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              width={2560}
              height={923}
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[5%]" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
