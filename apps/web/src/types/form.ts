import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type DefaultFormInputProps<Model extends Record<string, any>> = {
  /* name of the field (for react hook form initialization) */
  name: keyof Model;

  /* optional default value for the input */
  defaultValue?: any;

  /* if input is required */
  isRequired?: boolean;

  /* error message to be shown if input is invalid */
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};
