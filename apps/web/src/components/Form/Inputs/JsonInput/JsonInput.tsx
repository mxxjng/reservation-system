import { JsonInput, JsonInputProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";

type JsonInputComponentProps<Model extends Record<string, any>> =
  JsonInputProps & DefaultFormInputProps<Model>;

function JsonInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: JsonInputComponentProps<Model>) {
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
        <JsonInput
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default JsonInputComponent;
