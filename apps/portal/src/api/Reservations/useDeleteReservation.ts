import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import ApiClient from "@/api/api-client";
import i18n from "@/app/i18n";
import { apiEndpoints, config } from "@/utils/constants";

const { getReservations } = apiEndpoints.reservation;
const { deleteReservations } = apiEndpoints.reservation;

export function deleteReservation(id: string) {
  return ApiClient.delete(`${config.urls.API_URL}${deleteReservations.path(id)}`);
}

type Props = {
  /* Optional function to be executed when the mutation is successful */
  successFn?: () => void;
};

/* Delete a reservation */
export function useDeleteReservation({ successFn }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getReservations.queryKey] });
      toast.success(i18n.t("login.notifications.success.title"));
      if (successFn) successFn();
    },
    onError: () => {
      toast.error(i18n.t("login.notifications.success.title"));
    },
  });

  return { mutate, isDeleting };
}
