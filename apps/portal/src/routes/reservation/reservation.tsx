import ApiClient from "@/api/api-client";
import LoadingHandler from "@/components/DataHandling/LoadingHandler/LoadingHandler";
import { useModal } from "@/components/Modal/reducer";
import { apiEndpoints, config } from "@/utils/constants";
import { Button } from "@repo/ui/button";
import { ReservationResponse } from "@repo/validators";
import { AxiosResponse } from "axios";
import { ChevronLeft, Loader2, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";

const { getReservation } = apiEndpoints.reservation;
const { getReservations } = apiEndpoints.reservation;
const { deleteReservations } = apiEndpoints.reservation;

const Reservation = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /* Page Modal States */
  const { state, openModal, closeModal } = useModal();

  /* Fetch single reservation */
  const { status, data } = useQuery({
    queryKey: [getReservation.queryKey, params.reservationId],
    queryFn: async () => {
      const response: AxiosResponse<ReservationResponse> = await ApiClient.get(
        `${config.urls.API_URL}${getReservation.path(params.reservationId || "")}`
      );
      return response.data;
    },
    enabled: !!params.reservationId,
  });

  /* Delete a reservation */
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id: string) => {
      return ApiClient.delete(`${config.urls.API_URL}${deleteReservations.path(id)}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getReservations.queryKey] });
      toast.success("Reservation deleted successfully");
      closeModal();
      navigate("/reservations");
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <div>
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
        </DialogContent>
      </Dialog>

      <Link to="/reservations" className="text-muted-foreground">
        <div className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Reservations Overview
        </div>
      </Link>
      <LoadingHandler status={status}>
        {data && (
          <div>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Reservation</h2>
              <div>
                <Button
                  onClick={() =>
                    openModal({ type: "delete", data: { id: data.id, name: data.email } })
                  }
                  variant="outline"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Email: {data.email}</p>
          </div>
        )}
      </LoadingHandler>
    </div>
  );
};
export default Reservation;
