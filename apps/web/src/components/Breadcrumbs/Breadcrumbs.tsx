import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from "@mantine/core";

type Props = {
  customRoutes?: { path: string; name: string; link?: string }[];
};

/* Renders Breadcrumbs for the current route (Currently meant for admin dashboard but could be useful for other pages)*/
const Breadcrumbs = ({ customRoutes }: Props) => {
  const router = useRouter();
  const pathSegments = router.asPath
    .split("/")
    .filter((path) => path.length > 0);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    console.log("segment", segment);
    return { name: segment, href };
  });

  return (
    <MantineBreadcrumbs mb="md">
      <Anchor component={Link} href="/">
        Home
      </Anchor>
      {breadcrumbs.map((breadcrumb, index) => {
        const customRoute = customRoutes?.find(
          (route) => route.path === breadcrumb.href
        );

        return (
          <Anchor
            component={Link}
            href={customRoute?.link || breadcrumb.href}
            key={index}
          >
            {customRoute
              ? customRoute.name
              : makeFirstLetterUppercase(breadcrumb.name)}
          </Anchor>
        );
      })}
    </MantineBreadcrumbs>
  );
};

function makeFirstLetterUppercase(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default Breadcrumbs;
