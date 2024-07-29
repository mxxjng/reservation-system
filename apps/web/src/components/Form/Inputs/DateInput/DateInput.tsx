import { Controller, useFormContext } from "react-hook-form";
import { DateInput, DateInputProps } from "@mantine/dates";

import customParseFormat from "dayjs/plugin/customParseFormat";

import { DefaultFormInputProps } from "~/types/form";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

type DateInputComponentProps<Model extends Record<string, any>> = DateInputProps &
  DefaultFormInputProps<Model>;

function DateInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: DateInputComponentProps<Model>) {
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
        <DateInput
          value={value}
          valueFormat="DD/MM/YYYY HH:mm:ss"
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default DateInputComponent;
