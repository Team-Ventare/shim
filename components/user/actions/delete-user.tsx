"use server";

//ansyc function to delete a purchase request
export async function deleteUser({ id }: { id: string }) {
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/users/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
    );
    const res = await req.json();
    return res;
}