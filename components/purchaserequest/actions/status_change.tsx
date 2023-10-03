"use server";

//update the status of that request to whatever the user selects
export async function UpdateStatusAccept({ id }: { id: string }) {
    const req = await fetch(
      `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: "APPROVED",
        }),
        cache: "no-store",
      }
    );
    const res = await req.json();
  return res;
}
export async function UpdateStatusReject({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "REJECTED",
          }),
          cache: "no-store",
        }
      );
      const res = await req.json();
  return res;
}