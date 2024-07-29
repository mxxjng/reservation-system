import { Box, Button, Group, Title, Text } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  text?: string;
  cancelButton: React.ReactNode;
  confirmButton: React.ReactNode;
};

/* Content of the delete modal */
const DeleteModalContent = ({
  title,
  text,
  cancelButton,
  confirmButton,
}: Props) => {
  return (
    <Box p="xs">
      <Title order={4} mb="sm">
        {title}
      </Title>
      {text && (
        <Text size="sm" mb="lg">
          {text}
        </Text>
      )}
      <Group grow>
        {cancelButton}
        {confirmButton}
      </Group>
    </Box>
  );
};
export default DeleteModalContent;
