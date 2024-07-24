import { InsertReservationSchema } from "@repo/validators";
import dayjs from "dayjs";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import ApiClient from "@/api/api-client";
import { apiEndpoints, config } from "@/utils/constants";
import ReservationForm from "../Form/ReservationForm";
import { Button } from "@repo/ui/button";

type Props = {
  /* Function to close the modal */
  close: () => void;
};

const { createReservations } = apiEndpoints.reservation;
const { getReservations } = apiEndpoints.reservation;

/* Modal to create an entity */
const CreateReservationModal = ({ close }: Props) => {
  const queryClient = useQueryClient();

  /* Delete a reservation */
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (data: InsertReservationSchema) => {
      return ApiClient.post(`${config.urls.API_URL}${createReservations.path}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getReservations.queryKey] });
      toast.success("Reservation created successfully");
      close();
    },
    onError: () => {
      console.log("error");
    },
  });

  /* Function to submit the form */
  const handleSubmit: SubmitHandler<InsertReservationSchema> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-4 text-foreground">Create Reservation</h3>
      <ReservationForm
        onSubmit={handleSubmit}
        isLoading={isCreating}
        defaultValues={{
          reservationDate: dayjs().format("YYYY-MM-DD"),
        }}
        cancelButton={
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
        }
      />
    </div>
  );
};
export default CreateReservationModal;
