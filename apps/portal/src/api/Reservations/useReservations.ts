import { ReservationResponse } from "@repo/validators";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import ApiClient from "@/api/api-client";
import { apiEndpoints, config } from "@/utils/constants";

const { getReservations } = apiEndpoints.reservation;

export async function fetchReservations() {
  const response: AxiosResponse<ReservationResponse[]> = await ApiClient.get(
    `${config.urls.API_URL}${getReservations.path}`
  );
  return response.data;
}

/* Fetch all reservations */
export function useReservations() {
  const { status, data } = useQuery({
    queryKey: [getReservations.queryKey],
    queryFn: fetchReservations,
  });

  return { status, data };
}
