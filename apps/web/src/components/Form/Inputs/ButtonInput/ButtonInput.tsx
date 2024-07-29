import { Button, ButtonProps } from "@mantine/core";
import { useFormContext } from "react-hook-form";

/* Custom form button with disabled value based on the form state */
const ButtonInput = ({ children, ...props }: ButtonProps) => {
  const {
    formState: { isDirty, isValid },
  } = useFormContext();

  return (
    <Button type="submit" disabled={!isValid} {...props}>
      {children}
    </Button>
  );
};
export default ButtonInput;
