"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york//ui/input";
import { DataTableFacetedFilter } from "@/components/inventory/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/inventory/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const categories = [
  {
    label: "News",
    value: "News",
  },
  {
    label: "Checkout",
    value: "Checkout",
  },
  {
    label: "Purchase Request",
    value: "Purchase Request",
  },
  {
    label: "Products",
    value: "Products",
  },
  {
    label: "Maintenance",
    value: "Maintenance",
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter messages..."
          value={(table.getColumn("message")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("message")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={categories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
