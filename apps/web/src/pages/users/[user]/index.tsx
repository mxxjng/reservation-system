import { Container, Grid, Paper, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import Layout from "~/components/Layout/Layout";
import UserLayout from "~/components/Layout/UserLayout";
import TeamSchedulePreview from "~/features/Team/TeamSchedulePreview/TeamSchedulePreview";
import { NextPageWithLayout } from "~/pages/_app";

const UserPage: NextPageWithLayout = () => {
  const router = useRouter();

  /* Get the entity id from the router url query */
  const userSlug = router.query?.user as string;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <TeamSchedulePreview teamSlug={userSlug} />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Paper withBorder p="sm">
          <Title order={4}>Standings</Title>
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 8 }}>
        <Paper withBorder h={"100%"} p="sm">
          <Title order={4}>Standings</Title>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <UserLayout>{page}</UserLayout>
    </Layout>
  );
};

export default UserPage;
