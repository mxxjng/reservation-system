import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";
import { Select, SelectProps, Text, Box } from "@mantine/core";

type SelectInputProps<Model extends Record<string, any>> = SelectProps &
  DefaultFormInputProps<Model> & {
    data: { value: string; label: string }[];
  };

function SelectInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  data,
  ...props
}: SelectInputProps<Model>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name] && errors[name]?.message;

  if (data.length === 0) {
    return (
      <Box mb="md">
        <label>{props.label}</label>
        <Text>
          No Data for {props.label} exist. Please create a {props.label} first.
        </Text>
      </Box>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field: { onChange, value } }) => (
        <Select
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          data={data}
          {...props}
        />
      )}
    />
  );
}
export default SelectInputComponent;
