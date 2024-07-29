import { Controller, useFormContext } from "react-hook-form";
import { NumberInput, NumberInputProps } from "@mantine/core";

import { DefaultFormInputProps } from "~/types/form";

type NumberInputComponentProps<Model extends Record<string, any>> =
  NumberInputProps & DefaultFormInputProps<Model>;

function NumberInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: NumberInputComponentProps<Model>) {
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
        <NumberInput
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default NumberInputComponent;
