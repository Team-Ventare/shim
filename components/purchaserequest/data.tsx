import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "PENDING",
    label: "Pending",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-300">
          <span className="text-yellow-700">Pending</span>
        </div>
      );
    },
  },
  {
    value: "APPROVED",
    label: "Approved",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-300">
          <span className="text-green-700">Approved</span>
        </div>
      );
    },
  },
  {
    value: "REJECTED",
    label: "Rejected",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-300">
          <span className="text-red-700">Rejected</span>
        </div>
      );
    },
  },
];

export const priorities = [
  {
    value: "LOW",
    label: "Low",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-stone-100 px-1.5 py-0.5 text-xs font-medium text-stone-700 ring-1 ring-inset ring-stone-300">
          <span className="text-stone-700">Low</span>
        </div>
      );
    },
  },
  {
    value: "MEDIUM",
    label: "Medium",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-cyan-100 px-1.5 py-0.5 text-xs font-medium text-cyan-700 ring-1 ring-inset ring-cyan-300">
          <span className="text-cyan-700">Medium</span>
        </div>
      );
    },
  },
  {
    value: "HIGH",
    label: "High",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-300">
          <span className="text-violet-700">High</span>
        </div>
      );
    },
  },
];
