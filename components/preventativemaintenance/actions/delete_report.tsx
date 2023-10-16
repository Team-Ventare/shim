"use server";

//async function to delete a report
export async function deletePM({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/reports/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
    );
    const res = await req.json();
    return res;
}