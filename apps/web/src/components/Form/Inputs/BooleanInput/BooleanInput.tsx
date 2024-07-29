import { Switch, SwitchProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

import { DefaultFormInputProps } from "~/types/form";

type BooleanInputComponentProps<Model extends Record<string, any>> = SwitchProps &
  DefaultFormInputProps<Model>;

function BooleanInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: BooleanInputComponentProps<Model>) {
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
        <Switch
          value={value}
          onChange={onChange}
          checked={value}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default BooleanInputComponent;
