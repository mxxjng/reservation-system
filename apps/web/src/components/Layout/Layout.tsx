import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  HoverCard,
  rem,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconLogin,
  IconNotification,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { useRouter } from "next/router";
import TestLogo from "../Icons/CatchLogo";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import UserMenu from "../Menu/UserMenu";

import classes1 from "~/styles/styles.module.css";

import { FooterLinks } from "../Footer/Footer";
import classes from "./Layout.module.css";

type NavLink = {
  name: string;
  link: string;
  path: string;
};

const navItems: NavLink[] = [
  {
    name: "Users",
    link: "/users",
    path: "/users",
  },
];

type LayoutProps = {
  children: React.ReactNode;
};

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

/* Layout for all default pages (not admin pages) */
export default function Layout({ children }: LayoutProps) {
  const t = useTranslations("dashboard.explore");
  const session = useSession();
  const router = useRouter();

  console.log("pathname", router.pathname);

  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.brand[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>
      <div className={classes1.layout__border} style={{ padding: "1rem" }}>
        <Container size="2xl">
          <Group justify="space-between">
            <Group>
              <Link href="/">
                <TestLogo />
              </Link>
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  properties={item}
                  isActive={router.pathname.startsWith(item.path) || router.pathname === item.path}
                />
              ))}
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.brand[6]}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" c="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
            <Group>
              <LanguageSwitcher />
              {session.data?.user ? (
                <Group>
                  <UserMenu />
                </Group>
              ) : (
                <Link href="/login">
                  <Button leftSection={<IconLogin size="1rem" stroke={1.5} />} variant="default">
                    Login
                  </Button>
                </Link>
              )}
            </Group>
          </Group>
        </Container>
      </div>
      <main>{children}</main>
      <FooterLinks />
    </>
  );
}

type NavItemProps = {
  properties: NavLink;
  isActive: boolean;
};

function NavItem({ properties, isActive }: NavItemProps) {
  return (
    <Link
      href={properties.link}
      style={{
        color: isActive ? "#ffb01b" : "inherit",
      }}
    >
      {properties.name}
    </Link>
  );
}
