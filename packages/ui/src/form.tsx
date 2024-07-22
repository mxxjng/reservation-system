import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import StringInput from "./stringinput";

type FormProps<DataSchema extends Record<string, any>, Schema> = {
  /* optional schema to be used for validation */
  schema?: Schema;

  /* function to be called when the form is submitted */
  onSubmit: SubmitHandler<DataSchema>;

  /* content of the form */
  children: React.ReactNode;

  /* optional default values for the form */
  defaultValues?: Record<string, any>;
};

// Dynamic form component
export function Form<DataSchema extends Record<string, any>, Schema extends z.Schema<any>>({
  schema,
  children,
  onSubmit,
  defaultValues,
}: FormProps<DataSchema, Schema>) {
  const methods = useForm({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<Record<string, any>>)}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.StringInput = StringInput;
