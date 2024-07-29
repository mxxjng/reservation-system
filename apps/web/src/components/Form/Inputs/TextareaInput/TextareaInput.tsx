import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";
import { Textarea, TextareaProps } from "@mantine/core";

type TextareaInputComponentProps<Model extends Record<string, any>> =
  TextareaProps & DefaultFormInputProps<Model>;

function TextareaInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: TextareaInputComponentProps<Model>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name] && errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field: { onChange, value } }) => (
        <Textarea
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default TextareaInputComponent;
