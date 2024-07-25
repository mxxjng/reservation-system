import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { ReservationResponse } from "@repo/validators";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, Eye, Loader2, MoreHorizontal, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDeleteReservation } from "@/api/Reservations/useDeleteReservation";
import { useReservations } from "@/api/Reservations/useReservations";
import { EmptyListHandler } from "@/components/DataHandling/EmptyListHandler/EmptyListHandler";
import LoadingHandler from "@/components/DataHandling/LoadingHandler/LoadingHandler";
import DynamicTable from "@/components/DataTable/DataTable";
import { useModal } from "@/components/Modal/reducer";
import CreateReservationModal from "@/features/Reservation/Modals/CreateReservationModal";

/* Overview Page for Reservations */
const Reservations = () => {
  const { t } = useTranslation();

  /* Page Modal States */
  const { state, openModal, closeModal } = useModal();

  /* Fetches all reservations */
  const { status, data } = useReservations();

  /* Delete a reservation */
  const { mutate, isDeleting } = useDeleteReservation({
    successFn: () => {
      closeModal();
    },
  });

  /* Column definition for data table */
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
              <DropdownMenuItem>
                <Link to={`/reservations/${row.original.id}`}>
                  <div className="flex cursor-pointer items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    openModal({
                      type: "delete",
                      data: { id: row.original.id, name: row.original.email },
                    })
                  }
                >
                  <Trash className="mr-2 h-4 w-4 text-danger" />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <Dialog open={state.open} onOpenChange={closeModal}>
        <DialogContent>
          {state.type === "delete" && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Reservation?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the reservation and
                  remove the data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => closeModal()}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => mutate(state.data?.id || "")}>
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                      Deleting
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
          {state.type === "create" && <CreateReservationModal close={closeModal} />}
        </DialogContent>
      </Dialog>

      <h1 className="text-3xl font-bold text-foreground">{t("reservationsOverview.title")}</h1>
      <p className="text-muted-foreground mb-4">{t("reservationsOverview.description")}</p>

      <LoadingHandler status={status}>
        <EmptyListHandler
          length={data?.length ?? 0}
          emptyMessage={<EmptyMessage openModal={openModal} />}
        >
          {data && (
            <DynamicTable
              filterBar={
                <Button
                  variant="outline"
                  onClick={() => openModal({ type: "create", data: null })}
                  className="mr-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reservation
                </Button>
              }
              data={data}
              columns={columns}
            />
          )}
        </EmptyListHandler>
      </LoadingHandler>
    </>
  );
};

type EmptyMessageProps = {
  /* Function to open create modal */
  openModal: (data: { type: string; data: any }) => void;
};

/* Displays a message when there are no reservations */
function EmptyMessage({ openModal }: EmptyMessageProps) {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-border border-dashed shadow-sm p-8"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          {t("reservationsOverview.emptyState.title")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("reservationsOverview.emptyState.description")}
        </p>
        <Button className="mt-4" onClick={() => openModal({ type: "create", data: null })}>
          {t("reservationsOverview.emptyState.button")}
        </Button>
      </div>
    </div>
  );
}

export default Reservations;
