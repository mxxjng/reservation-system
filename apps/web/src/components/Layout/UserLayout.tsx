import { Container, Group, NavLink } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

import TeamHeader from "~/features/Team/TeamHeader/TeamHeader";
import { api } from "~/utils/api";
import LoadingHandler from "../DataHandling/LoadingHandler/LoadingHandler";

import classes from "~/styles/styles.module.css";

type NavLink = {
  name: string;
  link: (slug: string) => string;
  path: string;
};

const navItems: NavLink[] = [
  {
    name: "Overview",
    link: (slug: string) => `/users/${slug}/`,
    path: "/users/[user]",
  },
  {
    name: "Roles",
    link: (slug: string) => `/users/${slug}/roles`,
    path: "/roles/[user]/roles",
  },
];

type TeamLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: TeamLayoutProps) => {
  const params = useParams();
  const router = useRouter();

  const { data, status } = api.user.findOne.useQuery(params?.user as string, {
    enabled: !!params?.user,
  });

  return (
    <>
      <div className={classes.layout__border} style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Container size="lg">
          <LoadingHandler status={status}>
            {data && <TeamHeader team={data} />}
            <Group>
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  properties={item}
                  slug={params?.team as string}
                  isActive={router.pathname === item.path}
                />
              ))}
            </Group>
          </LoadingHandler>
        </Container>
      </div>
      <Container size="lg">{children}</Container>
    </>
  );
};

type NavItemProps = {
  slug: string;
  properties: NavLink;
  isActive: boolean;
};

function NavItem({ properties, slug, isActive }: NavItemProps) {
  return (
    <Link
      href={properties.link(slug)}
      style={{
        paddingBottom: "10px",
        borderBottom: isActive ? "2px solid #ffb01b" : "2px solid transparent",
        color: isActive ? "#ffb01b" : "inherit",
      }}
    >
      {properties.name}
    </Link>
  );
}

export default UserLayout;
