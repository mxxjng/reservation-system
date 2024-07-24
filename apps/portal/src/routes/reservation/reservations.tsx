import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { ReservationResponse } from "@repo/validators";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosResponse } from "axios";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import ApiClient from "@/api/api-client";
import { EmptyListHandler } from "@/components/DataHandling/EmptyListHandler/EmptyListHandler";
import LoadingHandler from "@/components/DataHandling/LoadingHandler/LoadingHandler";
import DynamicTable from "@/components/DataTable/DataTable";
import { apiEndpoints, config } from "@/utils/constants";
import { Link } from "react-router-dom";

const { path, queryKey } = apiEndpoints.reservation.getReservations;

const Reservations = () => {
  /* Fetch all reservations */
  const { status, data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response: AxiosResponse<ReservationResponse[]> = await ApiClient.get(
        `${config.urls.API_URL}${path}`
      );
      return response.data;
    },
  });

  const columns: ColumnDef<ReservationResponse>[] = [
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
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => (
        <Link to={`/reservations/${info.row.original.id}`}>
          <div className="lowercase">{info.row.getValue("email")}</div>
        </Link>
      ),
    },
    {
      accessorKey: "reservationDate",
      header: "Reservation Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {dayjs(row.getValue("reservationDate")).format("DD.MM.YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="capitalize">
          {dayjs(row.getValue("createdAt")).format("DD.MM.YYYY HH:mm")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Reservation Page</h1>
      <LoadingHandler status={status}>
        <EmptyListHandler length={data?.length ?? 0}>
          {data && <DynamicTable data={data} columns={columns} />}
        </EmptyListHandler>
      </LoadingHandler>
    </div>
  );
};
export default Reservations;
