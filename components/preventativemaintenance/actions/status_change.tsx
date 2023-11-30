"use server";

//update the status of that report to whatever the user selects
export async function UpdateStatusReviewed({ id }: { id: string }) {
    const req = await fetch(
      `https://shim-ventare.vercel.app/api/reports/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: "REVIEWED",
        }),
        cache: "no-store",
      }
    );
    const res = await req.json();
  return res;
}
export async function UpdateStatusNeedsReview({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/reports/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "NEEDS_REVIEW",
          }),
          cache: "no-store",
        }
      );
      const res = await req.json();
  return res;
}
export async function UpdateStatusInProgress({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/reports/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "IN_PROGRESS",
          }),
          cache: "no-store",
        }
      );
      const res = await req.json();
  return res;
}
export async function UpdateStatusOrdered({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/reports/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "ORDERED",
          }),
          cache: "no-store",
        }
      );
      const res = await req.json();
  return res;
}
export async function UpdateStatusCompleted({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/reports/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "COMPLETED",
          }),
          cache: "no-store",
        }
      );
      const res = await req.json();
  return res;
}