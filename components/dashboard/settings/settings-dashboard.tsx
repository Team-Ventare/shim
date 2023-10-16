import { User } from "@/app/(app)/dashboard/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import React from "react";
import { refresh_dash } from "../refresh_page";

export function SettingsDashboard({ user }: { user: User }) {
  const [formValues, setFormValues] = React.useState({
    name: user.name,
    email: user.email,
  });

  const onSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      refresh_dash();
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formValues, null, 2)}
            </code>
          </pre>
        ),
        // title: "Request submitted!",
        // duration: 2000,
        // description: "The request was successfully submitted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        duration: 2000,
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <>
      <div className="divide-y dark:divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 pt-2 pb-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 dark:dark:text-white">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Use a permanent address where you can receive mail.
            </p>
          </div>

          <form onSubmit={onSumbit} className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                    <Label htmlFor="picture">Update Avatar</Label>
                    <Input type="file" id="picture" />
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
              <div className="sm:col-span-3">
                <Label htmlFor="first-name">Name</Label>
                <Input id="first-name" defaultValue={user.name}
                onChange={(e) =>setFormValues({ ...formValues, name: e.target.value })} />
              </div>
              {/* <div className="sm:col-span-3">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" defaultValue={user.name.split(" ")[1]}
                onChange={(e) =>setFormValues({ ...formValues, lastName: e.target.value })}/>
              </div> */}
              <div className="col-span-full">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" defaultValue={user.email}
                onChange={(e) =>setFormValues({ ...formValues, email: e.target.value })} />
              </div>
            </div>
            <div className="mt-8 flex">
                <Button type="submit">
                  Save
                </Button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 dark:text-white">
              Change password
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Update your password associated with your account.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <Label htmlFor="current-password">Current password</Label>
                <Input type="password" id="current-password" />
              </div>

              <div className="col-span-full">
                <Label htmlFor="new-password">New password</Label>
                <Input type="password" id="new-password" />
              </div>

              <div className="col-span-full">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input type="password" id="confirm-password" />
              </div>
            </div>

            <div className="mt-8 flex">
              <Button>Save</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
