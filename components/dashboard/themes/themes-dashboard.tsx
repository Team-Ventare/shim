import { ThemesTabs } from "@/components/dashboard/themes/tabs";
import { ThemeCustomizer } from "@/components/ui/theme-customizer";

export function ThemesDashboard() {
  return (
    <>
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Themes. Make it yours.
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Hand-picked themes that you can copy and paste into your apps.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="px-4 pb-8 md:ml-auto md:pb-0">
            <ThemeCustomizer />
          </div>
        </div>
      </div>
      <div className="pt-6">
        <ThemesTabs />
      </div>
    </>
  );
}
