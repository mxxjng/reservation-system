import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconCopy, IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

type TableMenuProps = {
  /* Function to trigger a delete action */
  onDelete: () => void;

  /* Function to trigger a copy action */
  onCopy?: () => void;

  /* Links to detail and page */
  detailLink: string;

  /* Link to edit page */
  editLink: string;
};

// TODO: add internationalization
/* Action menu for the dynamic table */
const TableMenu = ({ onDelete, detailLink, editLink, onCopy }: TableMenuProps) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="subtle" color="dark">
          <IconDots size="1.5rem" stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Menü</Menu.Label>
        <Link href={detailLink}>
          <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
            Details ansehen
          </Menu.Item>
        </Link>
        <Link href={editLink}>
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Bearbeiten
          </Menu.Item>
        </Link>
        {onCopy && (
          <Menu.Item
            onClick={onCopy}
            leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
          >
            Kopieren
          </Menu.Item>
        )}
        <Menu.Divider />

        <Menu.Label>Gefahrenzone</Menu.Label>
        <Menu.Item
          onClick={onDelete}
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Eintrag löschen
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TableMenu;
