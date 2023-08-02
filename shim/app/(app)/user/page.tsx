import { getUserSession } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getUserSession();

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-bold">Welcome to your profile page!</h1>
        <h2 className="text-2xl font-bold">
          Your email is {session.user.email}
        </h2>
      </div>
    </div>
  );
}
