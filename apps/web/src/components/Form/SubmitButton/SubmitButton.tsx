import { Button, ButtonProps } from "@mantine/core";
import { useFormContext } from "react-hook-form";

type SubmitButtonProps = ButtonProps & {
  children: React.ReactNode;
  isLoading?: boolean;
};

const SubmitButton = ({
  children,
  isLoading = false,
  ...props
}: SubmitButtonProps) => {
  const {
    formState: { isDirty, isValid },
  } = useFormContext();

  return (
    <Button disabled={!isDirty || !isValid} loading={isLoading} {...props}>
      {children}
    </Button>
  );
};
export default SubmitButton;
