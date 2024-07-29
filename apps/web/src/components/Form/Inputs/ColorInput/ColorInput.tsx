import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";
import { ColorInput, ColorInputProps } from "@mantine/core";

type ColorInputComponentProps<Model extends Record<string, any>> =
  ColorInputProps & DefaultFormInputProps<Model>;

function ColorInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: ColorInputComponentProps<Model>) {
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
        <ColorInput
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default ColorInputComponent;
