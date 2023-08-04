import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "AVAILABLE",
    label: "Available",
    icon: CheckCircledIcon,
  },
  {
    value: "CHECKED_OUT",
    label: "Checked Out",
    icon: CrossCircledIcon,
  },
];

export const types = [
  {
    value: "OTHER",
    label: "Other",
  },
  {
    value: "PATIENT_SIMULATORS",
    label: "Patient Simulators",
  },
  {
    value: "TASK_TRAINERS",
    label: "Task Trainers",
  },
  {
    value: "SIMULATION_EQUIPMENT",
    label: "Simulation Equipment",
  },
  {
    value: "MEDICAL_FURNITURE",
    label: "Medical Furniture",
  },
  {
    value: "CONSMABLE_SUPPLIES",
    label: "Consmable Supplies",
  },
  {
    value: "NONCONSUMABLE_SUPPLIES",
    label: "Non-Consumable Supplies",
  },
  {
    value: "COMPUTERS",
    label: "Computers",
  },
  {
    value: "OFFICE_SUPPLIES",
    label: "Office Supplies",
  },
];
