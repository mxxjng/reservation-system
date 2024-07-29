import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import StringInput from "./Inputs/StringInput/StringInput";
import SelectInput from "./Inputs/SelectInput/SelectInput";
import NumberInputComponent from "./Inputs/NumberInput/NumberInput";
import FileInputComponent from "./Inputs/FileInput/FileInput";
import ColorInputComponent from "./Inputs/ColorInput/ColorInput";
import DateInputComponent from "./Inputs/DateInput/DateInput";
import BooleanInputComponent from "./Inputs/BooleanInput/BooleanInput";
import ImageUploadInput from "./Inputs/ImageUploadInput/ImageUploadInput";
import ButtonInput from "./Inputs/ButtonInput/ButtonInput";
import TextareaInputComponent from "./Inputs/TextareaInput/TextareaInput";
import JsonInputComponent from "./Inputs/JsonInput/JsonInput";
import SegmentControlInputComponent from "./Inputs/SegmentedControlInput/SegmentedControlInput";

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

  console.log("form errors", methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<Record<string, any>>)}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.StringInput = StringInput;
Form.SelectInput = SelectInput;
Form.NumberInput = NumberInputComponent;
Form.FileInput = FileInputComponent;
Form.ColorInput = ColorInputComponent;
Form.DateInput = DateInputComponent;
Form.SwitchInput = BooleanInputComponent;
Form.ImageUploadInput = ImageUploadInput;
Form.Button = ButtonInput;
Form.Textarea = TextareaInputComponent;
Form.JsonInput = JsonInputComponent;
Form.Segment = SegmentControlInputComponent;
