import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormStateProps = {
  /* optional message that gets displayed if the form is dirty */
  formDirtyMessage?: string;
};

const FormState = ({
  formDirtyMessage = "Unsaved changes...",
}: FormStateProps) => {
  const {
    formState: { isDirty, isSubmitSuccessful },
    reset,
  } = useFormContext();

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      // important to keep the values after a successful submit
      reset({}, { keepValues: true });
    }
  }, [isSubmitSuccessful]);

  if (isDirty) {
    return (
      <Alert
        variant="light"
        color="blue"
        title={formDirtyMessage}
        icon={<IconInfoCircle />}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
        quae tempore necessitatibus placeat saepe.
      </Alert>
    );
  }

  return null;
};
export default FormState;
