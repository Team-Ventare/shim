export const statuses = [
  {
    value: "AVAILABLE",
    label: "Available",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-300">
          <span className="text-green-700">Available</span>
        </div>
      );
    },
  },
  {
    value: "CHECKED_OUT",
    label: "Checked Out",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-300">
          <span className="text-red-700">Checked Out</span>
        </div>
      );
    },
  },
];

export const types = [
  {
    value: "OTHER",
    label: "Other",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-300">
          <span className="text-camberyan-700">Other</span>
        </div>
      );
    },
  },
  {
    value: "PATIENT_SIMULATORS",
    label: "Patient Simulators",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-lime-100 px-1.5 py-0.5 text-xs font-medium text-lime-700 ring-1 ring-inset ring-lime-300">
          <span className="text-lime-700">Patient Simulators</span>
        </div>
      );
    },
  },
  {
    value: "TASK_TRAINERS",
    label: "Task Trainers",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-pink-100 px-1.5 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-300">
          <span className="text-pink-700">Task Trainers</span>
        </div>
      );
    },
  },
  {
    value: "SIMULATION_EQUIPMENT",
    label: "Simulation Equipment",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-300">
          <span className="text-yellow-700">Simulation Equipment</span>
        </div>
      );
    },
  },
  {
    value: "MEDICAL_FURNITURE",
    label: "Medical Furniture",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-300">
          <span className="text-orange-700">Medical Furniture</span>
        </div>
      );
    },
  },
  {
    value: "CONSMABLE_SUPPLIES",
    label: "Consumable Supplies",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-rose-100 px-1.5 py-0.5 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-300">
          <span className="text-rose-700">Consumable Supplies</span>
        </div>
      );
    },
  },
  {
    value: "NONCONSUMABLE_SUPPLIES",
    label: "Non-Consumable Supplies",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-fuchsia-100 px-1.5 py-0.5 text-xs font-medium text-fuchsia-700 ring-1 ring-inset ring-fuchsia-300">
          <span className="text-fuchsia-700">Non-Consumable Supplies</span>
        </div>
      );
    },
  },
  {
    value: "COMPUTERS",
    label: "Computers",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-300">
          <span className="text-violet-700">Computers</span>
        </div>
      );
    },
  },
  {
    value: "OFFICE_SUPPLIES",
    label: "Office Supplies",
    view: () => {
      return (
        <div className="w-fit flex items-center gap-x-1.5 rounded-md bg-cyan-100 px-1.5 py-0.5 text-xs font-medium text-cyan-700 ring-1 ring-inset ring-cyan-300">
          <span className="text-cyan-700">Office Supplies</span>
        </div>
      );
    },
  },
];
