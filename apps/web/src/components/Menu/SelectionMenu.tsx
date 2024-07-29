import { ActionIcon, Box, Button, Group, Paper, Text } from "@mantine/core";
import { IconCopy, IconEdit, IconEye, IconTrash, IconX } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  /* Selected rows from the table */
  selectedRows: any[];

  /* Function to trigger the deletion of the single entry */
  handleDeleteSingle: () => void;

  /* Function to trigger the deletion of the multiple entries */
  handleDeleteMutli: () => void;

  /* Function to trigger the copy of the single entry */
  handleCopy?: () => void;

  /* Function to trigger the unselect of single or multiple entry */
  handleUnselect: () => void;

  /* Function to get the single url of the entity */
  single: (id: string) => string;
};

/* Select menu for a table when one or more entries are selected */
const SelectMenu = ({
  single,
  selectedRows,
  handleDeleteMutli,
  handleDeleteSingle,
  handleUnselect,
  handleCopy,
}: Props) => {
  /* Bar to render when only one entry is selected */
  const singleBar = (
    <Group gap="xs">
      <Link href={single(selectedRows[0]?.id)}>
        <Button variant="subtle" size="sm" leftSection={<IconEye size="1rem" />}>
          View
        </Button>
      </Link>
      <Link href={single(selectedRows[0]?.id) + "?edit=true"}>
        <Button variant="subtle" size="sm" leftSection={<IconEdit size="1rem" />}>
          Edit
        </Button>
      </Link>
      {handleCopy && (
        <Button
          onClick={handleCopy}
          variant="subtle"
          size="sm"
          leftSection={<IconCopy size="1rem" />}
        >
          Copy
        </Button>
      )}
      <Button
        onClick={handleDeleteSingle}
        variant="subtle"
        color="red"
        size="sm"
        leftSection={<IconTrash size="1rem" />}
      >
        Delete One
      </Button>
    </Group>
  );

  /* Bar to render when more than one entries are selected */
  const multiBar = (
    <Group>
      <Button
        onClick={handleDeleteMutli}
        variant="subtle"
        color="red"
        size="sm"
        leftSection={<IconTrash size="1rem" />}
      >
        Delete {selectedRows.length} Entries
      </Button>
    </Group>
  );

  if (selectedRows.length === 0) {
    return null;
  }

  return (
    <Group>
      <Paper withBorder p="sm">
        <Group>
          <>
            <Text size="sm">{selectedRows.length} entries selected</Text>
            {selectedRows.length === 1 && singleBar}
            {selectedRows.length > 1 && multiBar}
            <ActionIcon onClick={handleUnselect} variant="subtle" color="gray">
              <IconX size="1rem" />
            </ActionIcon>
          </>
        </Group>
      </Paper>
    </Group>
  );
};
export default SelectMenu;
