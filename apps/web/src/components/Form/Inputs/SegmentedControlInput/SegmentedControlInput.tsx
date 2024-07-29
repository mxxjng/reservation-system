import { SegmentedControl, SegmentedControlProps, Text } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";

type SegmentControlInputProps<Model extends Record<string, any>> = SegmentedControlProps &
  DefaultFormInputProps<Model> & { label?: string };

function SegmentControlInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  data,
  label,
  ...props
}: SegmentControlInputProps<Model>) {
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
        <div>
          {label && <Text size="xs">{label}</Text>}
          <SegmentedControl
            style={{ width: "100%" }}
            value={value}
            onChange={onChange}
            data={data}
            {...props}
          />
        </div>
      )}
    />
  );
}
export default SegmentControlInputComponent;
