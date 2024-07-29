import {
  AppShell,
  AppShellSection,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Group,
  NavLink,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowBackUp,
  IconFileAnalytics,
  IconKey,
  IconLayoutDashboard,
  IconUsers,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AvailableRoles } from "~/utils/auth";

import { useRoleGuard } from "~/hooks/useRoleGuard";
import { appRoutes } from "~/utils/constants";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import TestLogo from "../Icons/CatchLogo";

type LayoutProps = {
  children: React.ReactNode;
};

type LinkOptions = {
  [Role in AvailableRoles]: React.ReactNode;
};

// TODO: render links based on user role
export default function AdminLayout({ children }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { pathname, push } = useRouter();

  const session: any = useSession({ required: true, onUnauthenticated: () => push("/") });
  const userRole = session.data?.user?.role.type;
  useRoleGuard(["ADMIN", "CATCH_EDITOR", "TEAM_EDITOR"], userRole as AvailableRoles);

  const linkOptions: LinkOptions = {
    ADMIN: <AdminLinks pathname={pathname} />,
    CATCH_EDITOR: <CatchEditorLinks pathname={pathname} />,
    TEAM_EDITOR: <TeamEditorLinks pathname={pathname} />,
    USER: <p>No Links for user...</p>,
  };

  return (
    <AppShell
      header={{ height: 66 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" p="sm">
          <div>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <TestLogo />
          </div>
          <Group>
            <LanguageSwitcher />
            <Button variant="default" onClick={() => signOut()}>
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {userRole === "TEAM_EDITOR" && (
          <Group mb="md">
            <Avatar radius="xs" src={session.data?.user?.role.team.logo} size="sm"></Avatar>
            <Text size="sm">{session.data?.user?.role.team.name}</Text>
          </Group>
        )}
        <AppShellSection grow>
          {linkOptions[userRole as AvailableRoles] ?? <p>No Links found...</p>}
        </AppShellSection>
        <AppShellSection>
          <NavLink
            mb="md"
            href="/"
            label="Leave admin View"
            component={Link}
            leftSection={<IconArrowBackUp size="1rem" stroke={1.5} />}
          />
        </AppShellSection>
        <AppShellSection>
          <Divider mb="md" />
          <Group>
            <Avatar>{session.data?.user?.name?.[0] || "U"}</Avatar>
            <Box>
              <Title order={5}>{session.data?.user?.name}</Title>
              <Text size="sm">{session.data?.user?.email}</Text>
            </Box>
          </Group>
        </AppShellSection>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

type LinksProps = {
  pathname: string;
};

function AdminLinks({ pathname }: LinksProps) {
  return (
    <>
      <NavLink
        href={appRoutes.admin.dashboard}
        label="Dashboard"
        component={Link}
        leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
        active={pathname === appRoutes.admin.dashboard}
      />
      <NavLink
        href={appRoutes.admin.log.overview}
        label="Logs"
        component={Link}
        leftSection={<IconFileAnalytics size="1rem" stroke={1.5} />}
        active={pathname === appRoutes.admin.log.overview}
      />
      <NavLink
        href={appRoutes.admin.user.overview}
        label="Users"
        component={Link}
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
        active={pathname === appRoutes.admin.user.overview}
      />
      <NavLink
        href={appRoutes.admin.role.overview}
        label="Roles"
        component={Link}
        leftSection={<IconKey size="1rem" stroke={1.5} />}
        active={pathname === appRoutes.admin.role.overview}
      />
    </>
  );
}

function TeamEditorLinks({ pathname }: LinksProps) {
  return (
    <>
      <NavLink
        href={appRoutes.admin.dashboard}
        label="Dashboard"
        component={Link}
        leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
        active={pathname === appRoutes.admin.dashboard}
      />
    </>
  );
}

function CatchEditorLinks({ pathname }: LinksProps) {
  return (
    <>
      <NavLink
        href={appRoutes.admin.dashboard}
        label="Dashboard"
        component={Link}
        leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
        active={pathname === appRoutes.admin.dashboard}
      />
    </>
  );
}
