import { User } from "@/app/(app)/dashboard/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { Label } from "@/registry/new-york/ui/label";

export function SettingsDashboard({ user }: { user: User }) {
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

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                  <Button>Change avatar</Button>
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
              <div className="sm:col-span-3">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" defaultValue={user.name.split(" ")[0]} />
              </div>
              <div className="sm:col-span-3">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" defaultValue={user.name.split(" ")[1]} />
              </div>
              <div className="col-span-full">
                <Label htmlFor="email">Email address</Label>
                <Input type="email" id="email" defaultValue={user.email} />
              </div>
            </div>
            <div className="mt-8 flex">
              <Button>Save</Button>
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
