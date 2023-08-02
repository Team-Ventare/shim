import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "PENDING",
    label: "Pending",
    icon: StopwatchIcon,
  },
  {
    value: "APPROVED",
    label: "Approved",
    icon: CheckCircledIcon,
  },
  {
    value: "REJECTED",
    label: "Rejected",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    value: "LOW",
    label: "Low",
    icon: ArrowDownIcon,
  },
  {
    value: "MEDIUM",
    label: "Medium",
    icon: ArrowRightIcon,
  },
  {
    value: "HIGH",
    label: "High",
    icon: ArrowUpIcon,
  },
];
