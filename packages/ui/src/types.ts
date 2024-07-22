export type FormInputProps<Model extends Record<string, any>> = {
  /* name of the field (for react hook form initialization) */
  name: keyof Model;

  /* id of the input */
  id: string;

  defaultValue?: any;

  /* error message to be shown if input is invalid */
  errorMessage?: string | any;
};

export type InputTypes = "STRING" | "NUMBER";
