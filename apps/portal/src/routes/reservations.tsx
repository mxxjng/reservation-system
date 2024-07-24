import ApiClient from "@/api/api-client";
import { EmptyListHandler } from "@/components/DataHandling/EmptyListHandler/EmptyListHandler";
import LoadingHandler from "@/components/DataHandling/LoadingHandler/LoadingHandler";
import { DataTableDemo } from "@/components/DataTable/DataTable";
import { apiEndpoints, config } from "@/utils/constants";
import { useQuery } from "react-query";

const Reservations = () => {
  const { status, data } = useQuery({
    queryKey: ["getAllReservations"],
    queryFn: async () => {
      const response = await ApiClient.get(
        `${config.urls.API_URL}${apiEndpoints.reservation.getReservations.path}`
      );
      return response.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Reservation Page</h1>
      <LoadingHandler status={status}>
        <EmptyListHandler length={data?.length ?? 0}>
          <DataTableDemo />
        </EmptyListHandler>
      </LoadingHandler>
    </div>
  );
};
export default Reservations;
