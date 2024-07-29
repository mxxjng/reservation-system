import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";
import { TextInput, TextInputProps } from "@mantine/core";

type StringInputProps<Model extends Record<string, any>> = TextInputProps &
  DefaultFormInputProps<Model>;

function StringInput<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: StringInputProps<Model>) {
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
        <TextInput
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default StringInput;
