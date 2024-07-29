import { Box, Group, Paper, Text, Title } from "@mantine/core";
import { IconDatabaseOff } from "@tabler/icons-react";

type ListHandlerProps = {
  /* lenght of the input data */
  length: number;

  /* content that will be rendered once the data has more than 0 entries */
  children: React.ReactNode;

  /* message to be rendered if the data has 0 entries */
  emptyMessage?: React.ReactNode;
};

const EmptyListHandler = ({
  length,
  children,
  emptyMessage = (
    <Paper withBorder p="md">
      <Group justify="center" mb="sm" align="center">
        <IconDatabaseOff size={30} color="#ffab09" />
      </Group>
      <Title order={4} ta="center">
        No Data
      </Title>
      <Text size="sm" ta="center">
        No Data found for your request.
      </Text>
    </Paper>
  ),
}: ListHandlerProps) => {
  if (length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return <>{children}</>;
};
export default EmptyListHandler;
