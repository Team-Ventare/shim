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
    const formattedTime = `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"}`;
    return `${formattedTime} ago`;
  } else if (timeDifferenceInDays < 2) {
    const formattedDate = createdAtDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `Yesterday at ${formattedDate}`;
  } else {
    const formattedDate = createdAtDate.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  }
}
