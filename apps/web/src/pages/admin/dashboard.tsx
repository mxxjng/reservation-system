import { Button } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { ReactElement } from "react";

import AdminLayout from "~/components/Layout/AdminLayout";
import { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  const session = useSession();

  return (
    <>
      <pre>{JSON.stringify(session.data, null, 2)}</pre>
      auth layout <Button onClick={() => signOut()}>Logout</Button>
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default DashboardPage;
