"use client";
import { ArrowUpDown, MoreHorizontal, TriangleAlert } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { formatCurrency } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Actions } from "./actions";
import { status } from "@/config/status.config";
import { ActionsValidations } from "./actions-validation";
// import { AccountColumn } from "./account-column";
// import { CategoryColumn } from "./category-column";

interface ResponseType {
  _id: string;
  reference: string;
  name: string;
  amount: string;
  bank: string;
  payment_date: Date;
  payment_mode: string;
  status: string;
  categoryId: string;
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "reference",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Reference
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return <Badge
        variant={status == "draft" ? "destructive" : "primary"}
        className="text-md font-medium px-3.5 py-2.5">
        {status == "draft" && <TriangleAlert className='mr-2 size-4 shrink-0' />}
        {status}
      </Badge>
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = formatCurrency(amount);

      return <Badge variant={amount < 0 ? "destructive" : "primary"} className="text-md font-medium px-3.5 py-2.5">{formatted}</Badge>
    },
  },

  {
    accessorKey: "bank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Bank
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "payment_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("payment_date") as Date;

      return <span>{format(date, "dd/MM/yyyy")}</span>;
    },
  },

  {
    accessorKey: "payment_mode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Mode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => {
    //   return (
    //     <CategoryColumn id={row?.original?._id} category={row?.original?.mode} categoryId={row?.original?.categoryId} />
    //   )
    // },
  },

  {
    id: "actions",
    cell: ({ row }) => row.original.status === status[0] && <Actions id={row.original._id} />
       ||
        row.original.status === status[1] && <ActionsValidations id={row.original._id} />,
    enableSorting: false,
  },
];
