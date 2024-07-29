import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

/* Displays error message */
export const showErrorToast = (title: string, err?: { message: string }) => {
  showNotification({
    color: "red",
    icon: <IconAlertCircle size="0.8rem" />,
    message: err?.message,
    title,
    radius: "sm",
    withBorder: true,
  });
};

/* Displays success message */
export const showSuccessToast = (title: string, message?: string) => {
  showNotification({
    color: "green",
    icon: <IconCheck size="0.8rem" />,
    message,
    title,
    radius: "sm",
    withBorder: true,
  });
};
