import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatCreatedAt(createdAt: string): string {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();

  const timeDifferenceInMilliseconds =
    currentDate.getTime() - createdAtDate.getTime();
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const timeDifferenceInHours = timeDifferenceInMinutes / 60;
  const timeDifferenceInDays = timeDifferenceInHours / 24;

  if (timeDifferenceInMinutes < 60) {
    const minutesAgo = Math.floor(timeDifferenceInMinutes);
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifferenceInHours < 24) {
    const hoursAgo = Math.floor(timeDifferenceInHours);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifferenceInDays < 2) {
    return "Yesterday";
  } else {
    const formattedDate = createdAtDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
}

// Example usage:
const notification = {
  createdAt: "2023-10-04T15:30:00Z", // Replace with your actual createdAt date
};

const formattedText = formatCreatedAt(notification.createdAt);
console.log(formattedText);
