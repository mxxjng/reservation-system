import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { Separator } from "@repo/ui/separator";
import {
  InsertReservationSchema,
  ReservationResponse,
  insertReservationSchema,
} from "@repo/validators";
import { Loader2 } from "lucide-react";
import { SubmitHandler } from "react-hook-form";

type Props = {
  /* optional default values for the form */
  defaultValues?: Partial<ReservationResponse> | undefined;

  /* function to execute when the form is submitted */
  onSubmit: SubmitHandler<InsertReservationSchema>;

  /* check if the form is submitting */
  isLoading?: boolean;

  /* to check if the form is in edit or create mode */
  isEdit?: boolean;

  /* Optional form cancel button */
  cancelButton?: React.ReactNode;
};

const ReservationForm = ({ defaultValues, onSubmit, isLoading, isEdit, cancelButton }: Props) => {
  return (
    <Form<InsertReservationSchema, typeof insertReservationSchema>
      onSubmit={onSubmit}
      schema={insertReservationSchema}
      defaultValues={defaultValues}
    >
      <div className="grid grid-cols-1 gap-2 mb-4">
        <Form.StringInput<InsertReservationSchema>
          id="name"
          name="email"
          type="email"
          label="E-Mail"
          placeholder="Enter your email"
          required
        />
        <Form.StringInput<InsertReservationSchema>
          id="firstname"
          name="firstname"
          type="text"
          label="Firstname"
          placeholder="Enter your firstname"
          required
        />
        <Form.StringInput<InsertReservationSchema>
          id="lastname"
          name="lastname"
          type="text"
          label="Lastname"
          placeholder="Enter your lastname"
          required
        />
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between">
        {cancelButton && <>{cancelButton}</>}
        <Button>
          {isEdit ? (
            <>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </>
          )}
        </Button>
      </div>
    </Form>
  );
};
export default ReservationForm;
