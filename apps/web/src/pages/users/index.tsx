import Layout from "~/components/Layout/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "~/pages/_app";
import { useParams } from "next/navigation";
import Link from "next/link";

const TeamsPage: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <h1>Overview of all teams in this plattform</h1>
        <h2>Teams:</h2>
        <Link href={`/teams/holzgerlingen-twisters`}>team 1</Link>
      </div>
    </>
  );
};

TeamsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TeamsPage;
