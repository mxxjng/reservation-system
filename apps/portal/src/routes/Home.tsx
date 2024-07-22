import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { testFormSchema, TestFormSchema } from "@repo/validators";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import ApiClient from "@/api/api-client";
import { EmptyListHandler } from "@/components/DataHandling/EmptyListHandler/EmptyListHandler";
import LoadingHandler from "@/components/DataHandling/LoadingHandler/LoadingHandler";
import { apiEndpoints, config } from "@/utils/constants";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitHandler<TestFormSchema> = (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success(`Name: ${data.name}`);
    }, 3000);
  };

  // TODO: get typed response
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
    <div className="p-4">
      <h1 className="text-3xl font-bold underline mb-4">Vite + React</h1>

      <LoadingHandler status={status}>
        <EmptyListHandler length={data?.length ?? 0}>
          {data?.map((item: any) => (
            <p key={item.id} className="mb-2">
              {item.email}
            </p>
          ))}
        </EmptyListHandler>
      </LoadingHandler>

      <div className="max-w-sm">
        <Form<TestFormSchema, typeof testFormSchema>
          onSubmit={handleSubmit}
          schema={testFormSchema}
        >
          <Form.StringInput<TestFormSchema> id="name" name="name" className="mb-2" />
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Home;
