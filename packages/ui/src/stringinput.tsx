import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./types";
import { Input } from "./UI/input";

type StringInputProps<Model extends Record<string, any>> =
  React.InputHTMLAttributes<HTMLInputElement> & FormInputProps<Model>;

function StringInput<Model extends Record<string, any>>({
  name,
  id,
  errorMessage,
  defaultValue,
  label,
  required,
  ...props
}: StringInputProps<Model>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? "Field is required" : false,
      }}
      defaultValue={defaultValue ?? undefined}
      render={({ field: { value, onChange } }) => (
        <>
          {label && (
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label} {required ? "*" : ""}
            </label>
          )}
          <Input {...props} value={value} onChange={onChange} />
          {errorMessage && <p>(errorMessage as string)</p>}
        </>
      )}
    />
  );
}
export default StringInput;
