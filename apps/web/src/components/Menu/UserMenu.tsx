import { Avatar, Group, Menu, Text, rem } from "@mantine/core";
import {
  IconBallAmericanFootball,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

/* Menu to display when a user is logged in */
const UserMenu = () => {
  const session = useSession();

  if (!session.data?.user) {
    return null;
  }

  const userRole = session.data.user.role.type! as any;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Group style={{ cursor: "pointer" }} gap="xs">
          <Avatar size="sm">{session?.data?.user?.username?.[0]}</Avatar>
          <Text size="sm">{session?.data?.user?.username}</Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Menu</Menu.Label>
        <Link href="/settings">
          <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            User Settings
          </Menu.Item>
        </Link>
        <Link href="/bets">
          <Menu.Item
            leftSection={<IconBallAmericanFootball style={{ width: rem(14), height: rem(14) }} />}
          >
            User Tipps
          </Menu.Item>
        </Link>
        {userRole !== "USER" && (
          <Link href="/admin/dashboard">
            <Menu.Item
              leftSection={<IconLayoutDashboard style={{ width: rem(14), height: rem(14) }} />}
            >
              Dashboard
            </Menu.Item>
          </Link>
        )}
        <Menu.Item
          onClick={() => signOut()}
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default UserMenu;
