import { Controller, useFormContext } from "react-hook-form";
import { DefaultFormInputProps } from "~/types/form";
import { FileInput, FileInputProps } from "@mantine/core";

type FileInputComponentProps<Model extends Record<string, any>> =
  FileInputProps & DefaultFormInputProps<Model>;

function FileInputComponent<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: FileInputComponentProps<Model>) {
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
        <FileInput
          value={value}
          onChange={onChange}
          error={(errorMessage as string) ?? ""}
          {...props}
        />
      )}
    />
  );
}
export default FileInputComponent;
